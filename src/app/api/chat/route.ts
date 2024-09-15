import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export const runtime = 'edge';
export const maxDuration = 30; // seconds

export async function POST(req: Request) {
	const { messages } = await req.json();

	const systemMessage = {
		role: 'system',
		content: 'You are a helpful AI assistant named Tek guiding users through an interactive skill roadmap platform named TechWay. The roadmap has buttons for each skill. When user press skill button they can choose between "Chat with the skill" (Refers to chat about what they\'re looking for (learning, resources, project ideas, ...). ) or "Complete" (Refers that the user has mastered that skill (congratulate the user, and tell next steps depending on the case... eg: learning the next skill, apply for jobs, etc...). When a user selects a skill button, there will appear 3 chat buttons to select current level on that skill (basic, intermediate, pro) You need to adjust your responses based on the current level of the user. When discussing skills, always ask for the user\'s "current level". When offering help, ask what they are "looking for" (learning, resources, or project ideas).'
	};

	const result = await streamText({
		model: openai("gpt-4o-mini"),
		messages: convertToCoreMessages([systemMessage, ...messages]),
	});

	return result.toDataStreamResponse();
}
