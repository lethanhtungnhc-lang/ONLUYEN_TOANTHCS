import React, { useState } from 'react';
import {
  Target,
  ArrowLeft,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  PlayCircle,
  FileText,
  AlertCircle,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { ADMISSION_10_TOPICS } from '../data/mockDatabase';
import { Admission10Topic } from '../types';
import MathView from '../utils/mathRender';

interface Admission10HubProps {
  onStartExam: (examId?: string) => void;
}

export const Admission10Hub: React.FC<Admission10HubProps> = ({ onStartExam }) => {
  const [selectedTopic, setSelectedTopic] = useState<Admission10Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'subtopics' | 'formulas' | 'practice'>('theory');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* HUB HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            {selectedTopic && (
              <button
                onClick={() => setSelectedTopic(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← TRỞ VỀ 10 CHUYÊN ĐỀ</span>
              </button>
            )}
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Target className="w-7 h-7 text-red-500" />
              <span>🎯 Ôn luyện Tuyển sinh Lớp 10</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hệ thống 10 Chuyên đề trọng điểm & Phòng Thi thử trực tuyến 120 phút dành riêng cho học sinh Khối 9
          </p>
        </div>

        {/* MOCK EXAM BANNER BUTTON */}
        <button
          onClick={() => onStartExam()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs shadow-lg hover:shadow-xl transition self-stretch sm:self-auto justify-center"
        >
          <Clock className="w-4 h-4" />
          <span>VÀO THI THỬ TUYỂN SINH 10 (120 PHÚT)</span>
        </button>
      </div>

      {!selectedTopic ? (
        /* 10 CHUYÊN ĐỀ GRID */
        <div className="space-y-6">
          {/* QUICK INTRO STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                10
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">10 Chuyên đề Trọng tâm</div>
                <div className="text-slate-500">Bám sát cấu trúc tuyển sinh 10 các tỉnh/thành</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                4
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">4 Cấp độ Nhận thức</div>
                <div className="text-slate-500">Cơ bản → Thông hiểu → Vận dụng → Nâng cao</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                120'
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Thi thử thời gian thực</div>
                <div className="text-slate-500">Đếm ngược, tự động chấm và phân tích lỗi</div>
              </div>
            </div>
          </div>

          {/* 10 TOPICS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADMISSION_10_TOPICS.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white dark:bg-slate-800/95 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-800 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-sm group-hover:scale-105 transition">
                      {topic.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {topic.shortDesc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-500 group-hover:translate-x-1 transition" />
                </div>

                {/* CORE KEYPOINTS TAGS */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700">
                  {topic.subtopics.slice(0, 4).map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {sub}
                    </span>
                  ))}
                  {topic.subtopics.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{topic.subtopics.length - 4} dạng khác
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* DETAIL OF SELECTED TOPIC */
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  Chuyên đề số {selectedTopic.number} / 10 • Ôn thi vào 10
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedTopic.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {selectedTopic.shortDesc}
                </p>
              </div>

              <button
                onClick={() => onStartExam()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition self-start sm:self-auto"
              >
                <PlayCircle className="w-4 h-4" />
                <span>THI THỬ CHUYÊN ĐỀ NÀY</span>
              </button>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pt-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('theory')}
                className={`pb-2.5 px-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'theory'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Tổng quan & Lý thuyết trọng tâm
              </button>
              <button
                onClick={() => setActiveTab('subtopics')}
                className={`pb-2.5 px-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'subtopics'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Các dạng bài thi vào 10
              </button>
              <button
                onClick={() => setActiveTab('formulas')}
                className={`pb-2.5 px-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === 'formulas'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Công thức KaTeX cần nhớ
              </button>
            </div>
          </div>

          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>1. Phương pháp tư duy & Trọng tâm kiến thức</span>
                </h4>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <MathView text={selectedTopic.theorySummary} />
                </div>
              </div>

              {/* TỈ LỆ ĐIỂM SỐ TRONG ĐỀ THI */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span>Phân bổ độ khó trong đề thi Tuyển sinh 10:</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                    <span className="text-slate-500">Cơ bản</span>
                    <div className="font-bold text-base text-blue-700 dark:text-blue-300 mt-1">
                      {selectedTopic.difficultyRatio.recognition}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-slate-500">Thông hiểu</span>
                    <div className="font-bold text-base text-emerald-700 dark:text-emerald-300 mt-1">
                      {selectedTopic.difficultyRatio.understanding}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                    <span className="text-slate-500">Vận dụng</span>
                    <div className="font-bold text-base text-amber-700 dark:text-amber-300 mt-1">
                      {selectedTopic.difficultyRatio.application}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                    <span className="text-slate-500">Vận dụng cao</span>
                    <div className="font-bold text-base text-red-700 dark:text-red-300 mt-1">
                      {selectedTopic.difficultyRatio.highApplication}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBTOPICS */}
          {activeTab === 'subtopics' && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Các dạng toán xuất hiện trong đề tuyển sinh:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTopic.coreKeypoints.map((kp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700 flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-800 dark:text-slate-200"><MathView text={kp} /></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedTopic.formulas.map((f, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2 shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">{f.name}</span>
                  <div className="py-2 text-base text-slate-900 dark:text-white font-mono overflow-x-auto">
                    <MathView text={f.latex} block />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
