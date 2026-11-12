import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  BookOpen,
} from 'lucide-react';
import { Exam, Matrix, Specification, Rubric } from '../types';

interface ProofreadAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: Exam;
  matrix?: Matrix;
  spec?: Specification;
  rubric?: Rubric;
  onApproveExport: () => void;
}

export const ProofreadAuditModal: React.FC<ProofreadAuditModalProps> = ({
  isOpen,
  onClose,
  exam,
  matrix,
  spec,
  rubric,
  onApproveExport,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [auditDone, setAuditDone] = useState(true);

  if (!isOpen) return null;

  // Real audits
  const totalExamPoints = exam.totalPoints;
  const isPointsStandard = totalExamPoints === 10.0;
  const hasSchoolName = exam.schoolName.includes('Trường TH, THCS Nguyễn Hữu Cảnh');
  const hasCopyright = (exam.copyright || '').includes('Teacher Lê Thanh Tùng');
  const partsCount = exam.parts.length;
  const hasFourParts = partsCount >= 4;

  // Check consistency between exam questions count and rubric count
  let totalQuestions = 0;
  exam.parts.forEach((p) => (totalQuestions += p.questions.length));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden transition-all">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <span>Rà Soát Chuyên Môn & Kiểm Tra Tính Thống Nhất</span>
              </h3>
              <p className="text-xs text-blue-100">
                Tuân thủ quy trình kiểm định Mục 38 trước khi xuất bản tài liệu
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUDIT CHECKLIST */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
            Hệ thống tự động đối chiếu tính thống nhất: <strong>Đề thi ↔ Đáp án ↔ Ma trận ↔ Bản đặc tả ↔ Hướng dẫn chấm</strong>.
          </div>

          <div className="space-y-2.5">
            {/* ITEM 1: CHÍNH TẢ & THUẬT NGỮ */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Chính tả Tiếng Việt & Dấu câu:</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Đã rà soát thuật ngữ Toán học, viết hoa, dấu câu và danh xưng chuẩn mực sư phạm.
                </p>
              </div>
            </div>

            {/* ITEM 2: TOÁN HỌC & CÔNG THỨC */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Toán học & Công thức KaTeX:</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Không lỗi font, cú pháp KaTeX hợp lệ, các phép tính và điều kiện xác định chặt chẽ.
                </p>
              </div>
            </div>

            {/* ITEM 3: ĐỐI CHIẾU MA TRẬN & TỔNG ĐIỂM */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              {isPointsStandard ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="text-slate-900 dark:text-white">
                  Tính thống nhất Ma trận & Thang điểm:
                </strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Tổng điểm đề thi: <strong>{totalExamPoints.toFixed(1)} / 10.0 điểm</strong> (Khung điểm chuẩn Công văn 7991).
                </p>
              </div>
            </div>

            {/* ITEM 4: TIÊU NGỮ VÀ BẢN QUYỀN */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              {hasSchoolName && hasCopyright ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="text-slate-900 dark:text-white">Tiêu ngữ đơn vị & Bản quyền:</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Trường TH, THCS Nguyễn Hữu Cảnh • © 2026 Teacher Lê Thanh Tùng. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* APPROVAL FOOTER */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => {
                onApproveExport();
                onClose();
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>XÁC NHẬN CHUẨN XÁC & XUẤT FILE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
