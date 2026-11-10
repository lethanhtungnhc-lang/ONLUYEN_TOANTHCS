import {
  User,
  Chapter,
  Lesson,
  Question,
  Exam,
  Matrix,
  Specification,
  Rubric,
  ExamResult,
  Achievement,
  ClassRoom,
  DocumentItem,
  AuditLog,
} from '../types';
import {
  INITIAL_CHAPTERS,
  INITIAL_LESSONS,
  INITIAL_QUESTIONS,
  SAMPLE_EXAM_7991,
  SAMPLE_MATRIX_7991,
  SAMPLE_SPECIFICATION_7991,
  SAMPLE_RUBRIC_7991,
  INITIAL_ACHIEVEMENTS,
  INITIAL_CLASSES,
  INITIAL_DOCUMENTS,
} from '../data/mockDatabase';
import { ALL_CURRICULUM_LESSONS, getCurriculumLessonsForChapter } from '../data/allCurriculumLessons';

const STORAGE_KEYS = {
  USERS: 'toanthcs_users_v2',
  SESSION: 'toanthcs_current_session_v2',
  CHAPTERS: 'toanthcs_chapters_v2',
  LESSONS: 'toanthcs_lessons_v2',
  QUESTIONS: 'toanthcs_questions_v2',
  EXAMS: 'toanthcs_exams_v2',
  MATRICES: 'toanthcs_matrices_v2',
  SPECS: 'toanthcs_specs_v2',
  RUBRICS: 'toanthcs_rubrics_v2',
  RESULTS: 'toanthcs_results_v2',
  ACHIEVEMENTS: 'toanthcs_achievements_v2',
  CLASSES: 'toanthcs_classes_v2',
  DOCUMENTS: 'toanthcs_documents_v2',
  AUDIT_LOGS: 'toanthcs_audit_logs_v2',
  APP_VERSION: 'toanthcs_app_version_v2',
  OTP_STORE: 'toanthcs_otp_store_v2',
};

