import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  ListOrdered,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  PlayCircle,
  Sparkles,
  ChevronRight,
  FileQuestion,
  Calculator,
  Compass,
  Target,
  RotateCcw,
  Award,
  Gamepad2,
  Shuffle,
} from 'lucide-react';
import { Chapter, Lesson, GradeLevel, Semester, Question } from '../types';
import { storageService } from '../services/storageService';
import MathView from '../utils/mathRender';
import { playCorrectSound, playIncorrectSound, playFanfareSound } from '../utils/soundEffects';
import { MATH_GAMES_3D_LIST } from '../data/mathGames3DData';
import { shuffleQuestionsAndOptions } from '../utils/shuffleUtils';

interface GradeCurriculumProps {
  onStartPractice: (lesson: Lesson) => void;
  onOpenExamForGrade: (grade: GradeLevel) => void;
  onOpenGame3D?: (gameId?: string, grade?: GradeLevel) => void;
}

export const GradeCurriculum: React.FC<GradeCurriculumProps> = ({
  onStartPractice,
  onOpenExamForGrade,
  onOpenGame3D,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(9);
  const [selectedSemester, setSelectedSemester] = useState<Semester | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | 'game3d' | 'theory' | 'formulas' | 'examples' | 'methods' | 'mistakes' | 'practice'>('all');

  // Self-practice state
  const [userPracticeAnswers, setUserPracticeAnswers] = useState<Record<string, string>>({});
  const [isPracticeSubmitted, setIsPracticeSubmitted] = useState<boolean>(false);

  // Load chapters for current grade
  const chapters = storageService.getChapters(selectedGrade);
  const filteredChapters =
    selectedSemester === 'all'
      ? chapters
      : chapters.filter((c) => c.semester === selectedSemester);

  // Load lessons for selected chapter
  const currentChapterLessons: Lesson[] = selectedChapter
    ? storageService.getLessons(selectedChapter.id)
    : [];

  // Reset practice state when lesson changes
  useEffect(() => {
    setUserPracticeAnswers({});
    setIsPracticeSubmitted(false);
    setActiveSectionTab('all');
  }, [selectedLesson?.id]);

  // Handle grade change
  const handleSelectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setSelectedChapter(null);
    setSelectedLesson(null);
  };

  // Handle selecting a chapter
  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedLesson(null);
  };

  // Self-practice questions (10 bài tập chuẩn hóa bám sát SGK Kết nối tri thức)
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [shuffleNotice, setShuffleNotice] = useState<string>('');

  useEffect(() => {
    if (selectedLesson) {
      const qs = storageService.getLessonPracticeQuestions(
        selectedLesson.id,
        selectedLesson.grade,
        selectedLesson.title
      );
      setPracticeQuestions(qs);
    } else {
      setPracticeQuestions([]);
    }
    setUserPracticeAnswers({});
    setIsPracticeSubmitted(false);
  }, [selectedLesson?.id]);

  const handleShufflePractice = () => {
    if (practiceQuestions.length === 0) return;
    const shuffled = shuffleQuestionsAndOptions(practiceQuestions);
    setPracticeQuestions(shuffled);
    setUserPracticeAnswers({});
    setIsPracticeSubmitted(false);
    setShuffleNotice('Đã đảo ngẫu nhiên 10 câu hỏi & toàn bộ các đáp án A, B, C, D!');
    setTimeout(() => setShuffleNotice(''), 3500);
  };

  // Handle answering practice question
  const handleSelectOption = (questionId: string, option: string) => {
    if (isPracticeSubmitted) return;
    setUserPracticeAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Submit practice
  const handleSubmitPractice = () => {
    if (isPracticeSubmitted) return;
    setIsPracticeSubmitted(true);

    let correctCount = 0;
    practiceQuestions.forEach((q) => {
      const selected = userPracticeAnswers[q.id];
      if (selected === q.correctAnswer) {
        correctCount++;
      }
    });

    if (correctCount === practiceQuestions.length && practiceQuestions.length > 0) {
      playFanfareSound();
    } else if (correctCount > 0) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  // Reset practice
  const handleResetPractice = () => {
    setUserPracticeAnswers({});
    setIsPracticeSubmitted(false);
  };

  const correctAnswersCount = practiceQuestions.filter(
    (q) => userPracticeAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* ============================================================== */}
      {/* TOP HEADER & NAVIGATION BAR */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            {/* TRỞ VỀ BUTTON AS MANDATED IN SECTION 4 */}
            {(selectedLesson || selectedChapter) && (
              <button
                onClick={() => {
                  if (selectedLesson) setSelectedLesson(null);
                  else if (selectedChapter) setSelectedChapter(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold transition shadow-sm border border-blue-200 dark:border-blue-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>
                  ← {selectedLesson ? 'TRỞ VỀ BÀI HỌC' : 'TRỞ VỀ DANH SÁCH CHƯƠNG'}
                </span>
              </button>
            )}
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" />
              <span>Chương trình Toán THCS 2018</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bộ sách giáo khoa <strong>Kết nối tri thức với cuộc sống</strong> • Cấu trúc chuẩn: Lý thuyết, Công thức KaTeX, Ví dụ mẫu & Phần tự luyện sau mỗi bài học
          </p>
        </div>

        {/* GRADE SWITCHER TABS: TOÁN 6 - 7 - 8 - 9 */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-auto overflow-x-auto shadow-inner">
          {([6, 7, 8, 9] as GradeLevel[]).map((grade) => (
            <button
              key={grade}
              onClick={() => handleSelectGrade(grade)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Toán {grade}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: DANH SÁCH CÁC CHƯƠNG SGK (Bấm vào chương ra các bài học) */}
      {/* ============================================================== */}
      {!selectedChapter && !selectedLesson && (
        <div className="space-y-6">
          {/* SEMESTER FILTER BAR */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-medium">Học kỳ:</span>
            {[
              { id: 'all', label: 'Tất cả học kỳ' },
              { id: 'hk1_mid', label: 'Giữa HK I' },
              { id: 'hk1_final', label: 'Học kỳ I' },
              { id: 'hk2_mid', label: 'Giữa HK II' },
              { id: 'hk2_final', label: 'Học kỳ II' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSemester(s.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedSemester === s.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* CHAPTERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChapters.map((chapter) => {
              const chapterLessons = storageService.getLessons(chapter.id);
              const lessonCount = chapterLessons.length || chapter.lessonCount || 4;

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter)}
                  className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase">
                        Khối {chapter.grade} • {chapter.semester.includes('1') ? 'Học kỳ I' : 'Học kỳ II'}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Compass className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/70 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-blue-500" />
                      <span>{lessonCount} bài học SGK</span>
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Vào học</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CALL TO ACTION: ĐỀ KIỂM TRA CHO KHỐI LỚP */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-base flex items-center justify-center sm:justify-start gap-2">
                <FileQuestion className="w-5 h-5 text-amber-300" />
                <span>Đề kiểm tra định kỳ Toán {selectedGrade} chuẩn Công văn 7991</span>
              </h4>
              <p className="text-xs text-blue-100">
                Luyện tập trắc nghiệm khách quan, Đúng/Sai, Trả lời ngắn và Tự luận kèm barem chấm chi tiết.
              </p>
            </div>
            <button
              onClick={() => onOpenExamForGrade(selectedGrade)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-md whitespace-nowrap"
            >
              LÀM ĐỀ KIỂM TRA NGAY →
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: DANH SÁCH BÀI HỌC TRONG CHƯƠNG (Bấm vào bài học ra các mục) */}
      {/* ============================================================== */}
      {selectedChapter && !selectedLesson && (
        <div className="space-y-6 animate-fade-in">
          {/* CHAPTER HERO BANNER */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                  Toán {selectedChapter.grade} • {selectedChapter.semester.includes('1') ? 'Học kỳ I' : 'Học kỳ II'}
                </span>
                <span className="text-xs text-slate-300">
                  SGK Kết nối tri thức với cuộc sống
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {selectedChapter.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedChapter.description}
              </p>
              <div className="flex items-center gap-4 pt-2 text-xs text-blue-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Tổng số: {currentChapterLessons.length} bài học</span>
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Kèm phần tự luyện tương tác mỗi bài</span>
                </span>
              </div>
            </div>
          </div>

          {/* LESSONS LIST IN THIS CHAPTER */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-blue-600" />
                <span>Danh mục bài học trong chương:</span>
              </h3>
              <span className="text-xs text-slate-400">
                Chọn một bài để xem các mục SGK & làm bài tự luyện
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentChapterLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                      {lesson.order}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        <MathView text={lesson.title} />
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {lesson.objectives[0] || lesson.coreKnowledge}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 font-medium">
                        Đầy đủ 8 mục SGK
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-medium">
                        Có tự luyện
                      </span>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Mở bài học</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: CHI TIẾT BÀI HỌC NHƯ SÁCH GIÁO KHOA & PHẦN TỰ LUYỆN */}
      {/* ============================================================== */}
      {selectedLesson && (
        <div className="space-y-6 animate-fade-in">
          {/* LESSON TOP CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  <span>Toán {selectedLesson.grade}</span>
                  <span>•</span>
                  <span>{selectedChapter?.title || 'Chương trình THCS'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  <MathView text={selectedLesson.title} />
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Trình bày tiêu chuẩn theo bộ SGK Kết nối tri thức với cuộc sống (Chương trình GDPT 2018)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {selectedLesson && (
                  <button
                    onClick={() => {
                      const related =
                        MATH_GAMES_3D_LIST.find(
                          (g) =>
                            g.grade === selectedLesson.grade &&
                            (g.lessonId === selectedLesson.id || g.chapterId === selectedLesson.chapterId)
                        ) || MATH_GAMES_3D_LIST.find((g) => g.grade === selectedLesson.grade);
                      onOpenGame3D?.(related?.id, selectedLesson.grade);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4 text-amber-300" />
                    <span>🎮 GAME TOÁN 3D</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    const el = document.getElementById('lesson-self-practice-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition"
                >
                  <Award className="w-4 h-4" />
                  <span>XUỐNG PHẦN TỰ LUYỆN ↓</span>
                </button>
                <button
                  onClick={() => onStartPractice(selectedLesson)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>ĐẤU TRƯỜNG LUYỆN TẬP</span>
                </button>
              </div>
            </div>

            {/* QUICK SECTION JUMP TABS */}
            <div className="flex items-center gap-2 border-t border-slate-200 dark:border-slate-700 pt-3 overflow-x-auto text-xs font-bold">
              {[
                { id: 'all', label: '📖 Toàn bộ bài học' },
                { id: 'game3d', label: '🎮 Mô phỏng 3D' },
                { id: 'theory', label: '1–2. Lý thuyết & Khái niệm' },
                { id: 'formulas', label: '3. Công thức KaTeX' },
                { id: 'examples', label: '4. Ví dụ mẫu' },
                { id: 'methods', label: '5. Phương pháp giải' },
                { id: 'mistakes', label: '6. Lưu ý sai lầm' },
                { id: 'practice', label: '🎯 7. TỰ LUYỆN TƯƠNG TÁC' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSectionTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeSectionTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* TEXTBOOK SECTIONS CONTAINER */}
          {/* ============================================================== */}
          <div className="space-y-6">
            {/* 0. PHÒNG THÍ NGHIỆM & GAME TOÁN 3D BÀI HỌC */}
            {(activeSectionTab === 'all' || activeSectionTab === 'game3d') && (
              (() => {
                const related3DGame =
                  MATH_GAMES_3D_LIST.find(
                    (g) =>
                      g.grade === selectedLesson.grade &&
                      (g.lessonId === selectedLesson.id || g.chapterId === selectedLesson.chapterId)
                  ) || MATH_GAMES_3D_LIST.find((g) => g.grade === selectedLesson.grade);

                if (!related3DGame) return null;

                return (
                  <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 p-6 sm:p-7 border border-blue-500/40 shadow-xl text-white space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold">
                            MÔ PHỎNG HÌNH HỌC 3D
                          </span>
                          <span className="text-amber-400 text-xs font-semibold">
                            Bám sát SGK Kết nối tri thức
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                          <Gamepad2 className="w-5 h-5 text-amber-400 shrink-0" />
                          <span>{related3DGame.title}</span>
                        </h3>
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                          {related3DGame.description}
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenGame3D?.(related3DGame.id, selectedLesson.grade)}
                        className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl transition transform hover:scale-105 cursor-pointer"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>MỞ PHÒNG GAME 3D NGAY</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-indigo-900/60">
                      {related3DGame.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-slate-900/70 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()
            )}

            {/* 1. MỤC TIÊU & YÊU CẦU CẦN ĐẠT */}
            {(activeSectionTab === 'all' || activeSectionTab === 'theory') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>I. Mục tiêu bài học (Phẩm chất & Năng lực)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {selectedLesson.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>II. Yêu cầu cần đạt (Chuẩn GDPT 2018)</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {selectedLesson.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 2. KIẾN THỨC TRỌNG TÂM & KHÁI NIỆM TOÁN HỌC */}
            {(activeSectionTab === 'all' || activeSectionTab === 'theory') && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <span>III. Kiến thức trọng tâm & Khái niệm cốt lõi</span>
                </h4>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-amber-50/60 dark:bg-slate-900/60 p-5 rounded-2xl border border-amber-200/60 dark:border-slate-700">
                  <MathView text={selectedLesson.coreKnowledge} />
                </div>

                {/* Concepts list */}
                {selectedLesson.concepts && selectedLesson.concepts.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Định nghĩa thuật ngữ toán học:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedLesson.concepts.map((c, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700 space-y-1"
                        >
                          <div className="font-bold text-xs text-blue-700 dark:text-blue-300">
                            {c.term}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            <MathView text={c.definition} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. BẢNG CÔNG THỨC TOÁN HỌC (KaTeX) */}
            {(activeSectionTab === 'all' || activeSectionTab === 'formulas') && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-500" />
                  <span>IV. Hệ thống công thức Toán học (KaTeX)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedLesson.formulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gradient-to-b from-blue-50/60 to-indigo-50/40 dark:from-slate-900/80 dark:to-slate-800/80 border border-blue-200/70 dark:border-slate-700 text-center space-y-2"
                    >
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {f.name}
                      </div>
                      <div className="py-2 text-base text-slate-900 dark:text-white font-mono overflow-x-auto">
                        <MathView text={f.latex} block />
                      </div>
                      {f.note && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                          {f.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. VÍ DỤ MẪU MINH HỌA */}
            {(activeSectionTab === 'all' || activeSectionTab === 'examples') && (
              <div className="space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>V. Ví dụ mẫu minh họa & Hướng dẫn giải chi tiết</span>
                </h4>
                <div className="space-y-4">
                  {selectedLesson.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                    >
                      <div className="font-bold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {ex.title}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                        <MathView text={ex.question} />
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">
                          Lời giải chi tiết:
                        </div>
                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 whitespace-pre-line">
                          <MathView text={ex.solution} />
                        </div>
                      </div>
                      {ex.note && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 italic flex items-center gap-1.5 pt-1">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{ex.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PHƯƠNG PHÁP GIẢI CÁC DẠNG TOÁN */}
            {(activeSectionTab === 'all' || activeSectionTab === 'methods') && (
              <div className="space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-blue-600" />
                  <span>VI. Phương pháp giải các dạng toán điển hình</span>
                </h4>
                <div className="space-y-4">
                  {selectedLesson.solvingMethods.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                    >
                      <h5 className="font-bold text-sm text-blue-700 dark:text-blue-300">
                        Dạng {i + 1}: {m.name}
                      </h5>
                      <div className="space-y-2 pl-2">
                        {m.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">
                              <MathView text={step} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. LƯU Ý & SAI LẦM THƯỜNG GẶP */}
            {(activeSectionTab === 'all' || activeSectionTab === 'mistakes') && (
              <div className="space-y-4">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span>VII. Sai lầm thường gặp & Lời khuyên của Thầy</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLesson.commonMistakes.map((cm, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-red-100 dark:border-red-950/60 shadow-sm space-y-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✕
                        </span>
                        <div>
                          <span className="font-bold text-xs text-red-600 uppercase tracking-wider">
                            Sai lầm học sinh hay mắc:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                            <MathView text={cm.mistake} />
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <div>
                          <span className="font-bold text-xs text-emerald-600 uppercase tracking-wider">
                            Cách làm đúng:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                            <MathView text={cm.correction} />
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300 italic">
                        💡 <strong>Lời khuyên:</strong> {cm.advice}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 7. PHẦN TỰ LUYỆN SAU BÀI HỌC (Interactive Self-Practice Section) */}
            {/* ============================================================== */}
            {(activeSectionTab === 'all' || activeSectionTab === 'practice') && (
              <div
                id="lesson-self-practice-section"
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-xl space-y-6 scroll-mt-20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                        Tự luyện trực tiếp sau bài học (10 câu)
                      </span>
                      <button
                        onClick={handleShufflePractice}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
                        title="Đảo ngẫu nhiên thứ tự câu hỏi và vị trí các đáp án A, B, C, D"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>🔀 ĐẢO CÂU HỎI & ĐÁP ÁN</span>
                      </button>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-6 h-6 text-emerald-600" />
                      <span>VIII. Câu hỏi & Bài tập tự luyện kiến thức</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Hệ thống 10 bài tập bám sát SGK Kết nối tri thức (6 Trắc nghiệm, 2 Đúng/Sai, 2 Trả lời ngắn). Hỗ trợ đảo câu hỏi và đáp án ngẫu nhiên.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isPracticeSubmitted && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                        <span>
                          Kết quả: {correctAnswersCount}/{practiceQuestions.length} câu đúng ({Math.round((correctAnswersCount / (practiceQuestions.length || 1)) * 100)}%)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {shuffleNotice && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-bold">{shuffleNotice}</span>
                  </div>
                )}

                {/* QUESTIONS LIST */}
                <div className="space-y-6">
                  {practiceQuestions.map((q, qIdx) => {
                    const selected = userPracticeAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                          isPracticeSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                              : 'bg-red-50/50 dark:bg-red-950/20 border-red-300 dark:border-red-800'
                            : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase">
                              Câu {qIdx + 1} • {q.topic}
                            </span>
                            <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                              <MathView text={q.content} />
                            </div>
                          </div>
                          {isPracticeSubmitted && (
                            <div className="shrink-0 mt-1">
                              {isCorrect ? (
                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Đúng</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2.5 py-1 rounded-lg">
                                  <XCircle className="w-4 h-4" />
                                  <span>Sai</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* OPTIONS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(q.options || []).map((opt, oIdx) => {
                            const isChosen = selected === opt;
                            const isAnswerCorrectOpt = opt === q.correctAnswer;

                            let optStyle =
                              'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400';

                            if (isPracticeSubmitted) {
                              if (isAnswerCorrectOpt) {
                                optStyle =
                                  'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                              } else if (isChosen && !isAnswerCorrectOpt) {
                                optStyle =
                                  'bg-red-100 dark:bg-red-900/60 border-red-500 text-red-900 dark:text-red-100 font-bold';
                              } else {
                                optStyle =
                                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 opacity-60';
                              }
                            } else if (isChosen) {
                              optStyle =
                                'bg-blue-50 dark:bg-blue-950 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-sm';
                            }

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={isPracticeSubmitted}
                                onClick={() => handleSelectOption(q.id, opt)}
                                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                              >
                                <span className="leading-relaxed">
                                  <MathView text={opt} />
                                </span>
                                {isPracticeSubmitted && isAnswerCorrectOpt && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* DETAILED EXPLANATION UPON SUBMISSION */}
                        {isPracticeSubmitted && (
                          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span>Lời giải & Phân tích chi tiết:</span>
                            </div>
                            <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              <MathView text={q.explanation || ''} />
                            </div>
                            {q.breakdown && (
                              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1">
                                <span className="font-bold text-[11px] text-slate-400 uppercase">
                                  Các bước thực hiện:
                                </span>
                                <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 pl-1">
                                  {q.breakdown.steps.map((st, sI) => (
                                    <li key={sI}>
                                      <MathView text={st} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* SUBMIT OR RESET BUTTONS */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {!isPracticeSubmitted
                      ? `Đã chọn: ${Object.keys(userPracticeAnswers).length}/${practiceQuestions.length} câu hỏi`
                      : `Hoàn thành bài tự luyện. Điểm số: ${(correctAnswersCount * (10 / (practiceQuestions.length || 1))).toFixed(1)}/10.0`}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {!isPracticeSubmitted ? (
                      <button
                        onClick={handleSubmitPractice}
                        disabled={Object.keys(userPracticeAnswers).length === 0}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>KIỂM TRA ĐÁP ÁN & NỘP BÀI TỰ LUYỆN</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleResetPractice}
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>LÀM LẠI BÀI NÀY</span>
                        </button>
                        <button
                          onClick={() => onStartPractice(selectedLesson)}
                          className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>LUYỆN TẬP NÂNG CAO →</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
