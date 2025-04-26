import { prisma } from "@/server/prisma/config";
import { Subscription, Prisma, User, SubscriptionPlan } from "@prisma/client";

type UserPick = Pick<
	User,
	"id" | "firstName" | "lastName" | "email" | "avatar"
>;

export type SubscriptionDto = Omit<Subscription, "id"> & {
	user?: UserPick;
};

export class SubscriptionRepository {
	private toDto(
		subscription: Subscription & { user?: UserPick | null }
	): SubscriptionDto {
		return {
			...subscription,
			user: subscription.user || undefined,
		};
	}

	async create(data: Prisma.SubscriptionCreateInput): Promise<SubscriptionDto> {
		const subscription = await prisma.subscription.create({
			data,
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		return this.toDto(subscription);
	}

	async findById(id: string): Promise<SubscriptionDto | null> {
		const subscription = await prisma.subscription.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		if (!subscription) return null;
		return this.toDto(subscription);
	}

	async findAll(params?: {
		offset?: number;
		limit?: number;
	}): Promise<SubscriptionDto[]> {
		const subscriptions = await prisma.subscription.findMany({
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
			skip: params?.offset ?? 0,
			take: params?.limit ?? 10,
		});

		return subscriptions.map((sub) => this.toDto(sub));
	}

	async update(
		id: string,
		data: Prisma.SubscriptionUpdateInput
	): Promise<SubscriptionDto> {
		const subscription = await prisma.subscription.update({
			where: { id },
			data,
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		return this.toDto(subscription);
	}

	async delete(id: string): Promise<void> {
		const subscription = await prisma.subscription.findUnique({
			where: { id },
		});

		if (!subscription) {
			return;
		}

		await prisma.subscription.delete({
			where: { id },
		});
	}

	async findByPlanName(
		planName: SubscriptionPlan
	): Promise<SubscriptionDto | null> {
		const subscription = await prisma.subscription.findFirst({
			where: { plan_name: planName },
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		if (!subscription) return null;
		return this.toDto(subscription);
	}

	async findByUserId(userId: string): Promise<SubscriptionDto | null> {
		const subscription = await prisma.subscription.findFirst({
			where: {
				user: {
					id: userId,
				},
			},
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		if (!subscription) return null;
		return this.toDto(subscription);
	}

	async assignUserToSubscription(
		subscriptionId: string,
		userId: string
	): Promise<SubscriptionDto> {
		// First, remove any existing subscription for the user
		await prisma.user.update({
			where: { id: userId },
			data: { subscriptionId: null },
		});

		const subscription = await prisma.subscription.update({
			where: { id: subscriptionId },
			data: {
				user: {
					connect: { id: userId },
				},
			},
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		return this.toDto(subscription);
	}

	async removeUserFromSubscription(
		subscriptionId: string
	): Promise<SubscriptionDto> {
		const subscription = await prisma.subscription.update({
			where: { id: subscriptionId },
			data: {
				user: {
					disconnect: true,
				},
			},
			include: {
				user: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						email: true,
						avatar: true,
					},
				},
			},
		});

		return this.toDto(subscription);
	}
}
