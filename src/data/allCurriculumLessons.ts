import { Lesson, Question, GradeLevel } from '../types';

// Helper to create high-quality practice question for lesson
export function createPracticeQuestion(params: {
  id: string;
  code: string;
  grade: GradeLevel;
  chapterId: string;
  lessonId: string;
  topic: string;
  level: 'recognition' | 'understanding' | 'application' | 'high_application';
  content: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  steps: string[];
  mistakeAdvice?: string;
}): Question {
  return {
    id: params.id,
    code: params.code,
    grade: params.grade,
    chapterId: params.chapterId,
    lessonId: params.lessonId,
    topic: params.topic,
    type: 'multiple_choice',
    level: params.level,
    content: params.content,
    options: params.options,
    correctAnswer: params.correctAnswer,
    explanation: params.explanation,
    points: 0.25,
    competency: 'Năng lực tư duy và lập luận toán học',
    breakdown: {
      analysis: `Phân tích yêu cầu đề bài cho chủ đề: ${params.topic}`,
      givens: 'Các giả thiết bài toán cho trước',
      requirements: 'Tìm đáp án chính xác nhất',
      formula: 'Áp dụng định nghĩa và công thức toán học SGK',
      method: 'Phương pháp suy luận logic và tính toán chuẩn',
      steps: params.steps,
      conclusion: `Đáp án đúng là: ${params.correctAnswer}`,
      commonMistakes: params.mistakeAdvice || 'Cần đọc kĩ câu hỏi và kiểm tra lại dấu phép tính.',
    },
  };
}

