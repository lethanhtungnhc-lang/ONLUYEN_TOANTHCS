import React, { useState, useEffect } from 'react';
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
  Clock,
  Shuffle,
  Printer,
  Check,
  Copy,
  AlertTriangle,
  BookMarked,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { COMPREHENSIVE_GIFTED_TOPICS } from '../data/giftedMathCurriculumData';
import { OFFICIAL_HSG_STANDARD } from '../data/giftedOfficialStandards';
import { GIFTED_50_PAGES_BOOK, TextbookPage } from '../data/giftedMath50PagesTextbook';
import { GIFTED_22_EXAMS, GiftedOfficialExam } from '../data/giftedMath20ExamsData';
import { GiftedTopic, ThinkingChallenge } from '../types';
import MathView from '../utils/mathRender';

interface GiftedMathHubProps {
  onOpenAICoach: (challenge: ThinkingChallenge) => void;
}

export const GiftedMathHub: React.FC<GiftedMathHubProps> = ({ onOpenAICoach }) => {
  // Main view state
  const [activeHubView, setActiveHubView] = useState<'book50' | 'mock22' | 'topics' | 'standards' | 'theorems'>('book50');
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<GiftedTopic>(COMPREHENSIVE_GIFTED_TOPICS[0]);
  const [activeChallenge, setActiveChallenge] = useState<ThinkingChallenge | null>(null);

  // Progressive hint reveals state
  const [revealedHint1, setRevealedHint1] = useState(false);
  const [revealedHint2, setRevealedHint2] = useState(false);
  const [revealedMethodHint, setRevealedMethodHint] = useState(false);
  const [revealedFullSolution, setRevealedFullSolution] = useState(false);

  // Theorem category filter
  const [selectedTheoremCategory, setSelectedTheoremCategory] = useState<string>('all');
  const [theoremSearch, setTheoremSearch] = useState<string>('');

  // -------------------------------------------------------------
  // 50-PAGE TEXTBOOK COMPENDIUM STATE
  // -------------------------------------------------------------
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [bookChapterFilter, setBookChapterFilter] = useState<string>('all');
  const [bookSearch, setBookSearch] = useState<string>('');
  const [revealedDrillHints, setRevealedDrillHints] = useState<Record<string, boolean>>({});
  const [revealedDrillAnswers, setRevealedDrillAnswers] = useState<Record<string, boolean>>({});

  // -------------------------------------------------------------
  // 22 SIMULATED OFFICIAL EXAMS STATE
  // -------------------------------------------------------------
  const [selectedExamIndex, setSelectedExamIndex] = useState<number>(0);
  const [examSecondsRemaining, setExamSecondsRemaining] = useState<number>(150 * 60);
  const [isExamTimerRunning, setIsExamTimerRunning] = useState<boolean>(false);
  const [studentWorkNotes, setStudentWorkNotes] = useState<Record<string, string>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [examShuffleNotice, setExamShuffleNotice] = useState<string>('');

  // Timer effect for 22 simulated exams
  useEffect(() => {
    let interval: any = null;
    if (isExamTimerRunning && examSecondsRemaining > 0) {
      interval = setInterval(() => {
        setExamSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamTimerRunning, examSecondsRemaining]);

  const formatExamTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectChallenge = (ch: ThinkingChallenge) => {
    setActiveChallenge(ch);
    setRevealedHint1(false);
    setRevealedHint2(false);
    setRevealedMethodHint(false);
    setRevealedFullSolution(false);
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

  // Filtered pages for 50-page book
  const filteredBookPages = GIFTED_50_PAGES_BOOK.filter((p) => {
    const matchChap = bookChapterFilter === 'all' || p.chapterId === bookChapterFilter;
    const matchSearch =
      !bookSearch ||
      p.chapterTitle.toLowerCase().includes(bookSearch.toLowerCase()) ||
      p.topicTitle.toLowerCase().includes(bookSearch.toLowerCase()) ||
      p.theoryContent.toLowerCase().includes(bookSearch.toLowerCase());
    return matchChap && matchSearch;
  });

  const currentPage: TextbookPage =
    GIFTED_50_PAGES_BOOK.find((p) => p.pageNumber === currentPageNum) || GIFTED_50_PAGES_BOOK[0];

  const currentOfficialExam: GiftedOfficialExam =
    GIFTED_22_EXAMS[selectedExamIndex] || GIFTED_22_EXAMS[0];

  // Distinct chapter list for dropdown
  const bookChapters = [
    { id: 'all', title: 'Tất cả 10 chuyên đề (50 Trang)' },
    { id: 'ch-01', title: 'Chương 1: Biến đổi đại số & Căn thức (Trang 1-5)' },
    { id: 'ch-02', title: 'Chương 2: PT bậc hai & Viète mở rộng (Trang 6-10)' },
    { id: 'ch-03', title: 'Chương 3: Đa thức, Nghiệm & Bézout (Trang 11-15)' },
    { id: 'ch-04', title: 'Chương 4: PT vô tỉ & Hệ PT phi tuyến (Trang 16-20)' },
    { id: 'ch-05', title: 'Chương 5: Nguyên lý Dirichlet & Bất biến (Trang 21-25)' },
    { id: 'ch-06', title: 'Chương 6: Số học & Đồng dư thức (Trang 26-30)' },
    { id: 'ch-07', title: 'Chương 7: BĐT AM-GM, Cauchy-Schwarz & Cực trị (Trang 31-35)' },
    { id: 'ch-08', title: 'Chương 8: Xác suất & Quy tắc nhân (Trang 36-40)' },
    { id: 'ch-09', title: 'Chương 9: Tứ giác nội tiếp & Tiếp tuyến (Trang 41-45)' },
    { id: 'ch-10', title: 'Chương 10: Phương tích, Bổ đề & Cực trị hình (Trang 46-50)' },
  ];

  const toggleDrillHint = (id: string) => {
    setRevealedDrillHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDrillAnswer = (id: string) => {
    setRevealedDrillAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRubric = (id: string) => {
    setRevealedRubrics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
            Biên soạn chi tiết theo <strong className="text-purple-600 dark:text-purple-400 font-bold">Cấu trúc đề thi HSG cấp Thành phố từ năm học 2026 - 2027</strong> • Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
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
      {/* 5 MAIN HUB TABS */}
      {/* ============================================================== */}
      {!activeChallenge && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'book50', label: '📖 Sách Điện Tử 50 Trang Toàn Tập', icon: BookMarked },
            { id: 'mock22', label: '🏆 Ngân Hàng 22 Đề Thi HSG TP (20 Điểm)', icon: Award },
            { id: 'topics', label: '📚 10 Chuyên Đề Trọng Tâm', icon: BookOpen },
            { id: 'standards', label: '📋 Cấu Trúc Đề 2026 - 2027 (Công Văn)', icon: FileText },
            { id: 'theorems', label: '⭐ Cẩm Nang Định Lý Dùng Như SGK', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveHubView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
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
      {/* VIEW 1: 50-PAGE COMPENDIUM TEXTBOOK READER */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'book50' && (
        <div className="space-y-6">
          {/* BOOK TOOLBAR & FILTERS */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase">Chương học:</span>
              <select
                value={bookChapterFilter}
                onChange={(e) => {
                  setBookChapterFilter(e.target.value);
                  const firstOfChapter = GIFTED_50_PAGES_BOOK.find(
                    (p) => e.target.value === 'all' || p.chapterId === e.target.value
                  );
                  if (firstOfChapter) setCurrentPageNum(firstOfChapter.pageNumber);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold outline-none"
              >
                {bookChapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              {/* PAGE JUMP DROPDOWN */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Chuyển trang:</span>
                <select
                  value={currentPageNum}
                  onChange={(e) => setCurrentPageNum(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-lg border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-black outline-none"
                >
                  {GIFTED_50_PAGES_BOOK.map((p) => (
                    <option key={p.pageNumber} value={p.pageNumber}>
                      Trang {p.pageNumber}: {p.topicTitle.substring(0, 32)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  placeholder="Tìm kiếm lý thuyết, ví dụ..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none w-48 focus:w-64 transition-all"
                />
              </div>
            </div>
          </div>

          {/* PAGE NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between gap-2 px-1">
            <button
              disabled={currentPageNum <= 1}
              onClick={() => setCurrentPageNum((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <span>← Trang trước ({currentPageNum > 1 ? currentPageNum - 1 : 1})</span>
            </button>

            <div className="text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
              TRANG {currentPage.pageNumber} / {GIFTED_50_PAGES_BOOK.length}
            </div>

            <button
              disabled={currentPageNum >= GIFTED_50_PAGES_BOOK.length}
              onClick={() => setCurrentPageNum((prev) => Math.min(GIFTED_50_PAGES_BOOK.length, prev + 1))}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Trang tiếp ({currentPageNum < GIFTED_50_PAGES_BOOK.length ? currentPageNum + 1 : 50}) →</span>
            </button>
          </div>

          {/* MAIN PAGE READER SHEET */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
            {/* PAGE HEADER */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 uppercase tracking-wider">
                  {currentPage.chapterTitle}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Tài liệu chuẩn hóa bồi dưỡng HSG cấp TP • Trang {currentPage.pageNumber}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentPage.topicTitle}
              </h2>

              <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-xl text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                <Award className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Vị trí tương ứng trong đề thi chính thức:</strong> {currentPage.officialRef}
                </div>
              </div>
            </div>

            {/* SECTION I: THEORY CONTENT */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span>I. Cơ Sở Lý Thuyết & Tư Duy Giải Toán Chuyên Sâu</span>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 leading-relaxed text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line font-sans">
                <MathView text={currentPage.theoryContent} />
              </div>
            </div>

            {/* SECTION II: THEOREMS */}
            {currentPage.theorems && currentPage.theorems.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>II. Định Lý, Bổ Đề & Hệ Quả Được Phép Dùng Như SGK</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {currentPage.theorems.map((th, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs"
                    >
                      <div className="font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
                        <span>⭐ {th.name}</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-slate-800 dark:text-slate-200 leading-relaxed">
                        <MathView text={th.statement} />
                      </div>
                      {th.note && (
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          Lưu ý: {th.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION III: MASTER WORKED EXAMPLES */}
            {currentPage.masterExamples && currentPage.masterExamples.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  <Star className="w-5 h-5 text-indigo-600" />
                  <span>III. Các Ví Dụ Mẫu Kinh Điển (Kèm Phân Tích Phương Pháp)</span>
                </div>

                <div className="space-y-5">
                  {currentPage.masterExamples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-800/80 p-6 sm:p-7 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-3">
                        <h4 className="font-black text-sm sm:text-base text-indigo-900 dark:text-indigo-300">
                          {ex.title}
                        </h4>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                          Ví dụ chuẩn hóa
                        </span>
                      </div>

                      {/* Problem Statement */}
                      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 font-semibold text-slate-900 dark:text-white text-sm">
                        <MathView text={ex.problem} />
                      </div>

                      {/* Analysis */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                        <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>Phân tích định hướng giải:</span>
                        </span>
                        <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          <MathView text={ex.analysis} />
                        </div>
                      </div>

                      {/* Step-by-step Solution */}
                      <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Lời giải chi tiết chuẩn mực tự luận:</span>
                        </span>
                        <div className="text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line text-sm font-serif">
                          <MathView text={ex.solution} />
                        </div>
                      </div>

                      {/* Pedagogy tip */}
                      {ex.pedagogyTip && (
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong>Lưu ý sư phạm & Bẫy sai lầm:</strong> {ex.pedagogyTip}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION IV: DRILL EXERCISES */}
            {currentPage.drillExercises && currentPage.drillExercises.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span>IV. Bài Tập Tự Luyện Rèn Luyện Tư Duy Sáng Tạo</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentPage.drillExercises.map((dr, drIdx) => (
                    <div
                      key={dr.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
                    >
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                          {drIdx + 1}
                        </span>
                        <MathView text={dr.question} />
                      </div>

                      {/* TOGGLES: HINT & FINAL ANSWER */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={() => toggleDrillHint(dr.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{revealedDrillHints[dr.id] ? 'Ẩn gợi ý' : 'Mở gợi ý giải'}</span>
                        </button>

                        <button
                          onClick={() => toggleDrillAnswer(dr.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{revealedDrillAnswers[dr.id] ? 'Ẩn đáp số' : 'Xem đáp số chuẩn'}</span>
                        </button>
                      </div>

                      {revealedDrillHints[dr.id] && (
                        <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 animate-fade-in">
                          <strong>Gợi ý:</strong> <MathView text={dr.hint} />
                        </div>
                      )}

                      {revealedDrillAnswers[dr.id] && (
                        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold animate-fade-in">
                          ✓ Đáp số: <MathView text={dr.finalAnswer} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: 22 SIMULATED OFFICIAL EXAMS (CHUẨN 20 ĐIỂM / 150 PHÚT) */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'mock22' && (
        <div className="space-y-6">
          {/* EXAM SELECTOR & TIMER BAR */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                Chọn đề thi mô phỏng:
              </span>
              <select
                value={selectedExamIndex}
                onChange={(e) => {
                  setSelectedExamIndex(Number(e.target.value));
                  setExamSecondsRemaining(150 * 60);
                  setIsExamTimerRunning(false);
                  setStudentWorkNotes({});
                }}
                className="px-3.5 py-2 rounded-xl border border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 text-xs font-black outline-none"
              >
                {GIFTED_22_EXAMS.map((ex, idx) => (
                  <option key={ex.id} value={idx}>
                    {ex.title} (Mã: {ex.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 150 MINUTE TIMER */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-amber-400 font-mono text-base font-black shadow-md border border-slate-700">
                <Clock className="w-4 h-4 animate-spin text-amber-400" />
                <span>{formatExamTimer(examSecondsRemaining)}</span>
              </div>

              <button
                onClick={() => setIsExamTimerRunning((prev) => !prev)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ${
                  isExamTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isExamTimerRunning ? 'Tạm dừng đếm giờ' : 'Bắt đầu làm bài 150p'}
              </button>

              <button
                onClick={() => {
                  setExamSecondsRemaining(150 * 60);
                  setIsExamTimerRunning(false);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
                title="Khởi động lại đồng hồ"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>In đề thi</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL EXAM PAPER SHEET */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8">
            {/* EXAM PAPER HEADER */}
            <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-6 text-center space-y-2">
              <div className="flex justify-between items-start text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                <div className="text-left">
                  <span>SỞ GIÁO DỤC VÀ ĐÀO TẠO</span><br />
                  <strong>TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH</strong>
                </div>
                <div className="text-right">
                  <span>KỲ THI CHỌN HỌC SINH GIỎI CẤP THÀNH PHỐ</span><br />
                  <span>NĂM HỌC 2026 - 2027</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight pt-2">
                {currentOfficialExam.title}
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-400 pt-1">
                <span>Môn thi: <strong>TOÁN (CẤP THCS)</strong></span>
                <span>•</span>
                <span>Thời gian: <strong>150 phút</strong> (không kể thời gian phát đề)</span>
                <span>•</span>
                <span>Thang điểm: <strong>20,0 điểm</strong></span>
                <span>•</span>
                <span>Mã đề: <strong className="text-purple-600">{currentOfficialExam.code}</strong></span>
              </div>
            </div>

            {/* THE 5 QUESTIONS (BÀI 1 ĐẾN BÀI 5) */}
            <div className="space-y-8">
              {[
                { prob: currentOfficialExam.problem1, num: 1 },
                { prob: currentOfficialExam.problem2, num: 2 },
                { prob: currentOfficialExam.problem3, num: 3 },
                { prob: currentOfficialExam.problem4, num: 4 },
                { prob: currentOfficialExam.problem5, num: 5 },
              ].map(({ prob, num }) => (
                <div
                  key={num}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 bg-white dark:bg-slate-800/80 shadow-sm space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <h3 className="text-base sm:text-lg font-black text-purple-900 dark:text-purple-300">
                      Bài {num} ({prob.points.toFixed(1).replace('.', ',')} điểm): {prob.title}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {prob.points.toFixed(1).replace('.', ',')}đ
                    </span>
                  </div>

                  {/* SUBPARTS */}
                  <div className="space-y-6">
                    {prob.subparts.map((sub) => (
                      <div key={sub.id} className="space-y-3">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                          <strong className="text-purple-600 dark:text-purple-400 mr-1.5">{sub.label}:</strong>
                          <MathView text={sub.content} />
                        </div>

                        {/* STUDENT DRAFT PAD */}
                        <div className="pt-2">
                          <textarea
                            value={studentWorkNotes[sub.id] || ''}
                            onChange={(e) =>
                              setStudentWorkNotes((prev) => ({ ...prev, [sub.id]: e.target.value }))
                            }
                            placeholder="Nháp hướng giải / phác thảo các bước biến đổi của em tại đây..."
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-sans text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                            rows={3}
                          />
                        </div>

                        {/* TOGGLE RUBRIC & SOLUTION */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => toggleRubric(sub.id)}
                            className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>{revealedRubrics[sub.id] ? 'Ẩn biểu điểm' : '📋 Biểu điểm chấm (Sở GD&ĐT)'}</span>
                          </button>

                          <button
                            onClick={() => toggleSolution(sub.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{revealedSolutions[sub.id] ? 'Ẩn lời giải' : '💡 Lời giải chi tiết'}</span>
                          </button>
                        </div>

                        {/* RUBRIC ACCORDION */}
                        {revealedRubrics[sub.id] && (
                          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-100 animate-fade-in space-y-1">
                            <span className="font-bold flex items-center gap-1">
                              <Scale className="w-3.5 h-3.5" />
                              <span>Thang điểm chi tiết từng bước:</span>
                            </span>
                            <div className="whitespace-pre-line font-sans pl-2 leading-relaxed">
                              {sub.rubric}
                            </div>
                          </div>
                        )}

                        {/* SOLUTION ACCORDION */}
                        {revealedSolutions[sub.id] && (
                          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-emerald-300 dark:border-emerald-800 text-xs space-y-2 animate-fade-in">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Lời giải chi tiết chuẩn tự luận:</span>
                            </span>
                            <div className="whitespace-pre-line font-serif text-sm text-slate-800 dark:text-slate-200 pl-2 leading-relaxed">
                              <MathView text={sub.solution} />
                            </div>
                          </div>
                        )}
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
      {/* VIEW 3: 10 CHUYÊN ĐỀ BỒI DƯỠNG TRỌNG TÂM */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'topics' && (
        <div className="space-y-6">
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
                        {topic.challenges.length} bài toán
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TOPIC DETAIL & CHALLENGES (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 uppercase tracking-wider">
                      {selectedTopic.domainName} • Khối {selectedTopic.grade}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Mã chuyên đề: {selectedTopic.id}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {selectedTopic.description}
                  </p>
                </div>

                {/* THEORETICAL FOUNDATION */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-500" />
                    <span>Hệ thống kiến thức & Công thức chìa khóa:</span>
                  </h3>
                  <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2 whitespace-pre-line font-sans">
                    <MathView text={selectedTopic.theoreticalFoundation || selectedTopic.theoryGuide || selectedTopic.corePhilosophy || ''} />
                  </div>
                </div>

                {/* THINKING CHALLENGES LIST */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Bài tập tư duy phân hóa cấp tỉnh / thành phố:</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {selectedTopic.challenges.map((ch) => (
                      <div
                        key={ch.id}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 hover:border-purple-300 dark:hover:border-purple-700 transition space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                {Array.from({ length: ch.stars }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                {ch.starLabel}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              <MathView text={ch.title} />
                            </h4>
                          </div>

                          <button
                            onClick={() => handleSelectChallenge(ch)}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-sm shrink-0 cursor-pointer flex items-center gap-1"
                          >
                            <span>GIẢI BÀI</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          <MathView text={ch.problem} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 4: CẤU TRÚC ĐỀ THI 2026 - 2027 (CÔNG VĂN SỞ GD&ĐT) */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'standards' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-5 space-y-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
              Văn bản chính thức
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {OFFICIAL_HSG_STANDARD.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cơ quan ban hành: <strong>{OFFICIAL_HSG_STANDARD.agency}</strong> • Áp dụng từ năm học 2026 - 2027
            </p>
          </div>

          {/* 3 SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 space-y-1">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                Thời gian làm bài
              </span>
              <div className="text-2xl font-black text-blue-900 dark:text-blue-100">
                {OFFICIAL_HSG_STANDARD.durationMinutes} Phút
              </div>
              <p className="text-[11px] text-blue-700 dark:text-blue-300">
                150 phút tự luận tập trung
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 space-y-1">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                Thang điểm chính thức
              </span>
              <div className="text-2xl font-black text-purple-900 dark:text-purple-100">
                {OFFICIAL_HSG_STANDARD.totalPoints.toFixed(1)} Điểm
              </div>
              <p className="text-[11px] text-purple-700 dark:text-purple-300">
                5 bài toán lớn (tổng 20,0đ)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Hình thức thi
              </span>
              <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                Tự Luận 100%
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Biết 40% • Hiểu 30% • Vận dụng 30%
              </p>
            </div>
          </div>

          {/* TABLE OF 5 PROBLEMS */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Khung định dạng chi tiết 5 bài toán:
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 uppercase font-black">
                  <tr>
                    <th className="p-3.5">Bài thi</th>
                    <th className="p-3.5">Điểm</th>
                    <th className="p-3.5">Chủ đề & Nội dung kiểm tra</th>
                    <th className="p-3.5">Phân bổ điểm chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {(OFFICIAL_HSG_STANDARD.structure || []).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3.5 font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                        {item.problem}
                      </td>
                      <td className="p-3.5 font-black text-slate-900 dark:text-white whitespace-nowrap">
                        {item.points.toFixed(1)}đ
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                        {item.title}
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-300">
                        <ul className="list-disc pl-4 space-y-1">
                          {item.subparts.map((sub, sIdx) => (
                            <li key={sIdx}>{sub}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 5: CẨM NANG ĐỊNH LÝ ĐƯỢC PHÉP DÙNG NHƯ SGK */}
      {/* ============================================================== */}
      {!activeChallenge && activeHubView === 'theorems' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>Cẩm Nang Các Định Lý Được Phép Sử Dụng Như SGK</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tổng hợp theo quy định chính thức: Thí sinh được phép áp dụng trực tiếp kết quả các định lý này mà không cần chứng minh lại.
            </p>
          </div>

          {/* SEARCH & CATEGORY FILTER */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'Tất cả định lý' },
                { id: 'Hình học', label: '⭕ Hình học (Menelaus, Ceva, Ptolemy...)' },
                { id: 'Đại số', label: '📐 Đại số (Viète bậc 3, Bézout, BĐT...)' },
                { id: 'Số học', label: '🔢 Số học (Fermat, Euler...)' },
                { id: 'Tổ hợp', label: '🎲 Tổ hợp (Dirichlet, Cực hạn...)' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedTheoremCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedTheoremCategory === c.id
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={theoremSearch}
                onChange={(e) => setTheoremSearch(e.target.value)}
                placeholder="Tìm tên định lý..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none w-full sm:w-48"
              />
            </div>
          </div>

          {/* THEOREMS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTheorems.map((th, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-amber-900 dark:text-amber-300">
                    ⭐ {th.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {th.category}
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white leading-relaxed">
                  <MathView text={th.statement} />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Cách áp dụng trong bài thi:</strong> {th.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 6: SOLVING ARENA FOR 5-STAR CHALLENGE (KHI CHỌN VÀO GIẢI) */}
      {/* ============================================================== */}
      {activeChallenge && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
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

          <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-slate-900/60 border border-purple-200/60 dark:border-slate-700 text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            <MathView text={activeChallenge.problem} />
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Hệ thống Gợi ý Tư duy Bậc thang:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
