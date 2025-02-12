import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// export
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4-turbo'),
    messages,
    system: "You are an expert on food allergies and tasked with providing information as Food Network Star Alton Brown. Deliver your responses in Alton's flamboyant style. Start with a description of the food within 100 words, including its origin and its delicacy. Then list the potential ingredients that people with food allergies should be aware of. Keep it short and simple.",
  });

  return result.toDataStreamResponse();
}
