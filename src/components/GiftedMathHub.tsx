import React, { useState } from 'react';
import {
  Brain,
  ArrowLeft,
  Star,
  Lightbulb,
  HelpCircle,
  Eye,
  Bot,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Award,
} from 'lucide-react';
import { GIFTED_TOPICS } from '../data/mockDatabase';
import { GiftedTopic, ThinkingChallenge } from '../types';
import MathView from '../utils/mathRender';

interface GiftedMathHubProps {
  onOpenAICoach: (challenge: ThinkingChallenge) => void;
}

export const GiftedMathHub: React.FC<GiftedMathHubProps> = ({ onOpenAICoach }) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [selectedTopic, setSelectedTopic] = useState<GiftedTopic>(GIFTED_TOPICS[0]);
  const [activeChallenge, setActiveChallenge] = useState<ThinkingChallenge | null>(null);

  // Progressive hint reveals state (Section 20: Never show full solution right away)
  const [revealedHint1, setRevealedHint1] = useState(false);
  const [revealedHint2, setRevealedHint2] = useState(false);
  const [revealedMethodHint, setRevealedMethodHint] = useState(false);
  const [revealedFullSolution, setRevealedFullSolution] = useState(false);

  const handleSelectChallenge = (ch: ThinkingChallenge) => {
    setActiveChallenge(ch);
    setRevealedHint1(false);
    setRevealedHint2(false);
    setRevealedMethodHint(false);
    setRevealedFullSolution(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            {activeChallenge && (
              <button
                onClick={() => setActiveChallenge(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← TRỞ VỀ DANH MỤC HSG</span>
              </button>
            )}
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Brain className="w-7 h-7 text-purple-600" />
              <span>🧠 Bồi dưỡng Học sinh Giỏi Toán THCS</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dành cho học sinh khá giỏi, năng khiếu và Đội tuyển Toán 6, 7, 8, 9 • Thử thách tư duy 5⭐ & AI Coach Socratic
          </p>
        </div>

        {/* GRADE SWITCHER */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedGrade === g
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              HSG Toán {g}
            </button>
          ))}
        </div>
      </div>

      {!activeChallenge ? (
        /* DOMAINS & TOPICS OVERVIEW */
        <div className="space-y-6">
          {/* DOMAINS TABS */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { id: 'arithmetic', label: 'Số học', icon: '🔢' },
              { id: 'algebra', label: 'Đại số', icon: '📐' },
              { id: 'geometry', label: 'Hình học', icon: '⭕' },
              { id: 'combinatorics', label: 'Tổ hợp - Logic', icon: '🎲' },
              { id: 'applied', label: 'Thực tế nâng cao', icon: '🌐' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  const found = GIFTED_TOPICS.find((t) => t.domain === d.id);
                  if (found) setSelectedTopic(found);
                }}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                  selectedTopic.domain === d.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{d.icon}</span>
                <span className="font-bold text-xs">{d.label}</span>
              </button>
            ))}
          </div>

          {/* ACTIVE TOPIC DETAIL CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  {selectedTopic.domainName} • Khối {selectedGrade}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedTopic.title}
                </h3>
              </div>
              <span className="self-start sm:self-auto text-xs px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800">
                {selectedTopic.challenges.length} Thử thách tư duy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-slate-900/50 border border-purple-200/50 dark:border-slate-700 space-y-1">
                <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Ý tưởng tư duy cốt lõi</span>
                </span>
                <p className="leading-relaxed">{selectedTopic.thinkingIdea}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Phương pháp giải đặc trưng</span>
                </span>
                <ul className="space-y-1 pl-2 text-slate-600 dark:text-slate-400">
                  {selectedTopic.methods.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* LIST OF 5-STAR THINKING CHALLENGES */}
            <div className="space-y-3 pt-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Thử thách tư duy Toán học (Phân cấp độ sao ⭐):</span>
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {selectedTopic.challenges.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => handleSelectChallenge(ch)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer transition shadow-sm hover:shadow flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400 text-xs">
                          {Array.from({ length: ch.stars }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Cấp độ: {ch.starLabel}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        <MathView text={ch.title} />
                      </h5>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition shrink-0">
                      <span>Vào giải</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SOLVING ARENA FOR THE CHOSEN 5-STAR CHALLENGE */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          {/* PROBLEM HEADER */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: activeChallenge.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {activeChallenge.starLabel}
                </span>
              </div>
              <button
                onClick={() => onOpenAICoach(activeChallenge)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition"
              >
                <Bot className="w-4 h-4" />
                <span>HỎI AI COACH (GỢI MỞ)</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              <MathView text={activeChallenge.title} />
            </h3>
          </div>

          {/* PROBLEM BODY */}
          <div className="p-5 rounded-xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-700 text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            <MathView text={activeChallenge.problem} />
          </div>

          {/* SECTION 20: TỰ GIẢI TRƯỚC - GỢI Ý BẬC THANG (KHÔNG SHOW NGAY TOÀN BỘ) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Trợ giúp tư duy từng bước (Mục 20):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* BUTTON GỢI Ý 1 */}
              <button
                onClick={() => setRevealedHint1(true)}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                  revealedHint1
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>💡 Gợi ý 1: Hướng đi ban đầu</span>
                {revealedHint1 && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Đã mở</span>}
              </button>

              {/* BUTTON GỢI Ý 2 */}
              <button
                onClick={() => setRevealedHint2(true)}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                  revealedHint2
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>💡 Gợi ý 2: Mấu chốt kỹ thuật</span>
                {revealedHint2 && <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded">Đã mở</span>}
              </button>

              {/* BUTTON GỢI Ý PHƯƠNG PHÁP */}
              <button
                onClick={() => setRevealedMethodHint(true)}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                  revealedMethodHint
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>📐 Gợi ý phương pháp</span>
                {revealedMethodHint && <span className="text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded">Đã mở</span>}
              </button>
            </div>

            {/* HINTS ACCORDION CARDS */}
            {revealedHint1 && (
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 animate-fade-in space-y-1">
                <span className="font-bold text-blue-700 dark:text-blue-300">• Gợi ý 1:</span>
                <p><MathView text={activeChallenge.hint1} /></p>
              </div>
            )}

            {revealedHint2 && (
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 animate-fade-in space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300">• Gợi ý 2:</span>
                <p><MathView text={activeChallenge.hint2} /></p>
              </div>
            )}

            {revealedMethodHint && (
              <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 animate-fade-in space-y-1">
                <span className="font-bold text-purple-700 dark:text-purple-300">• Phương pháp tư duy:</span>
                <p><MathView text={activeChallenge.methodHint} /></p>
              </div>
            )}
          </div>

          {/* FULL SOLUTION TOGGLE (SECTION 20: Only when explicitly requested) */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            {!revealedFullSolution ? (
              <button
                onClick={() => setRevealedFullSolution(true)}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600"
              >
                <Eye className="w-4 h-4" />
                <span>EM ĐÃ SUY NGHĨ XONG - XEM LỜI GIẢI CHI TIẾT</span>
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/60 space-y-3 animate-fade-in text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Lời giải chi tiết & Phân tích ý tưởng</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">
                    Chuẩn thi HSG Toán
                  </span>
                </div>

                <div className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line text-sm bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-serif">
                  <MathView text={activeChallenge.fullSolution} />
                </div>

                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                  <strong>💡 Điểm mấu chốt để thành công:</strong> {activeChallenge.keyInsight}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
