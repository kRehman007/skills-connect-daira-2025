"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function enhanceProposal(
	proposal: string,
	jobDescription: string
) {
	try {
		const { text } = await generateText({
			model: google("gemini-2.0-pro"),
			prompt: `Job Description: ${jobDescription}\n\nOriginal Proposal: ${proposal}`,
			system: `You are a professional proposal writer. Your task is to enhance and restructure the given proposal statement while considering the job description provided. 

            Follow these guidelines:
            1. Maintain a professional tone throughout
            2. Align the proposal with the job requirements
            3. Highlight relevant skills and experience
            4. Use clear, concise language
            5. Ensure proper formatting and structure
            6. Keep the core message of the original proposal

            Return only the enhanced proposal text without any additional commentary.`,
		});

		return { message: "Success", data: text };
	} catch (error) {
		console.error(error);
		return { message: "Something went wrong", data: null };
	}
}