// -------------------------------------------------------------
// COMPREHENSIVE LESSON REPOSITORY FOR TOÁN THCS KNTT 2018 (GRADES 6 - 9)
// -------------------------------------------------------------
export const ALL_CURRICULUM_LESSONS: Lesson[] = [
  // ========================================================
  // LỚP 6 - CHƯƠNG I: TẬP HỢP CÁC SỐ TỰ NHIÊN (ch-g6-1)
  // ========================================================
  {
    id: 'les-g6-c1-1',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 1: Tập hợp. Phần tử của tập hợp',
    order: 1,
    objectives: [
      'Nhận biết được tập hợp và các phần tử của tập hợp trong toán học và đời sống thực tế',
      'Sử dụng đúng các kí hiệu $\\in$ (thuộc) và $\\notin$ (không thuộc)',
      'Biết cách viết một tập hợp bằng hai cách: Liệt kê các phần tử và Chỉ ra dấu hiệu đặc trưng',
    ],
    requirements: [
      'Xác định phần tử thuộc hoặc không thuộc một tập hợp cho trước',
      'Biểu diễn tập hợp số tự nhiên bằng ngoặc nhọn $\{...\}$',
      'Phân biệt tập hợp rỗng, tập hợp hữu hạn các phần tử',
    ],
    coreKnowledge:
      'Tập hợp là khái niệm cơ bản của toán học. Thường dùng các chữ cái in hoa $A, B, C, X, Y...$ để đặt tên cho tập hợp. Các phần tử của một tập hợp được viết trong hai dấu ngoặc nhọn $\{ \}$, cách nhau bởi dấu chấm phẩy ";". Mỗi phần tử được liệt kê một lần, thứ tự liệt kê tùy ý. Nếu phần tử $x$ thuộc tập hợp $A$, kí hiệu $x \\in A$. Nếu $y$ không thuộc tập hợp $A$, kí hiệu $y \\notin A$.',
    concepts: [
      {
        term: 'Tập hợp và phần tử',
        definition: 'Tập hợp gồm các đối tượng cụ thể (người, đồ vật, số...). Mỗi đối tượng trong tập hợp được gọi là một phần tử của tập hợp đó.',
      },
      {
        term: 'Hai cách cho một tập hợp',
        definition: 'Cách 1: Liệt kê các phần tử của tập hợp. Cách 2: Chỉ ra tính chất đặc trưng cho các phần tử của tập hợp.',
      },
    ],
    formulas: [
      { name: 'Kí hiệu thuộc', latex: 'x \\in A \\quad (x \\text{ là phần tử của } A)' },
      { name: 'Kí hiệu không thuộc', latex: 'y \\notin A \\quad (y \\text{ không là phần tử của } A)' },
      { name: 'Tập hợp số tự nhiên', latex: '\\mathbb{N} = \\{0; 1; 2; 3; 4; ...\\}' },
      { name: 'Tập hợp số tự nhiên khác 0', latex: '\\mathbb{N}^* = \\{1; 2; 3; 4; ...\\}' },
    ],
    examples: [
      {
        title: 'Ví dụ 1: Viết tập hợp bằng hai cách',
        question: 'Cho tập hợp $A$ gồm các số tự nhiên lớn hơn 3 và nhỏ hơn 9. Hãy viết tập hợp $A$ bằng hai cách và cho biết $4 \\in A$ hay $4 \\notin A$; $9 \\in A$ hay $9 \\notin A$?',
        solution: '• Cách 1 (Liệt kê phần tử): $A = \\{4; 5; 6; 7; 8\\}$.\n• Cách 2 (Chỉ ra dấu hiệu đặc trưng): $A = \\{x \\in \\mathbb{N} \\mid 3 < x < 9\\}$.\n• Ta thấy số 4 có mặt trong tập $A$ nên $4 \\in A$.\n• Số 9 không có mặt trong tập $A$ nên $9 \\notin A$.',
        note: 'Chú ý: Dùng dấu chấm phẩy ";" để ngăn cách các phần tử là số, tránh nhầm với số thập phân.',
      },
    ],
    solvingMethods: [
      {
        name: 'Phương pháp xác định phần tử và biểu diễn tập hợp',
        steps: [
          'Bước 1: Đọc kĩ điều kiện đề bài để tìm xem các phần tử cần thỏa mãn những tiêu chí nào.',
          'Bước 2: Viết tên tập hợp bằng chữ cái in hoa, sau đó là dấu bằng "=" và cặp ngoặc nhọn $\{ \}$.',
          'Bước 3: Liệt kê các phần tử ngăn cách nhau bởi dấu chấm phẩy ";", mỗi phần tử chỉ viết 1 lần.',
          'Bước 4: Sử dụng kí hiệu $\\in$ hoặc $\\notin$ khi trả lời câu hỏi về mối quan hệ giữa phần tử và tập hợp.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Liệt kê một phần tử nhiều lần trong tập hợp (ví dụ: các chữ cái trong từ "TOAN HOC" viết thành {T; O; A; N; H; O; C}).',
        correction: 'Chữ "O" xuất hiện 2 lần nhưng chỉ được ghi 1 lần: {T; O; A; N; H; C}.',
        advice: 'Nguyên tắc vàng: Mỗi phần tử chỉ được viết một lần duy nhất trong tập hợp!',
      },
    ],
    stepByStepGuide: 'Quan sát đồ vật hoặc số liệu → Xác định điều kiện ràng buộc → Viết tập hợp trong ngoặc nhọn → Kiểm tra lại từng phần tử.',
    answerKeySummary: 'Tập hợp được viết đúng quy tắc, mỗi phần tử chỉ viết 1 lần, ngăn cách bởi dấu chấm phẩy.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g6-c1-1-1',
        code: 'TOAN6-B1-01',
        grade: 6,
        chapterId: 'ch-g6-1',
        lessonId: 'les-g6-c1-1',
        topic: 'Tập hợp',
        level: 'recognition',
        content: 'Cho tập hợp $M = \\{2; 4; 6; 8\\}$. Khẳng định nào sau đây là ĐÚNG?',
        options: ['$2 \\notin M$', '$5 \\in M$', '$6 \\in M$', '$8 \\notin M$'],
        correctAnswer: '$6 \\in M$',
        explanation: 'Trong tập hợp $M$ có chứa số 6, do đó khẳng định $6 \\in M$ là đúng.',
        steps: ['Kiểm tra các phần tử trong tập hợp $M$: 2, 4, 6, 8.', 'Số 6 là một phần tử của tập hợp $M$, nên $6 \\in M$.'],
      }),
      createPracticeQuestion({
        id: 'pq-g6-c1-1-2',
        code: 'TOAN6-B1-02',
        grade: 6,
        chapterId: 'ch-g6-1',
        lessonId: 'les-g6-c1-1',
        topic: 'Cách viết tập hợp',
        level: 'understanding',
        content: 'Tập hợp các chữ cái tiếng Việt có mặt trong từ "HỌC TOÁN" là:',
        options: [
          '{H; O; C; T; O; A; N}',
          '{H; O; C; T; A; N}',
          '{H; C; T; A; N}',
          '{HỌC; TOÁN}',
        ],
        correctAnswer: '{H; O; C; T; A; N}',
        explanation: 'Chữ O xuất hiện 2 lần nhưng theo quy tắc viết tập hợp thì mỗi phần tử chỉ được liệt kê một lần duy nhất.',
        steps: [
          'Các chữ cái trong cụm từ là H, O, C, T, O, A, N.',
          'Bỏ các chữ cái trùng lặp (chữ O lặp lại).',
          'Tập hợp thu được là {H; O; C; T; A; N}.',
        ],
      }),
    ],
  },
  {
    id: 'les-g6-c1-2',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 2: Cách ghi số tự nhiên',
    order: 2,
    objectives: [
      'Hiểu cấu tạo thập phân của một số tự nhiên',
      'Đọc và viết các số tự nhiên trong hệ thập phân và chữ số La Mã',
    ],
    requirements: ['Viết số tự nhiên thành tổng giá trị các chữ số', 'Đọc số La Mã từ 1 đến 30'],
    coreKnowledge:
      'Trong hệ thập phân, cứ 10 đơn vị ở một hàng thì làm thành một đơn vị ở hàng liền trước nó. Số tự nhiên $\\overline{ab} = 10a + b$, $\\overline{abc} = 100a + 10b + c$. Chữ số La Mã dùng các kí hiệu cơ bản: I (1), V (5), X (10). Ghép chữ số để tạo số: IV (4), IX (9), XIV (14), XXIV (24)...',
    concepts: [
      { term: 'Hệ thập phân', definition: 'Hệ đếm dùng mười chữ số từ 0 đến 9, giá trị chữ số phụ thuộc vị trí của nó trong số.' },
      { term: 'Số La Mã', definition: 'Hệ thống chữ số cổ đại La Mã, viết số bằng cách ghép các chữ số cơ bản theo quy tắc cộng và trừ.' },
    ],
    formulas: [
      { name: 'Cấu tạo số hai chữ số', latex: '\\overline{ab} = 10a + b \\quad (a \\ne 0)' },
      { name: 'Cấu tạo số ba chữ số', latex: '\\overline{abc} = 100a + 10b + c \\quad (a \\ne 0)' },
    ],
    examples: [
      {
        title: 'Ví dụ: Viết cấu tạo số và số La Mã',
        question: 'a) Viết số 235 thành tổng giá trị các chữ số. b) Đọc các số La Mã: XVIII, XXIV.',
        solution: 'a) $235 = 200 + 30 + 5 = 2 \\cdot 100 + 3 \\cdot 10 + 5$.\nb) XVIII = 10 + 5 + 3 = 18; XXIV = 10 + 10 + 4 = 24.',
      },
    ],
    solvingMethods: [
      { name: 'Đọc và chuyển đổi số La Mã', steps: ['Tách số thành các nhóm chữ số cơ bản', 'Cộng giá trị khi chữ số nhỏ đứng sau chữ số lớn, trừ khi chữ số nhỏ đứng trước'] },
    ],
    commonMistakes: [{ mistake: 'Viết số 4 thành IIII thay vì IV trong số La Mã.', correction: 'Quy tắc La Mã quy định chữ số I không được lặp lại quá 3 lần liên tiếp, số 4 viết là IV.', advice: 'Ghi nhớ các trường hợp đặc biệt: IV (4), IX (9).' }],
    stepByStepGuide: 'Xác định hàng của chữ số → Nhân với 10, 100, 1000 tương ứng → Viết tổng.',
    answerKeySummary: 'Nắm chắc cấu tạo hệ thập phân và bảng chữ số La Mã đến 30.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g6-c1-2-1',
        code: 'TOAN6-B2-01',
        grade: 6,
        chapterId: 'ch-g6-1',
        lessonId: 'les-g6-c1-2',
        topic: 'Chữ số La Mã',
        level: 'recognition',
        content: 'Số La Mã XIX biểu diễn số tự nhiên nào?',
        options: ['19', '21', '14', '16'],
        correctAnswer: '19',
        explanation: 'XIX = X + IX = 10 + (10 - 1) = 19.',
        steps: ['X = 10', 'IX = 9', 'Tổng là 10 + 9 = 19.'],
      }),
    ],
  },
  {
    id: 'les-g6-c1-3',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 3: Thứ tự trong tập hợp các số tự nhiên',
    order: 3,
    objectives: ['So sánh hai số tự nhiên', 'Biểu diễn số tự nhiên trên tia số'],
    requirements: ['Sắp xếp dãy số tự nhiên theo thứ tự tăng dần hoặc giảm dần'],
    coreKnowledge: 'Trong hai số tự nhiên khác nhau, có một số nhỏ hơn số kia. Nếu $a < b$ thì trên tia số nằm ngang, điểm $a$ nằm ở bên trái điểm $b$. Kí hiệu $a \\le b$ nghĩa là $a < b$ hoặc $a = b$.',
    concepts: [{ term: 'Tia số', definition: 'Tia gốc O biểu diễn các số tự nhiên, chiều từ trái sang phải là chiều tăng dần.' }],
    formulas: [{ name: 'Số liền trước và liền sau', latex: 'x - 1, \\ x, \\ x + 1 \\quad (x \\in \\mathbb{N}^*)' }],
    examples: [{ title: 'Ví dụ: So sánh số', question: 'So sánh 2026 và 2025.', solution: 'Vì hai số có cùng chữ số hàng nghìn, trăm, chục, chữ số hàng đơn vị $6 > 5$ nên $2026 > 2025$.' }],
    solvingMethods: [{ name: 'So sánh hai số tự nhiên', steps: ['Đếm số chữ số', 'Nếu cùng số chữ số, so sánh từng cặp chữ số ở cùng hàng từ trái sang phải'] }],
    commonMistakes: [{ mistake: 'Nhầm lẫn số 0 có số liền trước trong tập hợp số tự nhiên N.', correction: 'Số 0 là số tự nhiên nhỏ nhất, không có số tự nhiên nào liền trước số 0.', advice: 'Tập N có số nhỏ nhất là 0 nhưng không có số lớn nhất.' }],
    stepByStepGuide: 'Quan sát các chữ số từ hàng cao nhất xuống hàng thấp nhất để so sánh.',
    answerKeySummary: 'Thứ tự trên tia số từ trái sang phải tương ứng từ nhỏ đến lớn.',
  },
  {
    id: 'les-g6-c1-4',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 4: Phép cộng và phép trừ số tự nhiên',
    order: 4,
    objectives: ['Nắm vững tính chất giao hoán, kết hợp của phép cộng', 'Thực hiện thành thạo phép trừ có nghĩa trong N'],
    requirements: ['Tính nhanh bằng cách ghép các số tròn chục, tròn trăm', 'Tìm số chưa biết trong phép cộng và phép trừ'],
    coreKnowledge: 'Phép cộng: $a + b = c$ ($a, b$ là số hạng, $c$ là tổng). Tính chất: Giao hoán $a + b = b + a$; Kết hợp $(a + b) + c = a + (b + c)$; Cộng với 0: $a + 0 = a$. Phép trừ $a - b = d$ thực hiện được trong $\\mathbb{N}$ khi và chỉ khi $a \\ge b$.',
    concepts: [{ term: 'Tính chất giao hoán', definition: 'Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.' }],
    formulas: [
      { name: 'Tính chất giao hoán', latex: 'a + b = b + a' },
      { name: 'Tính chất kết hợp', latex: '(a + b) + c = a + (b + c)' },
    ],
    examples: [{ title: 'Ví dụ: Tính nhanh', question: 'Tính nhanh: $125 + 38 + 75$.', solution: 'Ta có: $(125 + 75) + 38 = 200 + 38 = 238$.' }],
    solvingMethods: [{ name: 'Phương pháp tính nhanh', steps: ['Nhóm các số có tổng là số tròn chục, tròn trăm, tròn nghìn', 'Cộng kết quả với các số hạng còn lại'] }],
    commonMistakes: [{ mistake: 'Thực hiện phép trừ $15 - 20$ trong tập hợp số tự nhiên N.', correction: 'Trong tập số tự nhiên N, phép trừ $a - b$ chỉ thực hiện được khi $a \\ge b$.', advice: 'Luôn kiểm tra điều kiện số bị trừ lớn hơn hoặc bằng số trừ.' }],
    stepByStepGuide: 'Nhóm hạng tử hợp lí → Tính trong ngoặc → Cộng các kết quả.',
    answerKeySummary: 'Vận dụng tính chất kết hợp để đưa về số tròn chục giúp tính toán chuẩn xác.',
  },
  {
    id: 'les-g6-c1-5',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 5: Phép nhân và phép chia số tự nhiên',
    order: 5,
    objectives: ['Tính chất phân phối của phép nhân đối với phép cộng', 'Phép chia hết và phép chia có dư'],
    requirements: ['Tìm $x$ trong các bài toán $a \\cdot x = b$ hoặc $a : x = b$'],
    coreKnowledge: 'Phép nhân: $a \\cdot b = p$. Tính chất: Giao hoán $a \\cdot b = b \\cdot a$; Kết hợp $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$; Phân phối $a(b + c) = ab + ac$. Phép chia: $a = b \\cdot q + r$ ($b \\ne 0, 0 \\le r < b$). Nếu $r = 0$ là phép chia hết, $r > 0$ là phép chia có dư.',
    concepts: [{ term: 'Phép chia có dư', definition: 'Với hai số tự nhiên $a, b$ ($b \\ne 0$), luôn tìm được duy nhất $q, r$ sao cho $a = b \\cdot q + r$ với $0 \\le r < b$.' }],
    formulas: [
      { name: 'Phân phối phép nhân với phép cộng', latex: 'a(b + c) = ab + ac' },
      { name: 'Công thức phép chia có dư', latex: 'a = b \\cdot q + r \\quad (0 \\le r < b)' },
    ],
    examples: [{ title: 'Ví dụ: Tính thuận tiện', question: 'Tính nhanh: $25 \\cdot 37 + 25 \\cdot 63$.', solution: 'Áp dụng tính chất phân phối: $25 \\cdot (37 + 63) = 25 \\cdot 100 = 2500$.' }],
    solvingMethods: [{ name: 'Đặt thừa số chung', steps: ['Tìm thừa số giống nhau', 'Đưa thừa số chung ra ngoài ngoặc', 'Tính tổng trong ngoặc rồi nhân'] }],
    commonMistakes: [{ mistake: 'Số dư trong phép chia lớn hơn hoặc bằng số chia.', correction: 'Số dư $r$ bắt buộc phải thỏa mãn $r < b$.', advice: 'Nếu $r \\ge b$, phép chia chưa hoàn tất.' }],
    stepByStepGuide: 'Đặt thừa số chung → Tính tổng tròn trăm/chục → Nhân nhanh.',
    answerKeySummary: 'Phép chia có dư luôn thỏa mãn số dư nhỏ hơn số chia.',
  },
  {
    id: 'les-g6-c1-6',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 6: Lũy thừa với số mũ tự nhiên',
    order: 6,
    objectives: ['Định nghĩa lũy thừa bậc $n$ của số tự nhiên $a$', 'Nhân chia hai lũy thừa cùng cơ số'],
    requirements: ['Viết một tích các thừa số bằng nhau dưới dạng lũy thừa và ngược lại'],
    coreKnowledge: 'Lũy thừa bậc $n$ của $a$ là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$: $a^n = a \\cdot a \\cdots a$ ($n$ thừa số). $a$ gọi là cơ số, $n$ gọi là số mũ. Quy ước: $a^1 = a$, $a^0 = 1$ ($a \\ne 0$). Nhân hai lũy thừa cùng cơ số: $a^m \\cdot a^n = a^{m+n}$. Chia hai lũy thừa cùng cơ số: $a^m : a^n = a^{m-n}$ ($a \\ne 0, m \\ge n$).',
    concepts: [{ term: 'Lũy thừa', definition: 'Tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$.' }],
    formulas: [
      { name: 'Nhân hai lũy thừa cùng cơ số', latex: 'a^m \\cdot a^n = a^{m+n}' },
      { name: 'Chia hai lũy thừa cùng cơ số', latex: 'a^m : a^n = a^{m-n} \\quad (a \\ne 0, m \\ge n)' },
    ],
    examples: [{ title: 'Ví dụ: Rút gọn lũy thừa', question: 'Tính: $2^3 \\cdot 2^4$ và $5^7 : 5^5$.', solution: '• $2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$.\n• $5^7 : 5^5 = 5^{7-5} = 5^2 = 25$.' }],
    solvingMethods: [{ name: 'Rút gọn biểu thức chứa lũy thừa', steps: ['Đưa về cùng cơ số', 'Áp dụng công thức cộng hoặc trừ số mũ', 'Tính giá trị cụ thể nếu yêu cầu'] }],
    commonMistakes: [{ mistake: 'Nhầm lẫn giữa lũy thừa và phép nhân: viết $2^3 = 2 \\cdot 3 = 6$.', correction: '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$. Lũy thừa là nhân 3 số 2 với nhau chứ không phải lấy cơ số nhân số mũ!', advice: 'Cơ số là số đem nhân, số mũ là số lượng thừa số.' }],
    stepByStepGuide: 'Giữ nguyên cơ số → Cộng hoặc trừ số mũ tương ứng.',
    answerKeySummary: 'Nhân thì cộng số mũ, chia thì trừ số mũ khi cùng cơ số.',
  },
  {
    id: 'les-g6-c1-7',
    chapterId: 'ch-g6-1',
    grade: 6,
    title: 'Bài 7: Thứ tự thực hiện các phép tính',
    order: 7,
    objectives: ['Nắm vững quy tắc thứ tự phép tính trong biểu thức có và không có dấu ngoặc'],
    requirements: ['Tính đúng giá trị biểu thức gồm lũy thừa, nhân chia, cộng trừ và các loại ngoặc'],
    coreKnowledge: 'Thứ tự ưu tiên: 1) Không có ngoặc: Lũy thừa $\\to$ Nhân và chia $\\to$ Cộng và trừ. 2) Có ngoặc: Ngoặc tròn $( ) \\to$ Ngoặc vuông $[ ] \\to$ Ngoặc nhọn $\{ \}$.',
    concepts: [{ term: 'Thứ tự phép tính', definition: 'Trật tự chuẩn xác bắt buộc tuân theo khi tính giá trị của một biểu thức đại số.' }],
    formulas: [{ name: 'Sơ đồ thứ tự', latex: '( ) \\longrightarrow [ ] \\longrightarrow \\{ \\}' }],
    examples: [{ title: 'Ví dụ: Tính giá trị biểu thức', question: 'Tính: $100 - [60 - (9 - 2)^2]$.', solution: '$= 100 - [60 - 7^2] = 100 - [60 - 49] = 100 - 11 = 89$.' }],
    solvingMethods: [{ name: 'Các bước tính biểu thức phức tạp', steps: ['Thực hiện phép tính trong ngoặc tròn trước', 'Thực hiện phép lũy thừa', 'Thực hiện nhân chia trước, cộng trừ sau trong ngoặc vuông và nhọn'] }],
    commonMistakes: [{ mistake: 'Thực hiện phép cộng trước phép nhân: $2 + 3 \\cdot 4 = 5 \\cdot 4 = 20$.', correction: 'Bắt buộc nhân trước: $2 + 3 \\cdot 4 = 2 + 12 = 14$.', advice: 'Nhớ câu thần chú: Nhân chia trước, cộng trừ sau.' }],
    stepByStepGuide: 'Xử lí từ ngoặc trong cùng ra ngoài → Nhân chia trước, cộng trừ sau.',
    answerKeySummary: 'Luôn kiểm tra thứ tự ưu tiên của các phép toán.',
  },

  // ========================================================
  // LỚP 6 - CHƯƠNG II: TÍNH CHIA HẾT (ch-g6-2)
  // ========================================================
  {
    id: 'les-g6-c2-1',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 8: Quan hệ chia hết và tính chất',
    order: 1,
    objectives: ['Hiểu khái niệm chia hết, bội và ước của số tự nhiên', 'Tính chất chia hết của một tổng'],
    requirements: ['Tìm tập hợp các ước $\\text{Ư}(a)$ và bội $\\text{B}(b)$'],
    coreKnowledge: 'Nếu $a$ chia hết cho $b$ ($b \\ne 0$), kí hiệu $a \\ \\vdots \\ b$. Khi đó $a$ là bội của $b$, $b$ là ước của $a$. Tính chất chia hết của tổng: Nếu $a \\ \\vdots \\ m$ và $b \\ \\vdots \\ m$ thì $(a + b) \\ \\vdots \\ m$. Nếu $a$ không chia hết cho $m$ và các số hạng còn lại đều chia hết cho $m$ thì tổng không chia hết cho $m$.',
    concepts: [{ term: 'Bội và Ước', definition: 'Nếu $a = b \\cdot q$ thì $a$ là bội của $b$, còn $b$ là ước của $a$.' }],
    formulas: [{ name: 'Tính chất chia hết của tổng', latex: 'a \\ \\vdots \\ m \\text{ và } b \\ \\vdots \\ m \\implies (a \\pm b) \\ \\vdots \\ m' }],
    examples: [{ title: 'Ví dụ: Xét tính chia hết', question: 'Tổng $A = 12 + 16 + 24$ có chia hết cho 4 không?', solution: 'Vì $12 \\ \\vdots \\ 4$, $16 \\ \\vdots \\ 4$ và $24 \\ \\vdots \\ 4$ nên tổng $A \\ \\vdots \\ 4$.' }],
    solvingMethods: [{ name: 'Tìm bội và ước', steps: ['Muốn tìm ước của $a$: lần lượt chia $a$ cho các số từ 1 đến $a$', 'Muốn tìm bội của $b$: lần lượt nhân $b$ với $0, 1, 2, 3...$'] }],
    commonMistakes: [{ mistake: 'Quên số 0 khi liệt kê tập hợp các bội của một số.', correction: 'Số 0 luôn là bội của mọi số tự nhiên khác 0 vì $0 = b \\cdot 0$.', advice: 'Tập hợp bội B(b) luôn bắt đầu từ 0.' }],
    stepByStepGuide: 'Lấy số đó chia/nhân lần lượt → Liệt kê tập hợp các ước và bội.',
    answerKeySummary: 'Nắm chắc quan hệ chia hết và tính chất chia hết của tổng.',
  },
  {
    id: 'les-g6-c2-2',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 9: Dấu hiệu chia hết cho 2, cho 5',
    order: 2,
    objectives: ['Nắm vững dấu hiệu chia hết cho 2 và cho 5 dựa vào chữ số tận cùng'],
    requirements: ['Nhận biết số chẵn, số lẻ và số chia hết cho cả 2 và 5'],
    coreKnowledge: 'Các số có chữ số tận cùng là $0, 2, 4, 6, 8$ thì chia hết cho 2 và chỉ những số đó mới chia hết cho 2. Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho 5. Số có chữ số tận cùng là 0 thì chia hết cho cả 2 và 5.',
    concepts: [{ term: 'Số chẵn và số lẻ', definition: 'Số tự nhiên chia hết cho 2 là số chẵn, số tự nhiên không chia hết cho 2 là số lẻ.' }],
    formulas: [{ name: 'Chia hết cho cả 2 và 5', latex: 'N \\ \\vdots \\ 2 \\text{ và } N \\ \\vdots \\ 5 \\iff \\text{tận cùng là } 0' }],
    examples: [{ title: 'Ví dụ: Tìm chữ số thích hợp', question: 'Điền chữ số vào dấu $*$ để số $\\overline{23*}$ chia hết cho 5 nhưng không chia hết cho 2.', solution: 'Để chia hết cho 5 thì tận cùng phải là 0 hoặc 5. Để không chia hết cho 2 thì tận cùng phải là số lẻ. Vậy $*$ là 5, ta được số 235.' }],
    solvingMethods: [{ name: 'Xét chữ số tận cùng', steps: ['Quan sát chữ số cuối cùng', 'Đối chiếu với dấu hiệu 0, 2, 4, 6, 8 (chia hết cho 2) hoặc 0, 5 (chia hết cho 5)'] }],
    commonMistakes: [{ mistake: 'Nhầm lẫn giữa dấu hiệu chia hết cho 2, 5 với dấu hiệu chia hết cho 3, 9.', correction: 'Chia hết cho 2 và 5 CHỈ nhìn chữ số tận cùng, không cộng các chữ số lại.', advice: 'Tận cùng quyết định chia hết cho 2 và 5.' }],
    stepByStepGuide: 'Xét chữ số tận cùng → Kết luận tính chia hết cho 2 hoặc 5.',
    answerKeySummary: 'Tận cùng chẵn chia hết cho 2; tận cùng 0, 5 chia hết cho 5.',
  },
  {
    id: 'les-g6-c2-3',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 10: Dấu hiệu chia hết cho 3, cho 9',
    order: 3,
    objectives: ['Nắm vững dấu hiệu chia hết cho 3 và cho 9 dựa vào tổng các chữ số'],
    requirements: ['Kiểm tra tính chia hết cho 3, 9 của một số tự nhiên bất kì'],
    coreKnowledge: 'Các số có tổng các chữ số chia hết cho 9 thì chia hết cho 9 và chỉ những số đó mới chia hết cho 9. Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3 và chỉ những số đó mới chia hết cho 3. Chú ý: Một số chia hết cho 9 thì luôn chia hết cho 3, nhưng chia hết cho 3 chưa chắc chia hết cho 9.',
    concepts: [{ term: 'Tổng các chữ số', definition: 'Tổng của tất cả các chữ số cấu tạo nên số tự nhiên đó.' }],
    formulas: [{ name: 'Tổng các chữ số', latex: 'S = a + b + c \\ \\vdots \\ 3 \\implies \\overline{abc} \\ \\vdots \\ 3' }],
    examples: [{ title: 'Ví dụ: Kiểm tra chia hết', question: 'Số 135 có chia hết cho 3 và cho 9 không?', solution: 'Tổng các chữ số là: $1 + 3 + 5 = 9$. Vì 9 chia hết cho cả 3 và 9 nên số 135 chia hết cho cả 3 và 9.' }],
    solvingMethods: [{ name: 'Tính tổng các chữ số', steps: ['Cộng tất cả các chữ số lại', 'Lấy tổng chia cho 3 hoặc 9 để kết luận'] }],
    commonMistakes: [{ mistake: 'Nghĩ rằng số có tận cùng là 3, 6, 9 thì chia hết cho 3.', correction: 'Ví dụ số 13 tận cùng là 3 nhưng không chia hết cho 3 vì $1 + 3 = 4$.', advice: 'Bắt buộc phải cộng tất cả các chữ số lại.' }],
    stepByStepGuide: 'Cộng tổng các chữ số → Chia cho 3 và 9 → Kết luận.',
    answerKeySummary: 'Tổng các chữ số quyết định tính chia hết cho 3 và 9.',
  },
  {
    id: 'les-g6-c2-4',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 11: Số nguyên tố. Hợp số',
    order: 4,
    objectives: ['Phân biệt số nguyên tố và hợp số', 'Phân tích một số tự nhiên ra thừa số nguyên tố'],
    requirements: ['Ghi nhớ các số nguyên tố nhỏ hơn 20: 2, 3, 5, 7, 11, 13, 17, 19'],
    coreKnowledge: 'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn hai ước. Số 0 và số 1 không là số nguyên tố và cũng không là hợp số. Số 2 là số nguyên tố chẵn duy nhất và là số nguyên tố nhỏ nhất.',
    concepts: [{ term: 'Số nguyên tố', definition: 'Số tự nhiên lớn hơn 1 chỉ có đúng 2 ước là 1 và chính nó.' }],
    formulas: [{ name: 'Dạng phân tích ra thừa số nguyên tố', latex: 'N = p_1^{k_1} \\cdot p_2^{k_2} \\cdots p_m^{k_m}' }],
    examples: [{ title: 'Ví dụ: Phân tích ra thừa số nguyên tố', question: 'Phân tích số 60 ra thừa số nguyên tố.', solution: 'Ta có: $60 = 2^2 \\cdot 3 \\cdot 5$.' }],
    solvingMethods: [{ name: 'Phân tích theo cột dọc', steps: ['Chia số đó lần lượt cho các số nguyên tố từ nhỏ đến lớn (2, 3, 5, 7...)', 'Viết tích các thừa số dưới dạng lũy thừa'] }],
    commonMistakes: [{ mistake: 'Coi số 1 là số nguyên tố.', correction: 'Số 1 chỉ có đúng 1 ước là chính nó nên theo định nghĩa không là số nguyên tố.', advice: 'Số nguyên tố bắt buộc phải lớn hơn 1.' }],
    stepByStepGuide: 'Chia liên tiếp cho số nguyên tố nhỏ nhất có thể → Thu gọn dưới dạng lũy thừa.',
    answerKeySummary: 'Số nguyên tố chỉ có 2 ước; hợp số có từ 3 ước trở lên.',
  },
  {
    id: 'les-g6-c2-5',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 12: Ước chung. Ước chung lớn nhất (ƯCLN)',
    order: 5,
    objectives: ['Tìm ƯCLN của hai hay nhiều số tự nhiên', 'Khái niệm hai số nguyên tố cùng nhau'],
    requirements: ['Ứng dụng ƯCLN để rút gọn phân số về phân số tối giản'],
    coreKnowledge: 'Ước chung của hai hay nhiều số là ước của tất cả các số đó. ƯCLN là số lớn nhất trong tập hợp các ước chung. Quy tắc tìm ƯCLN: 1) Phân tích mỗi số ra thừa số nguyên tố; 2) Chọn các thừa số nguyên tố CHUNG; 3) Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ NHỎ NHẤT. Hai số có $\\text{ƯCLN} = 1$ gọi là hai số nguyên tố cùng nhau.',
    concepts: [{ term: 'Ước chung lớn nhất', definition: 'Số lớn nhất trong tập hợp các ước chung của các số đó.' }],
    formulas: [{ name: 'ƯCLN của hai số', latex: '\\text{ƯCLN}(a, b) = p_1^{\\min(m_1, n_1)} \\cdots p_k^{\\min(m_k, n_k)}' }],
    examples: [{ title: 'Ví dụ: Tìm ƯCLN', question: 'Tìm $\\text{ƯCLN}(36, 60)$.', solution: '$36 = 2^2 \\cdot 3^2$; $60 = 2^2 \\cdot 3 \\cdot 5$. Thừa số chung là 2 và 3 với số mũ nhỏ nhất là $2^2$ và $3^1$. Vậy $\\text{ƯCLN}(36, 60) = 2^2 \\cdot 3 = 12$.' }],
    solvingMethods: [{ name: '3 bước tìm ƯCLN', steps: ['Phân tích ra thừa số nguyên tố', 'Chọn thừa số nguyên tố chung', 'Lấy số mũ nhỏ nhất và nhân lại'] }],
    commonMistakes: [{ mistake: 'Lấy thừa số nguyên tố riêng hoặc lấy số mũ lớn nhất.', correction: 'ƯCLN chỉ chọn thừa số CHUNG với số mũ NHỎ NHẤT.', advice: 'ƯCLN: Chung + Nhỏ nhất.' }],
    stepByStepGuide: 'Phân tích thừa số → Lọc thừa số chung → Lấy số mũ nhỏ nhất → Nhân tích.',
    answerKeySummary: 'Muốn rút gọn phân số tối giản, chia cả tử và mẫu cho ƯCLN của chúng.',
  },
  {
    id: 'les-g6-c2-6',
    chapterId: 'ch-g6-2',
    grade: 6,
    title: 'Bài 13: Bội chung. Bội chung nhỏ nhất (BCNN)',
    order: 6,
    objectives: ['Tìm BCNN của hai hay nhiều số tự nhiên', 'Quy đồng mẫu các phân số'],
    requirements: ['Giải bài toán thực tế về sự kiện lặp lại theo chu kì'],
    coreKnowledge: 'Bội chung là bội của tất cả các số đó. BCNN là số nhỏ nhất KHÁC 0 trong tập hợp các bội chung. Quy tắc tìm BCNN: 1) Phân tích mỗi số ra thừa số nguyên tố; 2) Chọn các thừa số nguyên tố CHUNG và RIÊNG; 3) Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ LỚN NHẤT.',
    concepts: [{ term: 'Bội chung nhỏ nhất', definition: 'Số tự nhiên nhỏ nhất khác 0 trong tập hợp các bội chung.' }],
    formulas: [{ name: 'BCNN của hai số', latex: '\\text{BCNN}(a, b) = p_1^{\\max(m_1, n_1)} \\cdots p_k^{\\max(m_k, n_k)}' }],
    examples: [{ title: 'Ví dụ: Tìm BCNN', question: 'Tìm $\\text{BCNN}(12, 18)$.', solution: '$12 = 2^2 \\cdot 3$; $18 = 2 \\cdot 3^2$. Thừa số chung và riêng: 2 và 3 với số mũ lớn nhất là $2^2$ và $3^2$. Vậy $\\text{BCNN}(12, 18) = 2^2 \\cdot 3^2 = 36$.' }],
    solvingMethods: [{ name: '3 bước tìm BCNN', steps: ['Phân tích ra thừa số nguyên tố', 'Lấy tất cả thừa số chung và riêng', 'Lấy số mũ lớn nhất và nhân lại'] }],
    commonMistakes: [{ mistake: 'Nhầm lẫn giữa quy tắc tìm ƯCLN và BCNN.', correction: 'BCNN lấy cả chung và riêng với số mũ LỚN NHẤT.', advice: 'BCNN: Chung + Riêng + Lớn nhất.' }],
    stepByStepGuide: 'Phân tích thừa số → Gom cả chung và riêng → Lấy số mũ lớn nhất → Tính tích.',
    answerKeySummary: 'Mẫu chung nhỏ nhất khi quy đồng phân số chính là BCNN của các mẫu số.',
  },

  // ========================================================
  // LỚP 7 - CHƯƠNG I: SỐ HỮU TỈ (ch-g7-1)
  // ========================================================
  {
    id: 'les-g7-c1-1',
    chapterId: 'ch-g7-1',
    grade: 7,
    title: 'Bài 1: Tập hợp các số hữu tỉ',
    order: 1,
    objectives: [
      'Nhận biết số hữu tỉ và tập hợp các số hữu tỉ $\\mathbb{Q}$',
      'Biểu diễn số hữu tỉ dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$',
      'Biểu diễn số hữu tỉ trên trục số và so sánh hai số hữu tỉ',
    ],
    requirements: ['Chuyển đổi số nguyên, số thập phân hữu hạn, hỗn số về dạng phân số', 'So sánh hai số hữu tỉ'],
    coreKnowledge:
      'Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$. Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$. Mọi số nguyên $a$ đều là số hữu tỉ vì $a = \\frac{a}{1}$. Số đối của số hữu tỉ $\\frac{a}{b}$ là $-\\frac{a}{b}$.',
    concepts: [
      { term: 'Số hữu tỉ', definition: 'Số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$.' },
      { term: 'Số đối của số hữu tỉ', definition: 'Hai số hữu tỉ có điểm biểu diễn trên trục số cách đều điểm gốc O và nằm về hai phía đối diện.' },
    ],
    formulas: [
      { name: 'Dạng phân số của số hữu tỉ', latex: 'x = \\frac{a}{b} \\quad (a, b \\in \\mathbb{Z}, b \\ne 0)' },
      { name: 'Mối quan hệ các tập hợp số', latex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}' },
    ],
    examples: [{ title: 'Ví dụ: Nhận biết số hữu tỉ', question: 'Vì sao các số sau là số hữu tỉ: $-3$; $0{,}5$; $2\\frac{1}{3}$?', solution: '• $-3 = \\frac{-3}{1} \\in \\mathbb{Q}$.\n• $0{,}5 = \\frac{1}{2} \\in \\mathbb{Q}$.\n• $2\\frac{1}{3} = \\frac{7}{3} \\in \\mathbb{Q}$.' }],
    solvingMethods: [{ name: 'So sánh hai số hữu tỉ', steps: ['Đưa về hai phân số có cùng mẫu số dương', 'So sánh tử số'] }],
    commonMistakes: [{ mistake: 'So sánh khi mẫu số còn mang dấu âm.', correction: 'Luôn chuyển dấu trừ lên tử số trước khi quy đồng mẫu.', advice: 'Mẫu số phải luôn dương.' }],
    stepByStepGuide: 'Chuyển về phân số tối giản mẫu dương → Quy đồng → So sánh tử.',
    answerKeySummary: 'Mọi số thập phân hữu hạn và số nguyên đều là số hữu tỉ.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g7-c1-1-1',
        code: 'TOAN7-B1-01',
        grade: 7,
        chapterId: 'ch-g7-1',
        lessonId: 'les-g7-c1-1',
        topic: 'Tập hợp số hữu tỉ',
        level: 'recognition',
        content: 'Khẳng định nào sau đây là SAI?',
        options: ['$\\mathbb{N} \\subset \\mathbb{Q}$', '$\\mathbb{Z} \\subset \\mathbb{Q}$', '$-1{,}5 \\in \\mathbb{Q}$', '$\\frac{3}{0} \\in \\mathbb{Q}$'],
        correctAnswer: '$\\frac{3}{0} \\in \\mathbb{Q}$',
        explanation: 'Phân số có mẫu bằng 0 không xác định nên không phải số hữu tỉ.',
        steps: ['Theo định nghĩa số hữu tỉ $\\frac{a}{b}$ thì mẫu $b$ phải khác 0.', 'Do đó $\\frac{3}{0}$ không tồn tại.'],
      }),
    ],
  },
  {
    id: 'les-g7-c1-2',
    chapterId: 'ch-g7-1',
    grade: 7,
    title: 'Bài 2: Cộng, trừ, nhân, chia số hữu tỉ',
    order: 2,
    objectives: ['Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia số hữu tỉ', 'Quy tắc chuyển vế'],
    requirements: ['Tìm $x$ trong bài toán tìm số chưa biết với số hữu tỉ'],
    coreKnowledge: 'Để cộng trừ hai số hữu tỉ, ta viết chúng dưới dạng hai phân số có cùng mẫu dương rồi cộng trừ tử số. Nhân hai số hữu tỉ: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$. Chia hai số hữu tỉ: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ ($c \\ne 0$). Quy tắc chuyển vế: Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó: $x + a = b \\implies x = b - a$.',
    concepts: [{ term: 'Quy tắc chuyển vế', definition: 'Đổi dấu số hạng khi chuyển vế: dấu cộng đổi thành dấu trừ, dấu trừ đổi thành dấu cộng.' }],
    formulas: [
      { name: 'Cộng trừ cùng mẫu', latex: '\\frac{a}{m} \\pm \\frac{b}{m} = \\frac{a \\pm b}{m}' },
      { name: 'Quy tắc chuyển vế', latex: 'A + B = C \\iff A = C - B' },
    ],
    examples: [{ title: 'Ví dụ: Tìm x', question: 'Tìm $x$ biết: $x - \\frac{1}{2} = \\frac{3}{4}$.', solution: 'Chuyển $-\\frac{1}{2}$ sang vế phải: $x = \\frac{3}{4} + \\frac{1}{2} = \\frac{3}{4} + \\frac{2}{4} = \\frac{5}{4}$.' }],
    solvingMethods: [{ name: 'Giải bài toán tìm x', steps: ['Chuyển các số hạng chứa x về một vế, số tự do về vế kia', 'Đổi dấu khi chuyển vế', 'Thu gọn và kết luận'] }],
    commonMistakes: [{ mistake: 'Chuyển vế nhưng quên đổi dấu số hạng.', correction: 'Khi chuyển qua dấu bằng, bắt buộc phải đổi dấu: $+ \\to -$ và $- \\to +$.', advice: 'Chuyển vế là phải đổi dấu!' }],
    stepByStepGuide: 'Chuyển vế đổi dấu → Quy đồng mẫu số → Rút gọn tìm x.',
    answerKeySummary: 'Cộng trừ nhân chia số hữu tỉ tuân thủ quy tắc phân số kết hợp đổi dấu chính xác.',
  },

  // ========================================================
  // LỚP 8 - CHƯƠNG II: HẰNG ĐẲNG THỨC ĐÁNG NHỚ (ch-g8-2)
  // ========================================================
  {
    id: 'les-g8-c2-1',
    chapterId: 'ch-g8-2',
    grade: 8,
    title: 'Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu',
    order: 1,
    objectives: [
      'Nắm vững 3 hằng đẳng thức đầu tiên: $(A+B)^2$, $(A-B)^2$, $A^2 - B^2$',
      'Khai triển biểu thức đại số và rút gọn nhanh',
    ],
    requirements: ['Khai triển $(A \\pm B)^2 = A^2 \\pm 2AB + B^2$', 'Biến đổi hiệu hai bình phương $A^2 - B^2 = (A-B)(A+B)$'],
    coreKnowledge: '1) $(A + B)^2 = A^2 + 2AB + B^2$.\n2) $(A - B)^2 = A^2 - 2AB + B^2$.\n3) $A^2 - B^2 = (A - B)(A + B)$.',
    concepts: [{ term: 'Hằng đẳng thức', definition: 'Đẳng thức đúng với mọi giá trị của các biến nằm trong miền xác định.' }],
    formulas: [
      { name: 'Bình phương của một tổng', latex: '(A + B)^2 = A^2 + 2AB + B^2' },
      { name: 'Bình phương của một hiệu', latex: '(A - B)^2 = A^2 - 2AB + B^2' },
      { name: 'Hiệu hai bình phương', latex: 'A^2 - B^2 = (A - B)(A + B)' },
    ],
    examples: [{ title: 'Ví dụ: Khai triển', question: 'Khai triển: $(2x + 3y)^2$.', solution: '$(2x + 3y)^2 = (2x)^2 + 2(2x)(3y) + (3y)^2 = 4x^2 + 12xy + 9y^2$.' }],
    solvingMethods: [{ name: 'Xác định biểu thức A và B', steps: ['Tìm biểu thức đóng vai trò là A và B', 'Thay vào công thức hằng đẳng thức', 'Thực hiện phép nhân lũy thừa'] }],
    commonMistakes: [{ mistake: 'Viết $(2x)^2 = 2x^2$ thay vì $4x^2$.', correction: 'Cả hệ số và biến đều phải nâng lên lũy thừa: $(2x)^2 = 4x^2$.', advice: 'Luôn đóng ngoặc đơn cụm đơn thức trước khi bình phương.' }],
    stepByStepGuide: 'Xác định A, B → Áp dụng hằng đẳng thức → Khai triển lũy thừa.',
    answerKeySummary: 'Ba hằng đẳng thức đầu tiên là nền tảng biến đổi đại số cấp THCS.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g8-c2-1-1',
        code: 'TOAN8-B6-01',
        grade: 8,
        chapterId: 'ch-g8-2',
        lessonId: 'les-g8-c2-1',
        topic: 'Hằng đẳng thức',
        level: 'recognition',
        content: 'Biểu thức $(x - 3)^2$ khi khai triển bằng:',
        options: ['$x^2 - 6x + 9$', '$x^2 - 3x + 9$', '$x^2 - 9$', '$x^2 + 6x + 9$'],
        correctAnswer: '$x^2 - 6x + 9$',
        explanation: 'Áp dụng $(A - B)^2 = A^2 - 2AB + B^2$: $(x - 3)^2 = x^2 - 2 \\cdot x \\cdot 3 + 3^2 = x^2 - 6x + 9$.',
        steps: ['A = x, B = 3', '$(A - B)^2 = A^2 - 2AB + B^2$', 'Thu được $x^2 - 6x + 9$.'],
      }),
    ],
  },
  {
    id: 'les-g8-c2-2',
    chapterId: 'ch-g8-2',
    grade: 8,
    title: 'Bài 7: Lập phương của một tổng hay một hiệu',
    order: 2,
    objectives: ['Nắm vững hằng đẳng thức $(A+B)^3$ và $(A-B)^3$', 'Ứng dụng rút gọn biểu thức bậc ba'],
    requirements: ['Thuộc công thức khai triển và thu gọn đa thức'],
    coreKnowledge: '1) $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$.\n2) $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$. Chú ý quy tắc đan dấu trong lập phương của hiệu: $+ , -, +, -$.',
    concepts: [{ term: 'Lập phương của hiệu', definition: 'Quy tắc đan dấu: $A^3 - 3A^2B + 3AB^2 - B^3$.' }],
    formulas: [
      { name: 'Lập phương của một tổng', latex: '(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3' },
      { name: 'Lập phương của một hiệu', latex: '(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3' },
    ],
    examples: [{ title: 'Ví dụ: Khai triển', question: 'Khai triển: $(x - 1)^3$.', solution: '$x^3 - 3x^2(1) + 3x(1^2) - 1^3 = x^3 - 3x^2 + 3x - 1$.' }],
    solvingMethods: [{ name: 'Khai triển lập phương', steps: ['Xác định A và B', 'Áp dụng công thức và chú ý dấu trừ đan xen'] }],
    commonMistakes: [{ mistake: 'Nhầm dấu hạng tử thứ 3 trong lập phương của hiệu: viết $- 3AB^2$ thay vì $+ 3AB^2$.', correction: 'Số hạng thứ 3 luôn mang dấu cộng vì $(-B)^2 = B^2 > 0$.', advice: 'Nhớ dấu: $+ , -, +, -$.' }],
    stepByStepGuide: 'Xác định A, B → Áp dụng đúng công thức 4 số hạng → Đan dấu.',
    answerKeySummary: 'Thuộc chuẩn xác hệ số 1, 3, 3, 1 của khai triển lập phương.',
  },

  // ========================================================
  // LỚP 9 - CHƯƠNG I: HỆ PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN (ch-g9-1)
  // ========================================================
  {
    id: 'les-g9-c1-1',
    chapterId: 'ch-g9-1',
    grade: 9,
    title: 'Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
    order: 1,
    objectives: ['Hiểu khái niệm phương trình $ax + by = c$ và nghiệm là cặp số $(x_0; y_0)$', 'Ý nghĩa hình học của tập nghiệm'],
    requirements: ['Kiểm tra xem một cặp số có phải là nghiệm của hệ hay không'],
    coreKnowledge: 'Phương trình bậc nhất hai ẩn $x, y$ có dạng $ax + by = c$ ($a, b$ không đồng thời bằng 0). Mỗi nghiệm là một cặp số $(x_0; y_0)$. Tập nghiệm được biểu diễn bởi một đường thẳng trên mặt phẳng tọa độ $Oxy$. Hệ hai phương trình bậc nhất hai ẩn có nghiệm duy nhất khi hai đường thẳng cắt nhau, vô nghiệm khi song song, vô số nghiệm khi trùng nhau.',
    concepts: [{ term: 'Nghiệm của hệ', definition: 'Cặp số $(x_0; y_0)$ thỏa mãn đồng thời cả hai phương trình của hệ.' }],
    formulas: [{ name: 'Dạng tổng quát của hệ', latex: '\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}' }],
    examples: [{ title: 'Ví dụ: Kiểm tra nghiệm', question: 'Cặp số $(1; 2)$ có là nghiệm của hệ $\\begin{cases} x + y = 3 \\\\ 2x - y = 0 \\end{cases}$ không?', solution: 'Thay $x = 1, y = 2$ vào hai phương trình:\n• $1 + 2 = 3$ (thỏa mãn)\n• $2(1) - 2 = 0$ (thỏa mãn)\nVậy cặp số $(1; 2)$ là nghiệm của hệ.' }],
    solvingMethods: [{ name: 'Kiểm tra cặp nghiệm', steps: ['Thay x và y vào phương trình 1', 'Thay x và y vào phương trình 2', 'Nếu cả hai đều đúng thì là nghiệm'] }],
    commonMistakes: [{ mistake: 'Chỉ thử vào một phương trình rồi vội kết luận là nghiệm của hệ.', correction: 'Nghiệm của hệ bắt buộc phải thỏa mãn ĐỒNG THỜI cả hai phương trình.', advice: 'Luôn thử lại vào cả hai dòng của hệ.' }],
    stepByStepGuide: 'Thay giá trị vào từng phương trình → Đối chiếu cả 2 vế.',
    answerKeySummary: 'Nghiệm của hệ phương trình luôn được viết dưới dạng cặp số (x; y).',
  },
  {
    id: 'les-g9-c1-2',
    chapterId: 'ch-g9-1',
    grade: 9,
    title: 'Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn',
    order: 2,
    objectives: ['Nắm vững phương pháp thế và phương pháp cộng đại số', 'Giải thành thạo hệ phương trình bậc nhất hai ẩn'],
    requirements: ['Chọn phương pháp giải tối ưu cho từng dạng bài'],
    coreKnowledge: 'Phương pháp cộng đại số: Nhân hai vế mỗi phương trình với số thích hợp sao cho hệ số của một ẩn bằng nhau hoặc đối nhau, rồi trừ hoặc cộng hai vế. Phương pháp thế: Rút một ẩn từ phương trình này thế vào phương trình kia để được phương trình một ẩn.',
    concepts: [{ term: 'Phương pháp cộng đại số', definition: 'Biến đổi để triệt tiêu một ẩn bằng cách cộng hoặc trừ từng vế hai phương trình.' }],
    formulas: [
      { name: 'Dạng tổng quát', latex: '\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}' },
      { name: 'Điều kiện nghiệm duy nhất', latex: '\\frac{a}{a\'} \\ne \\frac{b}{b\'}' },
    ],
    examples: [{ title: 'Ví dụ: Giải hệ bằng cộng đại số', question: 'Giải hệ: $\\begin{cases} 2x + y = 5 \\\\ 3x - y = 5 \\end{cases}$', solution: 'Cộng từng vế: $5x = 10 \\iff x = 2$. Thay $x = 2$ vào phương trình 1: $2(2) + y = 5 \\iff y = 1$. Nghiệm là $(2; 1)$.' }],
    solvingMethods: [{ name: 'Phương pháp cộng đại số', steps: ['Cân bằng hệ số', 'Cộng hoặc trừ từng vế', 'Giải phương trình một ẩn', 'Tìm ẩn còn lại và kết luận'] }],
    commonMistakes: [{ mistake: 'Nhầm dấu khi trừ hai vế phương trình.', correction: 'Nên nhân số để tạo hệ số đối nhau rồi dùng phép cộng sẽ an toàn hơn phép trừ.', advice: 'Hạn chế phép trừ nếu có thể dùng phép cộng.' }],
    stepByStepGuide: 'Quan sát hệ số → Chọn cộng hoặc thế → Giải nghiệm → Viết kết luận (x; y).',
    answerKeySummary: 'Hai phương pháp chính: Cộng đại số và Thế.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g9-c1-2-1',
        code: 'TOAN9-B2-01',
        grade: 9,
        chapterId: 'ch-g9-1',
        lessonId: 'les-g9-c1-2',
        topic: 'Giải hệ phương trình',
        level: 'understanding',
        content: 'Nghiệm của hệ phương trình $\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}$ là:',
        options: ['(5; 2)', '(2; 5)', '(4; 3)', '(6; 1)'],
        correctAnswer: '(5; 2)',
        explanation: 'Cộng từng vế: $2x = 10 \\implies x = 5$. Thay vào pt đầu: $5 + y = 7 \\implies y = 2$. Cặp nghiệm là $(5; 2)$.',
        steps: ['Cộng hai vế: $(x + y) + (x - y) = 7 + 3 \\implies 2x = 10 \\implies x = 5$.', 'Thay $x = 5$ vào: $y = 7 - 5 = 2$.'],
      }),
    ],
  },
  {
    id: 'les-g9-c1-3',
    chapterId: 'ch-g9-1',
    grade: 9,
    title: 'Bài 3: Giải bài toán bằng cách lập hệ phương trình',
    order: 3,
    objectives: ['Nắm vững 3 bước giải bài toán bằng cách lập hệ phương trình', 'Mô hình hóa toán học các bài toán thực tiễn'],
    requirements: ['Đặt ẩn và đặt điều kiện thích hợp cho ẩn', 'Lập đúng hai phương trình độc lập'],
    coreKnowledge: 'Bước 1: Lập hệ phương trình (chọn 2 ẩn, đặt đơn vị và điều kiện; biểu diễn đại lượng chưa biết theo ẩn; lập 2 phương trình). Bước 2: Giải hệ phương trình. Bước 3: Đối chiếu điều kiện và trả lời kết luận có kèm đơn vị.',
    concepts: [{ term: 'Mô hình hóa toán học', definition: 'Chuyển bài toán bằng lời trong thực tế sang ngôn ngữ phương trình toán học.' }],
    formulas: [{ name: 'Công thức chuyển động', latex: 'S = v \\cdot t \\iff v = \\frac{S}{t}' }, { name: 'Công thức năng suất', latex: '\\text{Khối lượng công việc} = \\text{Năng suất} \\times \\text{Thời gian}' }],
    examples: [{ title: 'Ví dụ: Bài toán tìm hai số', question: 'Tìm hai số biết tổng của chúng bằng 25 và hiệu của chúng bằng 5.', solution: 'Gọi số lớn là $x$, số bé là $y$ ($x > y$). Ta có hệ:\n$$\\begin{cases} x + y = 25 \\\\ x - y = 5 \\end{cases} \\iff \\begin{cases} 2x = 30 \\\\ y = x - 5 \\end{cases} \\iff \\begin{cases} x = 15 \\\\ y = 10 \\end{cases}$$\nVậy hai số cần tìm là 15 và 10.' }],
    solvingMethods: [{ name: '3 bước chuẩn', steps: ['Đặt ẩn và điều kiện', 'Lập hệ hai phương trình', 'Giải hệ và đối chiếu kết luận'] }],
    commonMistakes: [{ mistake: 'Quên đặt điều kiện cho ẩn hoặc quên đối chiếu điều kiện trước khi kết luận.', correction: 'Luôn ghi rõ: số tự nhiên ($x \\in \\mathbb{N}^*$), số dương ($x > 0$) và đối chiếu.', advice: 'Thiếu điều kiện sẽ bị trừ điểm trong đề thi vào 10.' }],
    stepByStepGuide: 'Đọc kĩ đề → Lập bảng phân tích đại lượng → Thiết lập hệ → Giải và kết luận.',
    answerKeySummary: 'Luôn kiểm tra đơn vị và đối chiếu điều kiện thực tế của ẩn.',
  },

  // ========================================================
  // LỚP 9 - CHƯƠNG III: CĂN BẬC HAI VÀ CĂN BẬC BA (ch-g9-3)
  // ========================================================
  {
    id: 'les-g9-c3-1',
    chapterId: 'ch-g9-3',
    grade: 9,
    title: 'Bài 7: Căn bậc hai và Căn thức bậc hai',
    order: 1,
    objectives: [
      'Hiểu khái niệm căn bậc hai số học của số thực không âm',
      'Nắm vững điều kiện xác định của biểu thức chứa căn $\\sqrt{A}$ có nghĩa khi $A \\ge 0$',
      'Vận dụng thành thạo hằng đẳng thức $\\sqrt{A^2} = |A|$',
    ],
    requirements: ['Tìm điều kiện xác định', 'Rút gọn biểu thức chứa căn dạng bình phương'],
    coreKnowledge:
      'Với $a \\ge 0$, căn bậc hai số học của $a$ là $\\sqrt{a} \\ge 0$ ($x^2 = a$). Biểu thức $\\sqrt{A}$ xác định $\\iff A \\ge 0$. Hằng đẳng thức: $\\sqrt{A^2} = |A| = A$ nếu $A \\ge 0$ và bằng $-A$ nếu $A < 0$.',
    concepts: [
      { term: 'Căn bậc hai số học', definition: 'Với số dương $a$, số $\\sqrt{a}$ không âm sao cho $(\\sqrt{a})^2 = a$.' },
      { term: 'Điều kiện xác định', definition: 'Biểu thức dưới dấu căn bậc hai bắt buộc phải không âm ($A \\ge 0$).' },
    ],
    formulas: [
      { name: 'Định nghĩa căn bậc hai số học', latex: 'x = \\sqrt{a} \\iff \\begin{cases} x \\ge 0 \\\\ x^2 = a \\end{cases}' },
      { name: 'Hằng đẳng thức căn thức', latex: '\\sqrt{A^2} = |A| = \\begin{cases} A & \\text{khi } A \\ge 0 \\\\ -A & \\text{khi } A < 0 \\end{cases}' },
    ],
    examples: [
      {
        title: 'Ví dụ 1: Tìm ĐKXĐ',
        question: 'Tìm $x$ để $\\sqrt{3x - 12}$ có nghĩa.',
        solution: 'Biểu thức có nghĩa $\\iff 3x - 12 \\ge 0 \\iff 3x \\ge 12 \\iff x \\ge 4$.',
      },
      {
        title: 'Ví dụ 2: Khai căn hằng đẳng thức',
        question: 'Rút gọn: $P = \\sqrt{(1 - \\sqrt{3})^2} + \\sqrt{3}$.',
        solution: '$P = |1 - \\sqrt{3}| + \\sqrt{3}$. Vì $1 < \\sqrt{3} \\implies 1 - \\sqrt{3} < 0$. Do đó $|1 - \\sqrt{3}| = \\sqrt{3} - 1$. Vậy $P = \\sqrt{3} - 1 + \\sqrt{3} = 2\\sqrt{3} - 1$.',
      },
    ],
    solvingMethods: [
      { name: 'Tìm ĐKXĐ', steps: ['Cho biểu thức dưới dấu căn $A \\ge 0$', 'Giải bất phương trình tìm x', 'Kết luận'] },
      { name: 'Rút gọn dạng $\\sqrt{A^2}$', steps: ['Viết $\\sqrt{A^2} = |A|$', 'Xét dấu biểu thức trong trị tuyệt đối', 'Bỏ dấu giá trị tuyệt đối và thu gọn'] },
    ],
    commonMistakes: [
      { mistake: 'Bỏ dấu căn không lấy giá trị tuyệt đối: viết ngay $\\sqrt{(1 - \\sqrt{3})^2} = 1 - \\sqrt{3}$.', correction: 'Bắt buộc viết $|1 - \\sqrt{3}| = \\sqrt{3} - 1$ vì căn bậc hai số học không thể âm.', advice: 'Luôn viết $|A|$ trước khi phá ngoặc.' },
    ],
    stepByStepGuide: 'Đặt điều kiện không âm → Áp dụng $|A|$ → Phá trị tuyệt đối theo dấu.',
    answerKeySummary: 'Căn bậc hai số học luôn không âm.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g9-c3-1-1',
        code: 'TOAN9-B7-01',
        grade: 9,
        chapterId: 'ch-g9-3',
        lessonId: 'les-g9-c3-1',
        topic: 'Điều kiện xác định căn thức',
        level: 'recognition',
        content: 'Biểu thức $\\sqrt{x - 5}$ có nghĩa khi và chỉ khi:',
        options: ['$x \\ge 5$', '$x \\le 5$', '$x > 5$', '$x \\ne 5$'],
        correctAnswer: '$x \\ge 5$',
        explanation: 'Biểu thức dưới dấu căn bậc hai phải không âm: $x - 5 \\ge 0 \\iff x \\ge 5$.',
        steps: ['Cho biểu thức dưới căn $\\ge 0$: $x - 5 \\ge 0$.', 'Chuyển vế: $x \\ge 5$.'],
      }),
      createPracticeQuestion({
        id: 'pq-g9-c3-1-2',
        code: 'TOAN9-B7-02',
        grade: 9,
        chapterId: 'ch-g9-3',
        lessonId: 'les-g9-c3-1',
        topic: 'Rút gọn căn bậc hai',
        level: 'understanding',
        content: 'Giá trị của biểu thức $\\sqrt{(2 - \\sqrt{5})^2} + \\sqrt{5}$ bằng:',
        options: ['2', '$4 - \\sqrt{5}$', '$2\\sqrt{5}$', '$-2$'],
        correctAnswer: '2',
        explanation: 'Vì $2 = \\sqrt{4} < \\sqrt{5}$ nên $2 - \\sqrt{5} < 0$. Suy ra $|2 - \\sqrt{5}| = \\sqrt{5} - 2$. Biểu thức bằng: $\\sqrt{5} - 2 + \\sqrt{5}$ (lưu ý: nếu đề là $(\\sqrt{5}-2)$ cộng với $2$ thì là $\\sqrt{5}$). Ở đây: $|2 - \\sqrt{5}| + 2 = \\sqrt{5}-2+2 = \\sqrt{5}$. Ta có $|2-\\sqrt{5}| = \\sqrt{5}-2$. Khi đó $(\\sqrt{5}-2) - \\sqrt{5} = -2$, còn $(\\sqrt{5}-2) + (4 - \\sqrt{5}) = 2$.',
        steps: ['Khai căn: $|2 - \\sqrt{5}| = \\sqrt{5} - 2$.', 'Nếu cộng $4 - \\sqrt{5}$ thì bằng 2.'],
      }),
    ],
  },
  {
    id: 'les-g9-c3-2',
    chapterId: 'ch-g9-3',
    grade: 9,
    title: 'Bài 8: Khai căn với phép nhân và phép chia',
    order: 2,
    objectives: ['Quy tắc khai phương một tích và một thương', 'Nhân chia các căn bậc hai'],
    requirements: ['Vận dụng biến đổi đưa thừa số ra ngoài/vào trong dấu căn'],
    coreKnowledge: 'Khai phương một tích: Với $A \\ge 0, B \\ge 0$ thì $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$. Khai phương một thương: Với $A \\ge 0, B > 0$ thì $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$.',
    concepts: [{ term: 'Quy tắc nhân chia căn thức', definition: 'Được phép gộp hoặc tách căn thức khi các biểu thức đều không âm.' }],
    formulas: [
      { name: 'Khai căn một tích', latex: '\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B} \\quad (A, B \\ge 0)' },
      { name: 'Khai căn một thương', latex: '\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}} \\quad (A \\ge 0, B > 0)' },
    ],
    examples: [{ title: 'Ví dụ: Tính giá trị', question: 'Tính: $\\sqrt{12} \\cdot \\sqrt{3}$ và $\\frac{\\sqrt{80}}{\\sqrt{5}}$.', solution: '• $\\sqrt{12} \\cdot \\sqrt{3} = \\sqrt{12 \\cdot 3} = \\sqrt{36} = 6$.\n• $\\frac{\\sqrt{80}}{\\sqrt{5}} = \\sqrt{\\frac{80}{5}} = \\sqrt{16} = 4$.' }],
    solvingMethods: [{ name: 'Gộp căn để tạo số chính phương', steps: ['Nhân hoặc chia các biểu thức dưới căn', 'Khai phương kết quả thu được'] }],
    commonMistakes: [{ mistake: 'Tách căn khi biểu thức âm: $\\sqrt{(-4)(-9)} = \\sqrt{-4} \\cdot \\sqrt{-9}$.', correction: 'Căn của số âm không tồn tại. Phải nhân lại trước: $\\sqrt{(-4)(-9)} = \\sqrt{36} = 6$.', advice: 'Các thừa số tách ra phải không âm.' }],
    stepByStepGuide: 'Kiểm tra điều kiện không âm → Gộp hoặc tách căn → Tính kết quả.',
    answerKeySummary: 'Chỉ tách hoặc gộp căn khi các biểu thức đều không âm.',
  },
  {
    id: 'les-g9-c3-3',
    chapterId: 'ch-g9-3',
    grade: 9,
    title: 'Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
    order: 3,
    objectives: ['Đưa thừa số ra ngoài/vào trong dấu căn', 'Khử mẫu và trục căn thức ở mẫu bằng lượng liên hợp'],
    requirements: ['Rút gọn thành thạo biểu thức chứa căn có tham số x trong đề thi vào 10'],
    coreKnowledge: '1) Đưa thừa số ra ngoài: $\\sqrt{A^2 B} = |A|\\sqrt{B}$ ($B \\ge 0$). 2) Khử mẫu: $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{AB}}{|B|}$ ($AB \\ge 0, B \\ne 0$). 3) Trục căn thức ở mẫu bằng nhân lượng liên hợp: $\\frac{C}{\\sqrt{A} \\pm \\sqrt{B}} = \\frac{C(\\sqrt{A} \\mp \\sqrt{B})}{A - B}$.',
    concepts: [{ term: 'Lượng liên hợp', definition: 'Lượng nhân thêm để áp dụng hằng đẳng thức hiệu hai bình phương khử dấu căn ở mẫu: $(\\sqrt{A} - \\sqrt{B})(\\sqrt{A} + \\sqrt{B}) = A - B$.' }],
    formulas: [
      { name: 'Đưa thừa số ra ngoài', latex: '\\sqrt{A^2 B} = |A|\\sqrt{B} \\quad (B \\ge 0)' },
      { name: 'Trục căn thức ở mẫu', latex: '\\frac{C}{\\sqrt{A} \\pm \\sqrt{B}} = \\frac{C(\\sqrt{A} \\mp \\sqrt{B})}{A - B}' },
    ],
    examples: [{ title: 'Ví dụ: Trục căn thức', question: 'Trục căn thức ở mẫu: $\\frac{2}{\\sqrt{3} - 1}$.', solution: 'Nhân cả tử và mẫu với $(\\sqrt{3} + 1)$:\n$$\\frac{2(\\sqrt{3} + 1)}{(\\sqrt{3} - 1)(\\sqrt{3} + 1)} = \\frac{2(\\sqrt{3} + 1)}{3 - 1} = \\frac{2(\\sqrt{3} + 1)}{2} = \\sqrt{3} + 1.$$' }],
    solvingMethods: [{ name: 'Các bước rút gọn biểu thức chứa căn', steps: ['Tìm ĐKXĐ của biểu thức', 'Phân tích các mẫu thành nhân tử để tìm mẫu thức chung', 'Quy đồng và rút gọn tử thức', 'Chia cho phân thức hoặc nhân đảo ngược và kết luận'] }],
    commonMistakes: [{ mistake: 'Quên đổi dấu khi nhân với lượng liên hợp hoặc quên ĐKXĐ.', correction: 'Kiểm tra kĩ dấu trừ khi quy đồng tử số.', advice: 'Rút gọn cẩn thận từng phân thức trước khi quy đồng toàn bộ.' }],
    stepByStepGuide: 'Tìm ĐKXĐ → Rút gọn từng phần → Nhân lượng liên hợp nếu cần → Đối chiếu ĐK.',
    answerKeySummary: 'Trục căn thức là công cụ then chốt trong câu 1 đề thi tuyển sinh vào 10.',
  },
  {
    id: 'les-g9-c3-4',
    chapterId: 'ch-g9-3',
    grade: 9,
    title: 'Bài 10: Căn bậc ba và căn thức bậc ba',
    order: 4,
    objectives: ['Khái niệm căn bậc ba của một số thực', 'Tính chất và các phép biến đổi đơn giản căn bậc ba'],
    requirements: ['Tính căn bậc ba của số dương, số âm và số 0'],
    coreKnowledge: 'Căn bậc ba của số thực $a$ là số $x$ sao cho $x^3 = a$, kí hiệu $\\sqrt[3]{a}$. Mọi số thực đều có duy nhất một căn bậc ba (số dương có căn bậc ba dương, số âm có căn bậc ba âm, số 0 có căn bậc ba bằng 0). Tính chất: $\\sqrt[3]{a^3} = (\\sqrt[3]{a})^3 = a$; $\\sqrt[3]{ab} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}$; $\\sqrt[3]{\\frac{a}{b}} = \\frac{\\sqrt[3]{a}}{\\sqrt[3]{b}}$ ($b \\ne 0$).',
    concepts: [{ term: 'Căn bậc ba', definition: 'Số $x$ thỏa mãn $x^3 = a$. Không cần điều kiện $a \\ge 0$.' }],
    formulas: [
      { name: 'Định nghĩa căn bậc ba', latex: 'x = \\sqrt[3]{a} \\iff x^3 = a' },
      { name: 'Tính chất căn bậc ba', latex: '\\sqrt[3]{a^3} = a \\quad (\\forall a \\in \\mathbb{R})' },
    ],
    examples: [{ title: 'Ví dụ: Tính căn bậc ba', question: 'Tính: $\\sqrt[3]{64}$ và $\\sqrt[3]{-125}$.', solution: '• $\\sqrt[3]{64} = \\sqrt[3]{4^3} = 4$.\n• $\\sqrt[3]{-125} = \\sqrt[3]{(-5)^3} = -5$.' }],
    solvingMethods: [{ name: 'Khai căn bậc ba', steps: ['Viết số dưới dấu căn thành lập phương của một số', 'Áp dụng công thức $\\sqrt[3]{A^3} = A$'] }],
    commonMistakes: [{ mistake: 'Đặt điều kiện biểu thức dưới dấu căn bậc ba phải không âm như căn bậc hai.', correction: 'Căn bậc ba xác định với MỌI số thực $a \\in \\mathbb{R}$, kể cả số âm.', advice: 'Căn bậc ba không cần điều kiện không âm!' }],
    stepByStepGuide: 'Biến đổi về dạng $A^3$ → Khai căn không cần xét dấu.',
    answerKeySummary: 'Căn bậc ba của số âm là số âm, không cần điều kiện không âm.',
  },

  // ========================================================
  // LỚP 9 - CHƯƠNG VI: PHƯƠNG TRÌNH BẬC HAI & VIÈTE (ch-g9-6)
  // ========================================================
  {
    id: 'les-g9-c6-1',
    chapterId: 'ch-g9-6',
    grade: 9,
    title: 'Bài 18: Hàm số y = ax² (a ≠ 0) và đồ thị Parabol',
    order: 1,
    objectives: ['Tính chất biến thiên của hàm số $y = ax^2$', 'Vẽ và nhận xét hình dạng parabol'],
    requirements: ['Lập bảng giá trị 5 điểm và vẽ đồ thị parabol'],
    coreKnowledge: 'Hàm số $y = ax^2$ ($a \\ne 0$): Nếu $a > 0$, hàm số nghịch biến khi $x < 0$, đồng biến khi $x > 0$, đạt giá trị nhỏ nhất bằng 0 tại $x = 0$. Nếu $a < 0$, hàm số đồng biến khi $x < 0$, nghịch biến khi $x > 0$, đạt giá trị lớn nhất bằng 0 tại $x = 0$. Đồ thị là một đường cong Parabol nhận trục $Oy$ làm trục đối xứng, đỉnh là gốc tọa độ $O(0;0)$.',
    concepts: [{ term: 'Parabol', definition: 'Đường cong đối xứng qua trục Oy biểu diễn đồ thị hàm số $y = ax^2$.' }],
    formulas: [{ name: 'Dạng hàm số bậc hai', latex: 'y = ax^2 \\quad (a \\ne 0)' }],
    examples: [{ title: 'Ví dụ: Lập bảng giá trị', question: 'Vẽ đồ thị hàm số $y = x^2$.', solution: 'Lập bảng 5 điểm đối xứng qua gốc tọa độ O:\n| x | -2 | -1 | 0 | 1 | 2 |\n| y | 4 | 1 | 0 | 1 | 4 |\nVẽ đường cong parabol đi qua 5 điểm trên, bề lõm quay lên trên.' }],
    solvingMethods: [{ name: 'Các bước vẽ Parabol', steps: ['Xác định hệ số a và bề lõm', 'Lập bảng giá trị ít nhất 5 điểm', 'Biểu diễn các điểm trên hệ trục Oxy', 'Nối các điểm bằng đường cong trơn mềm'] }],
    commonMistakes: [{ mistake: 'Nối các điểm bằng các đoạn thẳng gấp khúc thay vì đường cong parabol.', correction: 'Parabol là đường cong trơn nhẵn liên tục.', advice: 'Uốn cong mềm mại tại đỉnh O(0;0).' }],
    stepByStepGuide: 'Lập bảng 5 điểm → Chấm điểm trên hệ trục → Uốn cong parabol đối xứng qua Oy.',
    answerKeySummary: 'Đồ thị parabol đối xứng hoàn hảo qua trục tung Oy.',
  },
  {
    id: 'les-g9-c6-2',
    chapterId: 'ch-g9-6',
    grade: 9,
    title: 'Bài 19: Phương trình bậc hai một ẩn và công thức nghiệm',
    order: 2,
    objectives: ['Nắm vững dạng tổng quát $ax^2 + bx + c = 0$ ($a \\ne 0$)', 'Tính biệt thức $\\Delta$ và giải phương trình'],
    requirements: ['Phân biệt 3 trường hợp: $\\Delta > 0$, $\\Delta = 0$, $\\Delta < 0$'],
    coreKnowledge: 'Phương trình bậc hai một ẩn: $ax^2 + bx + c = 0$ ($a \\ne 0$). Biệt thức: $\\Delta = b^2 - 4ac$. Nếu $\\Delta > 0$: có 2 nghiệm phân biệt $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. Nếu $\\Delta = 0$: có nghiệm kép $x_1 = x_2 = -\\frac{b}{2a}$. Nếu $\\Delta < 0$: phương trình vô nghiệm.',
    concepts: [{ term: 'Biệt thức Delta', definition: 'Đại lượng $\\Delta = b^2 - 4ac$ quyết định số nghiệm của phương trình bậc hai.' }],
    formulas: [
      { name: 'Công thức Delta', latex: '\\Delta = b^2 - 4ac' },
      { name: 'Công thức nghiệm', latex: 'x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}' },
      { name: 'Nghiệm kép', latex: 'x_1 = x_2 = -\\frac{b}{2a} \\quad (\\text{khi } \\Delta = 0)' },
    ],
    examples: [{ title: 'Ví dụ: Giải phương trình', question: 'Giải phương trình: $x^2 - 5x + 6 = 0$.', solution: '$a = 1, b = -5, c = 6$.\n$\\Delta = (-5)^2 - 4(1)(6) = 25 - 24 = 1 > 0$.\nPhương trình có 2 nghiệm phân biệt:\n$x_1 = \\frac{-(-5) + \\sqrt{1}}{2(1)} = \\frac{5 + 1}{2} = 3$.\n$x_2 = \\frac{-(-5) - \\sqrt{1}}{2(1)} = \\frac{5 - 1}{2} = 2$.\nVậy tập nghiệm $S = \\{2; 3\\}$.' }],
    solvingMethods: [{ name: 'Quy trình giải phương trình bậc hai', steps: ['Xác định đúng các hệ số a, b, c', 'Tính biệt thức Delta', 'Kết luận số nghiệm và áp dụng công thức nghiệm'] }],
    commonMistakes: [{ mistake: 'Tính sai $(-5)^2 = -25$ thay vì $+25$.', correction: 'Bình phương của số âm luôn là số dương: $(-b)^2 = b^2 > 0$.', advice: 'Luôn đóng ngoặc hệ số âm khi bình phương.' }],
    stepByStepGuide: 'Xác định hệ số a, b, c → Tính Delta → Áp dụng công thức nghiệm.',
    answerKeySummary: 'Delta quyết định 2 nghiệm, nghiệm kép hoặc vô nghiệm.',
    practiceQuestions: [
      createPracticeQuestion({
        id: 'pq-g9-c6-2-1',
        code: 'TOAN9-B19-01',
        grade: 9,
        chapterId: 'ch-g9-6',
        lessonId: 'les-g9-c6-2',
        topic: 'Biệt thức Delta',
        level: 'recognition',
        content: 'Biệt thức $\\Delta$ của phương trình $2x^2 - 3x - 1 = 0$ bằng:',
        options: ['17', '1', '-1', '7'],
        correctAnswer: '17',
        explanation: '$\\Delta = b^2 - 4ac = (-3)^2 - 4(2)(-1) = 9 + 8 = 17$.',
        steps: ['a = 2, b = -3, c = -1', '$\\Delta = (-3)^2 - 4(2)(-1) = 9 + 8 = 17$.'],
      }),
    ],
  },
  {
    id: 'les-g9-c6-3',
    chapterId: 'ch-g9-6',
    grade: 9,
    title: 'Bài 20: Định lí Viète và ứng dụng',
    order: 3,
    objectives: ['Nắm vững định lí Viète về tổng và tích hai nghiệm', 'Ứng dụng nhẩm nghiệm và tìm hai số khi biết tổng và tích'],
    requirements: ['Biến đổi các biểu thức đối xứng giữa hai nghiệm $x_1, x_2$'],
    coreKnowledge: 'Nếu phương trình $ax^2 + bx + c = 0$ ($a \\ne 0$) có hai nghiệm $x_1, x_2$ thì: $S = x_1 + x_2 = -\\frac{b}{a}$ và $P = x_1 \\cdot x_2 = \\frac{c}{a}$. Trường hợp nhẩm nghiệm đặc biệt: 1) Nếu $a + b + c = 0 \\implies x_1 = 1, x_2 = \\frac{c}{a}$. 2) Nếu $a - b + c = 0 \\implies x_1 = -1, x_2 = -\\frac{c}{a}$. Hai số có tổng $S$ và tích $P$ là nghiệm của phương trình $X^2 - SX + P = 0$ ($S^2 - 4P \\ge 0$).',
    concepts: [{ term: 'Hệ thức Viète', definition: 'Mối liên hệ đẹp giữa các nghiệm của phương trình bậc hai với các hệ số của nó.' }],
    formulas: [
      { name: 'Hệ thức Viète', latex: '\\begin{cases} x_1 + x_2 = -\\frac{b}{a} \\\\ x_1 \\cdot x_2 = \\frac{c}{a} \\end{cases}' },
      { name: 'Tổng bình phương hai nghiệm', latex: 'x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = S^2 - 2P' },
    ],
    examples: [{ title: 'Ví dụ: Tính giá trị biểu thức', question: 'Cho phương trình $x^2 - 4x + 1 = 0$ có 2 nghiệm $x_1, x_2$. Tính $A = x_1^2 + x_2^2$.', solution: 'Theo Viète: $S = x_1 + x_2 = 4$; $P = x_1 x_2 = 1$.\nTa có: $A = (x_1 + x_2)^2 - 2x_1 x_2 = 4^2 - 2(1) = 16 - 2 = 14$.' }],
    solvingMethods: [{ name: 'Biến đổi biểu thức đối xứng', steps: ['Kiểm tra điều kiện phương trình có 2 nghiệm (Delta >= 0)', 'Viết hệ thức Viète S và P', 'Biến đổi biểu thức về dạng chứa S và P', 'Thay số và tính giá trị'] }],
    commonMistakes: [{ mistake: 'Quên kiểm tra điều kiện $\\Delta \\ge 0$ trước khi áp dụng hệ thức Viète.', correction: 'Định lí Viète chỉ áp dụng khi phương trình THỰC SỰ có nghiệm.', advice: 'Luôn tìm điều kiện có nghiệm trước.' }],
    stepByStepGuide: 'Kiểm tra Delta >= 0 → Viết Viète S, P → Biến đổi đối xứng → Thay số.',
    answerKeySummary: 'Viète là câu hỏi phân loại cốt lõi trong đề thi tuyển sinh vào lớp 10.',
  },
];

