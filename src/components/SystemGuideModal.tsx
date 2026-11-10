import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Shield,
  GraduationCap,
  Users,
  Smartphone,
  Cloud,
  Database,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  Printer,
  Sparkles,
} from 'lucide-react';

interface SystemGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemGuideModal: React.FC<SystemGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<
    'overview' | 'admin' | 'teacher' | 'student' | 'deploy' | 'backup'
  >('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden transition-all">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>Tài Liệu Bàn Giao & Hướng Dẫn Vận Hành (Mục 45)</span>
              </h3>
              <p className="text-xs text-blue-100">
                APP ÔN LUYỆN TOÁN THCS • © 2026 Teacher Lê Thanh Tùng • Trường TH, THCS Nguyễn Hữu Cảnh
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              title="In tài liệu hướng dẫn"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GUIDE NAVIGATION TABS */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-1.5 overflow-x-auto text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveGuideTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Tổng quan kiến trúc
          </button>
          <button
            onClick={() => setActiveGuideTab('admin')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Hướng dẫn Quản trị (Admin)
          </button>
          <button
            onClick={() => setActiveGuideTab('teacher')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'teacher'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Hướng dẫn Giáo viên
          </button>
          <button
            onClick={() => setActiveGuideTab('student')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'student'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Hướng dẫn Học sinh
          </button>
          <button
            onClick={() => setActiveGuideTab('deploy')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'deploy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Triển khai GitHub & Netlify
          </button>
          <button
            onClick={() => setActiveGuideTab('backup')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              activeGuideTab === 'backup'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Sao lưu, Khôi phục & PWA
          </button>
        </div>

        {/* CONTENT SCROLL */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeGuideTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                <h4 className="font-bold text-sm text-blue-800 dark:text-blue-200 mb-1">
                  1. Kiến trúc hệ thống thống nhất (GDPT 2018 & CV 7991)
                </h4>
                <p>
                  Ứng dụng được thiết kế theo mô hình <strong>Full-stack Responsive Web App + Progressive Web App (PWA)</strong>, vận hành trên một hệ thống thống nhất, chia sẻ chung cơ sở dữ liệu và phân quyền chặt chẽ giữa 3 nhóm đối tượng: Admin, Giáo viên và Học sinh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>A. Toán THCS 6–9</span>
                  </span>
                  <p className="text-slate-500 text-[11px]">
                    Toán 6, 7, 8, 9 với cấu trúc 18 mục chuẩn: Lý thuyết, công thức KaTeX, phương pháp giải, ví dụ, bài tập 4 mức nhận thức & phân tích lỗi sai.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>B. Tuyển sinh Lớp 10</span>
                  </span>
                  <p className="text-slate-500 text-[11px]">
                    10 Chuyên đề kinh điển, ngân hàng đề phân hóa các tỉnh/thành và phòng thi thử thời gian thực 120 phút.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span>C. Học sinh Giỏi Toán</span>
                  </span>
                  <p className="text-slate-500 text-[11px]">
                    Số học, Đại số, Hình học, Tổ hợp - Logic, Thử thách tư duy 5⭐ và trợ lý AI Coach theo phương pháp Socratic.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2">Thông số công nghệ nền tảng:</h5>
                <ul className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>• <strong>Frontend:</strong> React 19 + TypeScript + Tailwind CSS</li>
                  <li>• <strong>Backend:</strong> Node.js Express + Tsx Proxy</li>
                  <li>• <strong>Công thức Toán:</strong> KaTeX 0.16.11</li>
                  <li>• <strong>PWA Plugin:</strong> Vite-Plugin-PWA v1.2+</li>
                  <li>• <strong>Trí tuệ nhân tạo:</strong> Google GenAI SDK (gemini-3.8-flash)</li>
                  <li>• <strong>Xuất dữ liệu:</strong> SheetJS (.xlsx) + MS Word (.doc)</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: ADMIN */}
          {activeGuideTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200">
                <h4 className="font-bold text-sm text-purple-800 dark:text-purple-200 mb-1">
                  2. Hướng dẫn dành cho Quản trị viên (Mục 5.1 & 8)
                </h4>
                <p>
                  Tài khoản Admin có toàn quyền điều hành toàn bộ hệ thống trường TH, THCS Nguyễn Hữu Cảnh.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Bước 1: Đăng nhập lần đầu & Đổi mật khẩu bắt buộc</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Tên đăng nhập: <code>admin</code> | Mật khẩu khởi tạo: <code>12345678</code>.<br />
                    Khi đăng nhập lần đầu, hệ thống hiển thị form bắt buộc đổi mật khẩu. Sau khi đổi thành công, mật khẩu <code>12345678</code> không còn hiệu lực.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Bước 2: Quên mật khẩu & OTP quản trị</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Admin có số điện thoại quản trị duy nhất: <strong>0368386787</strong>. Khi quên mật khẩu, mã OTP xác thực sẽ gửi đến số này để thiết lập lại mật khẩu an toàn.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">Bước 3: Quản lý người dùng & Audit Log</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Admin có thể Khóa/Mở khóa tài khoản, Đổi quyền giữa Giáo viên và Học sinh, Reset mật khẩu về mặc định, đồng thời theo dõi nhật ký mọi thao tác tại tab Nhật ký Audit Log.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEACHER */}
          {activeGuideTab === 'teacher' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
                <h4 className="font-bold text-sm text-indigo-800 dark:text-indigo-200 mb-1">
                  3. Hướng dẫn dành cho Giáo viên bộ môn (Mục 6 & 34)
                </h4>
                <p>
                  Giáo viên quản lý học sinh theo lớp, tạo đề kiểm tra định kỳ theo CV 7991, xuất file Excel và theo dõi đội tuyển HSG.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">1. Quản lý lớp & Xuất Excel danh sách học sinh (Mục 36)</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Tại Dashboard Giáo viên, chọn lớp cần xem (ví dụ 6A1, 7A1, 8A1, 9A1) và bấm nút <strong>XUẤT EXCEL (.XLSX)</strong>. Tệp tin tạo ra có đầy đủ STT, Họ tên, Lớp, SĐT, Ngày tham gia, không lộ mật khẩu.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">2. AI Tạo đề nhanh theo Công văn 7991 (Mục 30)</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Nhập Khối, Chương, Thời gian, Số câu và tỷ lệ ma trận (40-30-20-10). AI sẽ tự động sinh: Ma trận, Bản đặc tả chuẩn năng lực, Đề thi 4 phần và Bảng Hướng dẫn chấm chi tiết. Giáo viên được xem, chỉnh sửa trước khi duyệt vào ngân hàng đề.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">3. Xuất file Word (.doc) và Đảo mã đề (Mục 28 & 37)</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Tính năng <strong>ĐẢO CÂU & ĐÁP ÁN</strong> cho phép tạo nhanh các mã đề 101, 102, 103, 104... đảm bảo tương đương độ khó. Nút <strong>XUẤT WORD (.DOC)</strong> sẽ tải về file Word chuẩn chỉnh với tiêu ngữ trường TH, THCS Nguyễn Hữu Cảnh và bảng barem chấm 3 cột.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT */}
          {activeGuideTab === 'student' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-200 mb-1">
                  4. Hướng dẫn dành cho Học sinh (Mục 7, 10, 11)
                </h4>
                <p>
                  Học sinh học kiến thức → Luyện tập → Phát hiện lỗi sai → Ôn tập → Kiểm tra → Cải thiện.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">1. Học 18 mục kiến thức chuẩn</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Xem công thức KaTeX, phương pháp giải theo từng dạng và đọc bảng lỗi sai thường gặp để tránh mất điểm đáng tiếc.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">2. Luyện tập tương tác với âm thanh & phản hồi chi tiết</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Khi trả lời đúng: Nghe âm thanh chime tươi vui và tích lũy chuỗi combo 🔥. Khi trả lời sai: Hệ thống hiển thị Phân tích đề bài, Dữ kiện, Yêu cầu, Công thức và Từng bước giải chi tiết để em hiểu tận gốc vấn đề.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">3. Thử thách tư duy 5⭐ & AI Coach (Mục 20 & 21)</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Tự giải trước! Nếu gặp khó, hãy mở Gợi ý 1, Gợi ý 2 hoặc hỏi AI Coach để nhận câu hỏi gợi mở, giúp em tự mình tìm ra lời giải thay vì xem sẵn đáp án.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEPLOY */}
          {activeGuideTab === 'deploy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                <h4 className="font-bold text-sm text-blue-800 dark:text-blue-200 mb-1">
                  5. Hướng dẫn triển khai GitHub, Netlify & Vercel (Mục 40)
                </h4>
                <p>
                  Đảm bảo ứng dụng tuân thủ nghiêm ngặt quy tắc bảo mật khi deploy lên hosting công cộng.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Quy tắc bắt buộc khi deploy (Mục 40):</div>
                <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>• Không tự động đăng nhập Admin khi vừa mở ứng dụng.</li>
                  <li>• Không lưu session Admin trong mã nguồn hoặc token hard-code.</li>
                  <li>• Khi tải trang lần đầu, màn hình luôn ở trạng thái khách (chưa đăng nhập). Người dùng bắt buộc nhập Tên đăng nhập và Mật khẩu.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-2">
                <div className="text-slate-400">// Lệnh build dự án sản phẩm:</div>
                <div className="text-emerald-400">npm run build</div>
                <div className="text-slate-400 mt-2">// Thư mục xuất bản tĩnh:</div>
                <div className="text-blue-400">dist/</div>
                <div className="text-slate-400 mt-2">// Biến môi trường trên Netlify / Vercel:</div>
                <div>GEMINI_API_KEY = &lt;YOUR_API_KEY&gt;</div>
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & PWA */}
          {activeGuideTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <h4 className="font-bold text-sm text-amber-800 dark:text-amber-200 mb-1">
                  6. Hướng dẫn Sao lưu, Khôi phục & Cập nhật PWA (Mục 3 & 35)
                </h4>
                <p>
                  Đảm bảo an toàn dữ liệu, chống mất mát thông tin và điều phối cập nhật phiên bản.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">1. Quy trình sao lưu định kỳ</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Admin truy cập Bảng quản trị → tab <strong>Sao lưu & Khôi phục</strong> → bấm <strong>TẢI XUỐNG BẢN SAO LƯU (.JSON)</strong>. Tệp tin chứa toàn bộ người dùng, câu hỏi, đề thi và kết quả.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">2. Quy trình cập nhật App & Đăng xuất bắt buộc (Mục 3)</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Mỗi khi bấm nút <strong>CẬP NHẬT APP</strong> hoặc kích hoạt nâng cấp phiên bản (v2.6.0 → v2.6.1), hệ thống sẽ:
                    <br />• Xóa sạch phiên đăng nhập hiện hành.
                    <br />• Không tự động đăng nhập lại tài khoản cũ.
                    <br />• Yêu cầu toàn bộ giáo viên và học sinh đăng nhập lại để đảm bảo tính toàn vẹn của mã nguồn mới.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 font-medium">
            Phiên bản tài liệu bàn giao: v2.6.0 (Tháng 11/2026)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
          >
            ĐÃ HIỂU VÀ ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
