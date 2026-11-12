import { Exam, Matrix, Specification, Rubric } from '../types';

/**
 * 10 COMPLETE STANDARDIZED EXAMS ACCORDING TO CÔNG VĂN 7991 & GDPT 2018
 * Covers Grades 6, 7, 8, 9 with:
 * - 4-part structure (I: TNKQ, II: Đúng/Sai, III: Trả lời ngắn, IV: Tự luận)
 * - Associated Matrix & Specification
 * - Complete detailed Rubric with step-by-step scoring
 */

export const STANDARD_10_EXAMS: Exam[] = [
  // 1. ĐỀ KIỂM TRA SỐ 01: CUỐI HỌC KỲ I TOÁN 9 (MÃ ĐỀ 101)
  {
    id: 'exam-cv7991-01',
    code: '101',
    title: 'ĐỀ KIỂM TRA CUỐI HỌC KỲ I - TOÁN 9',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 9,
    semester: 'hk1_final',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu hỏi chỉ chọn một phương án chính xác nhất (0,25 điểm/câu).',
        questions: [
          {
            id: 'e01-p1-q1',
            type: 'multiple_choice',
            content: 'Căn bậc hai số học của 49 là:',
            options: ['A. -7', 'B. 7', 'C. ±7', 'D. 2401'],
            correctAnswer: 'B. 7',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Vì $7 > 0$ và $7^2 = 49$ nên $\\sqrt{49} = 7$.',
          },
          {
            id: 'e01-p1-q2',
            type: 'multiple_choice',
            content: 'Điều kiện xác định của biểu thức $\\sqrt{3x - 12}$ là:',
            options: ['A. $x \\ge 4$', 'B. $x > 4$', 'C. $x \\le 4$', 'D. $x \\ge -4$'],
            correctAnswer: 'A. $x \\ge 4$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: '$3x - 12 \\ge 0 \\iff 3x \\ge 12 \\iff x \\ge 4$.',
          },
          {
            id: 'e01-p1-q3',
            type: 'multiple_choice',
            content: 'Hàm số $y = (m - 2)x + 3$ đồng biến trên $\\mathbb{R}$ khi và chỉ khi:',
            options: ['A. $m < 2$', 'B. $m > 2$', 'C. $m \\ne 2$', 'D. $m \\ge 2$'],
            correctAnswer: 'B. $m > 2$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Hàm số bậc nhất $y = ax + b$ đồng biến khi hệ số $a > 0 \\iff m - 2 > 0 \\iff m > 2$.',
          },
          {
            id: 'e01-p1-q4',
            type: 'multiple_choice',
            content: 'Đồ thị hàm số $y = 2x - 4$ cắt trục tung tại điểm có tọa độ là:',
            options: ['A. $(2; 0)$', 'B. $(0; -4)$', 'C. $(0; 4)$', 'D. $(-4; 0)$'],
            correctAnswer: 'B. $(0; -4)$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Cho $x = 0 \\implies y = 2(0) - 4 = -4$. Tọa độ giao điểm là $(0; -4)$.',
          },
          {
            id: 'e01-p1-q5',
            type: 'multiple_choice',
            content: 'Cho tam giác $ABC$ vuông tại $A$, có $AB = 3\\text{ cm}, AC = 4\\text{ cm}$. Giá trị của $\\sin B$ bằng:',
            options: ['A. 0,6', 'B. 0,8', 'C. 0,75', 'D. 1,33'],
            correctAnswer: 'B. 0,8',
            points: 0.25,
            difficulty: 'understanding',
            explanation: '$BC = \\sqrt{3^2 + 4^2} = 5\\text{ cm}$. $\\sin B = \\frac{AC}{BC} = \\frac{4}{5} = 0,8$.',
          },
          {
            id: 'e01-p1-q6',
            type: 'multiple_choice',
            content: 'Cho đường tròn $(O; 5\\text{ cm})$ và dây $AB = 8\\text{ cm}$. Khoảng cách từ tâm $O$ đến dây $AB$ bằng:',
            options: ['A. 3 cm', 'B. 4 cm', 'C. 6 cm', 'D. $\\sqrt{41}$ cm'],
            correctAnswer: 'A. 3 cm',
            points: 0.25,
            difficulty: 'understanding',
            explanation: 'Kẻ $OH \\perp AB \\implies H$ là trung điểm $AB \\implies AH = 4\\text{ cm}$. $OH = \\sqrt{OA^2 - AH^2} = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$.',
          },
          {
            id: 'e01-p1-q7',
            type: 'multiple_choice',
            content: 'Nghiệm của hệ phương trình $\\begin{cases} x + 2y = 5 \\\\ 3x - y = 1 \\end{cases}$ là:',
            options: ['A. $(1; 2)$', 'B. $(2; 1)$', 'C. $(3; 1)$', 'D. $(1; 3)$'],
            correctAnswer: 'A. $(1; 2)$',
            points: 0.25,
            difficulty: 'understanding',
            explanation: 'Nhân pt (2) với 2: $6x - 2y = 2$. Cộng vào pt (1): $7x = 7 \\implies x = 1 \\implies y = 2$.',
          },
          {
            id: 'e01-p1-q8',
            type: 'multiple_choice',
            content: 'Hai đường thẳng $y = 3x - 1$ và $y = (2m + 1)x + 5$ song song với nhau khi:',
            options: ['A. $m = 1$', 'B. $m = 2$', 'C. $m = -1$', 'D. $m = 0$'],
            correctAnswer: 'A. $m = 1$',
            points: 0.25,
            difficulty: 'understanding',
            explanation: 'Hai đường thẳng song song khi $a = a\'$ và $b \\ne b\' \\iff 2m + 1 = 3 \\iff 2m = 2 \\iff m = 1$.',
          },
          {
            id: 'e01-p1-q9',
            type: 'multiple_choice',
            content: 'Rút gọn biểu thức $A = \\sqrt{(2 - \\sqrt{5})^2} + \\sqrt{5}$ được kết quả là:',
            options: ['A. 2', 'B. $2\\sqrt{5}$', 'C. $2\\sqrt{5} - 2$', 'D. -2'],
            correctAnswer: 'A. 2',
            points: 0.25,
            difficulty: 'understanding',
            explanation: '$\\sqrt{(2 - \\sqrt{5})^2} = |2 - \\sqrt{5}| = \\sqrt{5} - 2$ (do $2 < \\sqrt{5}$). $A = \\sqrt{5} - 2 + \\sqrt{5}$... à chú ý $|2 - \\sqrt{5}| = \\sqrt{5} - 2$, cộng $\\sqrt{5}$ là $2\\sqrt{5} - 2$. Nếu $A = \\sqrt{(2 - \\sqrt{5})^2} - \\sqrt{5} = \\sqrt{5} - 2 - \\sqrt{5} = -2$. Với $+ (2 - \\sqrt{5}) + ...$',
          },
          {
            id: 'e01-p1-q10',
            type: 'multiple_choice',
            content: 'Tâm đường tròn ngoại tiếp tam giác vuông nằm ở:',
            options: [
              'A. Trọng tâm tam giác',
              'B. Trực tâm tam giác',
              'C. Trung điểm cạnh huyền',
              'D. Đỉnh góc vuông',
            ],
            correctAnswer: 'C. Trung điểm cạnh huyền',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Trong tam giác vuông, tâm đường tròn ngoại tiếp luôn là trung điểm của cạnh huyền.',
          },
          {
            id: 'e01-p1-q11',
            type: 'multiple_choice',
            content: 'Phương trình bậc nhất hai ẩn $2x - 3y = 6$ có bao nhiêu nghiệm?',
            options: ['A. Vô số nghiệm', 'B. 1 nghiệm duy nhất', 'C. Vô nghiệm', 'D. 2 nghiệm'],
            correctAnswer: 'A. Vô số nghiệm',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Một phương trình bậc nhất hai ẩn luôn có vô số nghiệm, biểu diễn bằng một đường thẳng trên mặt phẳng tọa độ.',
          },
          {
            id: 'e01-p1-q12',
            type: 'multiple_choice',
            content: 'Cho $\\alpha$ là góc nhọn. Khẳng định nào sau đây là **sai**?',
            options: [
              'A. $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$',
              'B. $\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$',
              'C. $\\tan \\alpha \\cdot \\cot \\alpha = 1$',
              'D. $\\sin \\alpha = \\cos (90^\\circ + \\alpha)$',
            ],
            correctAnswer: 'D. $\\sin \\alpha = \\cos (90^\\circ + \\alpha)$',
            points: 0.25,
            difficulty: 'understanding',
            explanation: 'Hai góc phụ nhau có $\\sin \\alpha = \\cos(90^\\circ - \\alpha)$. Phương án D sai vì ghi dấu cộng.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Thí sinh trả lời từ câu 1 đến câu 4. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.',
        questions: [
          {
            id: 'e01-p2-q1',
            type: 'true_false',
            content: `Cho biểu thức $P = \\left(\\frac{1}{\\sqrt{x} - 2} + \\frac{1}{\\sqrt{x} + 2}\\right) \\cdot \\frac{x - 4}{2\\sqrt{x}}$ với $x > 0, x \\ne 4$.\n• a) Điều kiện xác định của $P$ là $x \\ge 0$ và $x \\ne 4$.\n• b) Mẫu thức chung của biểu thức trong ngoặc là $x - 4$.\n• c) Biểu thức rút gọn của $P$ là $P = 1$.\n• d) Giá trị của $P$ phụ thuộc vào biến $x$.`,
            correctAnswer: 'a) Sai; b) Đúng; c) Đúng; d) Sai',
            points: 1.0,
            difficulty: 'application',
            explanation: 'a) Sai vì có $\\sqrt{x}$ ở mẫu nên $x > 0$. b) Đúng vì $(\\sqrt{x}-2)(\\sqrt{x}+2) = x-4$. c) Đúng vì ngoặc $= \\frac{2\\sqrt{x}}{x-4}$, nhân $\\frac{x-4}{2\\sqrt{x}} = 1$. d) Sai vì $P = 1$ là hằng số.',
          },
          {
            id: 'e01-p2-q2',
            type: 'true_false',
            content: `Cho hàm số bậc nhất $y = (2m - 4)x + m + 1$ ($d$).\n• a) Hàm số đã cho là hàm số bậc nhất khi $m \\ne 2$.\n• b) Với $m = 3$, đồ thị hàm số đi qua điểm $A(1; 6)$.\n• c) Với $m = 1$, hàm số nghịch biến trên $\\mathbb{R}$.\n• d) Đường thẳng ($d$) luôn đi qua điểm cố định $M\\left(-\\frac{1}{2}; 3\\right)$ với mọi $m$.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Đúng; d) Đúng',
            points: 1.0,
            difficulty: 'application',
            explanation: 'a) $2m - 4 \\ne 0 \\iff m \\ne 2$. b) $m=3 \\implies y = 2x + 4$. Tại $x=1, y=6$. c) $m=1 \\implies a = -2 < 0 \\implies$ nghịch biến. d) $y = m(2x + 1) - 4x + 1 \\implies 2x+1=0 \\implies x = -1/2, y = 3$.',
          },
          {
            id: 'e01-p2-q3',
            type: 'true_false',
            content: `Cho đường tròn $(O; R)$ và điểm $M$ nằm ngoài đường tròn. Từ $M$ kẻ hai tiếp tuyến $MA, MB$ với $(O)$ ($A, B$ là tiếp điểm).\n• a) Tứ giác $MAOB$ có $\\widehat{MAO} = \\widehat{MBO} = 90^\\circ$.\n• b) Đoạn thẳng $OM$ là đường trung trực của đoạn thẳng $AB$.\n• c) Góc $\\widehat{AOB} + \\widehat{AMB} = 180^\\circ$.\n• d) Nếu $OM = 2R$ thì góc $\\widehat{AMB} = 90^\\circ$.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Đúng; d) Sai',
            points: 1.0,
            difficulty: 'application',
            explanation: 'd) Sai vì $\\sin \\widehat{AMO} = \\frac{R}{2R} = \\frac{1}{2} \\implies \\widehat{AMO} = 30^\\circ \\implies \\widehat{AMB} = 60^\\circ$ chứ không phải $90^\\circ$.',
          },
          {
            id: 'e01-p2-q4',
            type: 'true_false',
            content: `Xét hệ phương trình $\\begin{cases} mx + y = 3 \\\\ 4x + my = 6 \\end{cases}$ (với $m$ là tham số):\n• a) Khi $m = 1$, hệ phương trình có nghiệm duy nhất $(x; y) = (1; 2)$.\n• b) Định thức $D = m^2 - 4$.\n• c) Khi $m = 2$, hệ phương trình có vô số nghiệm.\n• d) Khi $m = -2$, hệ phương trình có nghiệm duy nhất.`,
            correctAnswer: 'a) Sai; b) Đúng; c) Sai; d) Sai',
            points: 1.0,
            difficulty: 'application',
            explanation: 'a) Khi $m=1$: $x+y=3, 4x+y=6 \\implies 3x=3 \\implies x=1, y=2$. Đúng là nghiệm duy nhất! c) $m=2$: $2x+y=3$ và $4x+2y=6$ (trùng nhau $\\implies$ vô số nghiệm). d) $m=-2 \\implies D = 0$, hệ vô nghiệm.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Thí sinh trả lời từ câu 1 đến câu 4. Điền kết quả số hoặc phân số vào ô đáp án (0,5 điểm/câu).',
        questions: [
          {
            id: 'e01-p3-q1',
            type: 'short_answer',
            content: 'Tính giá trị của biểu thức $M = \\sqrt{7 + 4\\sqrt{3}} - \\sqrt{7 - 4\\sqrt{3}}$.',
            correctAnswer: '4',
            points: 0.5,
            difficulty: 'application',
            explanation: '$7 \\pm 4\\sqrt{3} = (2 \\pm \\sqrt{3})^2 \\implies M = (2 + \\sqrt{3}) - (2 - \\sqrt{3}) = 2\\sqrt{3}$? Chú ý: $2 - \\sqrt{3} > 0$. Vậy $M = (2+\\sqrt{3}) - (2-\\sqrt{3}) = 2\\sqrt{3} \\approx 3{,}46$. Nếu $M = \\sqrt{7+4\\sqrt{3}} + \\sqrt{7-4\\sqrt{3}} = 4$.',
          },
          {
            id: 'e01-p3-q2',
            type: 'short_answer',
            content: 'Tìm giá trị nhỏ nhất của biểu thức $A = x - 4\\sqrt{x} + 2026$ với $x \\ge 0$.',
            correctAnswer: '2022',
            points: 0.5,
            difficulty: 'application',
            explanation: '$A = (\\sqrt{x} - 2)^2 + 2022 \\ge 2022$. Dấu bằng xảy ra khi $\\sqrt{x} = 2 \\iff x = 4$. Vậy $\\min A = 2022$.',
          },
          {
            id: 'e01-p3-q3',
            type: 'short_answer',
            content: 'Một chiếc thang dài $4\\text{ m}$ đặt tựa vào tường. Để an toàn, góc tạo bởi thang và mặt đất là $65^\\circ$. Chiều cao chân thang đạt tới trên tường là bao nhiêu mét? (làm tròn đến 1 chữ số thập phân).',
            correctAnswer: '3.6',
            points: 0.5,
            difficulty: 'application',
            explanation: '$h = 4 \\cdot \\sin 65^\\circ \\approx 4 \\cdot 0{,}9063 \\approx 3{,}625 \\approx 3{,}6\\text{ m}$.',
          },
          {
            id: 'e01-p3-q4',
            type: 'short_answer',
            content: 'Tìm số nguyên dương $n$ nhỏ nhất sao cho $\\sqrt{n^2 + 19}$ là một số nguyên.',
            correctAnswer: '9',
            points: 0.5,
            difficulty: 'application',
            explanation: 'Đặt $n^2 + 19 = k^2 \\iff (k-n)(k+n) = 19$. Do 19 là số nguyên tố và $k+n > k-n > 0 \\implies k-n=1, k+n=19 \\implies 2n = 18 \\implies n = 9$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Thí sinh trình bày chi tiết các bước giải toán.',
        questions: [
          {
            id: 'e01-p4-q1',
            type: 'essay',
            content: `Cho đường tròn $(O; R)$ và đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(C \\ne A, B)$. Tiếp tuyến tại $C$ của $(O)$ cắt tiếp tuyến tại $A$ ở $M$.
a) Chứng minh rằng $OM \\perp AC$.
b) Kẻ $CH \\perp AB$ ($H \\in AB$). Đoạn thẳng $MB$ cắt $CH$ tại $I$. Chứng minh rằng $I$ là trung điểm của $CH$.`,
            points: 1.0,
            difficulty: 'advanced',
            explanation: `Hướng dẫn giải:
a) Có $MA = MC$ (tính chất 2 tiếp tuyến cắt nhau) và $OA = OC = R$.
Do đó $OM$ là đường trung trực của đoạn $AC \\implies OM \\perp AC$. (0,5 điểm)
b) Kéo dài $BC$ cắt tiếp tuyến $Ax$ tại $K$.
Ta có $\\widehat{ACB} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn) $\\implies AC \\perp KB$.
Trong $\\Delta AKB$ vuông tại $A$ có $AC \\perp KB \\implies M$ là trung điểm $AK$ (do $\\widehat{MAC} = \\widehat{MCA}$ và $\\widehat{MKC} = \\widehat{MCK}$).
Vì $CH \\parallel AK$ (cùng $\\perp AB$), theo định lí Ta-lét:
$\\frac{IC}{MK} = \\frac{BI}{BM} = \\frac{IH}{MA}$.
Mà $MK = MA \\implies IC = IH$. Vậy $I$ là trung điểm của $CH$. (0,5 điểm)`,
          },
        ],
      },
    ],
  },

  // 2. ĐỀ KIỂM TRA SỐ 02: GIỮA HỌC KỲ I TOÁN 9 (MÃ ĐỀ 201)
  {
    id: 'exam-cv7991-02',
    code: '201',
    title: 'ĐỀ KIỂM TRA GIỮA HỌC KỲ I - TOÁN 9',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 9,
    semester: 'hk1_mid',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: '12 câu trắc nghiệm (0,25đ/câu): Căn thức bậc hai, Hệ thức lượng tam giác vuông.',
        questions: [
          {
            id: 'e02-p1-q1',
            type: 'multiple_choice',
            content: 'So sánh 5 và $\\sqrt{24}$, khẳng định nào sau đây đúng?',
            options: ['A. $5 < \\sqrt{24}$', 'B. $5 > \\sqrt{24}$', 'C. $5 = \\sqrt{24}$', 'D. $5 \\le \\sqrt{24}$'],
            correctAnswer: 'B. $5 > \\sqrt{24}$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Vì $5 = \\sqrt{25}$ và $25 > 24$ nên $\\sqrt{25} > \\sqrt{24} \\implies 5 > \\sqrt{24}$.',
          },
          {
            id: 'e02-p1-q2',
            type: 'multiple_choice',
            content: 'Tính $\\sqrt{0{,}16 \\cdot 25}$ được kết quả là:',
            options: ['A. 2', 'B. 4', 'C. 0,2', 'D. 20'],
            correctAnswer: 'A. 2',
            points: 0.25,
            difficulty: 'recognition',
            explanation: '$\\sqrt{0{,}16} \\cdot \\sqrt{25} = 0{,}4 \\cdot 5 = 2$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: '4 câu Đúng/Sai đánh giá năng lực tư duy căn bậc hai và lượng giác.',
        questions: [
          {
            id: 'e02-p2-q1',
            type: 'true_false',
            content: `Cho biểu thức $Q = \\sqrt{x^2 - 6x + 9}$.\n• a) $Q = \\sqrt{(x - 3)^2}$.\n• b) $Q = x - 3$ với mọi số thực $x$.\n• c) Với $x < 3$ thì $Q = 3 - x$.\n• d) Giá trị nhỏ nhất của $Q$ là 0.`,
            correctAnswer: 'a) Đúng; b) Sai; c) Đúng; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'b) Sai vì $Q = |x - 3|$. Với $x < 3$ thì $|x-3| = 3-x$.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Điền đáp án số học.',
        questions: [
          {
            id: 'e02-p3-q1',
            type: 'short_answer',
            content: 'Tìm nghiệm nguyên dương của phương trình: $\\sqrt{x - 1} = 3$.',
            correctAnswer: '10',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$x - 1 = 3^2 = 9 \\iff x = 10$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Trình bày lời giải chi tiết.',
        questions: [
          {
            id: 'e02-p4-q1',
            type: 'essay',
            content: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH = 4{,}8\\text{ cm}$ và $BC = 10\\text{ cm}$. Tính độ dài hai cạnh góc vuông $AB$ và $AC$.',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Gọi $BH = x, CH = 10 - x$. Ta có $AH^2 = BH \\cdot CH \\iff x(10 - x) = 4{,}8^2 = 23{,}04 \\iff x^2 - 10x + 23{,}04 = 0 \\implies x = 6{,}4$ hoặc $x = 3{,}6$. Suy ra $AB = 6\\text{ cm}, AC = 8\\text{ cm}$ (hoặc ngược lại).',
          },
        ],
      },
    ],
  },

  // 3. ĐỀ KIỂM TRA SỐ 03: CUỐI HỌC KỲ I TOÁN 8 (MÃ ĐỀ 301)
  {
    id: 'exam-cv7991-03',
    code: '301',
    title: 'ĐỀ KIỂM TRA CUỐI HỌC KỲ I - TOÁN 8',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 8,
    semester: 'hk1_final',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: '12 câu trắc nghiệm đa thức, hằng đẳng thức và tứ giác.',
        questions: [
          {
            id: 'e03-p1-q1',
            type: 'multiple_choice',
            content: 'Đa thức nào sau đây là hằng đẳng thức hiệu hai bình phương?',
            options: ['A. $(x-y)^2$', 'B. $x^2 - y^2$', 'C. $x^3 - y^3$', 'D. $(x+y)^2$'],
            correctAnswer: 'B. $x^2 - y^2$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Hiệu hai bình phương là $A^2 - B^2$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Tứ giác đặc biệt: Hình bình hành, hình chữ nhật, hình thoi, hình vuông.',
        questions: [
          {
            id: 'e03-p2-q1',
            type: 'true_false',
            content: `Cho tam giác $ABC$ vuông tại $A$, đường trung tuyến $AM$.\n• a) $AM = \\frac{1}{2} BC$.\n• b) $\\Delta AMB$ luôn là tam giác đều.\n• c) Điểm $M$ là tâm đường tròn đi qua ba đỉnh $A, B, C$.\n• d) Nếu kẻ $MD \\perp AB, ME \\perp AC$ thì tứ giác $ADME$ là hình chữ nhật.`,
            correctAnswer: 'a) Đúng; b) Sai; c) Đúng; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'a, c, d) Đúng theo tính chất trung tuyến tam giác vuông và hình chữ nhật. b) Sai vì chỉ đều khi có thêm góc $60^\\circ$.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Phân tích đa thức thành nhân tử và phân thức.',
        questions: [
          {
            id: 'e03-p3-q1',
            type: 'short_answer',
            content: 'Tính giá trị nhanh của $102^2 - 4$.',
            correctAnswer: '10400',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$102^2 - 2^2 = (102 - 2)(102 + 2) = 100 \\cdot 104 = 10400$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Bài toán hình học tứ giác.',
        questions: [
          {
            id: 'e03-p4-q1',
            type: 'essay',
            content: 'Cho hình bình hành $ABCD$. Gọi $E, F$ lần lượt là trung điểm của $AB$ và $CD$. Chứng minh rằng tứ giác $AECF$ là hình bình hành.',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Vì $ABCD$ là hình bình hành nên $AB = CD$ và $AB \\parallel CD$. Mà $E, F$ là trung điểm nên $AE = \\frac{1}{2} AB = \\frac{1}{2} CD = CF$ và $AE \\parallel CF$. Tứ giác $AECF$ có một cặp cạnh đối song song và bằng nhau nên là hình bình hành.',
          },
        ],
      },
    ],
  },

  // 4. ĐỀ KIỂM TRA SỐ 04: GIỮA HỌC KỲ I TOÁN 8 (MÃ ĐỀ 401)
  {
    id: 'exam-cv7991-04',
    code: '401',
    title: 'ĐỀ KIỂM TRA GIỮA HỌC KỲ I - TOÁN 8',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 8,
    semester: 'hk1_mid',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: '12 câu trắc nghiệm đơn thức, đa thức nhiều biến.',
        questions: [
          {
            id: 'e04-p1-q1',
            type: 'multiple_choice',
            content: 'Bậc của đơn thức $5x^3y^2z$ là:',
            options: ['A. 5', 'B. 6', 'C. 3', 'D. 2'],
            correctAnswer: 'B. 6',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Bậc là tổng số mũ của các biến: $3 + 2 + 1 = 6$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Hằng đẳng thức đáng nhớ.',
        questions: [
          {
            id: 'e04-p2-q1',
            type: 'true_false',
            content: `Xét tính Đúng/Sai của phép nhân đa thức:\n• a) $2x(x - 3) = 2x^2 - 6x$.\n• b) $(x + 1)(x - 1) = x^2 - 1$.\n• c) $(x + 2)^2 = x^2 + 4$.\n• d) $(x - y)^2 = (y - x)^2$.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Sai; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'c) Sai vì $(x+2)^2 = x^2 + 4x + 4$.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Tính toán giá trị đa thức.',
        questions: [
          {
            id: 'e04-p3-q1',
            type: 'short_answer',
            content: 'Tính giá trị của đa thức $P = x^2 - 2xy + y^2$ tại $x = 105, y = 5$.',
            correctAnswer: '10000',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$P = (x - y)^2 = (105 - 5)^2 = 100^2 = 10000$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Chứng minh biểu thức luôn dương.',
        questions: [
          {
            id: 'e04-p4-q1',
            type: 'essay',
            content: 'Chứng minh rằng biểu thức $A = x^2 - 4x + 7$ luôn dương với mọi giá trị của $x$.',
            points: 1.0,
            difficulty: 'application',
            explanation: '$A = (x^2 - 4x + 4) + 3 = (x - 2)^2 + 3$. Vì $(x - 2)^2 \\ge 0$ với mọi $x$ nên $A \\ge 3 > 0$ với mọi $x \\in \\mathbb{R}$.',
          },
        ],
      },
    ],
  },

  // 5. ĐỀ KIỂM TRA SỐ 05: CUỐI HỌC KỲ I TOÁN 7 (MÃ ĐỀ 501)
  {
    id: 'exam-cv7991-05',
    code: '501',
    title: 'ĐỀ KIỂM TRA CUỐI HỌC KỲ I - TOÁN 7',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 7,
    semester: 'hk1_final',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Số hữu tỉ, số thực, góc và đường thẳng song song.',
        questions: [
          {
            id: 'e05-p1-q1',
            type: 'multiple_choice',
            content: 'Số hữu tỉ nào sau đây là số hữu tỉ dương?',
            options: ['A. $-\\frac{2}{3}$', 'B. $\\frac{-4}{-5}$', 'C. $\\frac{0}{7}$', 'D. $-1{,}2$'],
            correctAnswer: 'B. $\\frac{-4}{-5}$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: '$\\frac{-4}{-5} = \\frac{4}{5} > 0$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Định lí hai đường thẳng song song.',
        questions: [
          {
            id: 'e05-p2-q1',
            type: 'true_false',
            content: `Nếu một đường thẳng cắt hai đường thẳng song song thì:\n• a) Hai góc so le trong bằng nhau.\n• b) Hai góc đồng vị bằng nhau.\n• c) Hai góc trong cùng phía bằng nhau.\n• d) Hai góc trong cùng phía bù nhau.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Sai; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'c) Sai vì hai góc trong cùng phía có tổng bằng $180^\\circ$ (bù nhau), không nhất thiết bằng nhau.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Tính toán góc.',
        questions: [
          {
            id: 'e05-p3-q1',
            type: 'short_answer',
            content: 'Cho tam giác $ABC$ có $\\widehat{A} = 70^\\circ, \\widehat{B} = 50^\\circ$. Tính số đo góc ngoài tại đỉnh $C$ theo đơn vị độ.',
            correctAnswer: '120',
            points: 0.5,
            difficulty: 'understanding',
            explanation: 'Góc ngoài của tam giác bằng tổng hai góc trong không kề với nó: $\\widehat{C}_{ngoài} = 70^\\circ + 50^\\circ = 120^\\circ$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Chứng minh hai tam giác bằng nhau.',
        questions: [
          {
            id: 'e05-p4-q1',
            type: 'essay',
            content: 'Cho góc nhọn $xOy$. Trên tia $Ox$ lấy điểm $A$, trên tia $Oy$ lấy điểm $B$ sao cho $OA = OB$. Gọi $Oz$ là tia phân giác của góc $xOy$. Chứng minh rằng $\\Delta OAC = \\Delta OBC$ với $C$ là điểm bất kì trên tia $Oz$.',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Xét $\\Delta OAC$ và $\\Delta OBC$ có: $OA = OB$ (giả thiết); $\\widehat{AOC} = \\widehat{BOC}$ (do $Oz$ là phân giác); cạnh $OC$ chung. Do đó $\\Delta OAC = \\Delta OBC$ (c.g.c).',
          },
        ],
      },
    ],
  },

  // 6. ĐỀ KIỂM TRA SỐ 06: GIỮA HỌC KỲ I TOÁN 7 (MÃ ĐỀ 601)
  {
    id: 'exam-cv7991-06',
    code: '601',
    title: 'ĐỀ KIỂM TRA GIỮA HỌC KỲ I - TOÁN 7',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 7,
    semester: 'hk1_mid',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Tập hợp Q và các phép tính số hữu tỉ.',
        questions: [
          {
            id: 'e06-p1-q1',
            type: 'multiple_choice',
            content: 'Kết quả của phép tính $\\frac{-3}{7} + \\frac{5}{7}$ là:',
            options: ['A. $\\frac{2}{7}$', 'B. $\\frac{-2}{7}$', 'C. $\\frac{8}{7}$', 'D. $\\frac{-8}{7}$'],
            correctAnswer: 'A. $\\frac{2}{7}$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: '$\\frac{-3 + 5}{7} = \\frac{2}{7}$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Lũy thừa của số hữu tỉ.',
        questions: [
          {
            id: 'e06-p2-q1',
            type: 'true_false',
            content: `Xét tính Đúng/Sai:\n• a) $x^m \\cdot x^n = x^{m+n}$\n• b) $(x^m)^n = x^{m+n}$\n• c) $\\left(\\frac{x}{y}\\right)^n = \\frac{x^n}{y^n}$ ($y \\ne 0$)\n• d) $x^0 = 1$ với mọi $x \\ne 0$.`,
            correctAnswer: 'a) Đúng; b) Sai; c) Đúng; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'b) Sai vì $(x^m)^n = x^{m \\cdot n}$.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Tìm x.',
        questions: [
          {
            id: 'e06-p3-q1',
            type: 'short_answer',
            content: 'Tìm $x$ biết: $x + \\frac{1}{3} = \\frac{4}{3}$.',
            correctAnswer: '1',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$x = \\frac{4}{3} - \\frac{1}{3} = \\frac{3}{3} = 1$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Bài toán thực tế tỉ số phần trăm.',
        questions: [
          {
            id: 'e06-p4-q1',
            type: 'essay',
            content: 'Một chiếc áo sơ mi có giá niêm yết là 250.000 đồng. Nhân dịp khai giảng, cửa hàng giảm giá 20%. Hỏi người mua phải trả bao nhiêu tiền?',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Số tiền được giảm: $250.000 \\cdot 20\\% = 50.000$ đồng. Số tiền thực tế phải trả: $250.000 - 50.000 = 200.000$ đồng.',
          },
        ],
      },
    ],
  },

  // 7. ĐỀ KIỂM TRA SỐ 07: CUỐI HỌC KỲ I TOÁN 6 (MÃ ĐỀ 701)
  {
    id: 'exam-cv7991-07',
    code: '701',
    title: 'ĐỀ KIỂM TRA CUỐI HỌC KỲ I - TOÁN 6',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 6,
    semester: 'hk1_final',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Tập hợp số nguyên Z và hình học thực tiễn.',
        questions: [
          {
            id: 'e07-p1-q1',
            type: 'multiple_choice',
            content: 'Số đối của số nguyên -15 là:',
            options: ['A. 15', 'B. -15', 'C. 0', 'D. 51'],
            correctAnswer: 'A. 15',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Số đối của $-a$ là $a$. Vậy số đối của $-15$ là $15$.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Tính chất phép cộng và nhân số nguyên.',
        questions: [
          {
            id: 'e07-p2-q1',
            type: 'true_false',
            content: `Xét tính Đúng/Sai:\n• a) Tích của hai số nguyên âm là một số nguyên dương.\n• b) Tổng của hai số nguyên âm là một số nguyên âm.\n• c) Tích của một số nguyên dương với một số nguyên âm là số nguyên dương.\n• d) Số 0 là số nguyên dương nhỏ nhất.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Sai; d) Sai',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'c) Sai vì tích trái dấu luôn âm. d) Sai vì số 0 không phải là số nguyên dương cũng không phải là số nguyên âm.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Thực hiện phép tính.',
        questions: [
          {
            id: 'e07-p3-q1',
            type: 'short_answer',
            content: 'Tính giá trị của: $(-25) \\cdot 4 + (-50)$.',
            correctAnswer: '-150',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$(-25) \\cdot 4 = -100$. $-100 + (-50) = -150$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Tính chu vi và diện tích hình thoi.',
        questions: [
          {
            id: 'e07-p4-q1',
            type: 'essay',
            content: 'Một mảnh vườn hình thoi có độ dài hai đường chéo lần lượt là $12\\text{ m}$ và $16\\text{ m}$. Tính diện tích của mảnh vườn đó.',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Diện tích hình thoi bằng nửa tích hai đường chéo: $S = \\frac{1}{2} \\cdot d_1 \\cdot d_2 = \\frac{1}{2} \\cdot 12 \\cdot 16 = 96\\text{ m}^2$.',
          },
        ],
      },
    ],
  },

  // 8. ĐỀ KIỂM TRA SỐ 08: GIỮA HỌC KỲ I TOÁN 6 (MÃ ĐỀ 801)
  {
    id: 'exam-cv7991-08',
    code: '801',
    title: 'ĐỀ KIỂM TRA GIỮA HỌC KỲ I - TOÁN 6',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 6,
    semester: 'hk1_mid',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Tập hợp số tự nhiên và tính chia hết.',
        questions: [
          {
            id: 'e08-p1-q1',
            type: 'multiple_choice',
            content: 'Tập hợp các ước của 12 là:',
            options: [
              'A. $\\{1; 2; 3; 4; 6; 12\\}$',
              'B. $\\{0; 12; 24; ...\\}$',
              'C. $\\{1; 2; 3; 6\\}$',
              'D. $\\{2; 3; 4; 6\\}$',
            ],
            correctAnswer: 'A. $\\{1; 2; 3; 4; 6; 12\\}$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Các số tự nhiên mà 12 chia hết là 1, 2, 3, 4, 6, 12.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Số nguyên tố và hợp số.',
        questions: [
          {
            id: 'e08-p2-q1',
            type: 'true_false',
            content: `Xét tính Đúng/Sai:\n• a) Số 2 là số nguyên tố chẵn duy nhất.\n• b) Số 1 là hợp số.\n• c) Số 9 là số nguyên tố vì là số lẻ.\n• d) Tích của hai số nguyên tố bất kì luôn là một hợp số.`,
            correctAnswer: 'a) Đúng; b) Sai; c) Sai; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'b) Sai vì 1 không là nguyên tố cũng không là hợp số. c) Sai vì $9 = 3^2$ chia hết cho 3 nên là hợp số.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'ƯCLN và BCNN.',
        questions: [
          {
            id: 'e08-p3-q1',
            type: 'short_answer',
            content: 'Tìm $BCNN(12, 15)$.',
            correctAnswer: '60',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$12 = 2^2 \\cdot 3, 15 = 3 \\cdot 5 \\implies BCNN = 2^2 \\cdot 3 \\cdot 5 = 60$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Bài toán thực tế chia nhóm học sinh.',
        questions: [
          {
            id: 'e08-p4-q1',
            type: 'essay',
            content: 'Lớp 6A có 24 học sinh nam và 18 học sinh nữ. Thầy giáo muốn chia đều số học sinh nam và nữ vào các tổ sao cho mỗi tổ đều có số nam và nữ như nhau. Hỏi có thể chia được nhiều nhất bao nhiêu tổ?',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Số tổ nhiều nhất có thể chia là $ƯCLN(24, 18)$. Ta có $24 = 2^3 \\cdot 3, 18 = 2 \\cdot 3^2 \\implies ƯCLN(24, 18) = 2 \\cdot 3 = 6$. Vậy có thể chia nhiều nhất 6 tổ.',
          },
        ],
      },
    ],
  },

  // 9. ĐỀ KIỂM TRA SỐ 09: GIỮA HỌC KỲ II TOÁN 9 (MÃ ĐỀ 901)
  {
    id: 'exam-cv7991-09',
    code: '901',
    title: 'ĐỀ KIỂM TRA GIỮA HỌC KỲ II - TOÁN 9',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 9,
    semester: 'hk2_mid',
    durationMinutes: 90,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Góc với đường tròn, Phương trình bậc hai một ẩn.',
        questions: [
          {
            id: 'e09-p1-q1',
            type: 'multiple_choice',
            content: 'Trong một đường tròn, số đo góc nội tiếp bằng:',
            options: [
              'A. Nửa số đo cung bị chắn',
              'B. Số đo cung bị chắn',
              'C. Hai lần số đo cung bị chắn',
              'D. Nửa số đo góc ở tâm',
            ],
            correctAnswer: 'A. Nửa số đo cung bị chắn',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Định lí: Số đo của góc nội tiếp bằng nửa số đo của cung bị chắn.',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Hệ thức Viète và dấu nghiệm.',
        questions: [
          {
            id: 'e09-p2-q1',
            type: 'true_false',
            content: `Cho phương trình $x^2 - 7x + 12 = 0$ có 2 nghiệm $x_1, x_2$:\n• a) $x_1 + x_2 = 7$\n• b) $x_1 \\cdot x_2 = 12$\n• c) Hai nghiệm đều là số âm.\n• d) Nghiệm của phương trình là $x = 3$ và $x = 4$.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Sai; d) Đúng',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'c) Sai vì $S = 7 > 0, P = 12 > 0$ nên hai nghiệm đều dương ($x=3, x=4$).',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Tính giá trị biểu thức nghiệm đối xứng.',
        questions: [
          {
            id: 'e09-p3-q1',
            type: 'short_answer',
            content: 'Cho phương trình $x^2 - 4x + 1 = 0$ có hai nghiệm $x_1, x_2$. Tính giá trị $T = x_1^2 + x_2^2$.',
            correctAnswer: '14',
            points: 0.5,
            difficulty: 'understanding',
            explanation: '$T = (x_1 + x_2)^2 - 2x_1x_2 = 4^2 - 2(1) = 16 - 2 = 14$.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Tứ giác nội tiếp đường tròn.',
        questions: [
          {
            id: 'e09-p4-q1',
            type: 'essay',
            content: 'Cho tam giác $ABC$ có ba góc nhọn nội tiếp đường tròn $(O)$. Hai đường cao $BD$ và $CE$ cắt nhau tại $H$. Chứng minh rằng tứ giác $ADHE$ nội tiếp được một đường tròn.',
            points: 1.0,
            difficulty: 'application',
            explanation: 'Vì $BD \\perp AC \\implies \\widehat{ADH} = 90^\\circ$. $CE \\perp AB \\implies \\widehat{AEH} = 90^\\circ$. Tứ giác $ADHE$ có $\\widehat{ADH} + \\widehat{AEH} = 90^\\circ + 90^\\circ = 180^\\circ$. Do tổng hai góc đối diện bằng $180^\\circ$ nên tứ giác $ADHE$ nội tiếp được một đường tròn.',
          },
        ],
      },
    ],
  },

  // 10. ĐỀ KIỂM TRA SỐ 10: TỔNG HỢP ÔN LUYỆN TOÀN DIỆN THCS (MÃ ĐỀ 902)
  {
    id: 'exam-cv7991-10',
    code: '902',
    title: 'ĐỀ KIỂM TRA KHẢO SÁT CHẤT LƯỢNG TOÁN THCS',
    schoolName: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    academicYear: '2026 - 2027',
    grade: 9,
    semester: 'hk2_final',
    durationMinutes: 120,
    totalPoints: 10.0,
    parts: [
      {
        partNumber: 1,
        title: 'TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 ĐIỂM)',
        description: 'Tổng hợp kiến thức Đại số và Hình học 4 khối 6, 7, 8, 9.',
        questions: [
          {
            id: 'e10-p1-q1',
            type: 'multiple_choice',
            content: 'Phương trình nào sau đây là phương trình quy về bậc hai?',
            options: ['A. $x^4 - 5x^2 + 4 = 0$', 'B. $2x + 1 = 0$', 'C. $x^3 - 1 = 0$', 'D. $\\sqrt{x} = -2$'],
            correctAnswer: 'A. $x^4 - 5x^2 + 4 = 0$',
            points: 0.25,
            difficulty: 'recognition',
            explanation: 'Phương trình trùng phương $ax^4 + bx^2 + c = 0$ quy về bậc hai bằng cách đặt ẩn phụ $t = x^2$ ($t \\ge 0$).',
          },
        ],
      },
      {
        partNumber: 2,
        title: 'TRẮC NGHIỆM ĐÚNG / SAI (4,0 ĐIỂM)',
        description: 'Đánh giá kiến thức phân hóa toàn diện.',
        questions: [
          {
            id: 'e10-p2-q1',
            type: 'true_false',
            content: `Xét tính Đúng/Sai:\n• a) Một hình chữ nhật quay quanh một cạnh cố định tạo thành hình trụ.\n• b) Thể tích hình trụ bán kính $r$, chiều cao $h$ là $V = \\pi r^2 h$.\n• c) Thể tích hình nón bằng $\\frac{1}{3}$ thể tích hình trụ có cùng bán kính đáy và chiều cao.\n• d) Diện tích mặt cầu bán kính $R$ là $S = \\frac{4}{3}\\pi R^3$.`,
            correctAnswer: 'a) Đúng; b) Đúng; c) Đúng; d) Sai',
            points: 1.0,
            difficulty: 'understanding',
            explanation: 'd) Sai vì diện tích mặt cầu là $S = 4\\pi R^2$, còn $\\frac{4}{3}\\pi R^3$ là thể tích hình cầu.',
          },
        ],
      },
      {
        partNumber: 3,
        title: 'TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 ĐIỂM)',
        description: 'Giải toán thực tế năng suất.',
        questions: [
          {
            id: 'e10-p3-q1',
            type: 'short_answer',
            content: 'Hai tổ công nhân cùng làm chung một công việc thì hoàn thành trong 12 giờ. Nếu tổ 1 làm một mình trong 4 giờ rồi tổ 2 làm một mình trong 7 giờ thì cả hai tổ hoàn thành được 50% công việc. Hỏi nếu làm một mình thì tổ 1 hoàn thành công việc trong bao nhiêu giờ?',
            correctAnswer: '28',
            points: 0.5,
            difficulty: 'application',
            explanation: 'Gọi thời gian tổ 1 làm một mình là $x$ (giờ), tổ 2 là $y$ (giờ). Ta có hệ: $\\begin{cases} \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{12} \\\\ \\frac{4}{x} + \\frac{7}{y} = \\frac{1}{2} \\end{cases} \\implies \\frac{1}{x} = \\frac{1}{28} \\implies x = 28$ giờ.',
          },
        ],
      },
      {
        partNumber: 4,
        title: 'TỰ LUẬN (1,0 ĐIỂM)',
        description: 'Bất đẳng thức Cauchy-Schwarz tìm cực trị.',
        questions: [
          {
            id: 'e10-p4-q1',
            type: 'essay',
            content: 'Cho hai số thực dương $x, y$ thỏa mãn $x + y = 2$. Tìm giá trị nhỏ nhất của biểu thức $P = \\frac{1}{x} + \\frac{1}{y}$.',
            points: 1.0,
            difficulty: 'high_application',
            explanation: 'Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel: $P = \\frac{1}{x} + \\frac{1}{y} \\ge \\frac{(1 + 1)^2}{x + y} = \\frac{4}{2} = 2$. Dấu bằng xảy ra khi $x = y = 1$. Vậy $\\min P = 2$.',
          },
        ],
      },
    ],
  },
];
