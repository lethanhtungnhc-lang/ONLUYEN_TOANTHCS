// DỮ LIỆU ĐỊNH CHUẨN CẤU TRÚC ĐỀ THI VÀ CẨM NANG ĐỊNH LÝ HỌC SINH GIỎI THCS
// Ban hành theo Công văn của Sở Giáo dục và Đào tạo từ năm học 2026 - 2027

export interface OfficialExamQuestionSpec {
  number: number;
  title: string;
  points: number;
  topicDomain: 'algebra' | 'geometry' | 'arithmetic_combinatorics';
  subtopics: string[];
  instruction: string;
  sampleQuestion: string;
  solutionGuide: string;
  rubric: { step: string; score: number }[];
}

export interface OfficialStandardDoc {
  title: string;
  agency?: string;
  durationMinutes?: number;
  effectiveYear: string;
  format: string;
  duration: number; // 150 phút
  totalPoints: number; // 20.0 điểm
  ratio: string; // 40% Biết, 30% Hiểu, 30% Vận dụng
  structure?: { problem: string; points: number; title: string; subparts: string[] }[];
  domains: {
    name: string;
    points: number;
    description: string;
    topics: { title: string; requirements: string }[];
  }[];
  examStructure: OfficialExamQuestionSpec[];
  standardTheorems: {
    category: 'Đại số' | 'Số học' | 'Tổ hợp' | 'Hình học';
    name: string;
    latex?: string;
    statement: string;
    explanation: string;
    usageTip: string;
  }[];
}

