import React from 'react';
import { Shield, BookCheck, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* COL 1: BRAND & COPYRIGHT */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-serif text-xl font-bold select-none">
                π
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                APP ÔN LUYỆN TOÁN THCS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hệ thống ôn tập và kiểm tra định kỳ môn Toán lớp 6, 7, 8, 9; Ôn luyện tuyển sinh lớp 10 và bồi dưỡng Học sinh Giỏi Toán.
            </p>
            <div className="pt-2 text-slate-400 font-semibold border-t border-slate-800">
              © 2026 Teacher Lê Thanh Tùng.<br />All Rights Reserved.
            </div>
          </div>

          {/* COL 2: ĐƠN VỊ SỬ DỤNG */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Đơn vị trường học</span>
            </h4>
            <div className="text-slate-200 font-medium">
              Trường TH, THCS Nguyễn Hữu Cảnh
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Tài liệu chuyên môn, ngân hàng câu hỏi và đề thi áp dụng trong toàn trường và các đơn vị liên kết.
            </p>
            <div className="flex items-center gap-2 text-slate-400 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline/Zalo: <strong>0368386787</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>lethanhtungnhc@gmail.com</span>
            </div>
          </div>

          {/* COL 3: TIÊU CHUẨN CHUYÊN MÔN */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Quy chuẩn Bộ GD&ĐT</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chương trình Giáo dục phổ thông 2018</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hướng dẫn khảo thí và đánh giá định kỳ</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Cấu trúc 4 phần: TNKQ, Đúng/Sai, Trả lời ngắn, Tự luận</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Barem ma trận và bản đặc tả năng lực</span>
              </li>
            </ul>
          </div>

          {/* COL 4: PHÂN HỆ NỔI BẬT */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Hệ thống luyện thi</span>
            </h4>
            <div className="space-y-1 text-slate-400">
              <div>🎯 10 Chuyên đề tuyển sinh vào 10</div>
              <div>🧠 Bồi dưỡng Đội tuyển HSG 6–9</div>
              <div>⚡ Đấu trường Toán học tốc độ</div>
              <div>🤖 AI Coach - Trợ lý tư duy Socratic</div>
              <div>📊 Xuất Word, Excel, PDF theo chuẩn</div>
            </div>
            <div className="pt-2">
              <span className="inline-block bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">
                Phiên bản PWA v2.6.0
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          Ứng dụng phát triển cho mọi thiết bị: Android, iOS, iPad, Laptop, PC. Thiết kế responsive tối ưu cho màn hình cảm ứng và tốc độ tải trang nhanh.
        </div>
      </div>
    </footer>
  );
};
