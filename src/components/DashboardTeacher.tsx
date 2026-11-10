import React, { useState } from 'react';
import {
  Users,
  Download,
  BookOpen,
  Award,
  Clock,
  ArrowLeft,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { exportStudentsToExcel } from '../utils/exportUtils';
import { User, ClassRoom } from '../types';

interface DashboardTeacherProps {
  onBack: () => void;
  onOpenAIGenerate: () => void;
}

export const DashboardTeacher: React.FC<DashboardTeacherProps> = ({
  onBack,
  onOpenAIGenerate,
}) => {
  const currentUser = storageService.getCurrentSession();
  const classes = storageService.getClasses();
  const allUsers = storageService.getAllUsers();
  const allResults = storageService.getResults();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  // Students belonging to this teacher / class
  const classStudents = allUsers.filter(
    (u) => u.role === 'student' && (!u.className || u.className === activeClass?.name)
  );

  const handleExportExcel = () => {
    exportStudentsToExcel(classStudents, activeClass?.name || 'THCS');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* HEADER */}
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
              <Users className="w-7 h-7 text-indigo-600" />
              <span>Bảng Điều Khiển Giáo Viên Bộ Môn Toán</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Giáo viên: <strong>{currentUser?.fullName || 'Thầy Lê Thanh Tùng'}</strong> • Đơn vị: <strong>Trường TH, THCS Nguyễn Hữu Cảnh</strong> (Mục 34)
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAIGenerate}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI RA ĐỀ KIỂM TRA</span>
          </button>

          {/* SECTION 36: XUẤT EXCEL DANH SÁCH HỌC SINH */}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition"
            title="Xuất file .xlsx danh sách học sinh theo chuẩn Mục 36"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>XUẤT EXCEL (.XLSX)</span>
          </button>
        </div>
      </div>

      {/* CLASSROOM SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <span className="text-slate-400 font-medium">Lớp quản lý:</span>
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClassId(cls.id)}
            className={`px-3 py-1.5 rounded-xl border transition whitespace-nowrap ${
              selectedClassId === cls.id
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            Lớp {cls.name} ({cls.studentCount} HS)
          </button>
        ))}
      </div>

      {/* CLASS KPI METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase">Sĩ số lớp</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {activeClass?.studentCount || 38}
          </div>
          <div className="text-[11px] text-slate-500">Năm học {activeClass?.academicYear}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase">Tỷ lệ hoàn thành bài</div>
          <div className="text-3xl font-black text-emerald-600 font-mono">88%</div>
          <div className="text-[11px] text-emerald-600 font-medium">32/38 học sinh đã nộp</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase">Điểm trung bình lớp</div>
          <div className="text-3xl font-black text-blue-600 font-mono">7.8</div>
          <div className="text-[11px] text-blue-600 font-medium">+0.6 so với kỳ trước</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="text-xs text-slate-500 font-bold uppercase">Đội tuyển HSG</div>
          <div className="text-3xl font-black text-purple-600 font-mono">12</div>
          <div className="text-[11px] text-purple-600 font-medium">Bồi dưỡng chuyên sâu</div>
        </div>
      </div>

      {/* STUDENT ROSTER TABLE (SECTION 36) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Danh sách Học sinh Lớp {activeClass?.name} (Mục 36)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Chỉ hiển thị học sinh thuộc quyền quản lý của giáo viên
            </p>
          </div>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition hover:bg-emerald-100"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file Excel (.xlsx)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 text-center w-12">STT</th>
                <th className="p-3">Họ và tên</th>
                <th className="p-3">Lớp</th>
                <th className="p-3">Tên đăng nhập</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-right">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {classStudents.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{s.fullName}</td>
                  <td className="p-3 font-semibold text-blue-600">{s.className || activeClass?.name}</td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-300">@{s.username}</td>
                  <td className="p-3 font-mono text-slate-500">{s.phone}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      Đang học tập
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-400">
                    {s.createdAt ? new Date(s.createdAt).toLocaleDateString('vi-VN') : '2026-09-05'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
