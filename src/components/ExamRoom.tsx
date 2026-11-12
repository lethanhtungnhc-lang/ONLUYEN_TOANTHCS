import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  Send,
  HelpCircle,
  FileText,
  RotateCcw,
  Sparkles,
  BarChart,
  BookOpen,
  Shuffle,
} from 'lucide-react';
import { Exam, ExamResult, Question } from '../types';
import { storageService } from '../services/storageService';
import { playCorrectSound, playFanfareSound } from '../utils/soundEffects';
import MathView from '../utils/mathRender';
import { shuffleExamPaper } from '../utils/shuffleUtils';

interface ExamRoomProps {
  exam: Exam;
  onBack: () => void;
  onFinishExam?: (result: ExamResult) => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({ exam, onBack, onFinishExam }) => {
  const [currentExam, setCurrentExam] = useState<Exam>(exam);
  const [secondsRemaining, setSecondsRemaining] = useState(exam.durationMinutes * 60);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [essayNotes, setEssayNotes] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<ExamResult | null>(null);
  const [shuffleNotice, setShuffleNotice] = useState<string>('');

  const handleShuffleExam = () => {
    if (isSubmitted) return;
    const shuffled = shuffleExamPaper(currentExam);
    setCurrentExam(shuffled);
    setAnswers({});
    setEssayNotes({});
    setShuffleNotice(`Đã hoán vị ngẫu nhiên câu hỏi & đáp án! Mã đề hiện tại: ${shuffled.code}`);
    setTimeout(() => setShuffleNotice(''), 3500);
  };

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qId: string, value: any) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let earnedPoints = 0;
    let correctCount = 0;
    let wrongCount = 0;
    const topicBreakdownMap: Record<string, { earned: number; total: number }> = {};

    currentExam.parts.forEach((part) => {
      part.questions.forEach((q) => {
        const topic = q.topic || 'Toán học';
        const qPoints = q.points ?? 0.25;
        if (!topicBreakdownMap[topic]) {
          topicBreakdownMap[topic] = { earned: 0, total: 0 };
        }
        topicBreakdownMap[topic].total += qPoints;

        const userAns = answers[q.id];
        let isCorrect = false;

        if (q.type === 'multiple_choice') {
          isCorrect = userAns && userAns.trim() === (q.correctAnswer as string).trim();
        } else if (q.type === 'short_answer') {
          isCorrect = userAns && userAns.trim().toLowerCase() === (q.correctAnswer as string).trim().toLowerCase();
        } else if (q.type === 'essay') {
          // For automated preview of essay, grant default 70% or user self-check
          isCorrect = !!essayNotes[q.id];
          if (isCorrect) earnedPoints += qPoints * 0.8;
          return;
        }

        if (isCorrect) {
          earnedPoints += qPoints;
          correctCount++;
          topicBreakdownMap[topic].earned += qPoints;
        } else {
          wrongCount++;
        }
      });
    });

    const score = Math.min(10, Number(earnedPoints.toFixed(2)));
    const percentage = Math.round((score / currentExam.totalPoints) * 100);

    const breakdownList = Object.entries(topicBreakdownMap).map(([topic, val]) => ({
      topic,
      score: Number(val.earned.toFixed(1)),
      maxScore: Number(val.total.toFixed(1)),
    }));

    const weakTopics = breakdownList
      .filter((b) => b.score / b.maxScore < 0.6)
      .map((b) => b.topic);