// Simple yet secure SHA-256 hash using Web Crypto API to never store plaintext passwords
export async function hashPassword(password: string): Promise<string> {
  const salt = 'toanthcs_salt_2026_teacher_lethanhtung';
  const msgBuffer = new TextEncoder().encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Internal interface for user with hashed password
export interface StoredUser extends User {
  passwordHash: string;
}

// In-memory OTP store for simulated verification
interface OTPRecord {
  code: string;
  expiresAt: number;
  attempts: number;
  phone: string;
}

class StorageService {
  private users: StoredUser[] = [];
  private currentSession: User | null = null;
  private appVersion: string = '2.6.0';
  private otpRecords: Record<string, OTPRecord> = {};

  constructor() {
    this.initDatabase();
  }

  private async initDatabase() {
    if (typeof window === 'undefined') return;

    // Check version
    const savedVersion = localStorage.getItem(STORAGE_KEYS.APP_VERSION);
    if (!savedVersion) {
      localStorage.setItem(STORAGE_KEYS.APP_VERSION, this.appVersion);
    } else {
      this.appVersion = savedVersion;
    }

    // Initialize Users if not present
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!usersJson) {
      // Create initial Admin account: username: admin, default password: 12345678 (hashed)
      // mustChangePassword: true as required by Section 5.1
      const initialAdminHash = await hashPassword('12345678');
      const teacherHash = await hashPassword('GiaoVien@2026');
      const studentHash = await hashPassword('HocSinh@2026');

      const seedUsers: StoredUser[] = [
        {
          id: 'user-admin',
          username: 'admin',
          fullName: 'Quản trị viên Hệ thống',
          role: 'admin',
          phone: '0368386787',
          email: 'admin@nguyenhuucanh.edu.vn',
          school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
          isLocked: false,
          mustChangePassword: true, // Bắt buộc đổi mật khẩu lần đầu
          createdAt: new Date().toISOString(),
          passwordHash: initialAdminHash,
        },
        {
          id: 'user-teacher-tung',
          username: 'teacher_tung',
          fullName: 'Thầy Lê Thanh Tùng',
          role: 'teacher',
          phone: '0368386787',
          email: 'lethanhtungnhc@gmail.com',
          school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
          subject: 'Toán học',
          isLocked: false,
          mustChangePassword: false,
          createdAt: '2026-09-01T08:00:00Z',
          passwordHash: teacherHash,
        },
        {
          id: 'user-student-demo',
          username: 'hocsinh_9a1',
          fullName: 'Nguyễn Văn An',
          role: 'student',
          phone: '0912345678',
          email: 'an.nguyen@nguyenhuucanh.edu.vn',
          school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
          className: '9A1',
          isLocked: false,
          mustChangePassword: false,
          createdAt: '2026-09-05T08:00:00Z',
          passwordHash: studentHash,
        },
      ];

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
      this.users = seedUsers;
    } else {
      try {
        this.users = JSON.parse(usersJson);
      } catch {
        this.users = [];
      }
    }

    // Initialize or synchronize content collections to full GDPT 2018 KNTT standard
    const storedChapters = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
    if (!storedChapters || JSON.parse(storedChapters).length < INITIAL_CHAPTERS.length) {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(INITIAL_CHAPTERS));
    }
    const storedLessons = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (!storedLessons || JSON.parse(storedLessons).length < ALL_CURRICULUM_LESSONS.length) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(ALL_CURRICULUM_LESSONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXAMS)) {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify([SAMPLE_EXAM_7991]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MATRICES)) {
      localStorage.setItem(STORAGE_KEYS.MATRICES, JSON.stringify([SAMPLE_MATRIX_7991]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SPECS)) {
      localStorage.setItem(STORAGE_KEYS.SPECS, JSON.stringify([SAMPLE_SPECIFICATION_7991]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RUBRICS)) {
      localStorage.setItem(STORAGE_KEYS.RUBRICS, JSON.stringify([SAMPLE_RUBRIC_7991]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      const initialLogs: AuditLog[] = [
        {
          id: 'log-1',
          timestamp: new Date().toISOString(),
          userId: 'system',
          userName: 'Hệ thống',
          action: 'KHỞI TẠO ỨNG DỤNG',
          details: 'Ứng dụng ÔN LUYỆN TOÁN THCS v2.6.0 khởi tạo cơ sở dữ liệu mẫu chuẩn CV 7991.',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initialLogs));
    }

    // Load active session if any, but ensure clean start rule:
    // Session is checked from localStorage
    const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (savedSession) {
      try {
        this.currentSession = JSON.parse(savedSession);
      } catch {
        this.currentSession = null;
      }
    }
  }

  // ---------------- USER & AUTHENTICATION ---------------- //

  public getCurrentSession(): User | null {
    return this.currentSession;
  }

  public async login(username: string, passwordPlain: string): Promise<{ success: boolean; user?: User; error?: string; mustChangePassword?: boolean }> {
    const inputHash = await hashPassword(passwordPlain);
    const user = this.users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());

    if (!user) {
      return { success: false, error: 'Tên đăng nhập không tồn tại trong hệ thống.' };
    }

    if (user.isLocked) {
      return { success: false, error: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin.' };
    }

    if (user.passwordHash !== inputHash) {
      return { success: false, error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.' };
    }

    const safeUser: User = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
      email: user.email,
      school: user.school,
      subject: user.subject,
      className: user.className,
      isLocked: user.isLocked,
      mustChangePassword: user.mustChangePassword,
      createdAt: user.createdAt,
      lastLoginAt: new Date().toISOString(),
    };

    user.lastLoginAt = safeUser.lastLoginAt;
    this.saveUsers();

    this.currentSession = safeUser;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));

    this.addAuditLog(safeUser.id, safeUser.fullName, 'ĐĂNG NHẬP', `Đăng nhập thành công vào vai trò ${safeUser.role.toUpperCase()}`);

    return {
      success: true,
      user: safeUser,
      mustChangePassword: user.mustChangePassword,
    };
  }

  public logout() {
    if (this.currentSession) {
      this.addAuditLog(this.currentSession.id, this.currentSession.fullName, 'ĐĂNG XUẤT', 'Người dùng đã đăng xuất');
    }
    this.currentSession = null;
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  public async register(payload: {
    fullName: string;
    username: string;
    passwordPlain: string;
    phone: string;
    email?: string;
    role: 'teacher' | 'student';
    school?: string;
    subject?: string;
    className?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const exists = this.users.some((u) => u.username.toLowerCase() === payload.username.trim().toLowerCase());
    if (exists) {
      return { success: false, error: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác.' };
    }

    const passwordHash = await hashPassword(payload.passwordPlain);
    const newUser: StoredUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      username: payload.username.trim(),
      fullName: payload.fullName.trim(),
      role: payload.role,
      phone: payload.phone.trim(),
      email: payload.email?.trim() || '',
      school: payload.school || 'Trường TH, THCS Nguyễn Hữu Cảnh',
      subject: payload.role === 'teacher' ? (payload.subject || 'Toán học') : undefined,
      className: payload.role === 'student' ? payload.className : undefined,
      isLocked: false,
      mustChangePassword: true, // Tài khoản mới bắt buộc đổi mật khẩu lần đầu
      createdAt: new Date().toISOString(),
      passwordHash,
    };

    this.users.push(newUser);
    this.saveUsers();
    this.addAuditLog(newUser.id, newUser.fullName, 'ĐĂNG KÝ MỚI', `Tài khoản mới (${payload.role.toUpperCase()}): ${newUser.username}`);

    return { success: true };
  }

  public async changePassword(userId: string, oldPasswordPlain: string, newPasswordPlain: string): Promise<{ success: boolean; error?: string }> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, error: 'Không tìm thấy tài khoản người dùng.' };

    const oldHash = await hashPassword(oldPasswordPlain);
    if (user.passwordHash !== oldHash) {
      return { success: false, error: 'Mật khẩu hiện tại không đúng.' };
    }

    if (newPasswordPlain.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    const newHash = await hashPassword(newPasswordPlain);
    user.passwordHash = newHash;
    user.mustChangePassword = false; // Đã đổi mật khẩu thành công!
    this.saveUsers();

    if (this.currentSession && this.currentSession.id === userId) {
      this.currentSession.mustChangePassword = false;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(this.currentSession));
    }

    this.addAuditLog(user.id, user.fullName, 'ĐỔI MẬT KHẨU', 'Đổi mật khẩu thành công');
    return { success: true };
  }

  // Section 8: OTP Forgotten Password flow
  public requestPasswordResetOTP(username: string): { success: boolean; phone?: string; otpMock?: string; error?: string } {
    const user = this.users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
    if (!user) {
      return { success: false, error: 'Không tìm thấy tài khoản với tên đăng nhập này.' };
    }

    // For Admin: always sends OTP to 0368386787
    const targetPhone = user.role === 'admin' ? '0368386787' : (user.phone || '0368386787');
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    this.otpRecords[username.toLowerCase()] = {
      code: otpCode,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      attempts: 0,
      phone: targetPhone,
    };

    this.addAuditLog(user.id, user.fullName, 'YÊU CẦU OTP', `Gửi mã OTP đặt lại mật khẩu đến số ${targetPhone}`);

    return {
      success: true,
      phone: targetPhone,
      otpMock: otpCode, // Provided so user can test and enter immediately
    };
  }

  public async verifyOTPAndResetPassword(username: string, inputOtp: string, newPasswordPlain: string): Promise<{ success: boolean; error?: string }> {
    const record = this.otpRecords[username.toLowerCase()];
    if (!record) {
      return { success: false, error: 'Vui lòng yêu cầu gửi mã OTP trước.' };
    }

    if (Date.now() > record.expiresAt) {
      return { success: false, error: 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.' };
    }

    if (record.attempts >= 5) {
      return { success: false, error: 'Bạn đã nhập sai OTP quá 5 lần. Vui lòng thử lại sau.' };
    }

    if (record.code !== inputOtp.trim()) {
      record.attempts += 1;
      return { success: false, error: `Mã OTP không chính xác. Bạn còn ${5 - record.attempts} lần thử.` };
    }

    const user = this.users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());
    if (!user) {
      return { success: false, error: 'Không tìm thấy người dùng.' };
    }

    const newHash = await hashPassword(newPasswordPlain);
    user.passwordHash = newHash;
    user.mustChangePassword = false;
    this.saveUsers();

    delete this.otpRecords[username.toLowerCase()];
    this.addAuditLog(user.id, user.fullName, 'ĐẶT LẠI MẬT KHẨU', 'Đặt lại mật khẩu thành công qua xác thực OTP');

    return { success: true };
  }

  // ---------------- USER MANAGEMENT (ADMIN) ---------------- //

  public getAllUsers(): User[] {
    return this.users.map(({ passwordHash, ...safe }) => safe);
  }

  public toggleUserLock(userId: string): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (!user || user.role === 'admin') return false;
    user.isLocked = !user.isLocked;
    this.saveUsers();
    this.addAuditLog('admin', 'Admin', 'KHÓA/MỞ TÀI KHOẢN', `${user.isLocked ? 'Khóa' : 'Mở khóa'} tài khoản ${user.username}`);
    return true;
  }

  public updateUserRole(userId: string, newRole: 'teacher' | 'student'): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (!user || user.role === 'admin') return false;
    user.role = newRole;
    this.saveUsers();
    this.addAuditLog('admin', 'Admin', 'PHÂN QUYỀN', `Cập nhật quyền của ${user.username} thành ${newRole}`);
    return true;
  }

  public async adminResetPassword(userId: string, newPasswordPlain: string): Promise<boolean> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return false;
    user.passwordHash = await hashPassword(newPasswordPlain);
    user.mustChangePassword = true;
    this.saveUsers();
    this.addAuditLog('admin', 'Admin', 'RESET MẬT KHẨU', `Reset mật khẩu cho người dùng ${user.username}`);
    return true;
  }

  public deleteUser(userId: string): boolean {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1 || this.users[index].role === 'admin') return false;
    const deleted = this.users.splice(index, 1)[0];
    this.saveUsers();
    this.addAuditLog('admin', 'Admin', 'XÓA TÀI KHOẢN', `Xóa tài khoản ${deleted.username}`);
    return true;
  }

  private saveUsers() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
  }

  // ---------------- DATA COLLECTIONS ---------------- //

  public getChapters(grade?: number): Chapter[] {
    const all: Chapter[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAPTERS) || '[]');
    return grade ? all.filter((c) => c.grade === grade) : all;
  }

  public getLessons(chapterId?: string): Lesson[] {
    let all: Lesson[] = [];
    try {
      all = JSON.parse(localStorage.getItem(STORAGE_KEYS.LESSONS) || '[]');
    } catch {
      all = [...ALL_CURRICULUM_LESSONS];
    }
    if (all.length === 0) {
      all = [...ALL_CURRICULUM_LESSONS];
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(all));
    }

    if (chapterId) {
      const match = all.filter((l) => l.chapterId === chapterId);
      if (match.length > 0) return match;

      // Generate for this chapter if missing from storage
      const chapter = this.getChapters().find((c) => c.id === chapterId);
      if (chapter) {
        const generated = getCurriculumLessonsForChapter(chapter);
        all.push(...generated);
        localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(all));
        return generated;
      }
      return [];
    }
    return all;
  }

  public getLessonById(lessonId: string): Lesson | undefined {
    const all = this.getLessons();
    const found = all.find((l) => l.id === lessonId);
    if (found) return found;
    return ALL_CURRICULUM_LESSONS.find((l) => l.id === lessonId);
  }

  public getQuestions(filter?: { grade?: number; topic?: string; level?: string; chapterId?: string; lessonId?: string }): Question[] {
    let all: Question[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '[]');
    if (filter) {
      if (filter.grade) all = all.filter((q) => q.grade === filter.grade);
      if (filter.chapterId) all = all.filter((q) => q.chapterId === filter.chapterId);
      if (filter.lessonId) all = all.filter((q) => q.lessonId === filter.lessonId);
      if (filter.topic) all = all.filter((q) => q.topic.toLowerCase().includes(filter.topic!.toLowerCase()));
      if (filter.level) all = all.filter((q) => q.level === filter.level);
    }
    return all;
  }

  public addQuestion(question: Question) {
    const all = this.getQuestions();
    all.unshift(question);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
    this.addAuditLog(this.currentSession?.id || 'sys', this.currentSession?.fullName || 'Teacher', 'THÊM CÂU HỎI', `Thêm câu hỏi mới mã ${question.code}`);
  }

  public updateQuestion(question: Question) {
    const all = this.getQuestions();
    const idx = all.findIndex((q) => q.id === question.id);
    if (idx !== -1) {
      all[idx] = question;
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
    }
  }

  public deleteQuestion(questionId: string) {
    let all = this.getQuestions();
    all = all.filter((q) => q.id !== questionId);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
  }

  // ---------------- EXAMS & CÔNG VĂN 7991 ---------------- //

  public getExams(): Exam[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EXAMS) || '[]');
  }

  public getExamById(id: string): Exam | undefined {
    return this.getExams().find((e) => e.id === id);
  }

  public saveExam(exam: Exam) {
    const all = this.getExams();
    const idx = all.findIndex((e) => e.id === exam.id);
    if (idx !== -1) {
      all[idx] = exam;
    } else {
      all.unshift(exam);
    }
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(all));
    this.addAuditLog(this.currentSession?.id || 'sys', this.currentSession?.fullName || 'User', 'LƯU ĐỀ THI', `Lưu đề: ${exam.title} (Mã ${exam.code})`);
  }

  /**
   * Section 28: Đảo câu hỏi và đảo đáp án - Tạo nhiều mã đề (101, 102, 103, 104)
   * Đảm bảo giữ nguyên mức độ, thang điểm, và tính chính xác của đáp án đúng
   */
  public generateShuffledExam(originalExam: Exam, newCode: string): Exam {
    const shuffledParts = originalExam.parts.map((part) => {
      // Hoán vị thứ tự các câu hỏi trong từng phần
      const shuffledQuestions = [...part.questions].sort(() => Math.random() - 0.5);

      const randomizedQuestions = shuffledQuestions.map((q) => {
        if (q.type === 'multiple_choice' && q.options && q.options.length === 4) {
          // Lưu lại nội dung đáp án đúng hiện tại
          const currentCorrectText = q.correctAnswer as string;
          // Hoán vị các phương án A, B, C, D
          const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
          return {
            ...q,
            options: shuffledOpts,
            correctAnswer: currentCorrectText, // Đáp án đúng vẫn mang nội dung chuẩn
          };
        }
        return { ...q };
      });

      return {
        ...part,
        questions: randomizedQuestions,
      };
    });

    const newExam: Exam = {
      ...originalExam,
      id: `exam-${Date.now()}-${newCode}`,
      code: newCode,
      title: `${originalExam.title} (Mã đề ${newCode})`,
      parts: shuffledParts,
      createdAt: new Date().toISOString(),
    };

    this.saveExam(newExam);
    return newExam;
  }

  public getMatrices(): Matrix[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MATRICES) || '[]');
  }

  public saveMatrix(matrix: Matrix) {
    const all = this.getMatrices();
    const idx = all.findIndex((m) => m.id === matrix.id);
    if (idx !== -1) all[idx] = matrix;
    else all.unshift(matrix);
    localStorage.setItem(STORAGE_KEYS.MATRICES, JSON.stringify(all));
  }

  public getSpecifications(): Specification[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SPECS) || '[]');
  }

  public saveSpecification(spec: Specification) {
    const all = this.getSpecifications();
    const idx = all.findIndex((s) => s.id === spec.id);
    if (idx !== -1) all[idx] = spec;
    else all.unshift(spec);
    localStorage.setItem(STORAGE_KEYS.SPECS, JSON.stringify(all));
  }

  public getRubrics(): Rubric[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RUBRICS) || '[]');
  }

  public saveRubric(rubric: Rubric) {
    const all = this.getRubrics();
    const idx = all.findIndex((r) => r.id === rubric.id);
    if (idx !== -1) all[idx] = rubric;
    else all.unshift(rubric);
    localStorage.setItem(STORAGE_KEYS.RUBRICS, JSON.stringify(all));
  }

  // ---------------- RESULTS & ACHIEVEMENTS ---------------- //

  public getResults(userId?: string): ExamResult[] {
    const all: ExamResult[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS) || '[]');
    return userId ? all.filter((r) => r.userId === userId) : all;
  }

  public saveExamResult(result: ExamResult) {
    const all = this.getResults();
    all.unshift(result);
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(all));

    // Check achievement unlock
    this.checkUnlockAchievements(result);
  }

  public getAchievements(): Achievement[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || '[]');
  }

  private checkUnlockAchievements(latestResult: ExamResult) {
    const achievements = this.getAchievements();
    let updated = false;

    achievements.forEach((ach) => {
      if (!ach.isUnlocked) {
        if (ach.code === 'gold_medal' && latestResult.score >= 10) {
          ach.isUnlocked = true;
          ach.unlockedAt = new Date().toISOString();
          updated = true;
        } else if (ach.code === 'silver_medal' && latestResult.score >= 8.5) {
          ach.isUnlocked = true;
          ach.unlockedAt = new Date().toISOString();
          updated = true;
        } else if (ach.code === 'bronze_medal' && latestResult.score >= 7.0) {
          ach.isUnlocked = true;
          ach.unlockedAt = new Date().toISOString();
          updated = true;
        }
      }
    });

    if (updated) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    }
  }

  // ---------------- CLASSES & DOCUMENTS ---------------- //

  public getClasses(): ClassRoom[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLASSES) || '[]');
  }

  public getDocuments(): DocumentItem[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || '[]');
  }

  public addDocument(doc: DocumentItem) {
    const all = this.getDocuments();
    all.unshift(doc);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(all));
  }

  public deleteDocument(id: string) {
    let all = this.getDocuments();
    all = all.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(all));
  }

  // ---------------- AUDIT LOGS ---------------- //

  public getAuditLogs(): AuditLog[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
  }

  public addAuditLog(userId: string, userName: string, action: string, details: string) {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      action,
      details,
    });
    // Keep max 200 logs
    if (logs.length > 200) logs.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  // ---------------- APP UPDATE & VERSIONING ---------------- //

  public getAppVersion(): string {
    return this.appVersion;
  }

  /**
   * Section 3 & 8: Sau khi cài đặt hoặc cập nhật ứng dụng:
   * Bắt buộc đăng xuất phiên đăng nhập hiện tại và yêu cầu tất cả tài khoản đăng nhập lại.
   * Không tự động đăng nhập lại tài khoản trước đó.
   */
  public triggerAppUpdate(): string {
    const parts = this.appVersion.split('.').map(Number);
    parts[2] = (parts[2] || 0) + 1;
    this.appVersion = parts.join('.');
    localStorage.setItem(STORAGE_KEYS.APP_VERSION, this.appVersion);

    // Force logout current session
    this.logout();

    this.addAuditLog('system', 'Hệ thống', 'CẬP NHẬT PHIÊN BẢN APP', `Nâng cấp phiên bản lên v${this.appVersion}. Toàn bộ phiên đăng nhập được yêu cầu đăng nhập lại.`);
    return this.appVersion;
  }

  // ---------------- BACKUP & RESTORE ---------------- //

  public exportBackupJSON(): string {
    const backupData = {
      appVersion: this.appVersion,
      exportedAt: new Date().toISOString(),
      school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
      copyright: '© 2026 Teacher Lê Thanh Tùng. All Rights Reserved.',
      users: this.users,
      chapters: this.getChapters(),
      lessons: this.getLessons(),
      questions: this.getQuestions(),
      exams: this.getExams(),
      matrices: this.getMatrices(),
      specs: this.getSpecifications(),
      rubrics: this.getRubrics(),
      results: this.getResults(),
      achievements: this.getAchievements(),
      classes: this.getClasses(),
      documents: this.getDocuments(),
      auditLogs: this.getAuditLogs(),
    };
    return JSON.stringify(backupData, null, 2);
  }

  public restoreFromJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (!data.school || !data.users) return false;

      if (data.users) {
        this.users = data.users;
        this.saveUsers();
      }
      if (data.chapters) localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(data.chapters));
      if (data.lessons) localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(data.lessons));
      if (data.questions) localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(data.questions));
      if (data.exams) localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(data.exams));
      if (data.matrices) localStorage.setItem(STORAGE_KEYS.MATRICES, JSON.stringify(data.matrices));
      if (data.specs) localStorage.setItem(STORAGE_KEYS.SPECS, JSON.stringify(data.specs));
      if (data.rubrics) localStorage.setItem(STORAGE_KEYS.RUBRICS, JSON.stringify(data.rubrics));
      if (data.results) localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(data.results));
      if (data.achievements) localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data.achievements));
      if (data.classes) localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(data.classes));
      if (data.documents) localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(data.documents));

      this.logout();
      this.addAuditLog('admin', 'Admin', 'KHÔI PHỤC DỮ LIỆU', 'Đã khôi phục thành công toàn bộ cơ sở dữ liệu từ file sao lưu JSON');
      return true;
    } catch (e) {
      console.error('Restore error:', e);
      return false;
    }
  }
}

export const storageService = new StorageService();
