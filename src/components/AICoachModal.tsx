import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, Lightbulb, CheckCircle2, AlertCircle, HelpCircle, BookOpen } from 'lucide-react';
import { ThinkingChallenge } from '../types';
import MathView from '../utils/mathRender';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge?: ThinkingChallenge | null;
  contextTitle?: string;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  challenge,
  contextTitle,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Chào em! Thầy là AI Coach - Trợ lý tư duy Toán THCS. Thầy sẽ không trực tiếp giải hộ em hay đưa ra đáp số ngay, mà sẽ đồng hành cùng em bằng phương pháp gợi mở Socratic. Em đang gặp vướng mắc ở bước biến đổi nào?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const query = customPrompt || inputQuery;
    if (!query.trim() || isLoading) return;

    const newMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMessages);
    if (!customPrompt) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: challenge?.problem || contextTitle || 'Toán THCS',
          studentQuery: query,
          contextTopic: challenge?.title || contextTitle || 'Ôn luyện toán THCS',
          mode: 'socratic_hint',
        }),
      });

      const data = await response.json();
      const aiReply =
        data.advice ||
        data.hint ||
        'Thầy khuyên em nên xem lại giả thiết bài toán: liệu ta có thể đặt ẩn phụ hoặc đưa về bình phương một tổng hay không? Hãy thử viết biểu thức ra nháp nhé!';

      setMessages([...newMessages, { sender: 'ai', text: aiReply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: 'Thầy gợi ý: Hãy phân tích các hệ số của bài toán và đối chiếu với bất đẳng thức Cauchy hoặc hằng đẳng thức đáng nhớ đã học.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl h-[85vh] max-h-[700px] flex flex-col overflow-hidden transition-all">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <span>AI Coach – Trợ lý tư duy Toán THCS</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                  Socratic Mode
                </span>
              </h3>
              <p className="text-xs text-purple-200">
                Gợi mở tư duy độc lập • Không sao chép lời giải mẫu (Mục 21)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TOP CONTEXT PILL */}
        {challenge && (
          <div className="bg-purple-50 dark:bg-slate-800/80 px-4 py-2 border-b border-purple-100 dark:border-slate-700 text-xs text-purple-900 dark:text-purple-200 flex items-center gap-2 truncate shrink-0">
            <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-semibold truncate">Bài toán: <MathView text={challenge.title} /></span>
          </div>
        )}

        {/* CHAT MESSAGES SCROLL */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}
              >
                <MathView text={m.text} />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs italic">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Thầy đang suy ngẫm câu hỏi gợi mở cho em...</span>
            </div>
          )}
        </div>

        {/* QUICK SOCRATIC PROMPTS (SECTION 21) */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
          <span className="text-slate-400 font-bold shrink-0">Hỏi nhanh:</span>
          <button
            onClick={() => handleSend('Thầy ơi, bài này nên bắt đầu tư duy từ hướng nào ạ?')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-purple-400 text-slate-700 dark:text-slate-200 shrink-0 font-medium transition"
          >
            🧭 Hướng tư duy ban đầu
          </button>
          <button
            onClick={() => handleSend('Có định lý hay hằng đẳng thức nào hữu ích cho dạng bài này không thầy?')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-purple-400 text-slate-700 dark:text-slate-200 shrink-0 font-medium transition"
          >
            📐 Gợi ý định lý áp dụng
          </button>
          <button
            onClick={() => handleSend('Em thử biến đổi ra nháp nhưng bị vướng, thầy kiểm tra lỗi giúp em với!')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-purple-400 text-slate-700 dark:text-slate-200 shrink-0 font-medium transition"
          >
            🔍 Kiểm tra lập luận
          </button>
          <button
            onClick={() => handleSend('Bài này có cách giải hình học hoặc đại số nào khác không thầy?')}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-purple-400 text-slate-700 dark:text-slate-200 shrink-0 font-medium transition"
          >
            💡 Đề xuất cách giải khác
          </button>
        </div>

        {/* INPUT FORM */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Nhập bước giải hoặc câu hỏi thắc mắc của em..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition shadow disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
