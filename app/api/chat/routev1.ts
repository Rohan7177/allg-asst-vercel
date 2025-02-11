import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Use your pre-configured assistant ID here
  const assistantId = 'asst_t8CTDyDOzZDkBH7Pgv5LyBSt'

  // Create a thread
  const thread = await openai.beta.threads.create()

  // Add messages to the thread
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: messages[messages.length - 1].content,
  })

  // Run the assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  })

  // Create a stream
  const stream = OpenAIStream(run, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      // This is where you'd handle any function calls
      return undefined
    },
    experimental_streamData: true,
    onCompletion: async (completion) => {
      // This is called when the completion is ready
    },
  })

  // Return the stream as a StreamingTextResponse
  return new StreamingTextResponse(stream)
}
