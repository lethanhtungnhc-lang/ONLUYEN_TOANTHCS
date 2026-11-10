import React, { useState } from 'react';
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
} from 'lucide-react';
import { Question, Lesson } from '../types';
import { storageService } from '../services/storageService';
import { playCorrectSound, playIncorrectSound, playFanfareSound } from '../utils/soundEffects';
import MathView from '../utils/mathRender';

interface PracticeSystemProps {
  lesson?: Lesson;
  onBack: () => void;
}

export const PracticeSystem: React.FC<PracticeSystemProps> = ({ lesson, onBack }) => {
  const allQuestions = storageService.getQuestions({ grade: lesson?.grade || 9 });
  const questions = allQuestions.length > 0 ? allQuestions : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [shortAnswerInput, setShortAnswerInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);

  const currentQ: Question | undefined = questions[currentIndex];

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;

    let correct = false;
    if (currentQ.type === 'multiple_choice') {
      correct = selectedOption.trim() === (currentQ.correctAnswer as string).trim();
    } else if (currentQ.type === 'short_answer') {
      correct = shortAnswerInput.trim().toLowerCase() === (currentQ.correctAnswer as string).trim().toLowerCase();
    } else {
      correct = true;
    }

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setScore((prev) => prev + currentQ.points);
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
      <div className="max-w-4xl mx-auto p-6 text-center space-y-4">
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
            Giáo viên hoặc Admin có thể thêm câu hỏi mới qua Ngân hàng câu hỏi hoặc tính năng AI Tạo đề nhanh.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* TOP BAR WITH TRỞ VỀ & PROGRESS */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← TRỞ VỀ</span>
        </button>

        <div className="flex items-center gap-3">
          {correctStreak > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse border border-amber-300 dark:border-amber-700">
              <span>🔥 Chuỗi đúng {correctStreak} câu!</span>
            </div>
          )}
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Điểm: <span className="text-blue-600 dark:text-blue-400 text-sm">{score.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5">
        {/* QUESTION META */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Câu {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">{currentQ.topic}</span>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {currentQ.level === 'recognition' && 'Mức 1: Nhận biết'}
            {currentQ.level === 'understanding' && 'Mức 2: Thông hiểu'}
            {currentQ.level === 'application' && 'Mức 3: Vận dụng'}
            {currentQ.level === 'high_application' && 'Mức 4: Vận dụng cao'}
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
              const optLabel = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedOption === opt;
              let btnClass = 'border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200';

              if (isSelected) {
                btnClass = 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 shadow-sm';
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
                  className={`p-4 rounded-xl border text-left transition flex items-center gap-3 text-sm font-medium ${btnClass}`}
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
            <label className="block text-xs font-semibold text-slate-500">
              Nhập câu trả lời ngắn của em (số hoặc biểu thức):
            </label>
            <input
              type="text"
              disabled={isAnswered}
              value={shortAnswerInput}
              onChange={(e) => setShortAnswerInput(e.target.value)}
              placeholder="Ví dụ: 2 hoặc x = 2"
              className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md disabled:opacity-40 text-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>KIỂM TRA ĐÁP ÁN</span>
            </button>
          </div>
        ) : (
          /* SECTION 11 MANDATORY FEEDBACK CARD */
          <div className="pt-4 space-y-5">
            {/* POSITIVE / NEGATIVE BANNER */}
            {isCorrect ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center gap-3 animate-fade-in shadow-sm">
                <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Chính xác! Em đã làm đúng.</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                    Được cộng +{currentQ.points} điểm vào thành tích học tập.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 flex items-center gap-3 animate-fade-in shadow-sm">
                <XCircle className="w-7 h-7 text-red-600 dark:text-red-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Chưa chính xác. Em hãy xem lại hướng dẫn.</h4>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                    Dưới đây là phân tích chi tiết từng bước giúp em khắc phục lỗi sai.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 11 FULL EXPLANATION BREAKDOWN (KHÔNG CHỈ HIỂN THỊ ĐÁP ÁN CUỐI CÙNG) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Hướng dẫn giải chi tiết chuẩn phương pháp</span>
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  Đáp án chuẩn: <MathView text={String(currentQ.correctAnswer)} />
                </span>
              </div>

              {currentQ.breakdown && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phân tích đề bài, dữ kiện & yêu cầu */}
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <span>• Phân tích đề bài & Dữ kiện</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentQ.breakdown.analysis}
                    </p>
                    <div className="text-slate-500 pt-1">
                      <strong>Dữ kiện đã cho:</strong> {currentQ.breakdown.givens}<br />
                      <strong>Yêu cầu cần tìm:</strong> {currentQ.breakdown.requirements}
                    </div>
                  </div>

                  {/* Công thức & Phương pháp */}
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1.5">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <span>• Công thức & Phương pháp</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded font-mono text-center text-xs text-slate-800 dark:text-slate-200">
                      <MathView text={currentQ.breakdown.formula} />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {currentQ.breakdown.method}
                    </p>
                  </div>

                  {/* Từng bước giải */}
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/70 dark:border-slate-700 md:col-span-2 space-y-2">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      • Từng bước giải chi tiết:
                    </div>
                    <div className="space-y-1.5 pl-2">
                      {currentQ.breakdown.steps.map((st, i) => (
                        <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-blue-600">Bước {i + 1}:</span>
                          <span className="leading-relaxed"><MathView text={st} /></span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 text-emerald-700 dark:text-emerald-300 font-bold border-t border-slate-100 dark:border-slate-700">
                      ✓ Kết luận: {currentQ.breakdown.conclusion}
                    </div>
                  </div>

                  {/* Lỗi sai thường gặp */}
                  {currentQ.breakdown.commonMistakes && (
                    <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 md:col-span-2 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-800 dark:text-amber-300">
                          Lỗi sai thường gặp cần tránh:
                        </span>
                        <p className="text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                          {currentQ.breakdown.commonMistakes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ACTION: NEXT QUESTION OR RESTART */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleRestart}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại từ đầu</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow flex items-center gap-1.5 text-xs"
                  >
                    <span>CÂU TIẾP THEO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onBack}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow text-xs"
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
