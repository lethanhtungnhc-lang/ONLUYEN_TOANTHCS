export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  phone: string;
  email?: string;
  school: string;
  subject?: string;
  className?: string;
  isLocked: boolean;
  mustChangePassword: boolean;
  createdAt: string;
  lastLoginAt?: string;
  avatarUrl?: string;
}

export type GradeLevel = 6 | 7 | 8 | 9;

export type Semester = 'hk1_mid' | 'hk1_final' | 'hk2_mid' | 'hk2_final';

export interface Chapter {
  id: string;
  grade: GradeLevel;
  semester: Semester;
  title: string;
  order: number;
  description: string;
  lessonCount: number;
}

export interface LessonConcept {
  term: string;
  definition: string;
}

export interface LessonFormula {
  name: string;
  latex: string;
  note?: string;
}

export interface LessonExample {
  title: string;
  question: string;
  solution: string;
  note?: string;
}

export interface LessonSolvingMethod {
  name: string;
  steps: string[];
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  advice: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  grade: GradeLevel;
  title: string;
  order: number;
  objectives: string[];
  requirements: string[]; // Yêu cầu cần đạt
  coreKnowledge: string;
  concepts: LessonConcept[];
  formulas: LessonFormula[];
  examples: LessonExample[];
  solvingMethods: LessonSolvingMethod[];
  commonMistakes: CommonMistake[];
  stepByStepGuide: string;
  answerKeySummary: string;
  practiceQuestions?: Question[];
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'short_answer'
  | 'fill_in'
  | 'matching'
  | 'essay';

export type DifficultyLevel =
  | 'recognition'     // Nhận biết (40%)
  | 'understanding'   // Thông hiểu (30%)
  | 'application'     // Vận dụng (20%)
  | 'high_application' // Vận dụng cao (10%)
  | 'advanced';

export interface QuestionBreakdown {
  analysis: string;        // Phân tích đề bài
  givens: string;          // Dữ kiện đã cho
  requirements: string;    // Yêu cầu cần tìm
  formula: string;         // Công thức áp dụng
  method: string;          // Phương pháp giải
  steps: string[];         // Từng bước giải chi tiết
  conclusion: string;      // Kết luận
  commonMistakes: string;  // Lỗi sai thường gặp
}

export interface Question {
  id: string;
  code?: string;
  grade?: GradeLevel;
  semester?: Semester;
  chapterId?: string;
  lessonId?: string;
  topic?: string;
  type: QuestionType;
  level?: DifficultyLevel;
  difficulty?: DifficultyLevel;
  content: string;
  options?: string[]; // Cho trắc nghiệm 4 phương án A, B, C, D
  matchingPairs?: { left: string; right: string }[];
  correctAnswer?: string | boolean | Record<string, string>;
  explanation?: string;
  breakdown?: QuestionBreakdown;
  stepByStepSolution?: string;
  misconception?: string;
  points?: number;
  competency?: string; // Năng lực Toán học
}

export interface ExamPart {
  partNumber: number;
  title: string;
  instruction?: string;
  description?: string;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  code: string;
  academicYear?: string;
  semester?: any;
  grade: GradeLevel;
  durationMinutes: number;
  schoolName: string;
  copyright?: string;
  examType?: 'regular' | 'mid_term' | 'final_term' | 'admission_10' | 'gifted_math';
  parts: ExamPart[];
  totalPoints: number;
  totalQuestions?: number;
  matrixId?: string;
  specId?: string;
  rubricId?: string;
  createdAt?: string;
}

export interface MatrixRow {
  topicName: string;
  subtopic: string;
  recognitionCount: number;
  recognitionPoints: number;
  understandingCount: number;
  understandingPoints: number;
  applicationCount: number;
  applicationPoints: number;
  highApplicationCount: number;
  highApplicationPoints: number;
  totalPoints: number;
  percentage: number;
  format: string; // TNKQ / Tự luận
}

export interface Matrix {
  id: string;
  examTitle: string;
  grade: GradeLevel;
  duration: number;
  schoolName: string;
  rows: MatrixRow[];
  totalRecognitionPoints: number;
  totalUnderstandingPoints: number;
  totalApplicationPoints: number;
  totalHighApplicationPoints: number;
  grandTotalPoints: number;
  ratio: string; // '40-30-20-10'
}

export interface SpecificationItem {
  stt: number;
  topic: string;
  content: string;
  requirement: string;
  questionFormat: string;
  level: DifficultyLevel;
  competency: string;
  questionCode: string;
  points: number;
}

export interface Specification {
  id: string;
  examTitle: string;
  grade: GradeLevel;
  schoolName: string;
  items: SpecificationItem[];
}

export interface RubricRow {
  questionCode: string;
  part: string;
  detailedGuide: string[]; // Các bước giải
  partialScores: number[]; // Điểm thành phần
  totalPoints: number;
  notes: string;
}

export interface Rubric {
  id: string;
  examTitle: string;
  grade: GradeLevel;
  schoolName: string;
  rows: RubricRow[];
}

export interface Admission10Topic {
  id: string;
  number: number; // 1 to 10
  title: string;
  shortDesc: string;
  coreKeypoints: string[];
  subtopics: string[];
  theorySummary: string;
  formulas: LessonFormula[];
  sampleQuestions: Question[];
  difficultyRatio: {
    recognition: number;
    understanding: number;
    application: number;
    highApplication: number;
  };
}

export interface ThinkingChallenge {
  id: string;
  title: string;
  stars: 1 | 2 | 3 | 4 | 5; // 1: Khởi động, 2: Khá, 3: Giỏi, 4: Xuất sắc, 5: Thử thách
  starLabel: string;
  problem: string;
  hint1: string;
  hint2: string;
  methodHint: string;
  fullSolution: string;
  keyInsight: string;
  alternativeApproach?: string;
  similarProblem?: string;
}

export interface GiftedTopic {
  id: string;
  grade: GradeLevel;
  domain: 'arithmetic' | 'algebra' | 'geometry' | 'combinatorics' | 'applied';
  domainName: string;
  title: string;
  description?: string;
  theoreticalFoundation?: string;
  corePhilosophy: string;
  thinkingIdea: string;
  methods: string[];
  challenges: ThinkingChallenge[];
  officialScope?: string; // Mạch và câu hỏi theo công văn Sở GD&ĐT
  standardTheorems?: { name: string; latex?: string; description?: string; statement?: string; explanation?: string; usageTip?: string }[];
  theoryGuide?: string;
  masterExamples?: { title: string; problem: string; analysis: string; solution: string; comment: string }[];
}

export interface ExamResult {
  id: string;
  userId: string;
  userName: string;
  className?: string;
  examId: string;
  examTitle: string;
  examType: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  submittedAt: string;
  userAnswers: Record<string, any>;
  correctCount: number;
  wrongCount: number;
  topicBreakdown: { topic: string; score: number; maxScore: number }[];
  weakTopics: string[];
  suggestions: string[];
}

export interface Achievement {
  id: string;
  code: 'gold_medal' | 'silver_medal' | 'bronze_medal' | 'trophy' | 'star' | 'brain_badge' | 'fire_streak';
  name: string;
  icon: string;
  description: string;
  criteria: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: GradeLevel;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  academicYear: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image';
  category: 'matrix' | 'spec' | 'exam' | 'rubric' | 'reference' | 'circular_7991';
  grade: GradeLevel;
  chapter?: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  fileUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
}

export interface StudentProgress {
  userId: string;
  completedLessons: string[];
  streakDays: number;
  lastActiveDate: string;
  totalPracticeQuestions: number;
  correctPracticeQuestions: number;
  averageScore: number;
  examsTakenCount: number;
  achievements: Achievement[];
  weakKnowledgeIds: string[];
}
