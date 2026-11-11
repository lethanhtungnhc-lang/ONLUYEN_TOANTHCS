import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Lock,
  Unlock,
  KeyRound,
  Trash2,
  Database,
  Download,
  Upload,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { User, AuditLog } from '../types';

interface DashboardAdminProps {
  onBack: () => void;
  onAppUpdateTriggered: () => void;
}

export const DashboardAdmin: React.FC<DashboardAdminProps> = ({
  onBack,
  onAppUpdateTriggered,
}) => {
  const [users, setUsers] = useState<User[]>(storageService.getAllUsers());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(storageService.getAuditLogs());
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'backup' | 'audit' | 'version'>('users');
  const [notice, setNotice] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  const refreshData = () => {
    setUsers(storageService.getAllUsers());
    setAuditLogs(storageService.getAuditLogs());
  };

  const handleToggleLock = (userId: string) => {
    storageService.toggleUserLock(userId);
    refreshData();
    setNotice('Đã cập nhật trạng thái khóa/mở khóa tài khoản!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleChangeRole = (userId: string, newRole: 'teacher' | 'student') => {
    storageService.updateUserRole(userId, newRole);
    refreshData();
    setNotice(`Đã chuyển vai trò tài khoản thành công!`);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleResetPassword = async (userId: string) => {
    const ok = await storageService.adminResetPassword(userId, '12345678');
    if (ok) {
      refreshData();
      setNotice('Đã reset mật khẩu tài khoản về mặc định 12345678 (Bắt buộc đổi mật khẩu khi đăng nhập lại).');
      setTimeout(() => setNotice(''), 4000);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống?')) {
      storageService.deleteUser(userId);
      refreshData();
      setNotice('Đã xóa tài khoản khỏi hệ thống.');
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = storageService.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_toanthcs_nguyenhuucanh_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setNotice('Đã xuất file sao lưu JSON an toàn thành công!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.restoreFromJSON(content);
      if (success) {
        refreshData();
        setNotice('Đã khôi phục thành công toàn bộ cơ sở dữ liệu!');
        setTimeout(() => setNotice(''), 4000);
      } else {
        alert('File sao lưu không hợp lệ hoặc sai cấu trúc.');
      }
    };
    reader.readAsText(file);
  };

  const filteredUsers = users.filter((u) => {
    if (selectedRoleFilter === 'all') return true;
    return u.role === selectedRoleFilter;
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
              <ShieldAlert className="w-7 h-7 text-purple-600" />
              <span>Trung Tâm Quản Trị Hệ Thống (Admin)</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Số điện thoại quản trị: <strong>0368386787</strong> • Toàn quyền cấu hình, phân quyền, sao lưu & khôi phục (Mục 5.1 & 35)
          </p>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeAdminTab === 'users' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Người dùng & Phân quyền
          </button>
          <button
            onClick={() => setActiveAdminTab('backup')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeAdminTab === 'backup' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sao lưu & Khôi phục
          </button>
          <button
            onClick={() => setActiveAdminTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeAdminTab === 'audit' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nhật ký Audit Log
          </button>
          <button
            onClick={() => setActiveAdminTab('version')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeAdminTab === 'version' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phiên bản App
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* OVERVIEW STATS (SECTION 35) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Tổng tài khoản</div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">{users.length}</div>
          <div className="text-[11px] text-slate-400">Admin, Giáo viên, Học sinh</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Ngân hàng câu hỏi</div>
          <div className="text-3xl font-black text-blue-600 font-mono">
            {storageService.getQuestions().length}
          </div>
          <div className="text-[11px] text-blue-500">Chuẩn 4 mức nhận thức</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Đề thi định kỳ</div>
          <div className="text-3xl font-black text-emerald-600 font-mono">
            {storageService.getExams().length}
          </div>
          <div className="text-[11px] text-emerald-500">Kèm ma trận & đặc tả</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase">Tài liệu chuyên môn</div>
          <div className="text-3xl font-black text-purple-600 font-mono">
            {storageService.getDocuments().length}
          </div>
          <div className="text-[11px] text-purple-500">Đề thi, barem, PDF</div>
        </div>
      </div>

      {/* TAB 1: USERS & PERMISSIONS */}
      {activeAdminTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Danh sách Người dùng & Phân quyền (Mục 5.1)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Mật khẩu được lưu trữ dưới dạng mã băm SHA-256 an toàn, không lưu plaintext.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Lọc vai trò:</span>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
              >
                <option value="all">Tất cả</option>
                <option value="admin">Admin</option>
                <option value="teacher">Giáo viên</option>
                <option value="student">Học sinh</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Tên đăng nhập</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3">Số điện thoại</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-right">Thao tác quản trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {u.fullName}
                      {u.role === 'admin' && (
                        <span className="ml-1.5 text-[9px] bg-purple-100 text-purple-800 px-1 py-0.5 rounded font-black">
                          CHỦ QUẢN
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-300">@{u.username}</td>
                    <td className="p-3 font-bold">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : u.role === 'teacher'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{u.phone}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.isLocked
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.isLocked ? 'Đã khóa' : 'Hoạt động'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      {u.role !== 'admin' && (
                        <>
                          <button
                            onClick={() => handleToggleLock(u.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                            title={u.isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                          >
                            {u.isLocked ? (
                              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-amber-600" />
                            )}
                          </button>

                          <button
                            onClick={() => handleResetPassword(u.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                            title="Reset mật khẩu về 12345678"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                          </button>

                          <button
                            onClick={() =>
                              handleChangeRole(u.id, u.role === 'teacher' ? 'student' : 'teacher')
                            }
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 hover:bg-slate-100"
                            title="Đổi vai trò"
                          >
                            Đổi: {u.role === 'teacher' ? 'Học sinh' : 'Giáo viên'}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 text-red-500 transition"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BACKUP & RESTORE */}
      {activeAdminTab === 'backup' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span>Sao lưu & Khôi phục Cơ sở dữ liệu Hệ thống (Mục 5.1 & 35)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Xuất toàn bộ Users, Khối 6–9, Chương, Bài, Ngân hàng đề, Ma trận, Đặc tả, Barem, và Kết quả học tập.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center space-y-3">
              <Download className="w-10 h-10 text-blue-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sao lưu dữ liệu (Export JSON)</h4>
              <p className="text-xs text-slate-500">
                Tải về tệp tin JSON nén đầy đủ toàn bộ dữ liệu ứng dụng để lưu trữ ngoại tuyến an toàn.
              </p>
              <button
                onClick={handleExportBackup}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                TẢI XUỐNG BẢN SAO LƯU (.JSON)
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-3">
              <Upload className="w-10 h-10 text-amber-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Khôi phục dữ liệu (Restore JSON)</h4>
              <p className="text-xs text-slate-500">
                Chọn file backup JSON đã lưu trước đó để khôi phục trạng thái hệ thống.
              </p>
              <label className="inline-block px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition shadow-md cursor-pointer">
                <span>CHỌN FILE ĐỂ KHÔI PHỤC</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>Nhật ký Kiểm toán An ninh & Hệ thống (Audit Logs - Mục 39)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ghi lại mọi hoạt động đăng nhập, đổi mật khẩu, OTP, ra đề, và cập nhật phân quyền.
            </p>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/60 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 sticky top-0">
                  <th className="p-3 w-44">Thời gian</th>
                  <th className="p-3 w-40">Người thực hiện</th>
                  <th className="p-3 w-40">Hành động</th>
                  <th className="p-3">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 text-slate-400 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString('vi-VN')}
                    </td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">{log.userName}</td>
                    <td className="p-3 font-bold text-blue-600">{log.action}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: APP VERSION MANAGEMENT */}
      {activeAdminTab === 'version' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-indigo-600" />
              <span>Quản lý Phiên bản Ứng dụng & Cập nhật PWA (Mục 3 & 35)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Điều phối quy trình nâng cấp phiên bản và ép đăng xuất toàn bộ tài khoản.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 text-xs max-w-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Phiên bản hiện hành:</span>
              <span className="font-mono font-bold text-base text-blue-600 dark:text-blue-400">
                v{storageService.getAppVersion()}
              </span>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-900 dark:text-amber-200 space-y-1">
              <strong>Quy định Mục 3 & 8:</strong> Sau khi kích hoạt cập nhật phiên bản mới, hệ thống bắt buộc đăng xuất phiên đăng nhập hiện tại và yêu cầu tất cả tài khoản đăng nhập lại.
            </div>

            <button
              onClick={() => {
                storageService.triggerAppUpdate();
                onAppUpdateTriggered();
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>NÂNG CẤP PHIÊN BẢN MỚI & ÉP ĐĂNG XUẤT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
