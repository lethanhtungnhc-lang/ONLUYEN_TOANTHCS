import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Check,
  ChevronRight,
  RotateCcw,
  Shuffle,
  FileText,
  Target,
  Zap,
} from 'lucide-react';
import { Question, Lesson } from '../types';
import { storageService } from '../services/storageService';
import { playCorrectSound, playIncorrectSound, playFanfareSound } from '../utils/soundEffects';
import MathView from '../utils/mathRender';
import { shuffleQuestionsAndOptions } from '../utils/shuffleUtils';
import { STANDARD_10_EXAMS } from '../data/standard10ExamsBank';

interface PracticeSystemProps {
  lesson?: Lesson;
  onBack: () => void;
}

export const PracticeSystem: React.FC<PracticeSystemProps> = ({ lesson, onBack }) => {
  // Practice set selection: either lesson practice or one of the 10 self-practice exams
  const [selectedSetIndex, setSelectedSetIndex] = useState<number>(0);
  const [practiceSource, setPracticeSource] = useState<'lesson' | '10_exams'>(lesson ? 'lesson' : '10_exams');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [shortAnswerInput, setShortAnswerInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [shuffleNotice, setShuffleNotice] = useState<string>('');

  // Load questions based on mode
  useEffect(() => {
    if (practiceSource === 'lesson' && lesson) {
      const qs = storageService.getLessonPracticeQuestions(lesson.id, lesson.grade, lesson.title);
      setQuestions(qs);
    } else {
      // Load from the 10 standard exams bank
      const targetExam = STANDARD_10_EXAMS[selectedSetIndex] || STANDARD_10_EXAMS[0];
      // Flatten all questions from the 4 parts
      const examQuestions: Question[] = [];
      targetExam.parts.forEach((p) => {
        p.questions.forEach((q) => {
          examQuestions.push(q);
        });
      });
      setQuestions(examQuestions);
    }
    handleRestart();
  }, [practiceSource, selectedSetIndex, lesson?.id]);

  const currentQ: Question | undefined = questions[currentIndex];

  const handleShuffle = () => {
    if (questions.length === 0) return;
    const shuffled = shuffleQuestionsAndOptions(questions);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption('');
    setShortAnswerInput('');
    setIsAnswered(false);
    setIsCorrect(null);
    setShuffleNotice('Đã đảo ngẫu nhiên 10 câu hỏi & toàn bộ các đáp án A, B, C, D!');
    setTimeout(() => setShuffleNotice(''), 3500);
  };

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;

    let correct = false;
    if (currentQ.type === 'multiple_choice') {
      correct = selectedOption.trim() === (currentQ.correctAnswer as string).trim();
    } else if (currentQ.type === 'short_answer') {
      const userVal = shortAnswerInput.trim().toLowerCase();
      const actualVal = String(currentQ.correctAnswer).trim().toLowerCase();
      correct = userVal === actualVal || userVal.replace(/\s+/g, '') === actualVal.replace(/\s+/g, '');
    } else {
      correct = true;
    }

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setScore((prev) => prev + (currentQ.points || 1.0));
      setCorrectStreak((prev) => {
        const next = prev + 1;
        if (next % 3 === 0) {
          playFanfareSound();
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
        return next;
      });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } else {
      playIncorrectSound();
      setCorrectStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption('');
      setShortAnswerInput('');
      setIsAnswered(false);
      setIsCorrect(null);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
      setSelectedOption('');
      setShortAnswerInput('');
      setIsAnswered(false);
      setIsCorrect(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption('');
    setShortAnswerInput('');
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setCorrectStreak(0);
  };

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center space-y-4 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← TRỞ VỀ</span>
        </button>
        <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
            Chưa có câu hỏi luyện tập cho chuyên mục này
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Vui lòng chọn một trong 10 bộ đề tự luyện ở thanh điều hướng bên trên.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* TOP NAVIGATION & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← TRỞ VỀ</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              <span>Hệ Thống Ôn Luyện Tự Động</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              10 bài tập chuẩn hóa bám sát GDPT 2018 • Có hỗ trợ xáo trộn ngẫu nhiên câu hỏi & đáp án
            </p>
          </div>
        </div>

        {/* SHUFFLE BUTTON & STREAK */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
            title="Đảo ngẫu nhiên thứ tự câu hỏi và vị trí các đáp án A, B, C, D"
          >
            <Shuffle className="w-4 h-4" />
            <span>🔀 ĐẢO CÂU HỎI & ĐÁP ÁN</span>
          </button>

          {correctStreak > 1 && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse border border-amber-300 dark:border-amber-700">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>🔥 Chuỗi {correctStreak}!</span>
            </div>
          )}

          <div className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300">
            Điểm: <span className="text-sm font-black text-blue-600 dark:text-blue-400">{score.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* SHUFFLE NOTICE TOAST */}
      {shuffleNotice && (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-700 rounded-2xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold">{shuffleNotice}</span>
        </div>
      )}

      {/* SELECTOR FOR 10 COMPREHENSIVE PRACTICE SETS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider">Chế độ luyện:</span>
            {lesson && (
              <button
                onClick={() => setPracticeSource('lesson')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  practiceSource === 'lesson'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                Bài học: {lesson.title}
              </button>
            )}
            <button
              onClick={() => setPracticeSource('10_exams')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                practiceSource === '10_exams'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              10 Bộ Đề Tự Luyện Chuẩn Hóa
            </button>
          </div>

          <span className="text-slate-400 font-semibold">
            Tổng cộng: {questions.length} câu hỏi tự luyện
          </span>
        </div>

        {practiceSource === '10_exams' && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
              Chọn bộ đề tự luyện:
            </span>
            <select
              value={selectedSetIndex}
              onChange={(e) => setSelectedSetIndex(Number(e.target.value))}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold outline-none"
            >
              {STANDARD_10_EXAMS.map((ex, idx) => (
                <option key={ex.id} value={idx}>
                  Bộ đề {idx + 1}: Toán {ex.grade} - {ex.title} (Mã {ex.code})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* QUESTION JUMP BUTTONS (1 - 10) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">Câu:</span>
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToQuestion(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-black transition shrink-0 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300 dark:ring-blue-800'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6">
        {/* QUESTION META */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-300 font-bold">{currentQ.topic}</span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {currentQ.level === 'recognition' && 'Mức 1: Nhận biết'}
            {currentQ.level === 'understanding' && 'Mức 2: Thông hiểu'}
            {currentQ.level === 'application' && 'Mức 3: Vận dụng'}
            {currentQ.level === 'high_application' && 'Mức 4: Vận dụng cao'}
            {(!currentQ.level || currentQ.level === ('recognition' as any)) && `Điểm: ${currentQ.points || 1.0}đ`}
          </span>
        </div>

        {/* QUESTION CONTENT */}
        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          <MathView text={currentQ.content} />
        </div>

        {/* OPTIONS FOR MULTIPLE CHOICE */}
        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const optLabel = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === opt;
              let btnClass = 'border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

              if (isSelected) {
                btnClass = 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 shadow-sm font-bold';
              }

              if (isAnswered) {
                const isThisCorrect = opt.trim() === (currentQ.correctAnswer as string).trim();
                if (isThisCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isThisCorrect) {
                  btnClass = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 text-sm font-medium cursor-pointer ${btnClass}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {optLabel}
                  </span>
                  <span className="leading-snug"><MathView text={opt} /></span>
                </button>
              );
            })}
          </div>
        )}

        {/* SHORT ANSWER INPUT */}
        {currentQ.type === 'short_answer' && (
          <div className="pt-2 space-y-2">
            <label className="block text-xs font-bold text-slate-500">
              Nhập đáp án ngắn (số, giá trị hoặc kết quả tính toán):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                disabled={isAnswered}
                value={shortAnswerInput}
                onChange={(e) => setShortAnswerInput(e.target.value)}
                placeholder="Ví dụ: 12 hoặc x = 3"
                className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {isAnswered && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  Đáp án chuẩn: <MathView text={String(currentQ.correctAnswer)} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        {!isAnswered ? (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleCheckAnswer}
              disabled={
                currentQ.type === 'multiple_choice'
                  ? !selectedOption
                  : currentQ.type === 'short_answer'
                  ? !shortAnswerInput.trim()
                  : false
              }
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md disabled:opacity-40 text-sm flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>KIỂM TRA ĐÁP ÁN</span>
            </button>
          </div>
        ) : (
          /* DETAILED FEEDBACK & STEP-BY-STEP SOLUTION BREAKDOWN */
          <div className="pt-4 space-y-5 animate-fade-in">
            {isCorrect ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 shadow-sm">
                <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Chính xác! Em đã làm đúng hoàn toàn.</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                    Được cộng +{currentQ.points || 1.0} điểm vào thành tích ôn luyện.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 flex items-center gap-3 shadow-sm">
                <XCircle className="w-7 h-7 text-red-600 dark:text-red-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Chưa chính xác. Em xem lại hướng dẫn bên dưới nhé.</h4>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                    Phân tích chi tiết từng bước sẽ giúp em khắc phục lỗi sai nhanh chóng.
                  </p>
                </div>
              </div>
            )}

            {/* FULL PEDAGOGICAL BREAKDOWN */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Hướng dẫn giải chi tiết chuẩn phương pháp SGK</span>
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Đáp án chuẩn: <MathView text={String(currentQ.correctAnswer)} />
                </span>
              </div>

              {/* Step-by-step or Breakdown */}
              <div className="space-y-3">
                {currentQ.explanation && (
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-blue-600 mr-1.5">• Giải thích lý thuyết:</span>
                    <MathView text={currentQ.explanation} />
                  </div>
                )}

                {currentQ.stepByStepSolution && (
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                      • Các bước giải toán chi tiết:
                    </div>
                    <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      <MathView text={currentQ.stepByStepSolution} />
                    </div>
                  </div>
                )}

                {currentQ.breakdown && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-blue-600">• Phân tích đề:</span>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">{currentQ.breakdown.analysis}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-purple-600">• Phương pháp & Công thức:</span>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">{currentQ.breakdown.method}</p>
                    </div>
                  </div>
                )}

                {/* Common misconception */}
                {(currentQ.misconception || currentQ.breakdown?.commonMistakes) && (
                  <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-800 dark:text-amber-300">
                        Lưu ý bẫy sai lầm phổ biến cần tránh:
                      </span>
                      <p className="text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                        {currentQ.misconception || currentQ.breakdown?.commonMistakes}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION: NEXT QUESTION OR RESTART */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleRestart}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại từ đầu</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow flex items-center gap-1.5 text-xs cursor-pointer"
                  >
                    <span>CÂU TIẾP THEO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onBack}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow text-xs cursor-pointer"
                  >
                    HOÀN THÀNH BÀI LUYỆN TẬP
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
