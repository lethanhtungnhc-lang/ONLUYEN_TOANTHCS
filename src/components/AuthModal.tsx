import React, { useState } from 'react';
import { X, Lock, User, Phone, Mail, School, ArrowRight, KeyRound, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register_teacher' | 'register_student';
  onLoginSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register_teacher' | 'register_student' | 'change_password' | 'forgot_password'>(
    initialMode
  );

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('Trường TH, THCS Nguyễn Hữu Cảnh');
  const [subject, setSubject] = useState('Toán học');
  const [className, setClassName] = useState('9A1');

  // Change password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tempUserId, setTempUserId] = useState<string>('');

  // Forgot password OTP state
  const [forgotUsername, setForgotUsername] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [targetPhone, setTargetPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [mockOtpHint, setMockOtpHint] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');

  // Status and feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setPassword('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setInputOtp('');
    setOtpSent(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await storageService.login(username, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Đăng nhập không thành công.');
        setIsLoading(false);
        return;
      }

      if (res.mustChangePassword && res.user) {
        setTempUserId(res.user.id);
        setOldPassword(password);
        setMode('change_password');
        setIsLoading(false);
        return;
      }

      if (res.user) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi hệ thống khi đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải từ 6 ký tự trở lên.');
      setIsLoading(false);
      return;
    }

    try {
      const isTeacher = mode === 'register_teacher';
      const res = await storageService.register({
        fullName,
        username,
        passwordPlain: password,
        phone,
        email,
        role: isTeacher ? 'teacher' : 'student',
        school,
        subject: isTeacher ? subject : undefined,
        className: isTeacher ? undefined : className,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Đăng ký không thành công.');
        setIsLoading(false);
        return;
      }

      setSuccessMsg('Đăng ký tài khoản thành công! Bạn hãy đăng nhập để tiếp tục.');
      setMode('login');
      resetForm();
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }

    setIsLoading(true);
    const userId = tempUserId || storageService.getCurrentSession()?.id;
    if (!userId) {
      setErrorMsg('Không xác định được phiên người dùng.');
      setIsLoading(false);
      return;
    }

    const res = await storageService.changePassword(userId, oldPassword, newPassword);
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Đổi mật khẩu thất bại.');
      return;
    }

    setSuccessMsg('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
    setMode('login');
    resetForm();
  };

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = storageService.requestPasswordResetOTP(forgotUsername);
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Không thể tạo OTP.');
      return;
    }

    setOtpSent(true);
    setTargetPhone(res.phone || '');
    setMockOtpHint(res.otpMock || '');
    setSuccessMsg(`Mã OTP đã được gửi đến SĐT: ${res.phone}. (Mã thử nghiệm: ${res.otpMock})`);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (resetNewPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải từ 6 ký tự trở lên.');
      return;
    }

    setIsLoading(true);
    const res = await storageService.verifyOTPAndResetPassword(forgotUsername, inputOtp, resetNewPassword);
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Xác thực OTP thất bại.');
      return;
    }

    setSuccessMsg('Mật khẩu đã được đặt lại thành công! Bạn hãy đăng nhập lại.');
    setMode('login');
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden transition-all">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              {mode === 'login' && 'Đăng nhập hệ thống'}
              {mode === 'register_student' && 'Đăng ký tài khoản Học sinh'}
              {mode === 'register_teacher' && 'Đăng ký tài khoản Giáo viên'}
              {mode === 'change_password' && 'Bắt buộc đổi mật khẩu'}
              {mode === 'forgot_password' && 'Khôi phục mật khẩu & OTP'}
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              Trường TH, THCS Nguyễn Hữu Cảnh
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK NOTICES */}
        {errorMsg && (
          <div className="m-4 mb-0 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="m-4 mb-0 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-6">
          {/* 1. LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin / hocsinh_9a1 / teacher_tung"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot_password');
                    resetForm();
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Quên mật khẩu? (Xác thực OTP)
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <span>{isLoading ? 'Đang xác thực...' : 'ĐĂNG NHẬP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs space-y-2">
                <p className="text-slate-500">Chưa có tài khoản?</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register_student');
                      resetForm();
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Đăng ký Học sinh
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register_teacher');
                      resetForm();
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    Đăng ký Giáo viên
                  </button>
                </div>
              </div>

              {/* DEMO NOTICE FOR ADMIN CONFORMANCE */}
              <div className="mt-3 p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-[11px] text-slate-600 dark:text-slate-400">
                <strong>Ghi chú tài khoản khởi tạo (Mục 5.1):</strong><br />
                • Admin: <code>admin</code> / <code>12345678</code> (Bắt buộc đổi mật khẩu khi đăng nhập lần đầu).<br />
                • Giáo viên: <code>teacher_tung</code> / <code>GiaoVien@2026</code><br />
                • Học sinh: <code>hocsinh_9a1</code> / <code>HocSinh@2026</code>
              </div>
            </form>
          )}

          {/* 2. REGISTER STUDENT / TEACHER */}
          {(mode === 'register_student' || mode === 'register_teacher') && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Họ và tên đầy đủ *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn Nam"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên đăng nhập *
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="nguyennam"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912345678"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {mode === 'register_student' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Lớp học *
                  </label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="6A1">Lớp 6A1</option>
                    <option value="6A2">Lớp 6A2</option>
                    <option value="7A1">Lớp 7A1</option>
                    <option value="7A2">Lớp 7A2</option>
                    <option value="8A1">Lớp 8A1</option>
                    <option value="8A2">Lớp 8A2</option>
                    <option value="9A1">Lớp 9A1</option>
                    <option value="9A2">Lớp 9A2</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Đơn vị công tác
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Môn giảng dạy
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email (nếu có)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu khởi tạo * (ít nhất 6 ký tự)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Lưu ý: Tài khoản mới đăng nhập lần đầu sẽ bắt buộc đổi mật khẩu theo Mục 8 Quy định an toàn.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <span>{isLoading ? 'Đang đăng ký...' : 'HOÀN TẤT ĐĂNG KÝ'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    resetForm();
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  ← Đã có tài khoản? Quay lại Đăng nhập
                </button>
              </div>
            </form>
          )}

          {/* 3. CHANGE PASSWORD (BẮT BUỘC KHI ĐĂNG NHẬP LẦN ĐẦU) */}
          {mode === 'change_password' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-300">
                <strong>Yêu cầu bảo mật:</strong> Đây là lần đăng nhập đầu tiên hoặc tài khoản cần cập nhật mật khẩu. Bạn bắt buộc phải đổi mật khẩu mới để kích hoạt toàn bộ tính năng.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu hiện tại *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Mật khẩu hiện tại"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu mới * (tối thiểu 6 ký tự)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Xác nhận mật khẩu mới *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <span>XÁC NHẬN ĐỔI MẬT KHẨU</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 4. FORGOT PASSWORD & OTP */}
          {mode === 'forgot_password' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleRequestOTP} className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Nhập tên đăng nhập để hệ thống gửi mã OTP xác thực:
                    <br />• <strong>Admin:</strong> OTP gửi về SĐT quản trị <code>0368386787</code>
                    <br />• <strong>Giáo viên/Học sinh:</strong> OTP gửi về SĐT đã đăng ký
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tên đăng nhập *
                    </label>
                    <input
                      type="text"
                      required
                      value={forgotUsername}
                      onChange={(e) => setForgotUsername(e.target.value)}
                      placeholder="admin / teacher_tung / ..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <span>GỬI MÃ OTP XÁC THỰC</span>
                    <KeyRound className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-xs text-blue-800 dark:text-blue-300 space-y-1">
                    <div>Mã OTP 6 chữ số đã được gửi tới số: <strong>{targetPhone}</strong></div>
                    {mockOtpHint && (
                      <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                        * Mã OTP thử nghiệm: <span className="font-bold underline">{mockOtpHint}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nhập mã OTP 6 số *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      placeholder="6 số OTP"
                      className="w-full text-center tracking-widest text-lg font-mono px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mật khẩu mới *
                    </label>
                    <input
                      type="password"
                      required
                      value={resetNewPassword}
                      onChange={(e) => setResetNewPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <span>XÁC THỰC OTP & ĐẶT MẬT KHẨU</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    resetForm();
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  ← Quay lại Đăng nhập
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
