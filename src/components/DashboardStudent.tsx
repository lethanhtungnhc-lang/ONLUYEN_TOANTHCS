import React from 'react';
import {
  GraduationCap,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Trophy,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  PlayCircle,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { User, ExamResult, Achievement } from '../types';

interface DashboardStudentProps {
  onBack: () => void;
  onOpenExam: (examId?: string) => void;
}

export const DashboardStudent: React.FC<DashboardStudentProps> = ({ onBack, onOpenExam }) => {
  const currentUser = storageService.getCurrentSession();
  const results = storageService.getResults(currentUser?.id);
  const achievements = storageService.getAchievements();

  // Aggregate student analytics
  const totalExams = results.length;
  const avgScore = totalExams > 0
    ? (results.reduce((acc, r) => acc + r.score, 0) / totalExams).toFixed(1)
    : '0.0';
  const avgAccuracy = totalExams > 0
    ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalExams)
    : 0;

  // Weak topics across all exams
  const weakTopicsSet = new Set<string>();
  results.forEach((r) => r.weakTopics?.forEach((w) => weakTopicsSet.add(w)));
  const weakTopics = Array.from(weakTopicsSet);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* HEADER WITH TRỞ VỀ */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← TRỞ VỀ</span>
            </button>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              <span>Hồ sơ Học tập & Thành tích Cá nhân</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Học sinh: <strong>{currentUser?.fullName || 'Học sinh'}</strong> • Lớp:{' '}
            <strong>{currentUser?.className || '9A1'}</strong> • Trường TH, THCS Nguyễn Hữu Cảnh
          </p>
        </div>

        <button
          onClick={() => onOpenExam()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
        >
          <PlayCircle className="w-4 h-4" />
          <span>LÀM ĐỀ KIỂM TRA MỚI</span>
        </button>
      </div>

      {/* SECTION 33: 4 KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Điểm trung bình</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {avgScore} <span className="text-xs font-normal text-slate-400">/ 10.0</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Tỷ lệ chính xác {avgAccuracy}%</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Bài đã hoàn thành</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {totalExams} <span className="text-xs font-normal text-slate-400">bài thi</span>
          </div>
          <div className="text-[11px] text-blue-600 font-medium">Định kỳ & Thi thử</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Chuỗi ngày học</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-amber-500 font-mono">
            7 <span className="text-xs font-normal text-slate-400">ngày</span>
          </div>
          <div className="text-[11px] text-amber-600 font-medium">Duy trì liên tục 🔥</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Huy chương đạt được</span>
            <Trophy className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-600 font-mono">
            {achievements.filter((a) => a.isUnlocked).length} <span className="text-xs font-normal text-slate-400">/ {achievements.length}</span>
          </div>
          <div className="text-[11px] text-purple-600 font-medium">Huy hiệu danh giá</div>
        </div>
      </div>

      {/* ACHIEVEMENTS TROPHY ROOM (SECTION 13 & 33) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Phòng Thành tích & Bảng Huy hiệu (Mục 13)</span>
          </h3>
          <span className="text-xs text-slate-500">
            Khuyến khích sự tiến bộ cá nhân, giảm áp lực thành tích
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border text-center space-y-1.5 transition ${
                ach.isUnlocked
                  ? 'border-amber-300 bg-amber-50/50 dark:bg-amber-950/20 text-slate-900 dark:text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-400 opacity-60'
              }`}
            >
              <div className="text-3xl">{ach.icon}</div>
              <div className="font-bold text-xs truncate">{ach.name}</div>
              <div className="text-[10px] text-slate-500 line-clamp-2">{ach.description}</div>
              {ach.isUnlocked && (
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                  Đã đạt
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WEAK TOPICS & SUGGESTED IMPROVEMENTS */}
      {weakTopics.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-3 text-xs">
          <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Kiến thức yếu cần ôn tập bổ sung (Mục 12 & 33):</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {weakTopics.map((topic, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <span className="font-medium text-slate-800 dark:text-slate-200">{topic}</span>
                <span className="text-[10px] text-amber-600 font-bold">Ôn lại ngay →</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECENT EXAM HISTORY */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Lịch sử các lần làm bài kiểm tra:</span>
        </h3>

        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-600 dark:text-slate-300">
                  <th className="p-3">Bài kiểm tra</th>
                  <th className="p-3 text-center">Điểm số</th>
                  <th className="p-3 text-center">Tỷ lệ đúng</th>
                  <th className="p-3 text-center">Thời gian làm</th>
                  <th className="p-3 text-right">Ngày nộp bài</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {r.examTitle}
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-blue-600 text-sm">
                      {r.score.toFixed(1)} / {r.maxScore}đ
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                        {r.percentage}%
                      </span>
                    </td>
                    <td className="p-3 text-center text-slate-500">
                      {Math.round(r.timeSpentSeconds / 60)} phút
                    </td>
                    <td className="p-3 text-right text-slate-400">
                      {new Date(r.submittedAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            Em chưa làm bài kiểm tra nào. Hãy chọn một đề thi để thử sức nhé!
          </div>
        )}
      </div>
    </div>
  );
};
