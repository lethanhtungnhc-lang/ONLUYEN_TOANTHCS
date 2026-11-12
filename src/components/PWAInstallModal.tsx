import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  RefreshCw,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Share2,
  PlusSquare,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { usePWAInstall, DeviceType } from '../hooks/usePWAInstall';
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
  const {
    isInstallable,
    isInstalled,
    detectedPlatform,
    install,
  } = usePWAInstall();

  // Active guide tab: defaults to user's detected device
  const [activeTab, setActiveTab] = useState<DeviceType>(detectedPlatform || 'android');
  const [copiedLink, setCopiedLink] = useState(false);
  const [installStatusMsg, setInstallStatusMsg] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  // Sync active tab when detectedPlatform changes
  useEffect(() => {
    if (detectedPlatform) {
      setActiveTab(detectedPlatform);
    }
  }, [detectedPlatform]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    const updatedVer = storageService.triggerAppUpdate();
    setNewVersion(updatedVer);
    setUpdateSuccess(true);
    // After 2 seconds, force logout & require login per Section 3
    setTimeout(() => {
      onForceLogoutRequired();
      onClose();
    }, 2000);
  };

  const handleDirectInstall = async () => {
    setInstallStatusMsg('Đang kích hoạt trình cài đặt hệ thống...');
    const result = await install();
    if (result.success) {
      setInstallStatusMsg('Cài đặt thành công! Đang hoàn tất cấu hình...');
      setTimeout(() => {
        storageService.logout();
        onForceLogoutRequired();
        onClose();
      }, 1500);
    } else {
      if (result.outcome === 'dismissed') {
        setInstallStatusMsg('Bạn đã hủy tiến trình cài đặt.');
      } else {
        // Fallback when browser blocks automated prompt
        setInstallStatusMsg(
          'Trình duyệt chưa mở popup tự động. Vui lòng xem hướng dẫn chi tiết theo từng bước bên dưới!'
        );
      }
    }
  };

  const handleCopyAppUrl = () => {
    const appUrl = window.location.origin || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(appUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const deviceTabs: { id: DeviceType; label: string; icon: React.FC<{ className?: string }>; sublabel: string }[] = [
    { id: 'android', label: 'Android', icon: Smartphone, sublabel: 'Samsung, Xiaomi, Oppo...' },
    { id: 'ios', label: 'iPhone (iOS)', icon: Smartphone, sublabel: 'Trình duyệt Safari' },
    { id: 'ipad', label: 'iPad (iPadOS)', icon: Tablet, sublabel: 'Màn hình lớn & Pencil' },
    { id: 'laptop', label: 'Laptop', icon: Laptop, sublabel: 'Windows, Mac, ChromeOS' },
    { id: 'pc', label: 'Máy tính bàn (PC)', icon: Monitor, sublabel: 'Ghim Desktop & Start' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden my-auto transition-all">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-inner font-serif text-2xl font-bold border border-white/20">
              {mode === 'install' ? 'π' : <RefreshCw className="w-6 h-6 animate-spin" />}
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                {mode === 'install'
                  ? 'CÀI ĐẶT APP ÔN LUYỆN TOÁN THCS'
                  : 'CẬP NHẬT PHIÊN BẢN ỨNG DỤNG'}
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-2">
                <span>Phiên bản: v{storageService.getAppVersion()}</span>
                <span>•</span>
                <span>Tiêu chuẩn PWA GDPT 2018</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {mode === 'install' ? (
            <>
              {/* 1. APP ICON PREVIEW CARD (MATHEMATICAL PI SYMBOL & TOÁNTHCS BADGE) */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-sky-50/70 dark:from-slate-800/90 dark:via-indigo-950/40 dark:to-slate-800/90 border border-blue-200/80 dark:border-blue-900/60 shadow-sm">
                <img
                  src="/icon.svg"
                  alt="Biểu tượng Pi Nghệ thuật & ToánTHCS"
                  className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/60 dark:border-slate-700 shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight">
                      APP ÔN LUYỆN TOÁN THCS
                    </span>
                    <span className="text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                      Icon Nghệ Thuật: Số Pi (π) + ToánTHCS
                    </span>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-bold mt-0.5">
                    Biểu tượng số Pi (π) Toán học sắc nét nghệ thuật & chữ "ToánTHCS" xuất hiện trên màn hình chính
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    © 2026 Teacher Lê Thanh Tùng • Trường TH, THCS Nguyễn Hữu Cảnh
                  </p>
                </div>
              </div>

              {/* 2. DIRECT 1-CLICK MASTER INSTALL BUTTON */}
              {isInstalled ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="text-xs text-emerald-900 dark:text-emerald-200">
                    <strong className="text-sm font-bold block text-emerald-800 dark:text-emerald-300">
                      Ứng dụng đã được cài đặt thành công!
                    </strong>
                    Bạn đang chạy ứng dụng trong chế độ Standalone. Biểu tượng số Pi (π) đã có trên màn hình chính của bạn.
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleDirectInstall}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-600 hover:from-amber-600 hover:via-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-base sm:text-lg border border-white/20"
                  >
                    <Download className="w-6 h-6 animate-bounce" />
                    <span>CÀI ĐẶT ỨNG DỤNG NGAY (1-CHẠM)</span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </button>

                  {installStatusMsg && (
                    <div className="text-center text-xs font-semibold text-blue-600 dark:text-blue-400 animate-fade-in bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl border border-blue-200 dark:border-blue-800">
                      {installStatusMsg}
                    </div>
                  )}

                  <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
                    Tương thích hoàn hảo: <strong>Android • iPhone • iPad • Laptop • Máy tính bàn PC</strong>
                  </p>
                </div>
              )}

              {/* 3. DEVICE SELECTOR TABS (5 DEVICES) */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span>Hướng dẫn cài đặt chi tiết theo thiết bị:</span>
                  </div>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hidden sm:inline">
                    Chọn đúng thiết bị để xem hướng dẫn
                  </span>
                </div>

                {/* DEVICE BUTTONS */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                  {deviceTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isDetected = detectedPlatform === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative p-2.5 sm:p-2 rounded-xl text-center transition flex flex-col items-center justify-center gap-1 border ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                        }`}
                      >
                        {isDetected && (
                          <span
                            className={`absolute -top-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold tracking-tight ${
                              isActive
                                ? 'bg-amber-400 text-slate-950 shadow-xs'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            Thiết bị của bạn
                          </span>
                        )}
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                        <span className="text-xs leading-none">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 4. TAB CONTENT PER DEVICE */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-4">
                  {/* ANDROID TAB */}
                  {activeTab === 'android' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Cài đặt trên Điện thoại Android (Samsung, Xiaomi, Oppo, Vivo...)
                          </span>
                        </div>
                        <button
                          onClick={handleDirectInstall}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>CÀI ĐẶT CHO ANDROID</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            1
                          </span>
                          <div>
                            <strong>Cách 1 (Nhanh nhất):</strong> Nhấn nút <strong>"CÀI ĐẶT ỨNG DỤNG NGAY"</strong> ở trên, sau đó chọn <strong>"Cài đặt" (Install)</strong> trong hộp thoại xuất hiện.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            2
                          </span>
                          <div>
                            <strong>Cách 2 (Thủ công trên Chrome / Cốc Cốc):</strong> Nhấn vào biểu tượng <strong>dấu 3 chấm (⋮)</strong> ở góc trên cùng bên phải trình duyệt → chọn <strong>"Cài đặt ứng dụng"</strong> (hoặc <strong>"Thêm vào Màn hình chính"</strong>).
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            3
                          </span>
                          <div>
                            <strong>Biểu tượng ứng dụng:</strong> Icon hình tròn chữ <strong>Pi (π)</strong> sẽ được tạo ngay trên màn hình chính của bạn, mở ra chạy toàn màn hình siêu nhanh như ứng dụng từ Google Play.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IPHONE (iOS) TAB */}
                  {activeTab === 'ios' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-lg">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Cài đặt trên Điện thoại iPhone (Hệ điều hành iOS)
                          </span>
                        </div>
                        <button
                          onClick={handleCopyAppUrl}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'ĐÃ SAO CHÉP LINK' : 'SAO CHÉP LINK SAFARI'}</span>
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                        ⚡ <strong>Lưu ý quan trọng cho iPhone:</strong> Mở link bằng trình duyệt <strong>Safari</strong> (nếu đang mở từ Zalo hay Facebook, hãy bấm chia sẻ và chọn "Mở bằng Safari").
                      </div>

                      <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside">
                        <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                          <span>1. Nhấn nút <strong>Chia sẻ (Share)</strong></span>
                          <Share2 className="w-4 h-4 text-blue-600 inline shrink-0" />
                          <span>ở thanh menu dưới cùng của trình duyệt Safari.</span>
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                          <span>2. Cuộn menu xuống và nhấn chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong></span>
                          <PlusSquare className="w-4 h-4 text-blue-600 inline shrink-0" />
                        </li>
                        <li className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          3. Nhấn <strong>"Thêm" (Add)</strong> ở góc trên bên phải màn hình. Biểu tượng chữ <strong>Pi (π)</strong> sẽ xuất hiện trên màn hình iPhone của bạn.
                        </li>
                      </ol>
                    </div>
                  )}

                  {/* IPAD TAB */}
                  {activeTab === 'ipad' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-lg">
                            <Tablet className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Cài đặt trên Máy tính bảng iPad (iPadOS)
                          </span>
                        </div>
                        <button
                          onClick={handleCopyAppUrl}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'ĐÃ SAO CHÉP LINK' : 'SAO CHÉP LINK SAFARI'}</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            1
                          </span>
                          <div>
                            Mở ứng dụng trên trình duyệt <strong>Safari</strong> của iPad.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            2
                          </span>
                          <div>
                            Nhìn lên <strong>thanh công cụ phía trên bên phải</strong> của iPad, nhấn vào biểu tượng <strong>Chia sẻ (Share <Share2 className="w-3.5 h-3.5 inline text-blue-600" />)</strong>.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            3
                          </span>
                          <div>
                            Chọn mục <strong>"Thêm vào MH chính" (Add to Home Screen)</strong> → Nhấn <strong>"Thêm" (Add)</strong>. Ứng dụng chạy toàn màn hình, tương thích vẽ hình học và bút cảm ứng Apple Pencil.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LAPTOP TAB */}
                  {activeTab === 'laptop' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 rounded-lg">
                            <Laptop className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Cài đặt trên Laptop (Windows, MacBook, Chromebook)
                          </span>
                        </div>
                        <button
                          onClick={handleDirectInstall}
                          className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>CÀI ĐẶT CHO LAPTOP</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            1
                          </span>
                          <div>
                            <strong>Cách 1:</strong> Bấm nút <strong>"CÀI ĐẶT ỨNG DỤNG NGAY"</strong> ở trên để trình duyệt bật hộp thoại cài đặt lập tức.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            2
                          </span>
                          <div>
                            <strong>Cách 2 (Trên thanh URL):</strong> Nhìn vào góc phải thanh nhập địa chỉ web của Chrome / Microsoft Edge, nhấn vào biểu tượng <strong>"Cài đặt ứng dụng"</strong> (hình máy tính nhỏ kèm mũi tên hoặc dấu cộng <Download className="w-3 h-3 inline text-blue-600" />).
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            3
                          </span>
                          <div>
                            Ứng dụng mở trong cửa sổ ứng dụng riêng biệt, không chiếm dụng thanh tab, có thể ghim vào thanh Taskbar để mở nhanh.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PC (DESKTOP) TAB */}
                  {activeTab === 'pc' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 rounded-lg">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            Cài đặt trên Máy tính để bàn PC (Windows, macOS, Linux)
                          </span>
                        </div>
                        <button
                          onClick={handleDirectInstall}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>CÀI ĐẶT CHO PC</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            1
                          </span>
                          <div>
                            <strong>Cài đặt 1-chạm:</strong> Bấm nút <strong>"CÀI ĐẶT ỨNG DỤNG NGAY"</strong> ở phía trên.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            2
                          </span>
                          <div>
                            <strong>Menu Trình duyệt:</strong> Mở Chrome, Edge hoặc Cốc Cốc → Bấm dấu 3 chấm <strong>⋮</strong> → <strong>"Lưu và chia sẻ"</strong> → <strong>"Cài đặt APP ÔN LUYỆN TOÁN THCS"</strong>.
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                            3
                          </span>
                          <div>
                            <strong>Lối tắt màn hình Desktop:</strong> Hệ thống tự động tạo icon số <strong>Pi (π)</strong> ngoài Desktop và trong Start Menu, chạy độc lập không phụ thuộc vào trình duyệt.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. SECURITY RULES (SECTION 3 & 8) */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Quy định bảo mật (Mục 3):</strong> Sau khi cài đặt ứng dụng vào thiết bị, hệ thống sẽ đăng xuất phiên hiện tại và yêu cầu đăng nhập lại để đảm bảo an toàn tuyệt đối cho tài khoản giáo viên và học sinh.
                </span>
              </div>
            </>
          ) : (
            /* ============================================================== */
            /* UPDATE MODE */
            /* ============================================================== */
            <div className="space-y-4">
              {updateSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-base">
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

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
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
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RefreshCw className="w-5 h-5" />
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