export const OFFICIAL_HSG_STANDARD: OfficialStandardDoc = {
  title: 'CẤU TRÚC ĐỊNH DẠNG ĐỀ THI HỌC SINH GIỎI THCS CẤP THÀNH PHỐ TỪ NĂM HỌC 2026 - 2027',
  agency: 'Sở Giáo dục và Đào tạo',
  durationMinutes: 150,
  effectiveYear: 'Từ năm học 2026 - 2027',
  format: '100% Tự luận (Không sử dụng trắc nghiệm)',
  duration: 150,
  totalPoints: 20.0,
  ratio: 'Biết: 40% (8,0 điểm) • Hiểu: 30% (6,0 điểm) • Vận dụng: 30% (6,0 điểm)',
  structure: [
    { problem: 'Bài 1', points: 5.0, title: 'Đại số cơ bản & Viète', subparts: ['Lệnh 1: Biến đổi đại số, rút gọn (2,5đ)', 'Lệnh 2: Phương trình bậc hai & Viète (2,5đ)'] },
    { problem: 'Bài 2', points: 4.0, title: 'Đa thức & Hệ phương trình', subparts: ['Lệnh 1: Đa thức, nghiệm & Bézout (2,0đ)', 'Lệnh 2: Phương trình & Hệ phương trình phi tuyến (2,0đ)'] },
    { problem: 'Bài 3', points: 2.0, title: 'Tổ hợp & Số học', subparts: ['Lệnh 1: Dirichlet / Cực hạn / Bất biến (1,0đ)', 'Lệnh 2: Số học, đồng dư, nghiệm nguyên (1,0đ)'] },
    { problem: 'Bài 4', points: 2.0, title: 'Bất đẳng thức & Xác suất', subparts: ['Lệnh 1: BĐT AM-GM, Cauchy-Schwarz, cực trị (1,0đ)', 'Lệnh 2: Xác suất & Quy tắc nhân (1,0đ)'] },
    { problem: 'Bài 5', points: 7.0, title: 'Hình học phẳng', subparts: ['Câu a: Tứ giác nội tiếp, tam giác (3,0đ)', 'Câu b: Đường tròn, tiếp tuyến, góc (3,0đ)', 'Câu c: Phương tích, cát tuyến, cực trị hình (1,0đ)'] },
  ],
  domains: [
    {
      name: 'Đại số',
      points: 10.0,
      description: 'Chiếm 50% tổng số điểm toàn bài thi, kiểm tra năng lực biến đổi đại số, giải phương trình - hệ phương trình, đa thức và bất đẳng thức cực trị.',
      topics: [
        {
          title: 'Biểu thức đại số',
          requirements: 'Biến đổi, rút gọn các biểu thức đại số, chứng minh đẳng thức, tính giá trị của biểu thức chứa căn hoặc đa thức nhiều biến.',
        },
        {
          title: 'Phương trình và hệ phương trình',
          requirements: 'Phương trình bậc hai, định lí Viète (và các vấn đề liên quan như dấu nghiệm, tham số, biểu thức đối xứng), phương trình quy về bậc hai, phương trình vô tỉ và hệ phương trình nâng cao.',
        },
        {
          title: 'Đa thức',
          requirements: 'Xác định đa thức, các phép toán đa thức, cấu trúc nghiệm của đa thức, tính chất về đa thức hệ số nguyên, phép chia đa thức và Định lí Bézout.',
        },
        {
          title: 'Bất đẳng thức và cực trị',
          requirements: 'Chứng minh bất đẳng thức, tìm giá trị lớn nhất (GTLN), giá trị nhỏ nhất (GTNN) của biểu thức đại số nhiều biến.',
        },
      ],
    },
    {
      name: 'Hình học',
      points: 7.0,
      description: 'Chiếm 35% tổng số điểm toàn bài thi, gồm 3 lệnh hỏi kế tiếp nhau từ cơ bản đến phân hóa sâu.',
      topics: [
        {
          title: 'Các hình học phẳng và đường tròn',
          requirements: 'Khai thác các bài toán liên quan đến tam giác, tứ giác, hình thang, hình bình hành, hình chữ nhật, hình thoi, hình vuông, lục giác đều. Các vấn đề về đường tròn, dây và cung, tiếp tuyến, vị trí tương đối của đường thẳng và đường tròn, hai đường tròn, góc và đường tròn, cung chứa góc, tứ giác nội tiếp, đa giác nội tiếp và ngoại tiếp.',
        },
        {
          title: 'Chứng minh và tính toán hình học',
          requirements: 'Chứng minh các tính chất hình học, đẳng thức hình học, bất đẳng thức hình học. Tính toán các đại lượng hình học (đoạn thẳng, góc, cung, diện tích, hệ thức lượng tam giác vuông, tỉ số lượng giác).',
        },
        {
          title: 'Quan hệ hình học',
          requirements: 'Chứng minh hai đường thẳng song song, vuông góc, đường trung trực, tia phân giác, chứng minh đồng quy, thẳng hàng, bài toán phương tích và bổ đề hình thang.',
        },
      ],
    },
    {
      name: 'Số học và Tổ hợp xác suất',
      points: 3.0,
      description: 'Chiếm 15% tổng điểm bài thi, thử thách tư duy số học, suy luận logic, nguyên lý toán học rời rạc và xác suất thống kê hiện đại.',
      topics: [
        {
          title: 'Số học',
          requirements: 'Lý thuyết chia hết trên tập số nguyên $\\mathbb{Z}$; Tìm số nguyên tố, hợp số, số chính phương; Phương trình nghiệm nguyên (Diophantine); Lý thuyết đồng dư và Định lí Fermat nhỏ.',
        },
        {
          title: 'Tổ hợp xác suất',
          requirements: 'Giải các bài toán tổ hợp, suy luận logic, bảng vuông, hình học tổ hợp. Các bài toán chứng minh sự tồn tại, cực trị tổ hợp, áp dụng Nguyên lý Dirichlet, Nguyên lý Bất biến, Nguyên lý cực hạn. Tính xác suất của một biến cố (sử dụng quy tắc nhân xác suất).',
        },
      ],
    },
  ],
  standardTheorems: [
    // 1. ĐẠI SỐ
    {
      category: 'Đại số',
      name: 'Các Bất đẳng thức cơ bản',
      latex: 'a^2 + b^2 + c^2 \\ge ab + bc + ca; \\quad (a + b + c)^2 \\ge 3(ab + bc + ca); \\quad (a + b + c)^2 \\le 3(a^2 + b^2 + c^2)',
      statement: 'Với mọi số thực $a, b, c \\in \\mathbb{R}$, các bất đẳng thức trên luôn đúng. Đẳng thức xảy ra khi và chỉ khi $a = b = c$.',
      explanation: 'Học sinh được phép sử dụng trực tiếp trong bài thi mà không cần chứng minh lại. Cách chứng minh dựa trên việc biến đổi thành tổng các bình phương: $\\frac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2] \\ge 0$.',
      usageTip: 'Thường dùng để chặn đánh giá hoặc biến đổi giữa tổng các biến, tổng các tích đôi một và tổng các bình phương.',
    },
    {
      category: 'Đại số',
      name: 'Bất đẳng thức Côsi (AM-GM) cho n số thực không âm',
      latex: '\\frac{x_1 + x_2 + \\dots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\dots x_n} \\quad (x_i \\ge 0)',
      statement: 'Trung bình cộng của $n$ số thực không âm luôn lớn hơn hoặc bằng trung bình nhân của chúng. Đẳng thức xảy ra khi và chỉ khi $x_1 = x_2 = \\dots = x_n$.',
      explanation: 'Áp dụng cho $n = 2, 3, 4,...$ số không âm. Đặc biệt dạng cộng mẫu Schwarz / Engel là hệ quả trực tiếp thường xuyên xuất hiện.',
      usageTip: 'Phải chú ý kiểm tra điều kiện không âm của các số hạng và chọn đúng "điểm rơi" trước khi ghép cặp.',
    },
    {
      category: 'Đại số',
      name: 'Bất đẳng thức Bunhiacôpxki (Cauchy-Schwarz)',
      latex: '(a_1^2 + a_2^2 + \\dots + a_n^2)(b_1^2 + b_2^2 + \\dots + b_n^2) \\ge (a_1 b_1 + a_2 b_2 + \\dots + a_n b_n)^2',
      statement: 'Tích tổng bình phương của hai bộ $n$ số thực luôn lớn hơn hoặc bằng bình phương tích vô hướng. Đẳng thức xảy ra khi $\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\dots = \\frac{a_n}{b_n}$.',
      explanation: 'Được áp dụng cho mọi số thực $a_i, b_i \\in \\mathbb{R}$. Dạng Engel (BĐT Sơ-vác cộng mẫu): $\\frac{x_1^2}{y_1} + \\frac{x_2^2}{y_2} + \\dots + \\frac{x_n^2}{y_n} \\ge \\frac{(x_1 + x_2 + \\dots + x_n)^2}{y_1 + y_2 + \\dots + y_n}$ với $y_i > 0$.',
      usageTip: 'Rất mạnh trong các bài toán cực trị có điều kiện tổng các biến bằng hằng số hoặc rút gọn căn thức.',
    },
    {
      category: 'Đại số',
      name: 'Định lí Bézout về số dư trong phép chia đa thức',
      latex: 'f(x) = (x - a) \\cdot Q(x) + f(a)',
      statement: 'Số dư trong phép chia đa thức $f(x)$ cho nhị thức $(x - a)$ là $f(a)$. Đặc biệt, $f(x)$ chia hết cho $(x - a)$ khi và chỉ khi $f(a) = 0$ ($a$ là một nghiệm của $f(x)$).',
      explanation: 'Định lí này giúp xác định nhanh số dư, tìm nghiệm nguyên, phân tích đa thức thành nhân tử và giải quyết các bài toán xác định đa thức bậc cao.',
      usageTip: 'Nếu đa thức $P(x)$ bậc $n$ nhận $x_1, x_2, ..., x_n$ làm nghiệm thì $P(x) = k(x - x_1)(x - x_2)...(x - x_n)$.',
    },

    // 2. SỐ HỌC
    {
      category: 'Số học',
      name: 'Lý thuyết Đồng dư & Các tính chất cơ bản',
      latex: 'a \\equiv b \\pmod m \\iff (a - b) \\;\\vdots\\; m',
      statement: 'Hai số nguyên $a$ và $b$ được gọi là đồng dư với nhau theo mô-đun $m$ ($m \\in \\mathbb{Z}^+$) nếu chúng có cùng số dư khi chia cho $m$.',
      explanation: 'Các tính chất được dùng trực tiếp: Nếu $a \\equiv b \\pmod m$ và $c \\equiv d \\pmod m$ thì $a \\pm c \\equiv b \\pm d \\pmod m$, $ac \\equiv bd \\pmod m$, $a^k \\equiv b^k \\pmod m$.',
      usageTip: 'Cực kì hiệu quả khi tìm chữ số tận cùng, chứng minh chia hết, giải phương trình nghiệm nguyên theo mô-đun 3, 4, 7, 8, 9.',
    },
    {
      category: 'Số học',
      name: 'Định lí Fermat nhỏ (Phéc-ma nhỏ)',
      latex: 'a^p \\equiv a \\pmod p \\quad \\text{hoặc} \\quad a^{p-1} \\equiv 1 \\pmod p \\text{ (nếu } \\gcd(a, p) = 1)',
      statement: 'Nếu $p$ là một số nguyên tố thì với mọi số nguyên $a$, ta có $a^p - a$ luôn chia hết cho $p$. Nếu $a$ không chia hết cho $p$ thì $a^{p-1} - 1$ chia hết cho $p$.',
      explanation: 'Được sử dụng như định lý SGK trong kỳ thi HSG THCS theo mục IV của công văn.',
      usageTip: 'Áp dụng cho $p = 2, 3, 5, 7, 11, 13$. Ví dụ $a^3 \\equiv a \\pmod 3$, $a^5 \\equiv a \\pmod 5$, $a^7 \\equiv a \\pmod 7$.',
    },

    // 3. TỔ HỢP
    {
      category: 'Tổ hợp',
      name: 'Nguyên lý Dirichlet (Nguyên lý lồng chim bồ câu)',
      latex: 'k = \\left\\lfloor \\frac{m - 1}{n} \\right\\rfloor + 1',
      statement: 'Nếu nhốt $m$ con thỏ vào $n$ cái chuồng ($m > n$ là các số nguyên dương) thì luôn tồn tại ít nhất một chuồng chứa ít nhất $\\left\\lfloor \\frac{m - 1}{n} \\right\\rfloor + 1$ con thỏ.',
      explanation: 'Dạng cơ bản: Nếu nhốt $n + 1$ con thỏ vào $n$ chuồng thì có ít nhất 1 chuồng chứa từ 2 con thỏ trở lên.',
      usageTip: 'Chìa khóa giải quyết bài toán là: Xác định đúng đâu là "thỏ" (các đối tượng cần chọn) và đâu là "chuồng" (các nhóm tính chất, khoảng giá trị, vùng hình học).',
    },
    {
      category: 'Tổ hợp',
      name: 'Nguyên lý Bất biến (Invariance Principle)',
      latex: 'I(S_{t+1}) = I(S_t) = \\dots = I(S_0)',
      statement: 'Bất biến là một đại lượng số học, đại số hoặc một tính chất hình học không thay đổi trong suốt quá trình thực hiện một dãy các phép biến đổi trạng thái.',
      explanation: 'Nếu trạng thái đích có giá trị bất biến khác với trạng thái xuất phát thì không thể chuyển từ trạng thái xuất phát đến trạng thái đích.',
      usageTip: 'Các bất biến thường gặp: Tính chẵn lẻ của tổng, số dư của tổng các chữ số theo mod 3 hoặc mod 9, dấu của một tích, diện tích được bảo toàn.',
    },
    {
      category: 'Tổ hợp',
      name: 'Nguyên lý Cực hạn (Extreme Principle)',
      latex: 'x_{\\min} \\le x_i \\le x_{\\max} \\quad (\\forall x_i \\in S)',
      statement: 'Mọi tập hợp hữu hạn các số thực (khác rỗng) luôn tồn tại một phần tử lớn nhất và một phần tử nhỏ nhất.',
      explanation: 'Trong hình học và tổ hợp: Luôn tồn tại một đoạn thẳng có độ dài ngắn nhất, một góc có số đo lớn nhất, một điểm nằm xa nhất, một đỉnh có bậc nhỏ nhất.',
      usageTip: 'Xét phần tử biên (cực tiểu hoặc cực đại) để khai thác tính chất đặc thù hoặc dẫn đến mâu thuẫn trong phương pháp phản chứng.',
    },

    // 4. HÌNH HỌC
    {
      category: 'Hình học',
      name: 'Hệ thức lượng trong tam giác vuông',
      latex: 'b^2 = a \\cdot b\'; \\quad c^2 = a \\cdot c\'; \\quad h^2 = b\' \\cdot c\'; \\quad a \\cdot h = b \\cdot c; \\quad \\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}',
      statement: 'Cho tam giác vuông có cạnh huyền $a$, hai cạnh góc vuông $b, c$, đường cao $h$, hình chiếu $b\', c\'$. Tất cả các hệ thức lượng trên được áp dụng trực tiếp.',
      explanation: 'Kết hợp cùng tỉ số lượng giác $\\sin, \\cos, \\tan, \\cot$ để giải quyết nhanh các bài toán tính toán và chứng minh đẳng thức độ dài.',
      usageTip: 'Chú ý liên hệ giữa $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$ và $1 + \\tan^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}$.',
    },
    {
      category: 'Hình học',
      name: 'Đường tròn bàng tiếp tam giác',
      statement: 'Đường tròn tiếp xúc với một cạnh của tam giác và tiếp xúc với phần kéo dài của hai cạnh kia được gọi là đường tròn bàng tiếp tam giác.',
      explanation: 'Mỗi tam giác có đúng 3 đường tròn bàng tiếp. Tâm của đường tròn bàng tiếp góc $A$ là giao điểm của hai tia phân giác ngoài tại đỉnh $B$ và $C$, và tia phân giác trong góc $A$.',
      usageTip: 'Khoảng cách từ đỉnh $A$ đến tiếp điểm trên cạnh bên bằng nửa chu vi tam giác: $p = \\frac{a+b+c}{2}$.',
    },
    {
      category: 'Hình học',
      name: 'Góc trong, ngoài đường tròn và Góc tiếp tuyến - Dây cung',
      latex: '\\widehat{M} = \\frac{1}{2}(\\text{sđ}\\overparen{AB} \\pm \\text{sđ}\\overparen{CD}); \\quad \\widehat{BAx} = \\frac{1}{2} \\text{sđ}\\overparen{AB} = \\widehat{ACB}',
      statement: 'Số đo góc có đỉnh bên trong đường tròn bằng nửa tổng số đo hai cung bị chắn; số đo góc có đỉnh bên ngoài đường tròn bằng nửa hiệu số đo hai cung bị chắn. Góc tạo bởi tia tiếp tuyến và dây cung bằng góc nội tiếp cùng chắn cung đó.',
      explanation: 'Là công cụ then chốt để chứng minh các góc bằng nhau, tam giác đồng dạng và tứ giác nội tiếp.',
      usageTip: 'Luôn tìm kiếm góc tạo bởi tiếp tuyến và dây cung để chuyển số đo góc về góc nội tiếp tương ứng.',
    },
    {
      category: 'Hình học',
      name: 'Các dấu hiệu nhận biết Tứ giác nội tiếp',
      statement: '1) Tứ giác có tổng hai góc đối bằng 180°.\n2) Tứ giác có góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện.\n3) Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau.\n4) Tứ giác có 4 đỉnh cách đều một điểm cố định.',
      explanation: 'Mục IV công văn quy định học sinh được sử dụng trực tiếp các dấu hiệu này như SGK mà không cần chứng minh lại.',
      usageTip: 'Dấu hiệu hai đỉnh kề cùng nhìn một cạnh (góc nội tiếp cùng chắn cung) là phương pháp phổ biến nhất trong các bài thi HSG.',
    },
    {
      category: 'Hình học',
      name: 'Tính chất Phương tích của một điểm đối với đường tròn',
      latex: 'MA \\cdot MB = MC \\cdot MD = |MO^2 - R^2|',
      statement: 'Cho đường tròn $(O)$ và điểm $M$. Qua $M$ kẻ hai cát tuyến $MAB$ và $MCD$ tới $(O)$, ta luôn có $MA \\cdot MB = MC \\cdot MD$. Ngược lại, nếu tứ giác $ABCD$ có $AB$ cắt $CD$ tại $M$ và thỏa mãn $MA \\cdot MB = MC \\cdot MD$ thì tứ giác $ABCD$ nội tiếp (đúng cho cả $M$ nằm ngoài hoặc trong đường tròn). Nếu $MT$ là tiếp tuyến thì $MT^2 = MA \\cdot MB$.',
      explanation: 'Được công văn chính thức cho phép sử dụng trực tiếp cả chiều thuận và chiều đảo để chứng minh 4 điểm cùng thuộc đường tròn.',
      usageTip: 'Khi gặp biểu thức tích hai đoạn thẳng $MA \\cdot MB$, hãy nghĩ ngay đến phương tích hoặc tam giác đồng dạng.',
    },
    {
      category: 'Hình học',
      name: 'Đường trung bình của hình thang & Bổ đề hình thang',
      statement: 'Đường trung bình của hình thang song song với hai đáy và có độ dài bằng nửa tổng hai đáy.\nBổ đề hình thang: Trong hình thang có hai đáy không bằng nhau, giao điểm của hai đường thẳng chứa hai cạnh bên, giao điểm của hai đường chéo và trung điểm của hai đáy cùng nằm trên một đường thẳng.',
      explanation: 'Được công văn xác nhận cho phép trích dẫn trực tiếp trong bài thi để chứng minh 3 điểm thẳng hàng hoặc đoạn thẳng đi qua trung điểm.',
      usageTip: 'Cực kì đắc lực khi chứng minh thẳng hàng và tính tỉ số đoạn thẳng trong các bài toán hình thang.',
    },
  ],
  examStructure: [
    {
      number: 1,
      title: 'BÀI 1 (5,0 ĐIỂM) • BIỂU THỨC ĐẠI SỐ & ĐỊNH LÍ VI-ÉT',
      points: 5.0,
      topicDomain: 'algebra',
      subtopics: [
        'Lệnh 1: Biến đổi biểu thức đại số, rút gọn biểu thức, chứng minh đẳng thức, tính giá trị (2,5đ)',
        'Lệnh 2: Phương trình bậc hai, định lí Vi-ét và các vấn đề liên quan (2,5đ)',
      ],
      instruction: 'Đề thi yêu cầu tính toán chính xác, biến đổi tường minh, đối chiếu điều kiện xác định chặt chẽ.',
      sampleQuestion:
        '1) (2,5 điểm) Cho các số thực dương $x, y, z$ thỏa mãn $xy + yz + zx = 1$. Tính giá trị của biểu thức:\n$$P = x\\sqrt{\\frac{(1+y^2)(1+z^2)}{1+x^2}} + y\\sqrt{\\frac{(1+z^2)(1+x^2)}{1+y^2}} + z\\sqrt{\\frac{(1+x^2)(1+y^2)}{1+z^2}}$$\n2) (2,5 điểm) Cho phương trình bậc hai $x^2 - 2(m-1)x + 2m - 5 = 0$ ($m$ là tham số). Tìm tất cả các giá trị của $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn: $x_1^2 + x_2^2 + x_1 x_2 = 7$.',
      solutionGuide:
        '1) Thay $1 = xy+yz+zx$ vào mẫu: $1 + x^2 = x^2 + xy + yz + zx = (x+y)(x+z)$. Tương tự $1 + y^2 = (y+x)(y+z)$, $1 + z^2 = (z+x)(z+y)$. Biến đổi biểu thức trong căn: $\\frac{(1+y^2)(1+z^2)}{1+x^2} = \\frac{(y+x)(y+z)(z+x)(z+y)}{(x+y)(x+z)} = (y+z)^2$. Khai căn vì $y, z > 0$ được $(y+z)$. Do đó $P = x(y+z) + y(z+x) + z(x+y) = 2(xy+yz+zx) = 2(1) = 2$.\n2) Điều kiện có 2 nghiệm phân biệt: $\\Delta\' = (m-1)^2 - (2m - 5) = m^2 - 4m + 6 = (m-2)^2 + 2 > 0$ (luôn đúng với mọi $m$). Theo Vi-ét: $x_1 + x_2 = 2(m-1)$ và $x_1 x_2 = 2m - 5$. Ta có $x_1^2 + x_2^2 + x_1 x_2 = (x_1 + x_2)^2 - x_1 x_2 = 4(m-1)^2 - (2m - 5) = 4m^2 - 10m + 9$. Giải $4m^2 - 10m + 9 = 7 \\iff 4m^2 - 10m + 2 = 0 \\iff 2m^2 - 5m + 1 = 0 \\iff m = \\frac{5 \\pm \\sqrt{17}}{4}$.',
      rubric: [
        { step: 'Ý 1: Thay hằng số 1 bằng tích và phân tích thành nhân tử', score: 1.0 },
        { step: 'Ý 1: Khai căn và tính ra kết quả chuẩn xác P = 2', score: 1.5 },
        { step: 'Ý 2: Tính biệt thức delta dương với mọi m', score: 0.75 },
        { step: 'Ý 2: Biểu diễn hệ thức Vi-ét theo m và giải tìm nghiệm m', score: 1.75 },
      ],
    },
    {
      number: 2,
      title: 'BÀI 2 (4,0 ĐIỂM) • ĐA THỨC & HỆ PHƯƠNG TRÌNH',
      points: 4.0,
      topicDomain: 'algebra',
      subtopics: [
        'Lệnh 1: Đa thức: Xác định đa thức, nghiệm, đa thức hệ số nguyên, phép chia đa thức & Bézout (2,0đ)',
        'Lệnh 2: Phương trình - Hệ phương trình (2,0đ)',
      ],
      instruction: 'Phối hợp khéo léo định lí Bézout, phân tích đa thức thành nhân tử, đặt ẩn phụ và phương pháp cộng/thế đối xứng.',
      sampleQuestion:
        '1) (2,0 điểm) Tìm đa thức bậc ba $P(x)$ có hệ số của $x^3$ bằng 1, biết rằng khi chia $P(x)$ lần lượt cho $(x - 1)$, $(x - 2)$, $(x - 3)$ đều được số dư là 6.\n2) (2,0 điểm) Giải hệ phương trình:\n$$\\begin{cases} x^2 + y^2 + xy = 7 \\\\ x + y + xy = 5 \\end{cases}$$',
      solutionGuide:
        '1) Xét đa thức phụ $Q(x) = P(x) - 6$. Theo định lí Bézout: $P(1) = 6, P(2) = 6, P(3) = 6 \\implies Q(1) = Q(2) = Q(3) = 0$. Suy ra $Q(x)$ nhận $1, 2, 3$ làm 3 nghiệm. Vì $P(x)$ là đa thức bậc 3 có hệ số bậc cao nhất là 1 nên $Q(x)$ cũng là đa thức bậc 3 có hệ số bậc cao nhất là 1. Do đó $Q(x) = (x - 1)(x - 2)(x - 3)$. Vậy $P(x) = (x - 1)(x - 2)(x - 3) + 6 = x^3 - 6x^2 + 11x$.\n2) Đặt $S = x + y, P = xy$ ($S^2 \\ge 4P$). Hệ trở thành:\n$$\\begin{cases} S^2 - P = 7 \\\\ S + P = 5 \\end{cases} \\implies P = 5 - S \\implies S^2 - (5 - S) = 7 \\iff S^2 + S - 12 = 0$$\nGiải ra $S = 3$ hoặc $S = -4$.\n• Với $S = 3 \\implies P = 2$. $x, y$ là nghiệm của $t^2 - 3t + 2 = 0 \\implies t \\in \\{1; 2\\}$. Nghiệm: $(1; 2), (2; 1)$.\n• Với $S = -4 \\implies P = 9$. Ta có $S^2 = 16 < 4P = 36$ (vô nghiệm). Vậy hệ có nghiệm $(x; y) \\in \\{(1; 2), (2; 1)\\}$.',
      rubric: [
        { step: 'Ý 1: Xét đa thức phụ Q(x) và áp dụng định lí Bézout', score: 1.0 },
        { step: 'Ý 1: Khai triển tìm ra chính xác P(x) = x³ - 6x² + 11x', score: 1.0 },
        { step: 'Ý 2: Đặt ẩn phụ S, P và biến đổi về phương trình bậc 2 theo S', score: 1.0 },
        { step: 'Ý 2: Giải và đối chiếu điều kiện S² >= 4P, kết luận nghiệm', score: 1.0 },
      ],
    },
    {
      number: 3,
      title: 'BÀI 3 (2,0 ĐIỂM) • TỔ HỢP LOGIC & SỐ HỌC',
      points: 2.0,
      topicDomain: 'arithmetic_combinatorics',
      subtopics: [
        'Lệnh 1: Tổ hợp: Chứng minh sự tồn tại, cực trị, Dirichlet, cực hạn, logic (1,0đ)',
        'Lệnh 2: Số học: Chia hết, số nguyên tố, số chính phương, nghiệm nguyên (1,0đ)',
      ],
      instruction: 'Vận dụng nguyên lý Dirichlet sắc bén và tính chất chia hết/số chính phương.',
      sampleQuestion:
        '1) (1,0 điểm) Trong một mặt phẳng cho 5 điểm phân biệt có tọa độ nguyên. Chứng minh rằng luôn tồn tại ít nhất một cặp 2 điểm mà trung điểm của đoạn thẳng nối chúng cũng có tọa độ là các số nguyên.\n2) (1,0 điểm) Tìm tất cả các số nguyên $x, y$ thỏa mãn phương trình: $x^2 + xy + y^2 = x^2 y^2$.',
      solutionGuide:
        '1) Tọa độ một điểm $(x; y)$ nguyên có 4 trạng thái chẵn lẻ: (chẵn, chẵn), (chẵn, lẻ), (lẻ, chẵn), (lẻ, lẻ). Có 5 điểm nguyên (5 con thỏ) và 4 trạng thái chẵn lẻ (4 chuồng). Theo nguyên lý Dirichlet, tồn tại ít nhất 2 điểm $A(x_1; y_1)$ và $B(x_2; y_2)$ có cùng trạng thái chẵn lẻ. Khi đó $x_1 \\equiv x_2 \\pmod 2 \\implies x_1 + x_2$ chẵn, và $y_1 \\equiv y_2 \\pmod 2 \\implies y_1 + y_2$ chẵn. Suy ra tọa độ trung điểm $M\\left(\\frac{x_1 + x_2}{2}; \\frac{y_1 + y_2}{2}\\right)$ là các số nguyên (đpcm).\n2) Ta có $x^2 + xy + y^2 = x^2 y^2 \\iff (x+y)^2 - xy = x^2 y^2$. Đặt $S = x+y, P = xy$. Phương trình thành $S^2 = P^2 + P$. Vì $S^2$ là số chính phương nên $P^2 + P$ là số chính phương. Ta kẹp $P^2 < P^2 + P < (P+1)^2$ với $P > 0$ (mâu thuẫn). Tương tự với $P < -1$: $(P+1)^2 < P^2 + P < P^2$ (mâu thuẫn). Do đó chỉ có thể $P = 0$ hoặc $P = -1$. Với $P = 0 \\implies x^2 + y^2 = 0 \\implies x = y = 0$. Với $P = -1 \\implies S^2 = 0 \\implies S = 0 \\implies x = -y \\implies -x^2 = -1 \\implies x = \\pm 1$. Các nghiệm nguyên là $(0; 0), (1; -1), (-1; 1)$.',
      rubric: [
        { step: 'Ý 1: Phân loại 4 trạng thái chẵn lẻ và áp dụng đúng Dirichlet', score: 1.0 },
        { step: 'Ý 2: Đưa về kẹp số chính phương và tìm ra các nghiệm nguyên', score: 1.0 },
      ],
    },
    {
      number: 4,
      title: 'BÀI 4 (2,0 ĐIỂM) • BẤT ĐẲNG THỨC & XÁC SUẤT',
      points: 2.0,
      topicDomain: 'algebra',
      subtopics: [
        'Lệnh 1: Chứng minh bất đẳng thức, tìm GTLN, GTNN (1,0đ)',
        'Lệnh 2: Xác suất biến cố sử dụng quy tắc nhân (1,0đ)',
      ],
      instruction: 'Sử dụng kỹ thuật Cô-si chọn điểm rơi hoặc Cauchy-Schwarz; tính xác suất qua quy tắc nhân.',
      sampleQuestion:
        '1) (1,0 điểm) Cho 3 số thực dương $a, b, c$ thỏa mãn $a + b + c = 3$. Chứng minh rằng:\n$$\\frac{a^3}{a^2 + b^2} + \\frac{b^3}{b^2 + c^2} + \\frac{c^3}{c^2 + a^2} \\ge \\frac{3}{2}$$\n2) (1,0 điểm) Một hộp kín đựng 5 quả cầu màu đỏ và 4 quả cầu màu xanh (các quả cầu cùng kích thước và khối lượng). Lấy ngẫu nhiên liên tiếp 2 lần, mỗi lần 1 quả cầu không hoàn lại. Tính xác suất để lấy được cả 2 quả cầu đều có màu đỏ.',
      solutionGuide:
        '1) Kỹ thuật Cauchy ngược dấu:\n$$\\frac{a^3}{a^2 + b^2} = \\frac{a(a^2 + b^2) - ab^2}{a^2 + b^2} = a - \\frac{ab^2}{a^2 + b^2}$$\nÁp dụng AM-GM: $a^2 + b^2 \\ge 2ab \\implies \\frac{ab^2}{a^2 + b^2} \\le \\frac{ab^2}{2ab} = \\frac{b}{2}$.\nDo đó $\\frac{a^3}{a^2 + b^2} \\ge a - \\frac{b}{2}$. Tương tự:\n$$\\frac{b^3}{b^2 + c^2} \\ge b - \\frac{c}{2}; \\quad \\frac{c^3}{c^2 + a^2} \\ge c - \\frac{a}{2}$$\nCộng từng vế 3 bất đẳng thức:\n$$\\text{VT} \\ge (a + b + c) - \\frac{a + b + c}{2} = \\frac{a + b + c}{2} = \\frac{3}{2}$$\nĐẳng thức xảy ra khi và chỉ khi $a = b = c = 1$ (đpcm).\n2) Số quả cầu ban đầu trong hộp là $5 + 4 = 9$ quả.\nGọi $A$ là biến cố "Lần 1 lấy được quả cầu đỏ", ta có $P(A) = \\frac{5}{9}$.\nSau khi lấy quả đỏ lần 1, trong hộp còn lại 8 quả cầu, trong đó có 4 quả đỏ.\nGọi $B$ là biến cố "Lần 2 lấy được quả cầu đỏ với điều kiện lần 1 đã lấy quả đỏ", ta có $P(B|A) = \\frac{4}{8} = \\frac{1}{2}$.\nTheo quy tắc nhân xác suất, xác suất để cả 2 lần đều lấy được quả đỏ là:\n$$P = P(A) \\cdot P(B|A) = \\frac{5}{9} \\cdot \\frac{1}{2} = \\frac{5}{18}$$',
      rubric: [
        { step: 'Ý 1: Kỹ thuật Cô-si ngược dấu và đánh giá từng phân thức', score: 0.5 },
        { step: 'Ý 1: Cộng vế và chỉ rõ điểm rơi a = b = c = 1', score: 0.5 },
        { step: 'Ý 2: Tính xác suất lần 1 và lần 2 có điều kiện', score: 0.5 },
        { step: 'Ý 2: Áp dụng quy tắc nhân ra đáp số 5/18', score: 0.5 },
      ],
    },
    {
      number: 5,
      title: 'BÀI 5 (7,0 ĐIỂM) • HÌNH HỌC PHẲNG & ĐƯỜNG TRÒN CHUYÊN SÂU',
      points: 7.0,
      topicDomain: 'geometry',
      subtopics: [
        'Lệnh 1: Chứng minh tính chất, tứ giác nội tiếp hoặc góc bằng nhau (3,0đ)',
        'Lệnh 2: Chứng minh hệ thức phương tích, tiếp tuyến hoặc quan hệ song song/vuông góc (3,0đ)',
        'Lệnh 3: Chứng minh thẳng hàng, đồng quy hoặc cực trị hình học (1,0đ)',
      ],
      instruction: 'Vẽ hình chuẩn xác, trình bày chặt chẽ, vận dụng phương tích, góc nội tiếp và bổ đề hình thang.',
      sampleQuestion:
        'Từ điểm $M$ nằm ngoài đường tròn $(O; R)$, kẻ hai tiếp tuyến $MA, MB$ với đường tròn ($A, B$ là các tiếp điểm) và cát tuyến $MCD$ không đi qua tâm $O$ ($C$ nằm giữa $M$ và $D$; tia $MC$ nằm giữa hai tia $MO$ và $MA$). Gọi $H$ là giao điểm của $MO$ và $AB$.\n1) (3,0 điểm) Chứng minh tứ giác $MAOB$ nội tiếp và $MA^2 = MC \\cdot MD$.\n2) (3,0 điểm) Chứng minh $MC \\cdot MD = MH \\cdot MO$, từ đó suy ra tứ giác $CHOD$ nội tiếp đường tròn.\n3) (1,0 điểm) Kẻ đường kính $AK$ của đường tròn $(O)$. Tia $MC$ cắt $BK$ tại $E$. Chứng minh $M$ là trung điểm của $AE$ và $\\widehat{MHA} = \\widehat{MHD}$.',
      solutionGuide:
        '1) Ta có $\\widehat{MAO} = 90^\\circ$ (tiếp tuyến $MA$), $\\widehat{MBO} = 90^\\circ$ (tiếp tuyến $MB$). Tứ giác $MAOB$ có $\\widehat{MAO} + \\widehat{MBO} = 180^\\circ$ nên nội tiếp đường tròn đường kính $MO$. Xét $\\triangle MAC$ và $\\triangle MDA$: có $\\widehat{M}$ chung, $\\widehat{MAC} = \\widehat{MDA}$ (góc tạo bởi tia tiếp tuyến và dây cung bằng góc nội tiếp cùng chắn $\\overparen{AC}$). Do đó $\\triangle MAC \\sim \\triangle MDA$ (g-g) $\\implies \\frac{MA}{MD} = \\frac{MC}{MA} \\implies MA^2 = MC \\cdot MD$ (đpcm).\n2) Do $MA = MB$ và $OA = OB = R$ nên $MO$ là đường trung trực của $AB \\implies MO \\perp AB$ tại $H$. Trong tam giác vuông $MAO$ có $AH$ là đường cao, theo hệ thức lượng trong tam giác vuông: $MA^2 = MH \\cdot MO$. Kết hợp với câu 1 có $MA^2 = MC \\cdot MD$, suy ra $MC \\cdot MD = MH \\cdot MO \\implies \\frac{MC}{MO} = \\frac{MH}{MD}$. Xét $\\triangle MCH$ và $\\triangle MOD$ có $\\widehat{M}$ chung và tỉ lệ cạnh trên, suy ra $\\triangle MCH \\sim \\triangle MOD$ (c-g-c) $\\implies \\widehat{MHC} = \\widehat{MDO}$. Góc ngoài tại đỉnh $H$ bằng góc trong đỉnh đối diện $D$, suy ra tứ giác $CHOD$ nội tiếp (đpcm).\n3) Vì $AK$ là đường kính nên $\\widehat{ABK} = 90^\\circ \\implies AB \\perp BK$. Mà $MO \\perp AB \\implies MO \\parallel BK$. Trong tam giác $AKE$, $O$ là trung điểm $AK$ và $MO \\parallel EK$, suy ra $M$ là trung điểm $AE$. Về phần góc: Vì $CHOD$ nội tiếp nên $\\widehat{CHO} = \\widehat{CDO} = \\widehat{ODC}$. Mà tam giác $OCD$ cân tại $O$ ($OC = OD = R$) nên $\\widehat{OCD} = \\widehat{ODC} = \\widehat{CHO}$. Suy ra tia $HO$ là phân giác của góc $\\widehat{CHD}$, kết hợp $MO \\perp AB$ suy ra $\\widehat{MHA} = \\widehat{MHD}$ (đpcm).',
      rubric: [
        { step: 'Ý 1: Chứng minh MAOB nội tiếp qua tổng 2 góc đối = 180°', score: 1.5 },
        { step: 'Ý 1: Chứng minh tam giác đồng dạng suy ra MA² = MC.MD', score: 1.5 },
        { step: 'Ý 2: Hệ thức lượng tam giác vuông MA² = MH.MO', score: 1.5 },
        { step: 'Ý 2: Tỉ số đồng dạng suy ra tứ giác CHOD nội tiếp', score: 1.5 },
        { step: 'Ý 3: Chứng minh MO song song BK suy ra M là trung điểm AE', score: 0.5 },
        { step: 'Ý 3: Phân tích góc suy ra góc MHA = góc MHD', score: 0.5 },
      ],
    },
  ],
};
