import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ROUTEY AI",
      content: "안녕하세요! 오늘 어떤 여행 계획을 도와드릴까요?",
      time: "오전 10:00",
      isAi: true,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  /** 시간 포맷 */
  const getTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  /** 메시지 전송 */
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "나",
      content: input,
      time: getTime(),
      isAi: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    /** AI 자동 응답 (1초 뒤) */
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ROUTEY AI",
          content:
            "좋은 질문이에요! 성수동에는 감각적인 카페들이 정말 많아요 ☕ 원하시는 분위기가 있을까요?",
          time: getTime(),
          isAi: true,
        },
      ]);
    }, 1000);
  };

  /** 자동 스크롤 */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex justify-center bg-[#F8F9FA] min-h-screen font-pretendard">
      <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-5 h-[60px] bg-white sticky top-0 z-[100] border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Link href="/home">
              <ArrowLeft className="w-6 h-6 text-gray-800 cursor-pointer" />
            </Link>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-sky-500 text-white text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <h1 className="text-lg font-bold text-gray-900">ROUTEY AI</h1>
            </div>
          </div>
          <MoreVertical className="w-6 h-6 text-gray-800 cursor-pointer" />
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-[#F8F9FA]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isAi ? "justify-start" : "justify-end"
              } items-end gap-2`}
            >
              {msg.isAi && (
                <Avatar className="w-8 h-8 mb-4">
                  <AvatarFallback className="bg-sky-500 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`flex flex-col ${
                  msg.isAi ? "items-start" : "items-end"
                } gap-1 max-w-[75%]`}
              >
                <div
                  className={`px-4 py-3 rounded-[20px] text-[15px] leading-relaxed shadow-sm ${
                    msg.isAi
                      ? "bg-white text-gray-800 rounded-tl-none"
                      : "bg-sky-500 text-white rounded-tr-none"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* AI 입력중 표시 */}
          {isTyping && (
            <div className="flex justify-start items-end gap-2">
              <Avatar className="w-8 h-8 mb-4">
                <AvatarFallback className="bg-sky-500 text-white text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-white px-4 py-3 rounded-[20px] rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </main>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 pb-8">
          <div className="flex items-center gap-3 bg-gray-100 rounded-[25px] px-4 py-2">
            <Plus className="w-6 h-6 text-gray-400 cursor-pointer" />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-transparent border-none outline-none text-sm py-2 placeholder:text-gray-400"
            />

            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
              <div
                onClick={handleSend}
                className="w-[32px] h-[32px] bg-sky-500 rounded-full flex items-center justify-center cursor-pointer shadow-md shadow-sky-100"
              >
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
