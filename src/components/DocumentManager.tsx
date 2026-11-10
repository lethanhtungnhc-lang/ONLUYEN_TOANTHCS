import React, { useState } from 'react';
import {
  FolderOpen,
  UploadCloud,
  FileText,
  FileSpreadsheet,
  Download,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  FileCode,
  ShieldCheck,
} from 'lucide-react';
import { DocumentItem } from '../types';
import { storageService } from '../services/storageService';

interface DocumentManagerProps {
  onBack: () => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ onBack }) => {
  const currentUser = storageService.getCurrentSession();
  const [documents, setDocuments] = useState<DocumentItem[]>(storageService.getDocuments());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image'>('pdf');
  const [category, setCategory] = useState<any>('reference');
  const [grade, setGrade] = useState<number>(9);
  const [notice, setNotice] = useState('');

  const canUpload = currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesGrade = selectedGrade === 'all' || doc.grade.toString() === selectedGrade;
    return matchesSearch && matchesCat && matchesGrade;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      fileType,
      category,
      grade: grade as any,
      uploadedBy: currentUser?.fullName || 'Giáo viên',
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
    };

    storageService.addDocument(newDoc);
    setDocuments(storageService.getDocuments());
    setUploadModalOpen(false);
    setTitle('');
    setNotice('Tải lên tài liệu thành công và đã đồng bộ vào hệ thống!');
    setTimeout(() => setNotice(''), 3500);
  };

  const handleDelete = (id: string) => {
    if (!canUpload) return;
    storageService.deleteDocument(id);
    setDocuments(storageService.getDocuments());
  };

  const handleDownload = (doc: DocumentItem) => {
    // Generate sample blob or trigger download
    const blob = new Blob([`Tài liệu: ${doc.title}\nĐơn vị: Trường TH, THCS Nguyễn Hữu Cảnh\nBản quyền: © 2026 Teacher Lê Thanh Tùng`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_')}.${doc.fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              <FolderOpen className="w-7 h-7 text-indigo-600" />
              <span>Kho Tài liệu & Văn bản Chuyên môn</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lưu trữ Công văn 7991, Phụ lục 1, Ma trận, Bản đặc tả, Barem chấm & Đề thi mẫu trường TH, THCS Nguyễn Hữu Cảnh
          </p>
        </div>

        {canUpload && (
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>UPLOAD TÀI LIỆU MỚI</span>
          </button>
        )}
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* SECTION 32 NOTICE BANNER */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-slate-800 border border-indigo-200/60 dark:border-slate-700 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">Nguyên tắc sử dụng tài liệu nguồn (Mục 32):</div>
          <p className="leading-relaxed">
            Các văn bản như Công văn 7991, Phụ lục 1 ma trận & bản đặc tả do Admin hoặc nhà trường cung cấp luôn được ưu tiên làm nguồn tham chiếu chính thức tối cao. Hệ thống không coi dữ liệu AI tự sinh là văn bản chính thức khi chưa được giáo viên/Admin duyệt.
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên tài liệu, công văn, chuyên đề..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium outline-none"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="circular_7991">Công văn 7991</option>
            <option value="matrix">Ma trận & Đặc tả</option>
            <option value="exam">Đề kiểm tra mẫu</option>
            <option value="reference">Tài liệu tham khảo HSG</option>
          </select>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium outline-none"
          >
            <option value="all">Tất cả các khối</option>
            <option value="6">Khối 6</option>
            <option value="7">Khối 7</option>
            <option value="8">Khối 8</option>
            <option value="9">Khối 9</option>
          </select>
        </div>
      </div>

      {/* DOCUMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
                  {doc.fileType}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Toán {doc.grade}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {doc.title}
                </h4>
                <div className="text-[11px] text-slate-400 mt-1">
                  Đăng bởi: {doc.uploadedBy} • {doc.uploadedAt} • {doc.fileSize}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => handleDownload(doc)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải xuống</span>
              </button>

              {canUpload && (
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Xóa tài liệu"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                <span>Tải lên tài liệu mới</span>
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên tài liệu / Văn bản *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Đề cương ôn tập HK1 Toán 9..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Định dạng file *
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="pdf">PDF (.pdf)</option>
                    <option value="docx">Word (.docx)</option>
                    <option value="xlsx">Excel (.xlsx)</option>
                    <option value="pptx">PowerPoint (.pptx)</option>
                    <option value="image">Hình ảnh (.png, .jpg)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gắn khối lớp *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={6}>Toán 6</option>
                    <option value={7}>Toán 7</option>
                    <option value={8}>Toán 8</option>
                    <option value={9}>Toán 9</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Danh mục phân loại *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="circular_7991">Công văn 7991 / Quy định Bộ GD&ĐT</option>
                  <option value="matrix">Ma trận & Bản đặc tả</option>
                  <option value="exam">Đề kiểm tra & Barem chấm</option>
                  <option value="reference">Tài liệu tham khảo & Bồi dưỡng HSG</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
                >
                  LƯU TÀI LIỆU VÀO KHO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