    const currentUser = storageService.getCurrentSession();
    const result: ExamResult = {
      id: `res-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.fullName || 'Học sinh dự thi',
      className: currentUser?.className || '9A1',
      examId: currentExam.id,
      examTitle: currentExam.title,
      examType: currentExam.examType || 'regular',
      score,
      maxScore: currentExam.totalPoints,
      percentage,
      timeSpentSeconds: currentExam.durationMinutes * 60 - secondsRemaining,
      submittedAt: new Date().toISOString(),
      userAnswers: answers,
      correctCount,
      wrongCount,
      topicBreakdown: breakdownList,
      weakTopics,
      suggestions: weakTopics.length > 0
        ? weakTopics.map((w) => `Cần ôn tập bổ sung kỹ năng giải dạng toán: ${w}`)
        : ['Kiến thức rất tốt! Em hãy duy trì phong độ và rèn luyện các bài toán điểm 10.'],
    };

    storageService.saveExamResult(result);
    setSubmittedResult(result);

    playFanfareSound();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    if (onFinishExam) onFinishExam(result);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* HEADER WITH TRỞ VỀ, TIMER & SHUFFLE BUTTON */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← TRỞ VỀ</span>
        </button>

        <div className="flex items-center gap-2">
          {!isSubmitted && (
            <button
              onClick={handleShuffleExam}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-sm transition active:scale-95 cursor-pointer"
              title="Đảo ngẫu nhiên câu hỏi trong từng phần và hoán vị đáp án A, B, C, D"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🔀 ĐẢO CÂU HỎI & ĐÁP ÁN</span>
            </button>
          )}

          {!isSubmitted && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 font-mono text-base font-black shadow-md border border-slate-700">
              <Clock className="w-4 h-4 animate-spin text-amber-400" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
          )}
        </div>
      </div>

      {/* SHUFFLE NOTICE TOAST */}
      {shuffleNotice && (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-700 rounded-2xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold">{shuffleNotice}</span>
        </div>
      )}

      {/* EXAM PAPER TITLE HEADER (CHUẨN CÔNG VĂN 7991) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm text-center space-y-2">
        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          {currentExam.schoolName}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          {currentExam.title}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 pt-1">
          <span>Thời gian: <strong>{currentExam.durationMinutes} phút</strong></span>
          <span>•</span>
          <span>Thang điểm: <strong>10.0 điểm</strong></span>
          <span>Mã đề: <strong className="text-blue-600">{currentExam.code}</strong></span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 font-extrabold text-[11px] border border-blue-200 dark:border-blue-800">
            Đề kiểm tra chuẩn Công văn 7991
          </span>
        </div>
      </div>

      {/* RESULT CARD IF SUBMITTED */}
      {isSubmitted && submittedResult && (
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">
                KẾT QUẢ KIỂM TRA ĐỊNH KỲ
              </span>
              <h3 className="text-2xl font-black">{submittedResult.userName}</h3>
              <p className="text-xs text-blue-100">
                Lớp: {submittedResult.className} • Thời gian làm bài:{' '}
                {Math.round(submittedResult.timeSpentSeconds / 60)} phút
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[130px]">
              <div className="text-xs font-bold text-amber-300 uppercase">Điểm số</div>
              <div className="text-4xl font-black text-amber-300 font-mono">
                {submittedResult.score.toFixed(1)}
              </div>
              <div className="text-[11px] text-blue-100 mt-0.5">/ 10.0 Điểm</div>
            </div>
          </div>

          {/* TOPIC BREAKDOWN & RADAR WEAK POINTS (SECTION 16) */}
          <div className="p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 text-xs space-y-3">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart className="w-4 h-4" />
              <span>Phân tích năng lực theo từng chuyên đề:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {submittedResult.topicBreakdown.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="truncate pr-2">{t.topic}</span>
                  <span className="font-bold text-amber-300 shrink-0 font-mono">
                    {t.score}/{t.maxScore}đ
                  </span>
                </div>
              ))}
            </div>

            {submittedResult.weakTopics.length > 0 && (
              <div className="pt-2 text-amber-200 border-t border-white/10 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  <strong>Đề xuất cải thiện:</strong> Em hãy tập trung ôn lại các chuyên đề:{' '}
                  {submittedResult.weakTopics.join(', ')}.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXAM PARTS 1, 2, 3, 4 */}
      <div className="space-y-6">
        {currentExam.parts.map((part) => (
          <div
            key={part.partNumber}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5"
          >
            {/* PART HEADER */}
            <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                PHẦN {part.partNumber === 1 ? 'I' : part.partNumber === 2 ? 'II' : part.partNumber === 3 ? 'III' : 'IV'}: {part.title}
              </h3>
              <p className="text-xs text-slate-500 italic mt-0.5">{part.instruction}</p>
            </div>

            {/* QUESTIONS IN PART */}
            <div className="space-y-6">
              {part.questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns && userAns.trim() === (q.correctAnswer as string).trim();

                return (
                  <div key={q.id} className="space-y-3 pt-2">
                    <div className="flex items-start justify-between gap-3 text-sm font-bold text-slate-900 dark:text-white">
                      <div>
                        <span className="text-blue-600 dark:text-blue-400 mr-2">Câu {idx + 1} ({q.points}đ):</span>
                        <MathView text={q.content} />
                      </div>
                      {isSubmitted && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {isCorrect ? `+${q.points}đ` : '0đ'}
                        </span>
                      )}
                    </div>

                    {/* MULTIPLE CHOICE OPTIONS */}
                    {q.type === 'multiple_choice' && q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = userAns === opt;
                          let btnStyle = 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                          if (isSelected) {
                            btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-800 font-bold';
                          }

                          if (isSubmitted) {
                            const isAnswerCorrect = opt.trim() === (q.correctAnswer as string).trim();
                            if (isAnswerCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 font-bold';
                            } else if (isSelected && !isAnswerCorrect) {
                              btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-800 line-through';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-center gap-2.5 ${btnStyle}`}
                            >
                              <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span><MathView text={opt} /></span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* SHORT ANSWER */}
                    {q.type === 'short_answer' && (
                      <div className="pt-1">
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={userAns || ''}
                          onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                          placeholder="Nhập kết quả..."
                          className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold w-48"
                        />
                        {isSubmitted && (
                          <div className="text-xs text-emerald-600 font-bold mt-1.5">
                            Đáp án chuẩn: <MathView text={String(q.correctAnswer)} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* ESSAY WRITING / STEP-BY-STEP CHECK */}
                    {q.type === 'essay' && (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={4}
                          disabled={isSubmitted}
                          value={essayNotes[q.id] || ''}
                          onChange={(e) =>
                            setEssayNotes((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Thí sinh nhập tóm tắt các bước giải tự luận..."
                          className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />

                        {/* SECTION 29: HƯỚNG DẪN CHẤM BẢNG THEO CÔNG VĂN 7991 */}
                        {isSubmitted && (
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                            <div className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase flex items-center gap-1.5">
                              <span>Barem hướng dẫn chấm chi tiết (theo Công văn 7991):</span>
                            </div>
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-slate-300 dark:border-slate-700">
                                  <th className="py-1 text-slate-500">Các bước giải chi tiết</th>
                                  <th className="py-1 text-right text-slate-500 w-24">Biểu điểm</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                <tr>
                                  <td className="py-1.5 text-slate-700 dark:text-slate-300">
                                    • {q.breakdown?.method || 'Nêu điều kiện xác định và phương pháp giải'}
                                  </td>
                                  <td className="py-1.5 text-right font-bold text-slate-700 dark:text-slate-300">
                                    {((q.points ?? 0.25) * 0.4).toFixed(2)}đ
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1.5 text-slate-700 dark:text-slate-300">
                                    • {q.breakdown?.conclusion || 'Biến đổi tương đương, đối chiếu điều kiện và kết luận'}
                                  </td>
                                  <td className="py-1.5 text-right font-bold text-slate-700 dark:text-slate-300">
                                    {((q.points ?? 0.25) * 0.6).toFixed(2)}đ
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT ACTION BUTTON */}
      {!isSubmitted ? (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
          <div className="text-xs text-slate-500">
            Số câu đã trả lời: <strong>{Object.keys(answers).length}</strong> câu
          </div>
          <button
            onClick={handleSubmitExam}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>NỘP BÀI THI & CHẤM ĐIỂM</span>
          </button>
        </div>
      ) : (
        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition"
          >
            ← TRỞ VỀ DANH SÁCH ĐỀ THI
          </button>
        </div>
      )}
    </div>
  );
};
