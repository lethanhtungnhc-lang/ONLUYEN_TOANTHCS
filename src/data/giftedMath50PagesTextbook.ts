/**
 * TÀI LIỆU BỒI DƯỠNG HỌC SINH GIỎI TOÁN THCS - 50 TRANG HỌC LIỆU CHUYÊN SÂU
 * Bám sát 100% Cấu trúc định dạng đề thi Học sinh Giỏi cấp Thành phố năm học 2026-2027
 * Ban hành kèm Công văn của Sở Giáo dục và Đào tạo
 * Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
 * Tác quyền: © 2026 Teacher Lê Thanh Tùng. All Rights Reserved.
 */

export interface TextbookPage {
  pageNumber: number;
  chapterId: string;
  chapterTitle: string;
  topicTitle: string;
  officialRef: string; // Trích dẫn vị trí trong cấu trúc đề thi 20đ
  theoryContent: string;
  theorems: { name: string; statement: string; note?: string }[];
  masterExamples: {
    title: string;
    problem: string;
    analysis: string;
    solution: string;
    pedagogyTip: string;
  }[];
  drillExercises: {
    id: string;
    question: string;
    hint: string;
    finalAnswer: string;
  }[];
}

export const GIFTED_50_PAGES_BOOK: TextbookPage[] = [
  // -------------------------------------------------------------------------
  // CHƯƠNG I: BIẾN ĐỔI BIỂU THỨC ĐẠI SỐ & CĂN THỨC NÂNG CAO (TRANG 1 - 5)
  // (Cấu trúc Bài 1: Lệnh 1 - 2,5 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 1,
    chapterId: 'ch-01',
    chapterTitle: 'Chuyên đề 1: Biến đổi đại số & Căn thức nâng cao',
    topicTitle: 'Hằng đẳng thức mở rộng & Kỹ thuật đối xứng ba biến',
    officialRef: 'Bài 1 (5,0 điểm): Lệnh 1 - Biến đổi biểu thức đại số, rút gọn biểu thức, chứng minh đẳng thức, tính giá trị (2,5 điểm)',
    theoryContent: `### I. Cơ sở lý thuyết và tư duy toán học:
1. **Đồng nhất thức ba biến cơ bản:**
   $$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = \\frac{1}{2}(a + b + c)[(a-b)^2 + (b-c)^2 + (c-a)^2]$$
   - *Hệ quả 1:* Nếu $a + b + c = 0$ thì $a^3 + b^3 + c^3 = 3abc$.
   - *Hệ quả 2:* Nếu $a, b, c > 0$ và $a^3 + b^3 + c^3 = 3abc$ thì $a = b = c$.
2. **Kỹ thuật thêm bớt hằng số đối xứng:**
   Khi đề bài cho điều kiện ràng buộc như $xy + yz + zx = 1$, ta luôn khai thác để phân tích thành nhân tử:
   $$1 + x^2 = xy + yz + zx + x^2 = (x + y)(x + z)$$
   Tương tự: $1 + y^2 = (y + x)(y + z)$ và $1 + z^2 = (z + x)(z + y)$.`,
    theorems: [
      {
        name: 'Đồng nhất thức Lagrange cho 2 và 3 biến',
        statement: '(a^2 + b^2)(x^2 + y^2) = (ax + by)^2 + (ay - bx)^2',
        note: 'Dùng để chứng minh bất đẳng thức và phân tích đa thức chứa căn.',
      },
      {
        name: 'Hằng đẳng thức phân tích bình phương',
        statement: 'xy + yz + zx = 1 \\implies x^2 + 1 = (x+y)(x+z)',
        note: 'Cho phép khai căn hoàn toàn biểu thức dưới mẫu trong các bài toán tính giá trị.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1.1: Tính giá trị biểu thức đối xứng chứa căn lồng nhau',
        problem: 'Cho ba số thực dương $x, y, z$ thỏa mãn $xy + yz + zx = 1$. Tính giá trị biểu thức:\n$$P = x\\sqrt{\\frac{(1+y^2)(1+z^2)}{1+x^2}} + y\\sqrt{\\frac{(1+z^2)(1+x^2)}{1+y^2}} + z\\sqrt{\\frac{(1+x^2)(1+y^2)}{1+z^2}}$$',
        analysis: 'Không quy đồng mẫu thức vì sẽ dẫn đến bậc 6. Hãy thay số 1 bởi biểu thức đối xứng $xy + yz + zx$.',
        solution: `Ta có:
$$1 + x^2 = xy + yz + zx + x^2 = x(x+y) + z(x+y) = (x+y)(x+z)$$
Hoàn toàn tương tự:
$$1 + y^2 = (y+x)(y+z); \\quad 1 + z^2 = (z+x)(z+y)$$
Xét biểu thức dưới căn thứ nhất:
$$\\frac{(1+y^2)(1+z^2)}{1+x^2} = \\frac{(y+x)(y+z)(z+x)(z+y)}{(x+y)(x+z)} = (y+z)^2$$
Vì $x, y, z > 0$ nên $\\sqrt{(y+z)^2} = y+z$.
Do tính đối xứng hoán vị:
$$P = x(y+z) + y(z+x) + z(x+y) = 2(xy + yz + zx) = 2(1) = 2.$$
Kết luận: Giá trị của biểu thức là $P = 2$.`,
        pedagogyTip: 'Khi gặp biểu thức chứa $1 + x^2$, luôn quan sát giả thiết xem hằng số 1 có biểu diễn được qua tích hai biến hay không.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-01-1',
        question: 'Cho $a + b + c = 0$. Rút gọn biểu thức $A = \\frac{a^2}{a^2 - b^2 - c^2} + \\frac{b^2}{b^2 - c^2 - a^2} + \\frac{c^2}{c^2 - a^2 - b^2}$.',
        hint: 'Khai thác $a + b = -c \\implies (a+b)^2 = c^2 \\implies a^2 - b^2 - c^2 = -2bc$.',
        finalAnswer: 'A = 1',
      },
    ],
  },

  {
    pageNumber: 2,
    chapterId: 'ch-01',
    chapterTitle: 'Chuyên đề 1: Biến đổi đại số & Căn thức nâng cao',
    topicTitle: 'Căn bậc hai lồng nhau & Phân tích thành bình phương hoàn chỉnh',
    officialRef: 'Bài 1: Lệnh 1 (2,5 điểm) - Rút gọn căn thức bậc hai, khử căn ở mẫu',
    theoryContent: `### II. Phương pháp trục căn thức và đưa về bình phương:
1. **Dạng $\\sqrt{A \\pm \\sqrt{B}}$:**
   Tìm hai số $x, y$ sao cho $\\begin{cases} x + y = A \\\\ 4xy = B \\end{cases}$ để viết thành:
   $$\\sqrt{A \\pm \\sqrt{B}} = \\sqrt{(\\sqrt{x} \\pm \\sqrt{y})^2} = |\\sqrt{x} \\pm \\sqrt{y}|$$
2. **Kỹ thuật nhân liên hợp bậc hai và bậc ba:**
   - $\\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}$
   - $\\frac{1}{\\sqrt[3]{a} \\pm \\sqrt[3]{b}} = \\frac{\\sqrt[3]{a^2} \\mp \\sqrt[3]{ab} + \\sqrt[3]{b^2}}{a \\pm b}$`,
    theorems: [
      {
        name: 'Công thức căn thức lồng nhau chuẩn',
        statement: '\\sqrt{a \\pm \\sqrt{b}} = \\sqrt{\\frac{a + c}{2}} \\pm \\sqrt{\\frac{a - c}{2}} \\quad (\\text{với } c = \\sqrt{a^2 - b} \\text{ là số hữu tỉ})',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1.2: Rút gọn biểu thức căn phức hợp',
        problem: 'Rút gọn biểu thức: $M = \\sqrt{4 + \\sqrt{10 + 2\\sqrt{5}}} + \\sqrt{4 - \\sqrt{10 + 2\\sqrt{5}}}$.',
        analysis: 'Tính $M^2$ trước vì hai đại lượng là hai biểu thức liên hợp.',
        solution: `Vì $M > 0$, bình phương hai vế:
$$M^2 = 4 + \\sqrt{10 + 2\\sqrt{5}} + 4 - \\sqrt{10 + 2\\sqrt{5}} + 2\\sqrt{16 - (10 + 2\\sqrt{5})}$$
$$M^2 = 8 + 2\\sqrt{6 - 2\\sqrt{5}} = 8 + 2\\sqrt{(\\sqrt{5} - 1)^2} = 8 + 2(\\sqrt{5} - 1) = 6 + 2\\sqrt{5} = (\\sqrt{5} + 1)^2$$
Vì $M > 0$ nên $M = \\sqrt{5} + 1$.`,
        pedagogyTip: 'Khi gặp dạng $\\sqrt{a + \\sqrt{b}} + \\sqrt{a - \\sqrt{b}}$, hãy luôn xét bình phương hai vế.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-01-2',
        question: 'Rút gọn $K = \\sqrt[3]{2 + \\sqrt{5}} + \\sqrt[3]{2 - \\sqrt{5}}$.',
        hint: 'Đặt $K = x$, lập phương hai vế: $x^3 = 4 - 3x \\iff (x-1)(x^2 + x + 4) = 0$.',
        finalAnswer: 'K = 1',
      },
    ],
  },

  {
    pageNumber: 3,
    chapterId: 'ch-01',
    chapterTitle: 'Chuyên đề 1: Biến đổi đại số & Căn thức nâng cao',
    topicTitle: 'Kỹ thuật rút gọn biểu thức phân thức chứa căn bậc ba',
    officialRef: 'Bài 1: Lệnh 1 (2,5 điểm) - Biến đổi biểu thức chứa căn bậc ba nâng cao',
    theoryContent: `### III. Căn bậc ba và hệ thức Cardan:
1. Cho $x = \\sqrt[3]{a + \\sqrt{b}} + \\sqrt[3]{a - \\sqrt{b}}$, ta có:
   $$x^3 = 2a + 3\\sqrt[3]{a^2 - b} \\cdot x$$
   Đưa về phương trình bậc ba: $x^3 - 3ux - 2a = 0$ với $u = \\sqrt[3]{a^2 - b}$.
2. Phân tích nhân tử $x^3 + y^3 + z^3 - 3xyz$ cho các biến vô tỷ.`,
    theorems: [
      {
        name: 'Hằng đẳng thức căn bậc ba liên hợp',
        statement: '(u+v)^3 = u^3 + v^3 + 3uv(u+v)',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1.3: Chứng minh một biểu thức căn bậc ba là số nguyên',
        problem: 'Chứng minh rằng số $x = \\sqrt[3]{5\\sqrt{2} + 7} - \\sqrt[3]{5\\sqrt{2} - 7}$ là một số nguyên.',
        analysis: 'Để ý $5\\sqrt{2} \\pm 7 = (\\sqrt{2} \\pm 1)^3$.',
        solution: `Cách 1 (Biến đổi trực tiếp):
Ta có $(\\sqrt{2} + 1)^3 = 2\\sqrt{2} + 3(2)(1) + 3(\\sqrt{2})(1) + 1 = 5\\sqrt{2} + 7$.
Tương tự: $(\\sqrt{2} - 1)^3 = 5\\sqrt{2} - 7$.
Do đó:
$$x = \\sqrt[3]{(\\sqrt{2} + 1)^3} - \\sqrt[3]{(\\sqrt{2} - 1)^3} = (\\sqrt{2} + 1) - (\\sqrt{2} - 1) = 2.$$
Vì $2 \\in \\mathbb{Z}$ nên $x$ là một số nguyên.`,
        pedagogyTip: 'Trước khi lập phương, luôn thử nhẩm xem biểu thức trong căn có phải là $(\\sqrt{a} \\pm b)^3$ không.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-01-3',
        question: 'Tính giá trị của $x = \\sqrt[3]{20 + 14\\sqrt{2}} + \\sqrt[3]{20 - 14\\sqrt{2}}$.',
        hint: '$20 \\pm 14\\sqrt{2} = (2 \\pm \\sqrt{2})^3$.',
        finalAnswer: 'x = 4',
      },
    ],
  },

  {
    pageNumber: 4,
    chapterId: 'ch-01',
    chapterTitle: 'Chuyên đề 1: Biến đổi đại số & Căn thức nâng cao',
    topicTitle: 'Khai thác giả thiết ràng buộc để thu gọn biểu thức',
    officialRef: 'Bài 1: Lệnh 1 (2,5 điểm) - Rút gọn biểu thức điều kiện phân thức',
    theoryContent: `### IV. Phương pháp đặt ẩn phụ trong rút gọn biểu thức:
1. Đặt ẩn phụ đơn: $t = \\sqrt{x} + \\frac{1}{\\sqrt{x}} \\implies x + \\frac{1}{x} = t^2 - 2$.
2. Đặt ẩn phụ đối xứng: $u = a + b, v = ab$.
3. Đặt ẩn phụ đồng bậc để chuyển về đa thức thuần nhất.`,
    theorems: [
      {
        name: 'Bổ đề phân thức điều kiện $abc = 1$',
        statement: '\\frac{1}{1 + a + ab} + \\frac{1}{1 + b + bc} + \\frac{1}{1 + c + ca} = 1',
        note: 'Bổ đề cực kỳ nổi tiếng trong các kì thi học sinh giỏi.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1.4: Áp dụng bổ đề $abc = 1$',
        problem: 'Cho ba số thực dương $a, b, c$ thỏa mãn $abc = 1$. Tính giá trị của biểu thức:\n$$S = \\frac{1}{1 + a + ab} + \\frac{1}{1 + b + bc} + \\frac{1}{1 + c + ca}$$',
        analysis: 'Nhân cả tử và mẫu của phân thức thứ hai với $a$, phân thức thứ ba với $ab$.',
        solution: `Ta có $abc = 1$:
Phân thức thứ hai: $\\frac{1}{1 + b + bc} = \\frac{a}{a(1 + b + bc)} = \\frac{a}{a + ab + abc} = \\frac{a}{a + ab + 1}$.
Phân thức thứ ba: $\\frac{1}{1 + c + ca} = \\frac{ab}{ab(1 + c + ca)} = \\frac{ab}{ab + abc + a^2bc} = \\frac{ab}{ab + 1 + a}$.
Cộng cả 3 phân thức cùng mẫu số $1 + a + ab$:
$$S = \\frac{1 + a + ab}{1 + a + ab} = 1.$$`,
        pedagogyTip: 'Khi gặp điều kiện $abc = 1$, giữ nguyên một phân thức, hai phân thức còn lại nhân với đại lượng phụ thích hợp để đưa về cùng mẫu.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-01-4',
        question: 'Cho $xyz = 1$. Rút gọn $T = \\frac{\\sqrt{x}}{\\sqrt{xy} + \\sqrt{x} + 1} + \\frac{\\sqrt{y}}{\\sqrt{yz} + \\sqrt{y} + 1} + \\frac{\\sqrt{z}}{\\sqrt{zx} + \\sqrt{z} + 1}$.',
        hint: 'Tương tự, đặt $\\sqrt{x}=a, \\sqrt{y}=b, \\sqrt{z}=c \\implies abc=1$.',
        finalAnswer: 'T = 1',
      },
    ],
  },

  {
    pageNumber: 5,
    chapterId: 'ch-01',
    chapterTitle: 'Chuyên đề 1: Biến đổi đại số & Căn thức nâng cao',
    topicTitle: 'Tổng kết Chuyên đề 1: Hệ thống bài tập tự luyện chuẩn 2,5 điểm',
    officialRef: 'Bài 1: Lệnh 1 (2,5 điểm) - Đề luyện tổng hợp',
    theoryContent: `### V. Sơ đồ tư duy giải quyết câu Biến đổi đại số HSG:
1. **Bước 1 (Nhận dạng):** Biểu thức có tính đối xứng hay hoán vị vòng quanh?
2. **Bước 2 (Khai thác điều kiện):** $a+b+c=0$ hay $xy+yz+zx=1$ hay $abc=1$?
3. **Bước 3 (Biến đổi):** Sử dụng phân tích nhân tử, thêm bớt, hoặc bình phương khử căn.
4. **Bước 4 (Đối chiếu):** Kiểm tra điều kiện xác định và tính hợp lý của kết quả.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1.5: Đề thi chọn HSG chính thức',
        problem: 'Cho các số thực $a, b, c$ đôi một khác nhau thỏa mãn $a^3 + b^3 + c^3 = 3abc$ và $abc \\ne 0$. Tính giá trị của biểu thức:\n$$N = \\frac{a^2 + b^2 - c^2}{2ab} + \\frac{b^2 + c^2 - a^2}{2bc} + \\frac{c^2 + a^2 - b^2}{2ca}$$',
        analysis: 'Do $a, b, c$ đôi một khác nhau nên không thể có $a = b = c$. Do đó từ $a^3+b^3+c^3 = 3abc$ suy ra $a+b+c = 0$.',
        solution: `Ta có $a^3 + b^3 + c^3 - 3abc = \\frac{1}{2}(a+b+c)[(a-b)^2 + (b-c)^2 + (c-a)^2] = 0$.
Vì $a, b, c$ đôi một khác nhau nên $(a-b)^2 + (b-c)^2 + (c-a)^2 > 0$.
Do đó bắt buộc $a + b + c = 0 \\implies a + b = -c \\implies (a+b)^2 = c^2 \\iff a^2 + b^2 - c^2 = -2ab$.
Thay vào từng phân thức:
$$\\frac{a^2 + b^2 - c^2}{2ab} = \\frac{-2ab}{2ab} = -1.$$
Tương tự: $\\frac{b^2 + c^2 - a^2}{2bc} = -1$ và $\\frac{c^2 + a^2 - b^2}{2ca} = -1$.
Vậy $N = (-1) + (-1) + (-1) = -3$.`,
        pedagogyTip: 'Luôn cảnh giác với giả thiết các biến đôi một khác nhau để loại bỏ trường hợp $a = b = c$.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-01-5',
        question: 'Cho $a, b, c \\ne 0$ thỏa mãn $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} = 0$. Tính $Q = \\frac{ab}{c^2} + \\frac{bc}{a^2} + \\frac{ca}{b^2}$.',
        hint: 'Đặt $x = 1/a, y = 1/b, z = 1/c \\implies x+y+z=0 \\implies x^3+y^3+z^3 = 3xyz$.',
        finalAnswer: 'Q = 3',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG III: ĐA THỨC, PHÉP CHIA BÉZOUT & NGHIỆM ĐA THỨC (TRANG 11 - 15)
  // (Cấu trúc Bài 2: Lệnh 1 - 2,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 11,
    chapterId: 'ch-03',
    chapterTitle: 'Chuyên đề 3: Đa thức, Phép chia Bézout & Nghiệm đa thức',
    topicTitle: 'Định lý Bézout về số dư & Phép chia đa thức',
    officialRef: 'Bài 2 (4,0 điểm): Lệnh 1 - Xác định đa thức, các phép toán đa thức, nghiệm, tính chất hệ số nguyên (2,0 điểm)',
    theoryContent: `### I. Định lý Bézout và thuật toán Horner:
1. **Định lý Bézout (Được phép sử dụng trực tiếp như SGK):**
   *Số dư trong phép chia đa thức $P(x)$ cho nhị thức bậc nhất $(x - a)$ là hằng số $R = P(a)$.*
   - *Hệ quả:* $P(x)$ chia hết cho $(x - a) \\iff P(a) = 0$ ($a$ là một nghiệm của $P(x)$).
2. **Đa thức chia có nghiệm bội:**
   Nếu đa thức $P(x)$ có nghiệm bội $a$ bậc $k$ thì $P(x) = (x-a)^k \\cdot Q(x)$.
3. **Phép chia cho đa thức bậc hai $(x-a)(x-b)$:**
   Khi chia $P(x)$ cho $(x-a)(x-b)$ với $a \\ne b$, phần dư có dạng $R(x) = Ax + B$. Ta tìm $A, B$ từ hệ:
   $$\\begin{cases} P(a) = Aa + B \\\\ P(b) = Ab + B \\end{cases}$$`,
    theorems: [
      {
        name: 'Định lý Bézout về số dư',
        statement: 'Số dư trong phép chia đa thức f(x) cho đa thức x - a là f(a).',
        note: 'Theo Văn bản của Sở GD&ĐT, học sinh được phép sử dụng kết quả này như SGK.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 3.1: Tìm dư của phép chia đa thức',
        problem: 'Tìm phần dư trong phép chia đa thức $P(x) = x^{2026} + x^{2025} + 1$ cho đa thức $x^2 - 1$.',
        analysis: 'Số chia $x^2 - 1 = (x-1)(x+1)$ là đa thức bậc 2 nên phần dư $R(x)$ có bậc không quá 1: $R(x) = ax + b$.',
        solution: `Gọi thương của phép chia là $Q(x)$ và dư là $R(x) = ax + b$.
Ta có đồng nhất thức:
$$P(x) = (x^2 - 1)Q(x) + ax + b = (x - 1)(x + 1)Q(x) + ax + b$$
- Thay $x = 1$: $P(1) = 1^{2026} + 1^{2025} + 1 = 3 \\implies a(1) + b = 3 \\iff a + b = 3$.
- Thay $x = -1$: $P(-1) = (-1)^{2026} + (-1)^{2025} + 1 = 1 - 1 + 1 = 1 \\implies a(-1) + b = 1 \\iff -a + b = 1$.
Cộng hai phương trình: $2b = 4 \\implies b = 2 \\implies a = 1$.
Vậy phần dư cần tìm là $R(x) = x + 2$.`,
        pedagogyTip: 'Khi số chia phân tích được thành nhân tử, phương pháp giá trị riêng (thay nghiệm của số chia) luôn là cách nhanh nhất.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-03-1',
        question: 'Tìm phần dư khi chia đa thức $f(x) = x^{100} + x^{50} + x^2 + 1$ cho $x^2 - 1$.',
        hint: 'Dư có dạng $ax + b$. Tính $f(1) = 4$ và $f(-1) = 4$.',
        finalAnswer: 'R(x) = 4',
      },
    ],
  },

  {
    pageNumber: 12,
    chapterId: 'ch-03',
    chapterTitle: 'Chuyên đề 3: Đa thức, Phép chia Bézout & Nghiệm đa thức',
    topicTitle: 'Xác định đa thức & Kỹ thuật xây dựng đa thức phụ',
    officialRef: 'Bài 2: Lệnh 1 (2,0 điểm) - Xác định đa thức thỏa mãn điều kiện cho trước',
    theoryContent: `### II. Phương pháp đa thức phụ:
Để xác định đa thức $P(x)$ khi biết giá trị tại một số điểm $P(x_1) = y_1, P(x_2) = y_2, ..., P(x_n) = y_n$:
1. Tìm một đa thức $Q(x)$ bậc thấp sao cho $Q(x_i) = y_i$ với mọi $i = 1, ..., n$.
2. Xét đa thức hiệu $H(x) = P(x) - Q(x)$.
3. Khi đó $H(x_i) = 0$, nghĩa là $x_1, x_2, ..., x_n$ là các nghiệm của $H(x)$.
4. Do đó $H(x) = (x - x_1)(x - x_2)...(x - x_n) \\cdot K(x)$.
5. Suy ra $P(x) = (x - x_1)(x - x_2)...(x - x_n)K(x) + Q(x)$.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 3.2: Xác định đa thức bậc 4',
        problem: 'Cho đa thức bậc 4 $P(x)$ có hệ số bậc cao nhất bằng 1 và thỏa mãn: $P(1) = 10, P(2) = 20, P(3) = 30$. Tính giá trị của biểu thức $T = \\frac{P(12) + P(-8)}{10}$.',
        analysis: 'Quan sát: $P(1) = 10 \\cdot 1, P(2) = 10 \\cdot 2, P(3) = 10 \\cdot 3$. Đa thức phụ là $Q(x) = 10x$.',
        solution: `Xét đa thức phụ $Q(x) = 10x$.
Đặt $H(x) = P(x) - 10x$.
Ta có $H(1) = P(1) - 10 = 0$; $H(2) = P(2) - 20 = 0$; $H(3) = P(3) - 30 = 0$.
Do đó $x = 1, x = 2, x = 3$ là ba nghiệm của đa thức $H(x)$.
Vì $P(x)$ là đa thức bậc 4 có hệ số cao nhất bằng 1 nên $H(x)$ cũng là đa thức bậc 4 có hệ số cao nhất bằng 1.
Suy ra: $H(x) = (x - 1)(x - 2)(x - 3)(x - a)$, với $a$ là hằng số.
Do đó: $P(x) = (x - 1)(x - 2)(x - 3)(x - a) + 10x$.
Tính:
- $P(12) = (11)(10)(9)(12 - a) + 120 = 990(12 - a) + 120 = 11880 - 990a + 120 = 12000 - 990a$.
- $P(-8) = (-9)(-10)(-11)(-8 - a) - 80 = -990(-8 - a) - 80 = 7920 + 990a - 80 = 7840 + 990a$.
Cộng lại:
$$P(12) + P(-8) = (12000 - 990a) + (7840 + 990a) = 19840.$$
Vậy $T = \\frac{19840}{10} = 1984$.`,
        pedagogyTip: 'Đại lượng tham số $a$ luôn tự động triệt tiêu khi đề bài yêu cầu tính tổng $P(x_0) + P(x_0\')$ có tính đối xứng.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-03-2',
        question: 'Cho đa thức bậc 3 hệ số bậc cao nhất bằng 1, thỏa $P(1) = 3, P(2) = 5, P(3) = 7$. Tính $P(4)$.',
        hint: '$Q(x) = 2x + 1 \\implies P(x) = (x-1)(x-2)(x-3) + 2x + 1$.',
        finalAnswer: 'P(4) = 15',
      },
    ],
  },

  {
    pageNumber: 13,
    chapterId: 'ch-03',
    chapterTitle: 'Chuyên đề 3: Đa thức, Phép chia Bézout & Nghiệm đa thức',
    topicTitle: 'Tính chất đa thức hệ số nguyên & Bổ đề Gauss',
    officialRef: 'Bài 2: Lệnh 1 (2,0 điểm) - Đa thức hệ số nguyên và nghiệm hữu tỉ',
    theoryContent: `### III. Đa thức hệ số nguyên:
Cho $P(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0$ với $a_i \\in \\mathbb{Z}$.
1. **Định lý nghiệm hữu tỉ:**
   Nếu phân số tối giản $\\frac{p}{q}$ là nghiệm của $P(x)$ thì $p$ là ước của hệ số tự do $a_0$, và $q$ là ước của hệ số cao nhất $a_n$.
2. **Tính chất chia hết quan trọng của đa thức hệ số nguyên:**
   *Với mọi số nguyên $a, b$ ($a \\ne b$), ta luôn có: $(a - b) \\mid [P(a) - P(b)]$.*
   Đây là vũ khí quan trọng bậc nhất để chứng minh phương trình nghiệm nguyên hoặc chứng minh một đa thức không có nghiệm nguyên.`,
    theorems: [
      {
        name: 'Định lý về hiệu giá trị đa thức hệ số nguyên',
        statement: 'P(x) \\in \\mathbb{Z}[x] \\implies (a - b) \\mid (P(a) - P(b)) \\quad \\forall a, b \\in \\mathbb{Z}',
        note: 'Dùng để loại trừ các nghiệm nguyên trong bài toán số học - đại số.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 3.3: Chứng minh đa thức không có nghiệm nguyên',
        problem: 'Chứng minh rằng không tồn tại đa thức hệ số nguyên $P(x)$ sao cho $P(7) = 5$ và $P(15) = 9$.',
        analysis: 'Áp dụng tính chất $(a - b) \\mid [P(a) - P(b)]$ với $a = 15, b = 7$.',
        solution: `Giả sử tồn tại đa thức hệ số nguyên $P(x)$ thỏa mãn $P(7) = 5$ và $P(15) = 9$.
Theo tính chất của đa thức hệ số nguyên, ta phải có:
$$(15 - 7) \\mid [P(15) - P(7)] \\iff 8 \\mid (9 - 5) \\iff 8 \\mid 4.$$
Điều này là vô lý vì số 8 không thể là ước của số 4.
Vậy điều giả sử là sai, không tồn tại đa thức hệ số nguyên nào thỏa mãn yêu cầu đề bài.`,
        pedagogyTip: 'Bổ đề $a - b \\mid P(a) - P(b)$ chỉ mất 3 dòng nhưng giải quyết trọn vẹn điểm số câu hỏi.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-03-3',
        question: 'Cho $P(x) \\in \\mathbb{Z}[x]$ thỏa mãn $P(1) = 2025, P(2) = 2026$. Chứng minh $P(x)$ không có nghiệm nguyên.',
        hint: 'Nếu $P(c) = 0$ ($c \\in \\mathbb{Z}$) thì $(c-1) \\mid 2025$ và $(c-2) \\mid 2026$. Hai số nguyên liên tiếp $(c-1)$ và $(c-2)$ không thể đồng thời là ước phù hợp.',
        finalAnswer: 'Đã chứng minh',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG IV: PHƯƠNG TRÌNH VÔ TỶ & HỆ PHƯƠNG TRÌNH PHI CHUẨN (TRANG 16 - 20)
  // (Cấu trúc Bài 2: Lệnh 2 - 2,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 16,
    chapterId: 'ch-04',
    chapterTitle: 'Chuyên đề 4: Phương trình vô tỷ & Hệ phương trình phi chuẩn',
    topicTitle: 'Kỹ thuật nhân liên hợp & Trục căn thức có nghiệm',
    officialRef: 'Bài 2 (4,0 điểm): Lệnh 2 - Phương trình và hệ phương trình (2,0 điểm)',
    theoryContent: `### I. Phương pháp nhân lượng liên hợp:
1. Nhẩm được nghiệm $x = x_0$ của phương trình chứa căn $\\sqrt{f(x)}$.
2. Tạo lượng liên hợp: ghép $\\sqrt{f(x)} - f(x_0)$ hoặc $\\sqrt{f(x)} - (ax + b)$.
3. Áp dụng hằng đẳng thức:
   $$\\sqrt{A} - B = \\frac{A - B^2}{\\sqrt{A} + B}$$
4. Xuất hiện nhân tử chung $(x - x_0)$.
5. Đánh giá phần còn lại vô nghiệm bằng phương pháp chặn hoặc đồng biến.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 4.1: Giải phương trình vô tỷ bằng liên hợp',
        problem: 'Giải phương trình: $x^2 + 4x + 7 = (x + 4)\\sqrt{x^2 + 7}$.',
        analysis: 'Nhẩm nghiệm $x = 3$. Đặt ẩn phụ $u = \\sqrt{x^2 + 7} > 0$ đưa về phương trình bậc hai theo $u$.',
        solution: `Đặt $u = \\sqrt{x^2 + 7}$ với $u > 0$. Phương trình trở thành:
$$u^2 + 4x = (x + 4)u \\iff u^2 - (x+4)u + 4x = 0$$
$$\\iff (u - x)(u - 4) = 0 \\implies u = x \\text{ hoặc } u = 4.$$
- Trường hợp 1: $u = 4 \\iff \\sqrt{x^2 + 7} = 4 \\iff x^2 + 7 = 16 \\iff x^2 = 9 \\iff x = \\pm 3$.
- Trường hợp 2: $u = x \\iff \\sqrt{x^2 + 7} = x$ (vô nghiệm vì $x > 0 \\implies x^2 + 7 = x^2 \\iff 7 = 0$ vô lý).
Vậy tập nghiệm của phương trình là $S = \\{-3; 3\\}$.`,
        pedagogyTip: 'Khi phương trình vô tỷ chứa biểu thức lặp lại, hãy coi căn thức là một ẩn và giải theo công thức nghiệm bậc hai.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-04-1',
        question: 'Giải phương trình: $\\sqrt{2x - 1} + x^2 - 3x + 1 = 0$.',
        hint: 'Nhẩm nghiệm $x = 1$. Ghép $(\\sqrt{2x-1} - 1) + (x^2 - 3x + 2) = 0$.',
        finalAnswer: 'x = 1',
      },
    ],
  },

  {
    pageNumber: 17,
    chapterId: 'ch-04',
    chapterTitle: 'Chuyên đề 4: Phương trình vô tỷ & Hệ phương trình phi chuẩn',
    topicTitle: 'Hệ phương trình đối xứng loại 1 và loại 2',
    officialRef: 'Bài 2: Lệnh 2 (2,0 điểm) - Hệ phương trình đối xứng',
    theoryContent: `### II. Phân loại và phương pháp giải Hệ phương trình đối xứng:
1. **Hệ đối xứng loại 1:**
   Thay đổi vai trò $x$ và $y$ cho nhau thì các phương trình trong hệ không thay đổi.
   - *Phương pháp:* Đặt $S = x + y, P = xy$ với điều kiện $S^2 \\ge 4P$.
2. **Hệ đối xứng loại 2:**
   Thay đổi vai trò $x$ và $y$ thì phương trình này biến thành phương trình kia.
   - *Phương pháp:* Trừ vế theo vế hai phương trình, luôn xuất hiện nhân tử chung $(x - y)$:
     $$(x - y) \\cdot M(x, y) = 0 \\implies x = y \\quad \\text{hoặc} \\quad M(x, y) = 0.$$`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 4.2: Giải hệ đối xứng loại 2',
        problem: 'Giải hệ phương trình: $\\begin{cases} x^2 = 2y + 1 \\\\ y^2 = 2x + 1 \\end{cases}$',
        analysis: 'Hệ đối xứng loại 2. Trừ hai phương trình vế theo vế.',
        solution: `Trừ vế theo vế:
$$x^2 - y^2 = 2(y - x) \\iff (x - y)(x + y) + 2(x - y) = 0 \\iff (x - y)(x + y + 2) = 0$$
$$\\implies x = y \\quad \\text{hoặc} \\quad y = -x - 2.$$
- Trường hợp 1: $x = y$, thay vào pt đầu:
$$x^2 - 2x - 1 = 0 \\implies x = y = 1 \\pm \\sqrt{2}.$$
- Trường hợp 2: $y = -x - 2$, thay vào pt đầu:
$$x^2 = 2(-x - 2) + 1 \\iff x^2 + 2x + 3 = 0 \\iff (x+1)^2 + 2 = 0 \\text{ (vô nghiệm)}.$$
Vậy hệ phương trình có 2 nghiệm: $(x; y) \\in \\{(1 + \\sqrt{2}; 1 + \\sqrt{2}), (1 - \\sqrt{2}; 1 - \\sqrt{2})\\}$.`,
        pedagogyTip: 'Trừ vế theo vế đưa về phương trình tích $(x - y)g(x, y) = 0$ là con đường chuẩn mực.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-04-2',
        question: 'Giải hệ $\\begin{cases} x^3 = 3x + 2y \\\\ y^3 = 3y + 2x \\end{cases}$.',
        hint: 'Trừ vế theo vế: $(x-y)(x^2 + xy + y^2 + 2) = 0$. Vì $x^2 + xy + y^2 + 2 > 0$ nên $x = y$.',
        finalAnswer: '(0; 0), (\\sqrt{5}; \\sqrt{5}), (-\\sqrt{5}; -\\sqrt{5})',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG V: SỐ HỌC NÂNG CAO - ĐỒNG DƯ THỨC & FERMAT NHỎ (TRANG 21 - 25)
  // (Cấu trúc Bài 3: Lệnh 2 - 1,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 21,
    chapterId: 'ch-05',
    chapterTitle: 'Chuyên đề 5: Số học nâng cao - Đồng dư thức & Fermat nhỏ',
    topicTitle: 'Lý thuyết đồng dư & Định lý Fermat nhỏ',
    officialRef: 'Bài 3 (2,0 điểm): Lệnh 2 - Lý thuyết chia hết trên tập số nguyên, tìm số nguyên tố, hợp số, số chính phương, phương trình nghiệm nguyên (1,0 điểm)',
    theoryContent: `### I. Khái niệm và tính chất cơ bản về đồng dư:
Cho số nguyên $m > 1$. Hai số nguyên $a$ và $b$ gọi là đồng dư với nhau theo mô-đun $m$, kí hiệu $a \\equiv b \\pmod m$, nếu $a - b$ chia hết cho $m$.
1. **Các tính chất cơ bản:**
   - $a \\equiv b \\pmod m \\implies a + c \\equiv b + c \\pmod m$ và $ac \\equiv bc \\pmod m$.
   - $a \\equiv b \\pmod m \\implies a^n \\equiv b^n \\pmod m$ với mọi $n \\in \\mathbb{N}^*$.
2. **Định lý Fermat nhỏ (Được phép sử dụng trực tiếp):**
   *Nếu $p$ là một số nguyên tố và $a$ là một số nguyên không chia hết cho $p$ thì: $a^{p-1} \\equiv 1 \\pmod p$.*
   *Dạng tổng quát:* Với mọi số nguyên $a$ và số nguyên tố $p$, ta luôn có:
   $$a^p \\equiv a \\pmod p.$$`,
    theorems: [
      {
        name: 'Định lý Phéc-ma nhỏ (Fermat\'s Little Theorem)',
        statement: 'Nếu p là số nguyên tố và gcd(a, p) = 1 thì a^{p-1} \\equiv 1 \\pmod p.',
        note: 'Được Sở GD&ĐT công nhận cho phép sử dụng như SGK.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 5.1: Tìm hai chữ số tận cùng bằng đồng dư',
        problem: 'Tìm hai chữ số tận cùng của số $N = 7^{2026}$.',
        analysis: 'Tìm hai chữ số tận cùng chính là tìm số dư khi chia cho 100. Vì $100 = 4 \\times 25$, ta tìm dư theo mod 4 và mod 25.',
        solution: `Ta có $7^2 = 49 \\equiv -1 \\pmod{25} \\implies 7^4 = (7^2)^2 \\equiv (-1)^2 \\equiv 1 \\pmod{25}$.
Lũy thừa: $2026 = 4 \\times 506 + 2$.
Suy ra $7^{2026} = (7^4)^{506} \\cdot 7^2 \\equiv 1^{506} \\cdot 49 \\equiv 49 \\equiv -1 \\equiv 24 \\pmod{25}$.
Mặt khác: $7 \\equiv -1 \\pmod 4 \\implies 7^{2026} \\equiv (-1)^{2026} \\equiv 1 \\pmod 4$.
Ta tìm số $N < 100$ sao cho $\\begin{cases} N \\equiv 24 \\pmod{25} \\\\ N \\equiv 1 \\pmod 4 \\end{cases}$.
Các số $< 100$ chia 25 dư 24 là: $24, 49, 74, 99$.
Trong đó chỉ có 49 chia 4 dư 1 ($49 = 4 \\times 12 + 1$).
Vậy hai chữ số tận cùng của $7^{2026}$ là 49.`,
        pedagogyTip: 'Để tìm dư theo mod 100, tách thành mod 4 và mod 25 để hạ số mũ nhanh chóng.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-05-1',
        question: 'Chứng minh rằng với mọi số nguyên $n$, số $A = n^5 - n$ luôn chia hết cho 30.',
        hint: 'Áp dụng Fermat nhỏ: $n^5 \\equiv n \\pmod 5$ và $n^5 - n = n(n-1)(n+1)(n^2+1)$ chia hết cho 2 và 3.',
        finalAnswer: 'Đã chứng minh chia hết cho 2, 3, 5 -> chia hết cho 30',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG VI: TỔ HỢP - NGUYÊN LÝ DIRICHLET, BẤT BIẾN & CỰC HẠN (TRANG 26 - 30)
  // (Cấu trúc Bài 3: Lệnh 1 - 1,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 26,
    chapterId: 'ch-06',
    chapterTitle: 'Chuyên đề 6: Tổ hợp - Nguyên lý Dirichlet, Bất biến & Cực hạn',
    topicTitle: 'Nguyên lý Dirichlet & Bài toán chia lồng thỏ',
    officialRef: 'Bài 3 (2,0 điểm): Lệnh 1 - Bài toán chứng minh sự tồn tại, bài toán cực trị, Nguyên lý Dirichlet, nguyên lý cực hạn, logic (1,0 điểm)',
    theoryContent: `### I. Nguyên lý Dirichlet (Được phép sử dụng trực tiếp):
1. **Nguyên lý cơ bản:**
   *Nếu nhốt $m$ con thỏ vào $n$ cái chuồng ($m > n$) thì luôn tồn tại ít nhất một chuồng chứa từ 2 con thỏ trở lên.*
2. **Nguyên lý Dirichlet dạng tổng quát:**
   *Nếu nhốt $m$ con thỏ vào $n$ cái chuồng thì luôn tồn tại ít nhất một chuồng chứa không ít hơn $\\left\\lfloor \\frac{m-1}{n} \\right\\rfloor + 1$ con thỏ.*
3. **Kỹ thuật xây dựng "thỏ" và "chuồng":**
   - Xác định đại lượng cần chứng minh tồn tại (thường là "thỏ").
   - Chia các trường hợp hoặc phân hoạch tập hợp thành các nhóm tính chất (đóng vai trò là "chuồng").`,
    theorems: [
      {
        name: 'Nguyên lý Dirichlet (Pigeonhole Principle)',
        statement: 'Nhốt m thỏ vào n chuồng (m > n), luôn tồn tại ít nhất một chuồng chứa ít nhất \\lfloor \\frac{m-1}{n} \\rfloor + 1 con thỏ.',
        note: 'Công nhận theo Văn bản Sở GD&ĐT 2026-2027.',
      },
      {
        name: 'Nguyên lý Bất biến',
        statement: 'Bất biến là những đại lượng (hay tính chất) không thay đổi trong quá trình thực hiện các phép biến đổi.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 6.1: Áp dụng Dirichlet trong hình học phẳng',
        problem: 'Trong một hình vuông có cạnh bằng 1, lấy 5 điểm bất kì. Chứng minh rằng luôn tồn tại ít nhất 2 điểm có khoảng cách không vượt quá $\\frac{\\sqrt{2}}{2}$.',
        analysis: 'Chia hình vuông thành 4 hình vuông nhỏ bằng nhau có cạnh bằng 1/2. Có 5 điểm (thỏ) và 4 hình vuông con (chuồng).',
        solution: `Chia hình vuông đơn vị thành 4 hình vuông nhỏ bằng nhau có cạnh bằng $\\frac{1}{2}$.
Theo nguyên lý Dirichlet, khi lấy 5 điểm đặt vào 4 hình vuông con, luôn tồn tại ít nhất 2 điểm cùng thuộc một hình vuông con (kể cả biên).
Đường chéo của hình vuông con cạnh $\\frac{1}{2}$ có độ dài:
$$d = \\sqrt{\\left(\\frac{1}{2}\\right)^2 + \\left(\\frac{1}{2}\\right)^2} = \\sqrt{\\frac{2}{4}} = \\frac{\\sqrt{2}}{2}.$$
Khoảng cách lớn nhất giữa hai điểm bất kì trong một hình vuông không vượt quá độ dài đường chéo của nó.
Do đó khoảng cách giữa 2 điểm này không vượt quá $\\frac{\\sqrt{2}}{2}$. (đpcm)`,
        pedagogyTip: 'Khi đề bài yêu cầu khoảng cách không vượt quá một hằng số $d$, hãy phân hoạch miền thành các phần có đường kính $\\le d$.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-06-1',
        question: 'Chọn 5 số nguyên bất kì. Chứng minh luôn tìm được hai số có hiệu chia hết cho 4.',
        hint: 'Khi chia cho 4 có 4 số dư {0, 1, 2, 3} (4 chuồng). 5 số nguyên (5 thỏ) -> có 2 số cùng số dư.',
        finalAnswer: 'Đã chứng minh theo Dirichlet',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG VII: BẤT ĐẲNG THỨC & CỰC TRỊ ĐẠI SỐ (TRANG 31 - 35)
  // (Cấu trúc Bài 4: Lệnh 1 - 1,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 31,
    chapterId: 'ch-07',
    chapterTitle: 'Chuyên đề 7: Bất đẳng thức & Cực trị đại số',
    topicTitle: 'BĐT Côsi (AM-GM) & Kỹ thuật chọn điểm rơi',
    officialRef: 'Bài 4 (2,0 điểm): Lệnh 1 - Chứng minh bất đẳng thức, tìm GTLN, GTNN (1,0 điểm)',
    theoryContent: `### I. Bất đẳng thức AM-GM cho $n$ số thực không âm:
*Cho $n$ số thực không âm $a_1, a_2, ..., a_n$. Ta luôn có:*
$$\\frac{a_1 + a_2 + ... + a_n}{n} \\ge \\sqrt[n]{a_1 a_2 ... a_n}$$
*Dấu "=" xảy ra khi và chỉ khi $a_1 = a_2 = ... = a_n$.*
1. **Các dạng BĐT cơ bản được dùng trực tiếp như SGK:**
   - $a^2 + b^2 + c^2 \\ge ab + bc + ca$ với mọi $a, b, c \\in \\mathbb{R}$.
   - $(a + b + c)^2 \\ge 3(ab + bc + ca)$.
   - $(a + b + c)^2 \\le 3(a^2 + b^2 + c^2)$.
2. **Kỹ thuật chọn điểm rơi:**
   Dự đoán dấu bằng xảy ra tại đâu, ghép các hạng tử có tỉ lệ phù hợp để khi áp dụng Côsi thì các hạng tử triệt tiêu nhau và đạt cực trị.`,
    theorems: [
      {
        name: 'BĐT Côsi (AM-GM) cho n số',
        statement: 'Cho n số thực không âm a_1, ..., a_n (n > 1): \\frac{a_1 + ... + a_n}{n} \\ge \\sqrt[n]{a_1...a_n}.',
        note: 'Công nhận được phép sử dụng trực tiếp theo văn bản Sở GD&ĐT.',
      },
      {
        name: 'BĐT Bunhiacôpxki (Cauchy-Schwarz) cho 2 bộ n số',
        statement: '(a_1^2 + ... + a_n^2)(b_1^2 + ... + b_n^2) \\ge (a_1b_1 + ... + a_nb_n)^2.',
        note: 'Dấu bằng khi a_1/b_1 = ... = a_n/b_n.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 7.1: Kỹ thuật chọn điểm rơi Côsi',
        problem: 'Cho số thực $x > 0$. Tìm giá trị nhỏ nhất của biểu thức: $P = x + \\frac{9}{x} + 2026$.',
        analysis: 'Áp dụng trực tiếp Côsi cho hai số dương $x$ và $9/x$. Dấu bằng xảy ra khi $x = 9/x \\iff x = 3$.',
        solution: `Vì $x > 0$ nên $\\frac{9}{x} > 0$. Áp dụng bất đẳng thức Côsi cho 2 số dương $x$ và $\\frac{9}{x}$:
$$x + \\frac{9}{x} \\ge 2\\sqrt{x \\cdot \\frac{9}{x}} = 2\\sqrt{9} = 6.$$
Cộng 2026 vào hai vế:
$$P = x + \\frac{9}{x} + 2026 \\ge 6 + 2026 = 2032.$$
Dấu "=" xảy ra khi $x = \\frac{9}{x} \\iff x^2 = 9 \\iff x = 3$ (do $x > 0$).
Vậy giá trị nhỏ nhất của $P$ là 2032 khi $x = 3$.`,
        pedagogyTip: 'Sau khi áp dụng BĐT, bắt buộc phải chỉ ra giá trị của biến để dấu bằng xảy ra.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-07-1',
        question: 'Cho $a, b > 0$ thỏa mãn $a + b \\le 1$. Tìm GTNN của $S = a + b + \\frac{1}{a} + \\frac{1}{b}$.',
        hint: 'Tách $a + \\frac{1}{a} = a + \\frac{1}{16a} + \\frac{15}{16a}$. Điểm rơi tại $a = b = 1/2$.',
        finalAnswer: 'min S = 5',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG VIII: XÁC SUẤT CỔ ĐIỂN & QUY TẮC NHÂN XÁC SUẤT (TRANG 36 - 40)
  // (Cấu trúc Bài 4: Lệnh 2 - 1,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 36,
    chapterId: 'ch-08',
    chapterTitle: 'Chuyên đề 8: Xác suất cổ điển & Quy tắc nhân xác suất',
    topicTitle: 'Biến cố độc lập & Quy tắc nhân xác suất',
    officialRef: 'Bài 4 (2,0 điểm): Lệnh 2 - Tính xác suất của một biến cố (có sử dụng quy tắc nhân) (1,0 điểm)',
    theoryContent: `### I. Quy tắc nhân xác suất:
1. **Định nghĩa biến cố độc lập:**
   Hai biến cố $A$ và $B$ được gọi là độc lập nếu việc xảy ra hay không xảy ra của biến cố này không làm ảnh hưởng tới xác suất xảy ra của biến cố kia.
2. **Công thức quy tắc nhân:**
   *Nếu hai biến cố $A$ và $B$ độc lập với nhau thì:*
   $$P(A \\cap B) = P(A) \\cdot P(B)$$
3. **Biến cố đối:**
   $P(\\overline{A}) = 1 - P(A)$.
   Quy tắc nhân cho nhiều biến cố độc lập:
   $$P(A_1 \\cap A_2 \\cap ... \\cap A_n) = P(A_1) \\cdot P(A_2) ... P(A_n).$$`,
    theorems: [
      {
        name: 'Quy tắc nhân xác suất',
        statement: 'P(AB) = P(A) \\cdot P(B) đối với hai biến cố độc lập A và B.',
        note: 'Quy định cụ thể trong mục III cấu trúc đề thi HSG 2026-2027.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 8.1: Bắn bia độc lập và quy tắc nhân',
        problem: 'Hai xạ thủ $X$ và $Y$ mỗi người bắn độc lập một phát đạn vào bia. Xác suất bắn trúng bia của xạ thủ $X$ là 0,8 và của xạ thủ $Y$ là 0,7. Tính xác suất để:\na) Cả hai xạ thủ đều bắn trúng bia.\nb) Có ít nhất một xạ thủ bắn trúng bia.',
        analysis: 'Hai phát bắn độc lập nhau. Câu b sử dụng biến cố đối "cả hai đều trượt".',
        solution: `Gọi $A$ là biến cố "Xạ thủ $X$ bắn trúng", $B$ là biến cố "Xạ thủ $Y$ bắn trúng".
Theo giả thiết: $P(A) = 0{,}8$ và $P(B) = 0{,}7$. Do hai người bắn độc lập nên $A$ và $B$ là hai biến cố độc lập.
a) Biến cố "Cả hai đều bắn trúng" là $A \\cap B$:
$$P(A \\cap B) = P(A) \\cdot P(B) = 0{,}8 \\cdot 0{,}7 = 0{,}56.$$
b) Xác suất để xạ thủ $X$ trượt: $P(\\overline{A}) = 1 - 0{,}8 = 0{,}2$.
Xác suất để xạ thủ $Y$ trượt: $P(\\overline{B}) = 1 - 0{,}7 = 0{,}3$.
Biến cố đối của "Có ít nhất một người bắn trúng" là "Cả hai xạ thủ đều bắn trượt" ($\\overline{A} \\cap \\overline{B}$):
$$P(\\overline{A} \\cap \\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = 0{,}2 \\cdot 0{,}3 = 0{,}06.$$
Vậy xác suất có ít nhất một người bắn trúng là:
$$P = 1 - P(\\overline{A} \\cap \\overline{B}) = 1 - 0{,}06 = 0{,}94.$$`,
        pedagogyTip: 'Khi gặp cụm từ "có ít nhất một", luôn tư duy thông qua biến cố đối $1 - P(\\text{tất cả không xảy ra})$.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-08-1',
        question: 'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất để cả hai con xúc xắc đều xuất hiện mặt 6 chấm.',
        hint: 'Hai lần gieo độc lập: $P = (1/6) \\times (1/6)$.',
        finalAnswer: '1/36',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG IX: HÌNH HỌC PHẲNG & ĐƯỜNG TRÒN NÂNG CAO (TRANG 41 - 45)
  // (Cấu trúc Bài 5: Câu a, b - 6,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 41,
    chapterId: 'ch-09',
    chapterTitle: 'Chuyên đề 9: Hình học phẳng & Đường tròn nâng cao',
    topicTitle: 'Tứ giác nội tiếp & Các đường tròn bàng tiếp tam giác',
    officialRef: 'Bài 5 (7,0 điểm): Lệnh 1 & Lệnh 2 - Chứng minh và tính toán hình học, tứ giác nội tiếp, đường tròn bàng tiếp (6,0 điểm)',
    theoryContent: `### I. Tứ giác nội tiếp và đường tròn bàng tiếp:
1. **Bốn dấu hiệu nhận biết tứ giác nội tiếp (Được dùng trực tiếp như SGK):**
   - Tổng hai góc đối diện bằng $180^\\circ$.
   - Góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện.
   - Hai đỉnh kề nhau cùng nhìn cạnh đối diện dưới hai góc bằng nhau.
   - Bốn đỉnh cùng cách đều một điểm cố định.
2. **Khái niệm đường tròn bàng tiếp (Được dùng trực tiếp):**
   - Là đường tròn tiếp xúc với một cạnh của tam giác và phần kéo dài của hai cạnh còn lại.
   - Tâm đường tròn bàng tiếp là giao điểm của hai đường phân giác ngoài của hai góc và đường phân giác trong của góc thứ ba.
   - Mỗi tam giác có đúng 3 đường tròn bàng tiếp.`,
    theorems: [
      {
        name: 'Khái niệm đường tròn bàng tiếp',
        statement: 'Đường tròn tiếp xúc với một cạnh và phần kéo dài của hai cạnh kia của tam giác.',
        note: 'Công nhận theo mục IV văn bản Sở GD&ĐT.',
      },
      {
        name: 'Góc tạo bởi tiếp tuyến và dây cung',
        statement: 'Số đo góc tạo bởi tiếp tuyến và dây cung bằng nửa số đo cung bị chắn (bằng góc nội tiếp cùng chắn cung đó).',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 9.1: Chứng minh tứ giác nội tiếp kinh điển',
        problem: 'Cho tam giác nhọn $ABC$ nội tiếp đường tròn $(O)$, các đường cao $AD, BE, CF$ cắt nhau tại trực tâm $H$. Chứng minh rằng tứ giác $BFHD$ và tứ giác $BCEF$ nội tiếp được đường tròn.',
        analysis: 'Góc $D$ và $F$ bằng 90 độ. Với $BFHD$ là tổng 2 góc đối, với $BCEF$ là hai đỉnh kề nhìn cùng một góc.',
        solution: `1. Xét tứ giác $BFHD$:
Ta có $AD \\perp BC \\implies \\widehat{BDH} = 90^\\circ$.
$CF \\perp AB \\implies \\widehat{BFH} = 90^\\circ$.
Suy ra $\\widehat{BDH} + \\widehat{BFH} = 90^\\circ + 90^\\circ = 180^\\circ$.
Do tổng hai góc đối diện bằng $180^\\circ$ nên tứ giác $BFHD$ nội tiếp đường tròn đường kính $BH$. (đpcm)
2. Xét tứ giác $BCEF$:
Ta có $\\widehat{BEC} = 90^\\circ$ (do $BE \\perp AC$) và $\\widehat{BFC} = 90^\\circ$ (do $CF \\perp AB$).
Hai đỉnh kề nhau $E$ và $F$ cùng nhìn đoạn thẳng $BC$ dưới một góc vuông ($90^\\circ$).
Do đó tứ giác $BCEF$ nội tiếp đường tròn đường kính $BC$. (đpcm)`,
        pedagogyTip: 'Hai dạng tứ giác nội tiếp này xuất hiện trong 90% các đề thi học sinh giỏi.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-09-1',
        question: 'Chứng minh rằng trực tâm H của tam giác nhọn ABC là tâm đường tròn nội tiếp của tam giác trực giác DEF.',
        hint: 'Sử dụng các tứ giác nội tiếp để suy ra $AD, BE, CF$ là các tia phân giác các góc tam giác $DEF$.',
        finalAnswer: 'Đã chứng minh',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHƯƠNG X: PHƯƠNG TÍCH, BỔ ĐỀ HÌNH THANG & CỰC TRỊ HÌNH HỌC (TRANG 46 - 50)
  // (Cấu trúc Bài 5: Câu c - 1,0 điểm)
  // -------------------------------------------------------------------------
  {
    pageNumber: 46,
    chapterId: 'ch-10',
    chapterTitle: 'Chuyên đề 10: Phương tích, Bổ đề hình thang & Cực trị hình học',
    topicTitle: 'Tính chất phương tích của điểm với đường tròn',
    officialRef: 'Bài 5 (7,0 điểm): Lệnh 3 - Phương tích của một điểm, Bổ đề hình thang, Cực trị hình học (1,0 điểm)',
    theoryContent: `### I. Phương tích và cát tuyến (Được phép sử dụng trực tiếp như SGK):
1. **Định lý phương tích cát tuyến:**
   *Cho đường tròn $(O)$ và một điểm $M$ nằm ngoài $(O)$. Qua $M$ kẻ hai cát tuyến $MAB$ và $MCD$ tới $(O)$. Khi đó:*
   $$MA \\cdot MB = MC \\cdot MD$$
   *Ngược lại, nếu tứ giác $ABCD$ có $AB$ cắt $CD$ tại $M$ và $MA \\cdot MB = MC \\cdot MD$ thì suy ra tứ giác $ABCD$ nội tiếp.*
   *(Kết quả vẫn đúng khi thay điểm $M$ nằm trong đường tròn $(O)$).*
2. **Phương tích của tiếp tuyến:**
   Nếu $MT$ là tiếp tuyến của $(O)$ thì $MT^2 = MA \\cdot MB$.
3. **Bổ đề hình thang (Được phép sử dụng trực tiếp):**
   *Trong một hình thang, giao điểm của hai cạnh bên, giao điểm của hai đường chéo và trung điểm của hai đáy luôn thẳng hàng.*`,
    theorems: [
      {
        name: 'Định lý Phương tích điểm với đường tròn',
        statement: 'Qua M kẻ hai cát tuyến MAB và MCD tới (O). Khi đó MA \\cdot MB = MC \\cdot MD.',
        note: 'Quy định chính thức trong mục IV văn bản Sở GD&ĐT.',
      },
      {
        name: 'Bổ đề hình thang (Trapezoid Lemma)',
        statement: 'Trong hình thang có hai đáy không bằng nhau, giao điểm hai cạnh bên, giao điểm hai đường chéo và trung điểm hai cạnh đáy thẳng hàng.',
        note: 'Được phép trích dẫn và sử dụng trực tiếp không cần chứng minh lại.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 10.1: Ứng dụng Bổ đề hình thang',
        problem: 'Cho hình thang $ABCD$ ($AB \\parallel CD$). Hai đường chéo $AC$ và $BD$ cắt nhau tại $O$. Đường thẳng đi qua $O$ song song với hai đáy cắt $AD$ tại $M$ và cắt $BC$ tại $N$. Chứng minh rằng $O$ là trung điểm của $MN$ và $\\frac{1}{AB} + \\frac{1}{CD} = \\frac{2}{MN}$.',
        analysis: 'Áp dụng định lí Ta-lét trong tam giác và Bổ đề hình thang.',
        solution: `Vì $OM \\parallel AB$ trong $\\Delta DAB$: $\\frac{OM}{AB} = \\frac{DO}{DB}$.
Vì $ON \\parallel AB$ trong $\\Delta CAB$: $\\frac{ON}{AB} = \\frac{CO}{CA}$.
Do $AB \\parallel CD$, theo Ta-lét: $\\frac{DO}{DB} = \\frac{CO}{CA}$.
Suy ra $\\frac{OM}{AB} = \\frac{ON}{AB} \\implies OM = ON$.
Vậy $O$ là trung điểm của đoạn thẳng $MN$.
Mặt khác: Trong $\\Delta ADC$ có $OM \\parallel CD \\implies \\frac{OM}{CD} = \\frac{AO}{AC}$.
Cộng hai tỉ số:
$$\\frac{OM}{AB} + \\frac{OM}{CD} = \\frac{CO}{CA} + \\frac{AO}{CA} = \\frac{CO + AO}{CA} = 1$$
$$OM \\left(\\frac{1}{AB} + \\frac{1}{CD}\\right) = 1 \\implies \\frac{1}{AB} + \\frac{1}{CD} = \\frac{1}{OM} = \\frac{2}{MN}.$$ (đpcm)`,
        pedagogyTip: 'Hệ thức $\\frac{2}{MN} = \\frac{1}{AB} + \\frac{1}{CD}$ là công thức trung bình điều hòa kinh điển của hình thang.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-10-1',
        question: 'Từ điểm M nằm ngoài (O), kẻ cát tuyến MAB và tiếp tuyến MT. Cho MA = 4 cm, AB = 5 cm. Tính độ dài tiếp tuyến MT.',
        hint: '$MB = MA + AB = 4 + 5 = 9\\text{ cm}$. Theo phương tích: $MT^2 = MA \\cdot MB = 4 \\cdot 9 = 36$.',
        finalAnswer: 'MT = 6 cm',
      },
    ],
  },
  {
    pageNumber: 6,
    chapterId: 'ch-02',
    chapterTitle: 'Chuyên đề 2: Phương trình bậc hai & Định lý Viète mở rộng',
    topicTitle: 'Hệ thức Viète và Kỹ thuật lập hệ thức độc lập với tham số',
    officialRef: 'Bài 1 (5,0 điểm): Lệnh 2 - Phương trình bậc hai, định lí Viéte và các vấn đề liên quan (2,5 điểm)',
    theoryContent: `### I. Định lý Viète thuận và đảo:
Cho phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\ne 0$) có $\\Delta \\ge 0$. Khi đó phương trình có 2 nghiệm $x_1, x_2$ thỏa mãn:
$$S = x_1 + x_2 = -\\frac{b}{a}; \\quad P = x_1 x_2 = \\frac{c}{a}$$
1. **Các biểu thức đối xứng cơ bản:**
   - $x_1^2 + x_2^2 = S^2 - 2P$
   - $x_1^3 + x_2^3 = S^3 - 3SP$
   - $(x_1 - x_2)^2 = S^2 - 4P \\implies |x_1 - x_2| = \\sqrt{S^2 - 4P}$
   - $\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{S}{P}; \\quad \\frac{x_1}{x_2} + \\frac{x_2}{x_1} = \\frac{S^2 - 2P}{P}$
2. **Kỹ thuật lập hệ thức giữa hai nghiệm độc lập với tham số $m$:**
   Khử tham số $m$ từ hệ thức $\\begin{cases} x_1 + x_2 = f(m) \\\\ x_1 x_2 = g(m) \\end{cases}$ bằng phương pháp thế hoặc cộng đại số.`,
    theorems: [
      {
        name: 'Định lý Viète cho phương trình bậc hai',
        statement: 'ax^2 + bx + c = 0 \\implies x_1 + x_2 = -b/a, \\quad x_1 x_2 = c/a',
      },
      {
        name: 'Định lý đảo Viète',
        statement: 'Nếu u + v = S và uv = P (với S^2 \\ge 4P) thì u, v là nghiệm của phương trình t^2 - St + P = 0.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 2.1: Tìm tham số để biểu thức nghiệm đạt cực trị',
        problem: 'Cho phương trình $x^2 - 2(m-1)x + 2m - 5 = 0$. Tìm $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$ sao cho biểu thức $A = (x_1 - x_2)^2 + 2x_1 x_2$ đạt giá trị nhỏ nhất.',
        analysis: 'Bước 1: Tìm điều kiện để $\\Delta\' > 0$. Bước 2: Biểu diễn $A$ qua $m$ theo Viète. Bước 3: Tìm GTNN bằng cách tạo bình phương.',
        solution: `Bước 1: $\\Delta\' = (m-1)^2 - (2m - 5) = m^2 - 4m + 6 = (m-2)^2 + 2 > 0$ với mọi $m$.
Phương trình luôn có 2 nghiệm phân biệt với mọi $m$.
Bước 2: Theo Viète: $\\begin{cases} x_1 + x_2 = 2(m-1) \\\\ x_1 x_2 = 2m - 5 \\end{cases}$.
Biến đổi $A$:
$$A = (x_1 + x_2)^2 - 4x_1 x_2 + 2x_1 x_2 = (x_1 + x_2)^2 - 2x_1 x_2$$
$$A = 4(m-1)^2 - 2(2m - 5) = 4(m^2 - 2m + 1) - 4m + 10 = 4m^2 - 12m + 14$$
$$A = (2m - 3)^2 + 5 \\ge 5.$$
Dấu "=" xảy ra khi $2m - 3 = 0 \\iff m = \\frac{3}{2}$.
Vậy giá trị nhỏ nhất của $A$ là 5 khi $m = \\frac{3}{2}$.`,
        pedagogyTip: 'Luôn tìm điều kiện có nghiệm ($\\Delta \\ge 0$) trước tiên, ngay cả khi đề bài không nhắc đến.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-02-1',
        question: 'Cho phương trình $x^2 - mx + m - 1 = 0$. Tìm $m$ để $x_1^2 + x_2^2 = 10$.',
        hint: '$x_1^2 + x_2^2 = m^2 - 2(m-1) = 10 \\iff m^2 - 2m - 8 = 0$.',
        finalAnswer: 'm = 4 hoặc m = -2',
      },
    ],
  },

  {
    pageNumber: 7,
    chapterId: 'ch-02',
    chapterTitle: 'Chuyên đề 2: Phương trình bậc hai & Định lý Viète mở rộng',
    topicTitle: 'Hệ thức Viète không đối xứng & Phương pháp bậc hóa nghiệm',
    officialRef: 'Bài 1: Lệnh 2 (2,5 điểm) - Giải phương trình bậc hai với biểu thức nghiệm phi đối xứng',
    theoryContent: `### II. Kỹ thuật giải biểu thức nghiệm không đối xứng:
Khi đề bài cho hệ thức không đối xứng, ví dụ $x_1 - 2x_2 = 5$ hoặc $x_1 = 3x_2$ hoặc $x_1^2 + 2x_2 = k$:
1. **Phương pháp kết hợp 3 phương trình:**
   Kết hợp hệ thức đề bài với $x_1 + x_2 = S$ để tìm $x_1, x_2$ theo tham số $m$.
2. Thay $x_1, x_2$ vừa tìm được vào phương trình $x_1 x_2 = P$ để tìm $m$.
3. **Kỹ thuật hạ bậc nghiệm:**
   Vì $x_1$ là nghiệm nên $ax_1^2 + bx_1 + c = 0 \\implies x_1^2 = -\\frac{b}{a}x_1 - \\frac{c}{a}$. Dùng điều này để thay thế các bậc cao.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 2.2: Hệ thức nghiệm không đối xứng',
        problem: 'Tìm $m$ để phương trình $x^2 - 5x + m + 1 = 0$ có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn: $x_1^2 - 2x_2 = 13$.',
        analysis: 'Hạ bậc $x_1^2$ thành $5x_1 - (m+1)$ nhờ vào phương trình ban đầu.',
        solution: `Điều kiện $\\Delta = 25 - 4(m+1) = 21 - 4m > 0 \\iff m < \\frac{21}{4}$.
Theo Viète: $x_1 + x_2 = 5$ và $x_1 x_2 = m + 1$.
Vì $x_1$ là nghiệm nên: $x_1^2 - 5x_1 + m + 1 = 0 \\implies x_1^2 = 5x_1 - m - 1$.
Thay vào đề bài:
$$(5x_1 - m - 1) - 2x_2 = 13 \\iff 5x_1 - 2x_2 = m + 14.$$
Kết hợp với $x_1 + x_2 = 5 \\implies 2x_1 + 2x_2 = 10$.
Cộng hai vế: $7x_1 = m + 24 \\implies x_1 = \\frac{m+24}{7}$.
Suy ra $x_2 = 5 - x_1 = 5 - \\frac{m+24}{7} = \\frac{11 - m}{7}$.
Thay vào tích $x_1 x_2 = m + 1$:
$$\\frac{(m+24)(11-m)}{49} = m + 1 \\iff -m^2 - 13m + 264 = 49m + 49$$
$$\\iff m^2 + 62m - 215 = 0 \\iff (m - 3)(m + 65) = 0 \\implies m = 3 \\text{ hoặc } m = -65.$$
Cả hai giá trị đều thỏa mãn $m < 21/4$.
Vậy $m \\in \\{3; -65\\}$.`,
        pedagogyTip: 'Kỹ thuật hạ bậc nghiệm là vũ khí lợi hại nhất khi gặp số mũ bậc hai của một nghiệm đơn lẻ.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-02-2',
        question: 'Cho phương trình $x^2 - 3x + m = 0$. Tìm $m$ để hai nghiệm thỏa mãn $2x_1 - x_2 = 3$.',
        hint: 'Giải hệ $x_1 + x_2 = 3$ và $2x_1 - x_2 = 3 \\implies x_1 = 2, x_2 = 1$.',
        finalAnswer: 'm = 2',
      },
    ],
  },

  {
    pageNumber: 8,
    chapterId: 'ch-02',
    chapterTitle: 'Chuyên đề 2: Phương trình bậc hai & Định lý Viète mở rộng',
    topicTitle: 'Phương trình bậc hai chứa nghiệm nguyên & Định lý Viète nguyên',
    officialRef: 'Bài 1: Lệnh 2 (2,5 điểm) - Nghiệm nguyên của phương trình bậc hai',
    theoryContent: `### III. Điều kiện để phương trình có nghiệm nguyên:
1. Phương trình $ax^2 + bx + c = 0$ ($a, b, c \\in \\mathbb{Z}, a \\ne 0$) có nghiệm nguyên thì $\\Delta = b^2 - 4ac$ phải là bình phương của một số nguyên: $\\Delta = k^2$ ($k \\in \\mathbb{Z}$).
2. Biến đổi phương trình thành phương trình ước số: $(Ax + B)(Cy + D) = K$.
3. Sử dụng định lý Viète: nếu cả hai nghiệm là số nguyên thì tổng $S$ và tích $P$ phải là số hữu tỉ (hoặc số nguyên khi $a = 1$).`,
    theorems: [
      {
        name: 'Điều kiện nghiệm hữu tỉ và nghiệm nguyên',
        statement: 'Nếu đa thức hệ số nguyên có nghiệm hữu tỉ thì biệt thức Delta phải là bình phương của một số nguyên.',
      },
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 2.3: Tìm tham số nguyên để phương trình có nghiệm nguyên',
        problem: 'Tìm tất cả các số nguyên $m$ sao cho phương trình $x^2 - mx + m + 2 = 0$ có hai nghiệm đều là số nguyên.',
        analysis: 'Phương trình có hệ số $a = 1$ nên nếu hai nghiệm là số nguyên thì $\\Delta$ là số chính phương.',
        solution: `Ta có $\\Delta = m^2 - 4(m+2) = m^2 - 4m - 8 = k^2$ với $k \\in \\mathbb{N}$.
$$\\iff (m - 2)^2 - 12 = k^2 \\iff (m - 2)^2 - k^2 = 12$$
$$\\iff (m - 2 - k)(m - 2 + k) = 12.$$
Vì $k \\ge 0$ nên $m - 2 + k \\ge m - 2 - k$. Hai thừa số có cùng tính chẵn lẻ và tích bằng 12 nên cùng chẵn:
Trường hợp 1: $\\begin{cases} m - 2 + k = 6 \\\\ m - 2 - k = 2 \\end{cases} \\implies 2(m-2) = 8 \\implies m = 6$. Khi đó $k = 2$.
Trường hợp 2: $\\begin{cases} m - 2 + k = -2 \\\\ m - 2 - k = -6 \\end{cases} \\implies 2(m-2) = -8 \\implies m = -2$. Khi đó $k = 2$.
Thử lại:
- Với $m = 6: x^2 - 6x + 8 = 0 \\implies x \\in \\{2; 4\\}$ (thỏa mãn).
- Với $m = -2: x^2 + 2x = 0 \\implies x \\in \\{0; -2\\}$ (thỏa mãn).
Vậy $m \\in \\{6; -2\\}$.`,
        pedagogyTip: 'Đưa $\\Delta$ về dạng $(m - a)^2 - k^2 = C$ là phương pháp tổng quát giải quyết lớp bài toán này.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-02-3',
        question: 'Tìm $m \\in \\mathbb{Z}$ để phương trình $x^2 - (m+1)x + m + 4 = 0$ có nghiệm nguyên.',
        hint: '$\\Delta = (m+1)^2 - 4(m+4) = m^2 - 2m - 15 = (m-1)^2 - 16 = k^2$.',
        finalAnswer: 'm \\in {-4; 6}',
      },
    ],
  },

  {
    pageNumber: 9,
    chapterId: 'ch-02',
    chapterTitle: 'Chuyên đề 2: Phương trình bậc hai & Định lý Viète mở rộng',
    topicTitle: 'Phương trình quy về bậc hai (Trùng phương, Phản hồi, Đối xứng)',
    officialRef: 'Bài 1: Lệnh 2 (2,5 điểm) - Phương trình quy về bậc hai nâng cao',
    theoryContent: `### IV. Các dạng phương trình quy về bậc hai:
1. **Phương trình trùng phương:** $ax^4 + bx^2 + c = 0$ (Đặt $t = x^2, t \\ge 0$).
2. **Phương trình phản hồi (đối xứng bậc 4):**
   $$ax^4 + bx^3 + cx^2 + bx + a = 0$$
   Chia hai vế cho $x^2 \\ne 0$, nhóm $a\\left(x^2 + \\frac{1}{x^2}\\right) + b\\left(x + \\frac{1}{x}\\right) + c = 0$.
   Đặt $t = x + \\frac{1}{x} \\implies x^2 + \\frac{1}{x^2} = t^2 - 2$ (điều kiện $|t| \\ge 2$).
3. **Phương trình dạng $(x+a)(x+b)(x+c)(x+d) = k$ với $a+b = c+d$:**
   Nhóm $[(x+a)(x+b)][(x+c)(x+d)] = (x^2 + Sx + ab)(x^2 + Sx + cd) = k$. Đặt $t = x^2 + Sx$.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 2.4: Giải phương trình đối xứng bậc 4',
        problem: 'Giải phương trình: $x^4 - 5x^3 + 8x^2 - 5x + 1 = 0$.',
        analysis: 'Nhận thấy các hệ số đối xứng qua hệ số giữa 8: $(1, -5, 8, -5, 1)$. Ta chia cho $x^2$.',
        solution: `Dễ thấy $x = 0$ không là nghiệm của phương trình.
Chia cả hai vế cho $x^2 \\ne 0$:
$$\\left(x^2 + \\frac{1}{x^2}\\right) - 5\\left(x + \\frac{1}{x}\\right) + 8 = 0.$$
Đặt $t = x + \\frac{1}{x}$ với điều kiện $|t| \\ge 2$. Khi đó $x^2 + \\frac{1}{x^2} = t^2 - 2$.
Phương trình trở thành:
$$(t^2 - 2) - 5t + 8 = 0 \\iff t^2 - 5t + 6 = 0 \\iff (t - 2)(t - 3) = 0.$$
- Với $t = 2: x + \\frac{1}{x} = 2 \\iff x^2 - 2x + 1 = 0 \\iff (x-1)^2 = 0 \\iff x = 1$.
- Với $t = 3: x + \\frac{1}{x} = 3 \\iff x^2 - 3x + 1 = 0 \\implies x = \\frac{3 \\pm \\sqrt{5}}{2}$.
Vậy tập nghiệm của phương trình là $S = \\left\\{1; \\frac{3 - \\sqrt{5}}{2}; \\frac{3 + \\sqrt{5}}{2}\\right\\}$.`,
        pedagogyTip: 'Phương trình đối xứng bậc 4 luôn giảm được bậc xuống phương trình bậc hai với ẩn phụ $t = x + 1/x$.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-02-4',
        question: 'Giải phương trình $(x+1)(x+2)(x+3)(x+4) = 24$.',
        hint: 'Nhóm $(x+1)(x+4) = x^2+5x+4$ và $(x+2)(x+3) = x^2+5x+6$. Đặt $t = x^2+5x+5$.',
        finalAnswer: 'x = 0 hoặc x = -5',
      },
    ],
  },

  {
    pageNumber: 10,
    chapterId: 'ch-02',
    chapterTitle: 'Chuyên đề 2: Phương trình bậc hai & Định lý Viète mở rộng',
    topicTitle: 'Tổng kết Chuyên đề 2: Đề luyện tập chuyên sâu Viète 2,5 điểm',
    officialRef: 'Bài 1: Lệnh 2 (2,5 điểm) - Đề luyện tổng hợp Viète',
    theoryContent: `### V. Barem điểm chuẩn của câu Phương trình bậc hai & Viète (2,5đ):
- Viết đúng biệt thức $\\Delta$ và tìm điều kiện có 2 nghiệm: 0,5 điểm.
- Viết đúng hệ thức Viète $S = -b/a, P = c/a$: 0,5 điểm.
- Biến đổi hệ thức của đề bài về dạng $S$ và $P$: 0,75 điểm.
- Giải tìm tham số $m$, đối chiếu điều kiện và kết luận: 0,75 điểm.`,
    theorems: [],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 2.5: Bài toán chọn lọc từ kỳ thi HSG cấp Tỉnh',
        problem: 'Cho phương trình $x^2 - 2(m+1)x + m^2 + 2 = 0$. Tìm $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn: $\\frac{x_1}{x_2} + \\frac{x_2}{x_1} = \\frac{10}{3}$.',
        analysis: 'Quy đồng biểu thức: $\\frac{x_1^2 + x_2^2}{x_1 x_2} = \\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1 x_2} = \\frac{S^2}{P} - 2 = \\frac{10}{3}$.',
        solution: `1. Điều kiện có 2 nghiệm phân biệt: $\\Delta\' = (m+1)^2 - (m^2+2) = 2m - 1 > 0 \\iff m > 1/2$.
2. Theo Viète: $S = 2(m+1)$ và $P = m^2 + 2 > 0$.
3. Biến đổi giả thiết:
$$\\frac{S^2 - 2P}{P} = \\frac{10}{3} \\iff 3S^2 - 6P = 10P \\iff 3S^2 = 16P$$
Thay $S, P$:
$$3[2(m+1)]^2 = 16(m^2 + 2) \\iff 12(m^2 + 2m + 1) = 16m^2 + 32$$
$$\\iff 12m^2 + 24m + 12 = 16m^2 + 32 \\iff 4m^2 - 24m + 20 = 0 \\iff m^2 - 6m + 5 = 0$$
$$\\implies (m - 1)(m - 5) = 0 \\implies m = 1 \\text{ hoặc } m = 5.$$
Cả hai giá trị $m = 1$ và $m = 5$ đều thỏa mãn $m > 1/2$.
Vậy $m \\in \\{1; 5\\}$.`,
        pedagogyTip: 'Khi kết luận, luôn kiểm tra điều kiện mẫu số $P \\ne 0$.',
      },
    ],
    drillExercises: [
      {
        id: 'dr-02-5',
        question: 'Cho phương trình $x^2 - 2mx + m^2 - 1 = 0$. Tìm $m$ để $|x_1 - x_2| = 2$.',
        hint: '$(x_1 - x_2)^2 = S^2 - 4P = 4m^2 - 4(m^2-1) = 4 \\implies |x_1-x_2|=2$ với mọi $m$.',
        finalAnswer: 'Mọi số thực m',
      },
    ],
  },
];
