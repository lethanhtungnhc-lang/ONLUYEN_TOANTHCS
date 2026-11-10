import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  Brain,
  Zap,
  FileSpreadsheet,
  FolderOpen,
  User as UserIcon,
  LogIn,
  UserPlus,
  Download,
  RefreshCw,
  Sun,
  Moon,
  LogOut,
  ShieldAlert,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register_teacher' | 'register_student') => void;
  onOpenInstall: () => void;
  onOpenUpdate: () => void;
  onOpenGuide?: () => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onQuickRoleSwitch?: (role: 'teacher' | 'student') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onOpenInstall,
  onOpenUpdate,
  onOpenGuide,
  onLogout,
  darkMode,
  setDarkMode,
  onQuickRoleSwitch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'curriculum', label: 'Học & Ôn tập', icon: BookOpen, desc: 'Toán 6, 7, 8, 9' },
    { id: 'admission10', label: 'Tuyển sinh 10', icon: Target, desc: '10 Chuyên đề & Đề thi' },
    { id: 'gifted', label: 'Học sinh Giỏi', icon: Brain, desc: 'HSG 6-9 & 5⭐ Tư duy' },
    { id: 'arena', label: 'Đấu trường', icon: Zap, desc: 'Đấu trí tốc độ' },
    { id: 'exams', label: 'Đề thi & CV 7991', icon: FileSpreadsheet, desc: 'Ma trận, Đặc tả, Đề' },
    { id: 'documents', label: 'Tài liệu', icon: FolderOpen, desc: 'PDF, DOCX tham khảo' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      {/* TOP NOTIFICATION & BRAND BAR */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
            CV 7991 & GDPT 2018
          </span>
          <span className="font-medium text-blue-100">
            Trường TH, THCS Nguyễn Hữu Cảnh
          </span>
          <span className="hidden md:inline text-blue-300">|</span>
          <span className="hidden md:inline text-blue-200">
            © 2026 Teacher Lê Thanh Tùng. All Rights Reserved.
          </span>
        </div>

        {/* TOP QUICK ACTION BUTTONS AS REQUIRED IN SECTION 4 */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Quick Role Switcher (Chỉ hiển thị Giáo viên / Học sinh - Section 4) */}
          {onQuickRoleSwitch && !currentUser && (
            <div className="hidden sm:flex items-center bg-blue-900/60 rounded-md px-1.5 py-0.5 text-[11px] border border-blue-400/30">
              <span className="text-blue-200 mr-1.5">Vai trò:</span>
              <button
                onClick={() => onQuickRoleSwitch('student')}
                className="px-1.5 py-0.5 rounded text-white hover:bg-blue-600 font-medium transition"
              >
                Học sinh
              </button>
              <span className="text-blue-400 mx-1">|</span>
              <button
                onClick={() => onQuickRoleSwitch('teacher')}
                className="px-1.5 py-0.5 rounded text-white hover:bg-blue-600 font-medium transition"
              >
                Giáo viên
              </button>
            </div>
          )}

          {/* TẢI APP Button */}
          <button
            onClick={onOpenInstall}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-2.5 py-1 rounded text-xs transition shadow-sm"
            title="Cài đặt App trên điện thoại hoặc máy tính"
          >
            <Download className="w-3.5 h-3.5" />
            <span>TẢI APP</span>
          </button>

          {/* CẬP NHẬT APP Button */}
          <button
            onClick={onOpenUpdate}
            className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-2 py-1 rounded text-xs transition border border-indigo-300/30"
            title="Cập nhật phiên bản mới nhất"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>CẬP NHẬT APP</span>
          </button>

          {/* HƯỚNG DẪN & BÀN GIAO (MỤC 45) */}
          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1 bg-blue-900/60 hover:bg-blue-800 text-blue-100 hover:text-white px-2 py-1 rounded text-xs transition border border-blue-400/30"
              title="Xem tài liệu hướng dẫn vận hành & bàn giao"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">HƯỚNG DẪN BÀN GIAO</span>
            </button>
          )}

          {/* SÁNG / TỐI TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded text-blue-200 hover:text-white hover:bg-blue-600/50 transition"
            title="Chuyển đổi giao diện Sáng / Tối"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MAIN NAV HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO & TITLE */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setCurrentTab('curriculum')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              ∑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  APP ÔN LUYỆN TOÁN THCS
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                  K6–9
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
                Hệ thống ôn luyện toàn diện chuẩn GDPT 2018 & CV 7991
              </p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION TABS */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* AUTH & USER CONTROLS */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block leading-tight">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white max-w-[120px] truncate">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">
                      {currentUser.role === 'admin'
                        ? 'Admin'
                        : currentUser.role === 'teacher'
                        ? 'Giáo viên'
                        : `Học sinh ${currentUser.className || ''}`}
                    </div>
                  </div>
                </button>

                {/* USER DROPDOWN MENU */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="font-bold text-slate-900 dark:text-white">{currentUser.fullName}</div>
                      <div className="text-slate-500 text-[11px]">@{currentUser.username}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{currentUser.school}</div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentTab(
                          currentUser.role === 'admin'
                            ? 'admin_dashboard'
                            : currentUser.role === 'teacher'
                            ? 'teacher_dashboard'
                            : 'student_dashboard'
                        );
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                    >
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span>Trang cá nhân & Báo cáo</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setCurrentTab('admin_dashboard');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 font-medium text-purple-600 dark:text-purple-400"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Bảng Quản trị Admin</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuth('login');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Đổi mật khẩu</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>ĐĂNG NHẬP</span>
                </button>

                <div className="relative group">
                  <button
                    onClick={() => onOpenAuth('register_student')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>ĐĂNG KÝ</span>
                  </button>
                </div>
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[11px] opacity-70">{item.desc}</span>
              </button>
            );
          })}

          {currentUser && (
            <button
              onClick={() => {
                setCurrentTab(
                  currentUser.role === 'admin'
                    ? 'admin_dashboard'
                    : currentUser.role === 'teacher'
                    ? 'teacher_dashboard'
                    : 'student_dashboard'
                );
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bảng điều khiển {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
