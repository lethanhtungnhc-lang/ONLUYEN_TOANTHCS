import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Shuffle,
  Printer,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  Sparkles,
  FileText,
  Copy,
} from 'lucide-react';
import { Exam, Matrix, Specification, Rubric } from '../types';
import { storageService } from '../services/storageService';
import { exportExamToWord } from '../utils/exportUtils';
import MathView from '../utils/mathRender';
import { ProofreadAuditModal } from './ProofreadAuditModal';

interface MatrixSpecViewerProps {
  onBack: () => void;
  onOpenExam: (exam: Exam) => void;
  onOpenAIGenerate: () => void;
}

export const MatrixSpecViewer: React.FC<MatrixSpecViewerProps> = ({
  onBack,
  onOpenExam,
  onOpenAIGenerate,
}) => {
  const exams = storageService.getExams();
  const matrices = storageService.getMatrices();
  const specs = storageService.getSpecifications();
  const rubrics = storageService.getRubrics();

  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'matrix' | 'spec' | 'exam' | 'rubric'>('matrix');
  const [shuffleNotice, setShuffleNotice] = useState<string>('');

  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const activeExam = exams.find((e) => e.id === selectedExamId) || exams[0];
  const activeMatrix = matrices[0];
  const activeSpec = specs[0];
  const activeRubric = rubrics[0];

  // Section 28: Đảo câu & Đảo đáp án - Tạo mã đề mới
  const handleShuffleExam = () => {
    if (!activeExam) return;
    const newCode = (Math.floor(100 + Math.random() * 900)).toString();
    const created = storageService.generateShuffledExam(activeExam, newCode);
    setSelectedExamId(created.id);
    setShuffleNotice(`Đã tạo thành công Mã đề mới: ${newCode} với thứ tự câu hỏi và phương án được hoán vị ngẫu nhiên!`);
    setTimeout(() => setShuffleNotice(''), 4000);
  };

  // Section 38: Rà soát chuyên môn trước khi xuất bản
  const handleExportWord = () => {
    setAuditModalOpen(true);
  };

  const handleConfirmedExport = () => {
    if (!activeExam) return;
    exportExamToWord(activeExam, activeMatrix, activeSpec, activeRubric);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in print:p-0">
      {/* HEADER WITH TRỞ VỀ */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
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
              <FileSpreadsheet className="w-7 h-7 text-blue-600" />
              <span>Ma trận, Bản đặc tả & Đề thi CV 7991</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Xây dựng theo Chương trình GDPT 2018 & Công văn 7991/BGDĐT-GDTrH • Trường TH, THCS Nguyễn Hữu Cảnh
          </p>
        </div>

        {/* ACTIONS: AI TẠO ĐỀ NHANH, ĐẢO ĐỀ, XUẤT WORD, XUẤT PDF */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={onOpenAIGenerate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI TẠO ĐỀ NHANH</span>
          </button>

          <button
            onClick={handleShuffleExam}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition"
            title="Đảo câu hỏi và đảo đáp án - Tạo mã đề mới (Mục 28)"
          >
            <Shuffle className="w-4 h-4" />
            <span>ĐẢO CÂU & ĐÁP ÁN</span>
          </button>

          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
            title="Xuất file Word (.doc) chuẩn 4 phần (Mục 37)"
          >
            <Download className="w-4 h-4" />
            <span>XUẤT WORD (.DOC)</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-sm transition"
            title="In hoặc lưu PDF"
          >
            <Printer className="w-4 h-4" />
            <span>IN / PDF</span>
          </button>
        </div>
      </div>

      {/* SHUFFLE SUCCESS NOTICE */}
      {shuffleNotice && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 animate-fade-in print:hidden">
          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{shuffleNotice}</span>
        </div>
      )}

      {/* EXAM SELECTOR DROPDOWN & TABS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chọn đề kiểm tra:</span>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold outline-none"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                Toán {ex.grade} - {ex.title} (Mã {ex.code})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            1. Ma trận đề (CV 7991)
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'spec'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            2. Bản đặc tả (CV 7991)
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'exam'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            3. Đề kiểm tra (CV 7991)
          </button>
          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
              activeTab === 'rubric'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            4. Hướng dẫn chấm (CV 7991)
          </button>
        </div>
      </div>

      {/* 1. MA TRẬN ĐỀ KIỂM TRA (SECTION 25) */}
      {activeTab === 'matrix' && activeMatrix && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase">
                {activeMatrix.schoolName}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TOÁN LỚP {activeMatrix.grade} THEO CÔNG VĂN 7991
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
              ✓ Đã kiểm tra: Tổng {activeMatrix.grandTotalPoints.toFixed(1)} điểm (100%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-600">
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">TT</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">Chủ đề / Mạch kiến thức</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">Nhận biết (40%)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">Thông hiểu (30%)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">Vận dụng (20%)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600">Vận dụng cao (10%)</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600 text-center">Tổng điểm</th>
                  <th className="p-2.5 border border-slate-200 dark:border-slate-600 text-center">Tỷ lệ %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {activeMatrix.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-bold">{idx + 1}</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-medium">
                      <div className="font-bold text-slate-900 dark:text-white">{row.topicName}</div>
                      <div className="text-[11px] text-slate-500">{row.subtopic}</div>
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-mono">
                      {row.recognitionCount} câu ({row.recognitionPoints}đ)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-mono">
                      {row.understandingCount} câu ({row.understandingPoints}đ)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-mono">
                      {row.applicationCount} câu ({row.applicationPoints}đ)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-mono">
                      {row.highApplicationCount} câu ({row.highApplicationPoints}đ)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-bold text-blue-600 font-mono">
                      {row.totalPoints.toFixed(2)}đ
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-center font-bold text-emerald-600">
                      {row.percentage}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold text-slate-900 dark:text-white">
                  <td colSpan={2} className="p-2.5 border border-blue-200 dark:border-blue-800 text-center">
                    TỔNG CỘNG
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center">
                    {activeMatrix.totalRecognitionPoints}đ (40%)
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center">
                    {activeMatrix.totalUnderstandingPoints}đ (30%)
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center">
                    {activeMatrix.totalApplicationPoints}đ (20%)
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center">
                    {activeMatrix.totalHighApplicationPoints}đ (10%)
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center text-blue-600 text-sm">
                    {activeMatrix.grandTotalPoints.toFixed(1)}đ
                  </td>
                  <td className="p-2.5 border border-blue-200 dark:border-blue-800 text-center text-emerald-600">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA (SECTION 26) */}
      {activeTab === 'spec' && activeSpec && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-[11px] font-bold text-blue-600 uppercase">
              {activeSpec.schoolName}
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              BẢN ĐẶC TẢ ĐỀ KIỂM TRA MÔN TOÁN LỚP {activeSpec.grade} THEO CÔNG VĂN 7991
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phần năng lực toán học thể hiện chính xác tại từng câu hỏi tương ứng theo cấu trúc GDPT 2018
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700/60 font-bold border border-slate-200 dark:border-slate-600">
                  <th className="p-2 border border-slate-200 dark:border-slate-600 text-center">TT</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Chủ đề</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Nội dung kiến thức</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Yêu cầu cần đạt</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Hình thức</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Mức độ</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600">Năng lực Toán học</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600 text-center">Câu</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-600 text-center">Điểm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {activeSpec.items.map((it) => (
                  <tr key={it.stt} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-center font-bold">{it.stt}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 font-semibold">{it.topic}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700"><MathView text={it.content} /></td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">{it.requirement}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500">{it.questionFormat}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700">
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                        {it.level === 'recognition' ? 'Nhận biết' : it.level === 'understanding' ? 'Thông hiểu' : 'Vận dụng'}
                      </span>
                    </td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-medium">
                      {it.competency}
                    </td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-center font-bold text-blue-600">{it.questionCode}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-700 text-center font-bold font-mono">{it.points}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ĐỀ KIỂM TRA 4 PHẦN CHUẨN */}
      {activeTab === 'exam' && activeExam && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="font-bold text-xs text-slate-500 uppercase">{activeExam.schoolName}</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase mt-0.5">
                {activeExam.title} (MÃ ĐỀ {activeExam.code}) - CHUẨN CÔNG VĂN 7991
              </h3>
            </div>
            <button
              onClick={() => onOpenExam(activeExam)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow"
            >
              VÀO LÀM BÀI TRỰC TUYẾN →
            </button>
          </div>

          <div className="space-y-6 text-sm">
            {activeExam.parts.map((p) => (
              <div key={p.partNumber} className="space-y-3">
                <div className="font-black text-base text-slate-900 dark:text-white uppercase tracking-tight">
                  PHẦN {p.partNumber === 1 ? 'I' : p.partNumber === 2 ? 'II' : p.partNumber === 3 ? 'III' : 'IV'}: {p.title}
                </div>
                <div className="space-y-3 pl-3">
                  {p.questions.map((q, idx) => (
                    <div key={q.id} className="space-y-1.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        Câu {idx + 1} ({q.points}đ): <MathView text={q.content} />
                      </div>
                      {q.options && (
                        <div className="grid grid-cols-2 gap-2 text-xs pl-4">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="text-slate-700 dark:text-slate-300">
                              <strong>{String.fromCharCode(65 + oIdx)}.</strong> <MathView text={opt} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. HƯỚNG DẪN CHẤM BẢNG THEO MỤC 29 */}
      {activeTab === 'rubric' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-[11px] font-bold text-blue-600 uppercase">
              Trường TH, THCS Nguyễn Hữu Cảnh
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM (CÔNG VĂN 7991)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phần IV được trình bày bằng bảng gồm 3 cột: Câu - Hướng dẫn chi tiết - Biểu điểm chấm (Mục 29)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700/60 font-bold border border-slate-200 dark:border-slate-600">
                  <th className="p-3 border border-slate-200 dark:border-slate-600 text-center w-28">Câu</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-600">Hướng dẫn chi tiết từng bước</th>
                  <th className="p-3 border border-slate-200 dark:border-slate-600 text-center w-28">Biểu điểm chấm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {(activeRubric?.rows || []).map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 border border-slate-200 dark:border-slate-700 text-center font-bold text-blue-600 align-top">
                      {r.questionCode}
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-700 space-y-1 leading-relaxed">
                      {r.detailedGuide.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200">
                          <span>•</span>
                          <span><MathView text={step} /></span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            ({r.partialScores[sIdx] || 0.25}đ)
                          </span>
                        </div>
                      ))}
                      {r.notes && (
                        <div className="text-[11px] text-amber-700 dark:text-amber-400 italic pt-1">
                          * {r.notes}
                        </div>
                      )}
                    </td>
                    <td className="p-3 border border-slate-200 dark:border-slate-700 text-center font-bold font-mono text-emerald-600 text-sm align-middle">
                      {r.totalPoints}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 38: AUDIT INSPECTOR MODAL */}
      <ProofreadAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        exam={activeExam}
        matrix={activeMatrix}
        spec={activeSpec}
        rubric={activeRubric}
        onApproveExport={handleConfirmedExport}
      />
    </div>
  );
};
