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
  BookOpen,
  FileText,
  CheckCircle2,
  ListOrdered,
  Search,
  Bookmark,
  Scale,
  Compass,
  Calculator,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { COMPREHENSIVE_GIFTED_TOPICS } from '../data/giftedMathCurriculumData';
import { OFFICIAL_HSG_STANDARD } from '../data/giftedOfficialStandards';
import { GiftedTopic, ThinkingChallenge } from '../types';
import MathView from '../utils/mathRender';

interface GiftedMathHubProps {
  onOpenAICoach: (challenge: ThinkingChallenge) => void;
}

export const GiftedMathHub: React.FC<GiftedMathHubProps> = ({ onOpenAICoach }) => {
  const [activeHubView, setActiveHubView] = useState<'topics' | 'standards' | 'theorems' | 'mock_exam'>('topics');
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<GiftedTopic>(COMPREHENSIVE_GIFTED_TOPICS[0]);
  const [activeChallenge, setActiveChallenge] = useState<ThinkingChallenge | null>(null);

  // Progressive hint reveals state (Section 20: Never show full solution right away)
  const [revealedHint1, setRevealedHint1] = useState(false);
  const [revealedHint2, setRevealedHint2] = useState(false);
  const [revealedMethodHint, setRevealedMethodHint] = useState(false);
  const [revealedFullSolution, setRevealedFullSolution] = useState(false);

  // Theorem category filter
  const [selectedTheoremCategory, setSelectedTheoremCategory] = useState<string>('all');
  const [theoremSearch, setTheoremSearch] = useState<string>('');

  // Mock exam expand state
  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({ 1: true });

  const handleSelectChallenge = (ch: ThinkingChallenge) => {
    setActiveChallenge(ch);
    setRevealedHint1(false);
    setRevealedHint2(false);
    setRevealedMethodHint(false);
    setRevealedFullSolution(false);
  };

  const toggleExamQuestion = (num: number) => {
    setExpandedExamQuestions((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  // Filter topics for the current grade and domain
  const availableTopics = COMPREHENSIVE_GIFTED_TOPICS.filter((t) => {
    const matchGrade = t.grade === selectedGrade;
    const matchDomain = selectedDomain === 'all' || t.domain === selectedDomain;
    return matchGrade && matchDomain;
  });

  // Filtered theorems
  const filteredTheorems = OFFICIAL_HSG_STANDARD.standardTheorems.filter((th) => {
    const matchCat = selectedTheoremCategory === 'all' || th.category === selectedTheoremCategory;
    const matchSearch =
      !theoremSearch ||
      th.name.toLowerCase().includes(theoremSearch.toLowerCase()) ||
      th.statement.toLowerCase().includes(theoremSearch.toLowerCase()) ||
      th.explanation.toLowerCase().includes(theoremSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in text-slate-900 dark:text-slate-100 font-sans">
      {/* ============================================================== */}
      {/* HEADER & TOP NAVIGATION */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            {activeChallenge && (
              <button
                onClick={() => setActiveChallenge(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← TRỞ VỀ DANH MỤC</span>
              </button>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span>Bồi Dưỡng Học Sinh Giỏi Toán THCS</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Biên soạn chi tiết theo <strong className="text-purple-600 dark:text-purple-400 font-semibold">Cấu trúc định dạng đề thi HSG TP từ năm học 2026 - 2027</strong> • Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
          </p>
        </div>

        {/* GRADE SWITCHER */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGrade(g);
                const first = COMPREHENSIVE_GIFTED_TOPICS.find((t) => t.grade === g);
                if (first) setSelectedTopic(first);
                setActiveChallenge(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedGrade === g
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {g === 9 ? '⭐ HSG Toán 9 (TP)' : `HSG Toán ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4 MAIN HUB TABS */}
      {/* ============================================================== */}
      {!activeChallenge && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'topics', label: '📚 10 Chuyên Đề HSG Trọng Tâm', icon: BookOpen },
            { id: 'standards', label: '📋 Cấu Trúc Đề Thi 2026 - 2027 (Công Văn)', icon: FileText },
            { id: 'theorems', label: '⭐ Cẩm Nang Định Lý Được Phép Dùng Như SGK', icon: Sparkles },
            { id: 'mock_exam', label: '📝 Đề Thi Thử HSG Cấp TP (20 Điểm)', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveHubView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeHubView === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 1: 10 CHUYÊN ĐỀ BỒI DƯỠNG CHUYÊN SÂU */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'topics' && (
        <div className="space-y-6">
          {/* DOMAIN FILTER BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tất cả mạch kiến thức' },
              { id: 'algebra', label: '📐 Đại số (10,0 điểm)' },
              { id: 'geometry', label: '⭕ Hình học (7,0 điểm)' },
              { id: 'arithmetic', label: '🔢 Số học (1,0 điểm)' },
              { id: 'combinatorics', label: '🎲 Tổ hợp (1,0 điểm)' },
              { id: 'applied', label: '📊 Xác suất (1,0 điểm)' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedDomain === d.id
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* TOPICS LIST SIDEBAR (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Danh sách chuyên đề ({availableTopics.length}):
              </div>

              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                {availableTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                      selectedTopic.id === topic.id
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {topic.domainName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-[10px]">
                        {topic.challenges.length} thử thách
                      </span>
                    </div>

                    <h4 className="font-bold text-sm leading-snug">
                      {topic.title}
                    </h4>

                    {topic.officialScope && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic">
                        {topic.officialScope}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* TOPIC DETAIL MAIN CONTENT (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* TOPIC HEADER CARD */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                      {selectedTopic.domainName}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Chương trình HSG Toán {selectedTopic.grade}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedTopic.title}
                  </h2>

                  {selectedTopic.officialScope && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Phạm vi trong đề thi chính thức:</strong> {selectedTopic.officialScope}
                      </div>
                    </div>
                  )}
                </div>

                {/* CORE PHILOSOPHY & THINKING IDEA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/50 dark:border-slate-700 space-y-1.5">
                    <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Ý tưởng tư duy cốt lõi:</span>
                    </span>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      {selectedTopic.thinkingIdea}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-500" />
                      <span>Phương pháp giải đặc trưng:</span>
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      {selectedTopic.methods.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* THEOREMS LIST IN THIS TOPIC */}
                {selectedTopic.standardTheorems && selectedTopic.standardTheorems.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Định lý & Hệ thức chuẩn được phép sử dụng:
                    </span>
                    <div className="space-y-2">
                      {selectedTopic.standardTheorems.map((th, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200/80 dark:border-slate-700 space-y-1"
                        >
                          <div className="font-bold text-xs text-purple-700 dark:text-purple-300">
                            {th.name}
                          </div>
                          {th.latex && (
                            <div className="py-1 font-mono text-xs text-slate-900 dark:text-white">
                              <MathView text={th.latex} block />
                            </div>
                          )}
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            {th.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MASTER EXAMPLES */}
              {selectedTopic.masterExamples && selectedTopic.masterExamples.length > 0 && (
                <div className="space-y-4">
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Bài toán Mẫu Kinh Điển (Có hướng dẫn tư duy):</span>
                  </div>

                  {selectedTopic.masterExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4"
                    >
                      <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300">
                        {ex.title}
                      </h4>

                      <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        <MathView text={ex.problem} />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-amber-900 dark:text-amber-200">
                          <strong>🔍 Phân tích hướng giải:</strong> {ex.analysis}
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-2 text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                          <div className="font-bold text-slate-400 font-sans uppercase text-[11px]">
                            Lời giải chi tiết:
                          </div>
                          <div className="text-xs sm:text-sm whitespace-pre-line">
                            <MathView text={ex.solution} />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
                          <strong>💡 Bình luận sư phạm:</strong> {ex.comment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LIST OF THINKING CHALLENGES */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Bộ Thử Thách Tư Duy Phân Tầng Sao (⭐ 1-5):</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    Bấm để mở phòng tự giải có gợi ý bậc thang
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedTopic.challenges.map((ch) => (
                    <div
                      key={ch.id}
                      onClick={() => handleSelectChallenge(ch)}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer transition shadow-sm hover:shadow-md flex items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: ch.stars }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            Cấp độ: {ch.starLabel}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          <MathView text={ch.title} />
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {ch.problem.replace(/\$/g, '')}
                        </p>
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
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: CẤU TRÚC ĐỀ THI 2026-2027 (CÔNG VĂN SỞ GD&ĐT) */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'standards' && (
        <div className="space-y-6">
          {/* OFFICIAL HEADER BANNER */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                VĂN BẢN CHÍNH THỨC
              </span>
              <span className="text-purple-200 text-xs">
                Sở Giáo dục và Đào tạo • Áp dụng từ năm học 2026 - 2027
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              {OFFICIAL_HSG_STANDARD.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-slate-300">Hình thức thi:</div>
                <div className="font-bold text-white text-sm">{OFFICIAL_HSG_STANDARD.format}</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-slate-300">Thời gian làm bài:</div>
                <div className="font-bold text-white text-sm">{OFFICIAL_HSG_STANDARD.duration} phút</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-slate-300">Thang điểm:</div>
                <div className="font-bold text-amber-400 text-sm">{OFFICIAL_HSG_STANDARD.totalPoints} điểm</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-slate-300">Tỉ lệ mức độ:</div>
                <div className="font-bold text-white text-xs">{OFFICIAL_HSG_STANDARD.ratio}</div>
              </div>
            </div>
          </div>

          {/* 3 MẠCH KIẾN THỨC CHÍNH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OFFICIAL_HSG_STANDARD.domains.map((dom, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Mạch {i + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-sm">
                      {dom.points.toFixed(1)} Điểm
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {dom.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {dom.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {dom.topics.map((t, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          • {t.title}:
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-2 leading-relaxed">
                          {t.requirements}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CẤU TRÚC 5 BÀI THI CHI TIẾT */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-purple-600" />
              <span>Cấu trúc 5 Bài thi chuẩn mực (Thang điểm 20.0):</span>
            </h3>

            <div className="space-y-3">
              {OFFICIAL_HSG_STANDARD.examStructure.map((q) => (
                <div
                  key={q.number}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                    <span className="font-black text-base text-purple-700 dark:text-purple-300">
                      {q.title}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-black text-xs border border-amber-200 dark:border-amber-800 self-start sm:self-auto">
                      {q.points.toFixed(1)} Điểm
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="font-bold text-slate-400 uppercase text-[11px]">
                      Phân bổ các lệnh hỏi:
                    </div>
                    {q.subtopics.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: CẨM NANG ĐỊNH LÝ ĐƯỢC PHÉP DÙNG NHƯ SGK */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'theorems' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-7 rounded-3xl border border-blue-400/40 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-400 text-slate-950 text-[11px] font-black uppercase">
                Mục IV Công Văn Sở GD&ĐT
              </span>
              <span className="text-blue-200 text-xs">Quy định thi HSG 2026 - 2027</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Các Khái Niệm, Kết Quả Được Phép Sử Dụng Như SGK
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
              Học sinh được phép sử dụng trực tiếp các định lý, bất đẳng thức và hệ thức dưới đây trong bài làm thi HSG
              mà không bắt buộc phải chứng minh lại, giúp tiết kiệm thời gian và trình bày bài thi mạch lạc, tự tin.
            </p>
          </div>

          {/* FILTER & SEARCH */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'Đại số', 'Số học', 'Tổ hợp', 'Hình học'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTheoremCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedTheoremCategory === cat
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên định lý, từ khóa..."
                value={theoremSearch}
                onChange={(e) => setTheoremSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* THEOREMS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTheorems.map((th, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-[10px] border border-purple-200 dark:border-purple-800">
                      {th.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      ✓ Dùng trực tiếp
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {th.name}
                  </h3>

                  {th.latex && (
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 text-center font-mono text-xs overflow-x-auto text-purple-700 dark:text-purple-300">
                      <MathView text={th.latex} block />
                    </div>
                  )}

                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    <MathView text={th.statement} />
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-700">
                    <strong>Bản chất:</strong> {th.explanation}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200 mt-2">
                  <strong>💡 Mẹo vận dụng trong bài thi:</strong> {th.usageTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 4: ĐỀ THI THỬ HỌC SINH GIỎI CẤP THÀNH PHỐ (20 ĐIỂM) */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'mock_exam' && (
        <div className="space-y-6">
          {/* EXAM TOP HEADER */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  KỲ THI CHỌN HỌC SINH GIỎI THCS CẤP THÀNH PHỐ NĂM HỌC 2026 - 2027
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Đề Thi Thử Học Sinh Giỏi Môn Toán 9 (Tự Luận 100%)
                </h2>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Thời gian làm bài: 150 phút (không kể thời gian giao đề) • Thang điểm: 20,0 điểm
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-center shrink-0">
                <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase">
                  Tổng điểm
                </div>
                <div className="text-2xl font-black text-purple-700 dark:text-purple-300">
                  20.0
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
              * Thí sinh không được sử dụng máy tính cầm tay khi làm bài thi chọn học sinh giỏi theo quy định.
              Bài làm cần trình bày chi tiết từng bước lập luận, biến đổi và kết luận rõ ràng.
            </p>
          </div>

          {/* 5 PROBLEMS ACCORDION */}
          <div className="space-y-4">
            {OFFICIAL_HSG_STANDARD.examStructure.map((item) => {
              const isExpanded = !!expandedExamQuestions[item.number];
              return (
                <div
                  key={item.number}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
                >
                  {/* QUESTION HEADER BAR */}
                  <div
                    onClick={() => toggleExamQuestion(item.number)}
                    className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
                          {item.points.toFixed(1)} điểm
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.instruction}
                      </div>
                    </div>

                    <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* QUESTION DETAILS & RUBRIC */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700 space-y-4 text-xs animate-fade-in">
                      {/* Problem Statement */}
                      <div className="space-y-1.5">
                        <div className="font-bold text-slate-400 uppercase text-[11px]">
                          Nội dung đề bài:
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                          <MathView text={item.sampleQuestion} />
                        </div>
                      </div>

                      {/* Solution Guide */}
                      <div className="space-y-1.5">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          <span>Hướng dẫn giải chi tiết chuẩn mực:</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-serif">
                          <MathView text={item.solutionGuide} />
                        </div>
                      </div>

                      {/* Official Rubric (Biểu điểm chi tiết) */}
                      <div className="space-y-1.5 pt-2">
                        <div className="font-bold text-slate-400 uppercase text-[11px] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-blue-500" />
                          <span>Biểu điểm và barem chấm điểm (Tổng: {item.points.toFixed(1)}đ):</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                          {item.rubric.map((r, rIdx) => (
                            <div key={rIdx} className="p-3 flex items-center justify-between gap-4 text-xs">
                              <span className="text-slate-700 dark:text-slate-300">
                                {r.step}
                              </span>
                              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 shrink-0">
                                +{r.score.toFixed(2)} đ
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 5: SOLVING ARENA FOR 5-STAR CHALLENGE (KHI CHỌN VÀO GIẢI) */}
      {/* ============================================================== */}
      {activeChallenge && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>HỎI AI COACH (GỢI MỞ SOCRATIC)</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              <MathView text={activeChallenge.title} />
            </h3>
          </div>

          {/* PROBLEM BODY */}
          <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-700 text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            <MathView text={activeChallenge.problem} />
          </div>

          {/* SECTION 20: TỰ GIẢI TRƯỚC - GỢI Ý BẬC THANG (KHÔNG SHOW NGAY TOÀN BỘ) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Hệ thống Gợi ý Tư duy Bậc thang (Mục 20):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* BUTTON GỢI Ý 1 */}
              <button
                onClick={() => setRevealedHint1(true)}
                className={`p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                className={`p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                className={`p-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>EM ĐÃ SUY NGHĨ XONG - XEM LỜI GIẢI CHI TIẾT</span>
              </button>
            ) : (
              <div className="p-6 rounded-3xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/60 space-y-3 animate-fade-in text-xs">
                <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Lời giải chi tiết & Phân tích ý tưởng</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">
                    Chuẩn thi HSG Toán 2026 - 2027
                  </span>
                </div>

                <div className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line text-sm bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 font-serif">
                  <MathView text={activeChallenge.fullSolution} />
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
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
