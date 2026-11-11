import { GradeLevel } from './index';
export type { GradeLevel };

export type Game3DType =
  | 'box_volume'        // Khối 6: Hình hộp CN & Hình lập phương
  | 'integer_space'     // Khối 6: Trục số & Tọa độ không gian
  | 'fraction_gear'     // Khối 6: Phân số & Bánh răng tỉ số
  | 'prism_architect'   // Khối 7: Lăng trụ đứng tam giác & tứ giác
  | 'parallel_laser'    // Khối 7: Góc so le trong & Đường thẳng song song
  | 'triangle_builder'  // Khối 7: Tam giác bằng nhau & Bất đẳng thức
  | 'pyramid_explorer'  // Khối 8: Hình chóp tam giác đều & tứ giác đều
  | 'cube_identity'     // Khối 8: Phân rã hằng đẳng thức (a+b)³
  | 'pythagoras_3d'     // Khối 8: Định lý Pythagore không gian
  | 'revolution_solids' // Khối 9: Hình trụ, Hình nón, Hình cầu
  | 'trig_artillery'    // Khối 9: Tháp pháo lượng giác sin, cos, tan
  | 'sphere_circle';    // Khối 9: Mặt cầu & Thiết diện tròn

export interface GameQuestion3D {
  id: string;
  taskTitle: string;
  problemText: string;
  targetParams?: {
    length?: number;
    width?: number;
    height?: number;
    radius?: number;
    angle?: number;
    slantHeight?: number;
  };
  options: {
    label: string;
    value: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  hint: string;
  formulaLatex: string;
  points: number;
}

export interface Game3DItem {
  id: string;
  type: Game3DType;
  title: string;
  subtitle: string;
  grade: GradeLevel;
  chapterId: string;
  chapterTitle: string;
  lessonId: string;
  lessonTitle: string;
  description: string;
  curriculumStandard: string;
  badge: string;
  difficulty: 'Cơ bản' | 'Thông hiểu' | 'Vận dụng' | 'Thử thách';
  themeColor: string; // Tailwind color class or hex
  tags: string[];
  questions: GameQuestion3D[];
  formulas: {
    name: string;
    latex: string;
    note?: string;
  }[];
}

export interface PlayerGameRecord {
  gameId: string;
  highScore: number;
  stars: number; // 1 to 3 stars
  completedQuestions: number;
  totalQuestions: number;
  lastPlayedAt: string;
}
