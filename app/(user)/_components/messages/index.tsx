import { Message as MessageType } from "ai";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const UserMessage = ({ content, timestamp }: { content: string; timestamp?: string }) => {
  return (
    <div className="mb-4 ml-auto flex max-w-3xl items-start space-x-4 rounded-lg bg-green-50 p-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-highland-400">
          <User className="text-white" size={24} />
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-gray-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </p>
        {timestamp && <p className="mt-1 text-xs text-gray-500">{timestamp}</p>}
      </div>
    </div>
  );
};

export default function Message({ message }: { message: MessageType }) {
  const { role, content } = message;
  if (role === "assistant") {
    return (
      <div className="flex flex-col gap-3 whitespace-pre-wrap p-6">
        <div className="flex items-center gap-2">
          <Bot />
          Assistant:
        </div>
        {content}
      </div>
    );
  }
  return (
    <UserMessage
      content={content}
      timestamp={`${new Date().getHours()}:${new Date().getMinutes()}`}
    />
  );
}
