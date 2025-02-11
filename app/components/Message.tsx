import { Message as MessageType } from 'ai'
import { User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Message({ message }: { message: MessageType }) {
  return (
    <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role !== 'user' && (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <img alt="Assistant Avatar" className="w-8 h-8 rounded-full mr-2" src="img/cheficon.jpeg"></img>
        </div>
      )}
      <div className={`max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'
      }`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-500 hover:underline" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
            code: ({node, inline, ...props}) =>
              inline
                ? <code className="bg-gray-200 rounded px-1" {...props} />
                : <code className="block bg-gray-200 rounded p-2 my-2 whitespace-pre-wrap" {...props} />,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  )
}
