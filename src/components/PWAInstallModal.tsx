import React, { useState } from 'react';
import { X, Download, RefreshCw, Smartphone, Laptop, CheckCircle2, AlertTriangle, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { storageService } from '../services/storageService';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'install' | 'update';
  onForceLogoutRequired: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  mode,
  onForceLogoutRequired,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  if (!isOpen) return null;

  const handleUpdate = () => {
    const updatedVer = storageService.triggerAppUpdate();
    setNewVersion(updatedVer);
    setUpdateSuccess(true);
    // After 2.5 seconds, notify parent to force logout & require login
    setTimeout(() => {
      onForceLogoutRequired();
      onClose();
    }, 2000);
  };

  const handleDirectInstall = async () => {
    const success = await install();
    if (success) {
      // Per Section 3: After install, require re-login
      storageService.logout();
      onForceLogoutRequired();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden transition-all">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              {mode === 'install' ? <Download className="w-6 h-6" /> : <RefreshCw className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {mode === 'install' ? 'Cài đặt APP ÔN LUYỆN TOÁN THCS' : 'Cập nhật ứng dụng'}
              </h3>
              <p className="text-xs text-blue-100">
                Phiên bản hiện tại: v{storageService.getAppVersion()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          {mode === 'install' ? (
            <>
              {/* APP ICON PREVIEW FEATURING MATHEMATICAL PI (π) */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-slate-800/80 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/60 shadow-inner">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-serif text-4xl font-bold shadow-lg shadow-blue-500/25 border-2 border-white/30 shrink-0 select-none">
                  π
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight truncate">
                      APP ÔN LUYỆN TOÁN THCS
                    </span>
                    <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-xs shrink-0">
                      Icon: π
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mt-0.5">
                    Biểu tượng ứng dụng: Kí hiệu số Pi (π) Toán học
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    © 2026 Teacher Lê Thanh Tùng • Trường TH, THCS Nguyễn Hữu Cảnh
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ứng dụng được thiết kế theo tiêu chuẩn <strong>Progressive Web App (PWA)</strong>, biểu tượng số Pi (π) đặc trưng của Toán học sẽ được thêm vào màn hình chính của bạn.
              </div>

              {/* INSTALL STATUS / BUTTONS */}
              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="text-xs text-emerald-800 dark:text-emerald-300">
                    <strong>Ứng dụng đã được cài đặt!</strong> Bạn đang chạy ứng dụng trong chế độ độc lập (Standalone mode).
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="text-center py-3">
                  <button
                    onClick={handleDirectInstall}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-base"
                  >
                    <Download className="w-5 h-5" />
                    <span>CÀI ĐẶT NGAY (CHROME / ANDROID / PC)</span>
                  </button>
                </div>
              ) : isIOS ? (
                /* iOS GUIDANCE */
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-3">
                  <div className="font-bold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Hướng dẫn cài đặt trên iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside pl-1">
                    <li className="flex items-center gap-2">
                      <span>1. Nhấn vào biểu tượng <strong>Chia sẻ (Share)</strong></span>
                      <Share2 className="w-4 h-4 text-blue-600 inline" />
                      <span>ở thanh dưới trình duyệt Safari.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>2. Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen)</strong></span>
                      <PlusSquare className="w-4 h-4 text-blue-600 inline" />
                    </li>
                    <li>3. Nhấn <strong>Thêm (Add)</strong> ở góc trên bên phải để hoàn tất.</li>
                  </ol>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Laptop className="w-4 h-4" />
                    <span>Cài đặt trên trình duyệt máy tính:</span>
                  </div>
                  <p>
                    Nhấn vào biểu tượng cài đặt <Download className="w-3.5 h-3.5 inline mx-1" /> ở phía bên phải thanh địa chỉ của trình duyệt Chrome/Edge để tải app về desktop.
                  </p>
                </div>
              )}

              {/* SECURITY RULE MENTION (SECTION 3 & 8) */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Quy định bảo mật (Mục 3):</strong> Sau khi cài đặt ứng dụng về máy, hệ thống sẽ đăng xuất phiên hiện tại và yêu cầu đăng nhập lại để đảm bảo an toàn dữ liệu.
                </span>
              </div>
            </>
          ) : (
            /* UPDATE MODE */
            <div className="space-y-4">
              {updateSuccess ? (
                <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                    Cập nhật thành công lên phiên bản v{newVersion}!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Theo quy định tại Mục 3: Đang đăng xuất tất cả phiên làm việc và chuyển tới màn hình đăng nhập...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Hệ thống sẽ đồng bộ hóa cơ sở dữ liệu mới nhất, cập nhật ngân hàng câu hỏi chuẩn GDPT 2018 và tài liệu khảo thí từ trường TH, THCS Nguyễn Hữu Cảnh.
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Quy định bắt buộc sau khi cập nhật (Mục 3 & 8):</span>
                    </div>
                    <p className="text-amber-800 dark:text-amber-300 pl-5">
                      Bắt buộc đăng xuất phiên đăng nhập hiện tại và yêu cầu tất cả tài khoản đăng nhập lại. Không tự động đăng nhập lại tài khoản trước đó.
                    </p>
                  </div>

                  <button
                    onClick={handleUpdate}
                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>XÁC NHẬN CẬP NHẬT PHIÊN BẢN MỚI</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
