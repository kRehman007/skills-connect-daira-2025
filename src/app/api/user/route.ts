import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/server/prisma/config";
import { NextResponse } from "next/server";

// Handle webhook events from Clerk
export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_USER_WEB_HOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Get the headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occurred", {
			status: 400,
		});
	}

	// Do something with the payload
	// For this guide, you simply log the payload to the console
	const data = evt.data as UserJSON;
	const eventType = evt.type;

	try {
		if (eventType === "user.created") {
			const user = await prisma.user.create({
				data: {
					id: data.id,
					email: data.email_addresses[0].email_address,
					firstName: data.first_name || "",
					lastName: data.last_name || "",
					avatar: data.image_url,
				},
			});
			console.log(user);
			if (!user) {
				return new Response("Error creating user", { status: 400 });
			}
		}

		if (eventType === "user.deleted") {
			const user = await prisma.user.findUnique({
				where: {
					id: data.id,
				},
			});
			if (!user) {
				return new Response("Error deleting user", { status: 400 });
			}

			await prisma.user.delete({
				where: {
					id: data.id,
				},
			});
		}

		if (eventType === "user.updated") {
			const user = await prisma.user.findUnique({
				where: {
					id: evt.data.id,
				},
			});
			if (!user) {
				return new Response("Error updating user", { status: 400 });
			}

			await prisma.user.update({
				where: {
					id: evt.data.id,
				},
				data: {
					email: evt.data.email_addresses[0].email_address,
					firstName: evt.data.first_name || "",
					lastName: evt.data.last_name || "",
					avatar: evt.data.image_url || null,
				},
			});
		}
	} catch (error) {
		return new Response("Error connecting to database" + error, {
			status: 500,
		});
	}

	return new Response("", { status: 200 });
}

export async function GET(req: Request, res: Response) {
	return NextResponse.json({ message: "He;llo" });
}