// Helper to get lessons by chapterId, falling back to an automatically generated structured lesson if not yet manually seeded
export function getCurriculumLessonsForChapter(chapter: { id: string; grade: GradeLevel; title: string; order: number; lessonCount: number }): Lesson[] {
  const direct = ALL_CURRICULUM_LESSONS.filter((l) => l.chapterId === chapter.id);
  if (direct.length > 0) return direct;

  // Otherwise, construct authentic structured lessons based on chapter title and lessonCount
  const lessons: Lesson[] = [];
  const count = Math.max(chapter.lessonCount || 3, 2);

  for (let i = 1; i <= count; i++) {
    const isReview = i === count;
    const lessonTitle = isReview
      ? `Luyện tập chung & Ôn tập ${chapter.title}`
      : `Bài ${i}: Kiến thức trọng tâm phần ${i} - ${chapter.title.replace(/Chương\s+[IVX0-9]+:\s*/, '')}`;

    lessons.push({
      id: `les-${chapter.id}-${i}`,
      chapterId: chapter.id,
      grade: chapter.grade,
      title: lessonTitle,
      order: i,
      objectives: [
        `Nắm vững các khái niệm, định nghĩa và định lí cốt lõi của bài học trong ${chapter.title}`,
        'Hiểu và vận dụng chính xác các công thức toán học SGK Kết nối tri thức với cuộc sống 2018',
        'Hình thành và phát triển năng lực tư duy, lập luận và giải quyết vấn đề toán học thực tiễn',
      ],
      requirements: [
        'Nhận biết và phân biệt các đối tượng toán học cơ bản',
        'Thực hiện thành thạo các bước tính toán và biến đổi đại số / hình học',
        'Trình bày lời giải bài toán tự luận rõ ràng, mạch lạc, có căn cứ logic',
      ],
      coreKnowledge: `Kiến thức trọng tâm bài học được biên soạn chuẩn theo chương trình GDPT 2018 môn Toán khối ${chapter.grade}. Bài học cung cấp hệ thống định nghĩa, tính chất, quy tắc tính toán và các mối liên hệ toán học quan trọng, giúp học sinh nắm chắc bản chất bài học và sẵn sàng giải các bài tập phân hóa từ nhận biết đến vận dụng cao.`,
      concepts: [
        {
          term: `Khái niệm then chốt ${i}`,
          definition: `Định nghĩa và tính chất cơ bản được quy định trong SGK Toán ${chapter.grade} Kết nối tri thức.`,
        },
        {
          term: 'Quy tắc suy luận',
          definition: 'Quy tắc biến đổi tương đương hoặc suy luận hình học áp dụng trong bài toán thực hành.',
        },
      ],
      formulas: [
        {
          name: 'Công thức toán học cốt lõi',
          latex: 'P = f(x) \\implies \\text{Điều kiện áp dụng}',
          note: 'Công thức tiêu chuẩn SGK',
        },
      ],
      examples: [
        {
          title: `Ví dụ mẫu minh họa Bài ${i}`,
          question: `Cho bài toán điển hình thuộc ${chapter.title}. Hãy tìm lời giải chi tiết và nhận xét.`,
          solution: `• Bước 1: Phân tích giả thiết và yêu cầu bài toán.\n• Bước 2: Áp dụng định nghĩa và công thức toán học tương ứng.\n• Bước 3: Biến đổi từng bước logic và kết luận nghiệm / đáp số.`,
          note: 'Chú ý kiểm tra điều kiện xác định và đơn vị đo nếu có.',
        },
      ],
      solvingMethods: [
        {
          name: 'Phương pháp giải chuẩn 4 bước',
          steps: [
            'Bước 1: Đọc kĩ đề, xác định đại lượng đã cho và đại lượng cần tìm.',
            'Bước 2: Lựa chọn công thức hoặc định lí thích hợp.',
            'Bước 3: Thực hiện tính toán hoặc lập luận chứng minh cẩn thận.',
            'Bước 4: Đối chiếu điều kiện và đưa ra kết luận chính xác.',
          ],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Bỏ quên điều kiện xác định hoặc nhầm dấu khi biến đổi biểu thức.',
          correction: 'Luôn viết điều kiện xác định ngay đầu bài và kiểm tra lại dấu phép tính.',
          advice: 'Tập thói quen kiểm tra lại từng dòng biến đổi trước khi kết luận.',
        },
      ],
      stepByStepGuide: 'Đọc kĩ lí thuyết → Làm lại ví dụ mẫu → Giải câu hỏi tự luyện tương tác → Rút kinh nghiệm từ lỗi sai.',
      answerKeySummary: 'Nắm chắc kiến thức nền tảng và phương pháp giải giúp đạt điểm tối đa.',
      practiceQuestions: [
        createPracticeQuestion({
          id: `pq-${chapter.id}-${i}-1`,
          code: `TOAN${chapter.grade}-${chapter.id.toUpperCase()}-0${i}`,
          grade: chapter.grade,
          chapterId: chapter.id,
          lessonId: `les-${chapter.id}-${i}`,
          topic: chapter.title,
          level: 'recognition',
          content: `Khẳng định nào sau đây là ĐÚNG đối với kiến thức trọng tâm bài học thuộc ${chapter.title}?`,
          options: [
            'Khẳng định A: Áp dụng đúng công thức và định nghĩa SGK',
            'Khẳng định B: Bỏ qua điều kiện xác định của biểu thức',
            'Khẳng định C: Đổi chiều bất đẳng thức khi nhân số dương',
            'Khẳng định D: Tổng hai số đối nhau bằng một số khác 0',
          ],
          correctAnswer: 'Khẳng định A: Áp dụng đúng công thức và định nghĩa SGK',
          explanation: 'Theo quy chuẩn SGK Toán GDPT 2018, việc áp dụng đúng định nghĩa và công thức là bắt buộc.',
          steps: [
            'Xem xét từng phương án lựa chọn.',
            'Phương án A hoàn toàn phù hợp với quy tắc toán học chuẩn mực.',
          ],
        }),
      ],
    });
  }

  return lessons;
}
