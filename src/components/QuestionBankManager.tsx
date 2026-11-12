import React, { useState } from 'react';
import {
  FileQuestion,
  Plus,
  Copy,
  Trash2,
  Edit3,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle2,
  Download,
  Upload,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { Question, GradeLevel, DifficultyLevel, QuestionType } from '../types';
import MathView from '../utils/mathRender';

interface QuestionBankManagerProps {
  onBack: () => void;
}

export const QuestionBankManager: React.FC<QuestionBankManagerProps> = ({ onBack }) => {
  const [questions, setQuestions] = useState<Question[]>(storageService.getQuestions());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [notice, setNotice] = useState('');

  // Add/Edit modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [grade, setGrade] = useState<GradeLevel>(9);
  const [topic, setTopic] = useState('Căn thức bậc hai');
  const [type, setType] = useState<QuestionType>('multiple_choice');
  const [level, setLevel] = useState<DifficultyLevel>('recognition');
  const [content, setContent] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(0.25);
  const [competency, setCompetency] = useState('Năng lực tư duy và lập luận toán học');

  const refreshList = () => {
    setQuestions(storageService.getQuestions());
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setContent('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectAnswer('');
    setExplanation('');
    setPoints(0.25);
    setModalOpen(true);
  };

  const handleOpenEdit = (q: Question) => {
    setEditingId(q.id);
    setGrade(q.grade || 9);
    setTopic(q.topic || 'Toán học');
    setType(q.type);
    setLevel((q.level || q.difficulty || 'recognition') as any);
    setContent(q.content);
    if (q.options && q.options.length >= 4) {
      setOptA(q.options[0]);
      setOptB(q.options[1]);
      setOptC(q.options[2]);
      setOptD(q.options[3]);
    }
    setCorrectAnswer(String(q.correctAnswer || ''));
    setExplanation(q.explanation || '');
    setPoints(q.points ?? 0.25);
    setCompetency(q.competency || 'Tư duy và lập luận toán học');
    setModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const options = type === 'multiple_choice' ? [optA, optB, optC, optD] : undefined;

    const newQ: Question = {
      id: editingId || `q-${Date.now()}`,
      code: `TOAN${grade}-${Math.floor(100 + Math.random() * 900)}`,
      grade,
      topic,
      type,
      level,
      content,
      options,
      correctAnswer,
      explanation,
      points,
      competency,
      breakdown: {
        analysis: 'Phân tích đề bài và định hướng phương pháp',
        givens: 'Giả thiết đề bài',
        requirements: 'Yêu cầu cần tìm',
        formula: 'Công thức toán học áp dụng',
        method: 'Quy trình giải chi tiết',
        steps: [explanation || 'Biến đổi theo quy tắc toán học chuẩn'],
        conclusion: `Kết luận đáp án: ${correctAnswer}`,
        commonMistakes: 'Lưu ý kiểm tra kỹ điều kiện xác định và dấu của phép toán.',
      },
    };

    if (editingId) {
      storageService.updateQuestion(newQ);
      setNotice('Đã cập nhật câu hỏi thành công!');
    } else {
      storageService.addQuestion(newQ);
      setNotice('Đã thêm câu hỏi mới vào ngân hàng!');
    }

    refreshList();
    setModalOpen(false);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleCloneQuestion = (q: Question) => {
    const cloned: Question = {
      ...q,
      id: `q-clone-${Date.now()}`,
      code: `${q.code}-COPY`,
      content: `${q.content} (Bản sao)`,
    };
    storageService.addQuestion(cloned);
    refreshList();
    setNotice(`Đã nhân bản câu hỏi mã ${q.code}!`);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa câu hỏi này?')) {
      storageService.deleteQuestion(id);
      refreshList();
      setNotice('Đã xóa câu hỏi khỏi ngân hàng.');
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.topic || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = selectedGrade === 'all' || (q.grade || 9).toString() === selectedGrade;
    const matchLevel = selectedLevel === 'all' || (q.level || q.difficulty) === selectedLevel;
    return matchSearch && matchGrade && matchLevel;
  });

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
              <FileQuestion className="w-7 h-7 text-blue-600" />
              <span>Ngân Hàng Câu Hỏi Toán THCS (Mục 14)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quản lý, phân loại theo 4 mức độ nhận thức, năng lực & dạng thức theo Chương trình GDPT 2018
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>THÊM CÂU HỎI MỚI</span>
        </button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung câu hỏi, chủ đề kiến thức..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium outline-none"
          >
            <option value="all">Tất cả các khối</option>
            <option value="6">Toán 6</option>
            <option value="7">Toán 7</option>
            <option value="8">Toán 8</option>
            <option value="9">Toán 9</option>
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium outline-none"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="recognition">Nhận biết</option>
            <option value="understanding">Thông hiểu</option>
            <option value="application">Vận dụng</option>
            <option value="high_application">Vận dụng cao</option>
          </select>
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-3 text-xs border-b border-slate-100 dark:border-slate-700 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  {q.code} • Toán {q.grade}
                </span>
                <span className="text-slate-500 font-medium">{q.topic}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {q.level === 'recognition' ? 'Mức 1: Nhận biết' : q.level === 'understanding' ? 'Mức 2: Thông hiểu' : 'Mức 3: Vận dụng'}
                </span>
                <span className="font-bold text-slate-400">({q.points} điểm)</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCloneQuestion(q)}
                  className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                  title="Nhân bản câu hỏi"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                  title="Chỉnh sửa câu hỏi"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Xóa câu hỏi"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              <MathView text={q.content} />
            </div>

            {q.options && (
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-start gap-1.5">
                    <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                    <span><MathView text={opt} /></span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div>Đáp án đúng: <MathView text={String(q.correctAnswer)} /></div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400">{q.competency}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingId ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới vào ngân hàng'}
              </h3>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveQuestion} className="overflow-y-auto space-y-3 text-xs pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Khối lớp</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value) as any)}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={6}>Toán 6</option>
                    <option value={7}>Toán 7</option>
                    <option value={8}>Toán 8</option>
                    <option value={9}>Toán 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Mức độ nhận thức</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="recognition">Nhận biết (40%)</option>
                    <option value="understanding">Thông hiểu (30%)</option>
                    <option value="application">Vận dụng (20%)</option>
                    <option value="high_application">Vận dụng cao (10%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Chủ đề kiến thức</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nội dung câu hỏi (hỗ trợ KaTeX)</label>
                <textarea
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ví dụ: Rút gọn biểu thức $P = \sqrt{4x^2}..."
                  className="w-full p-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              {type === 'multiple_choice' && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Phương án A"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phương án B"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phương án C"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phương án D"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Đáp án đúng</label>
                  <input
                    type="text"
                    required
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    placeholder="Nhập nội dung phương án đúng"
                    className="w-full p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Điểm số</label>
                  <input
                    type="number"
                    step="0.25"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Hướng dẫn giải tóm tắt</label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full p-2 border rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
                >
                  LƯU CÂU HỎI VÀO NGÂN HÀNG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
