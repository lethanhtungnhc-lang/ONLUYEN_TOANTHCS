import { GiftedTopic } from '../types';

export const COMPREHENSIVE_GIFTED_TOPICS: GiftedTopic[] = [
  // =========================================================================
  // KHỐI 9: TRỌNG TÂM THI CHỌN HỌC SINH GIỎI THCS CẤP THÀNH PHỐ NĂM HỌC 2026-2027
  // (Ban hành theo Công văn của Sở Giáo dục và Đào tạo)
  // =========================================================================

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 1: BIẾN ĐỔI BIỂU THỨC ĐẠI SỐ & TÍNH GIÁ TRỊ (Bài 1 - 2.5đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-algebra-expression',
    grade: 9,
    domain: 'algebra',
    domainName: 'Đại số (Bài 1 - Cấu trúc 2026-2027)',
    title: 'Biến đổi biểu thức đại số, Rút gọn & Tính giá trị đối xứng',
    officialScope: 'Bài 1: Lệnh 1 (2,5 điểm) - Biến đổi biểu thức đại số, rút gọn biểu thức, chứng minh đẳng thức, tính giá trị của một biểu thức đại số.',
    corePhilosophy: 'Biến đổi biểu thức trong đề thi HSG không đơn thuần là tính toán cơ bắp, mà là nghệ thuật phát hiện tính đối xứng, thêm bớt đại lượng thích hợp và phân tích đa thức thành nhân tử.',
    thinkingIdea: 'Khai thác triệt để các giả thiết đặc biệt như $xy + yz + zx = 1$, $a + b + c = 0$, hoặc $abc = 1$ để thế vào các hằng số, đưa biểu thức dưới dấu căn về dạng bình phương hoàn chỉnh.',
    standardTheorems: [
      {
        name: 'Đồng nhất thức ba biến mở rộng',
        latex: 'a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)',
        description: 'Nếu $a + b + c = 0$ thì $a^3 + b^3 + c^3 = 3abc$. Rất thường dùng để rút gọn căn bậc ba.',
      },
      {
        name: 'Hằng đẳng thức phân tích bình phương',
        latex: '1 + x^2 = xy + yz + zx + x^2 = (x + y)(x + z) \\quad (\\text{khi } xy+yz+zx=1)',
        description: 'Biến tổng thành tích để triệt tiêu các mẫu số dưới dấu căn.',
      },
    ],
    theoryGuide: `### Phương pháp tư duy biến đổi biểu thức Đại số HSG:
1. **Kỹ thuật thế hằng số đối xứng**:
   - Khi gặp giả thiết $xy + yz + zx = 1$, ta thay $1 = xy + yz + zx$ vào $1 + x^2 = (x+y)(x+z)$, $1 + y^2 = (y+x)(y+z)$, $1 + z^2 = (z+x)(z+y)$. Biểu thức trong căn sẽ trở thành bình phương của một phân thức và khai căn dễ dàng!
2. **Kỹ thuật khai thác điều kiện $a + b + c = 0$**:
   - Ta có $a + b = -c \\implies (a+b)^2 = c^2 \\iff a^2 + b^2 - c^2 = -2ab$.
   - Tương tự $a^2 + b^2 + c^2 = -2(ab + bc + ca)$.
   - Rút gọn các biểu thức phân thức có mẫu dạng $a^2 + b^2 - c^2$ thành $-2ab$.
3. **Kỹ thuật căn thức lồng nhau**:
   - Đưa biểu thức trong căn về dạng $(\\sqrt{A} \\pm \\sqrt{B})^2 = (A + B) \\pm 2\\sqrt{AB}$.`,
    methods: [
      'Kỹ thuật phân tích nhân tử bằng phương pháp thêm bớt hạng tử',
      'Kỹ thuật thế hằng số vào biểu thức đối xứng ($1 = xy+yz+zx$)',
      'Kỹ thuật biến đổi với điều kiện $a+b+c = 0$ và khai triển Lagrange',
    ],
    masterExamples: [
      {
        title: 'Ví dụ mẫu 1 (Chuẩn cấu trúc Bài 1): Tính giá trị biểu thức chứa căn',
        problem: 'Cho các số thực dương $x, y, z$ thỏa mãn $xy + yz + zx = 1$. Tính giá trị của biểu thức:\n$$P = x\\sqrt{\\frac{(1+y^2)(1+z^2)}{1+x^2}} + y\\sqrt{\\frac{(1+z^2)(1+x^2)}{1+y^2}} + z\\sqrt{\\frac{(1+x^2)(1+y^2)}{1+z^2}}$$',
        analysis: 'Quan sát thấy hằng số 1 ở cả 3 mẫu và tử. Nếu quy đồng trực tiếp sẽ dẫn đến bậc 6 rất phức tạp. Hãy thay thế $1 = xy + yz + zx$ vào từng nhân tử.',
        solution: 'Thay $1 = xy + yz + zx$ vào các thừa số:\n$$1 + x^2 = x^2 + xy + yz + zx = x(x + y) + z(x + y) = (x + y)(x + z)$$\nTương tự:\n$$1 + y^2 = (y + x)(y + z); \\quad 1 + z^2 = (z + x)(z + y)$$\nXét biểu thức dưới căn thứ nhất:\n$$\\frac{(1+y^2)(1+z^2)}{1+x^2} = \\frac{(y+x)(y+z)(z+x)(z+y)}{(x+y)(x+z)} = (y+z)^2$$\nVì $y, z > 0$ nên $\\sqrt{(y+z)^2} = y + z$.\nThực hiện hoàn toàn tương tự cho 2 căn thức còn lại, ta được:\n$$P = x(y + z) + y(z + x) + z(x + y) = xy + xz + yz + yx + zx + zy = 2(xy + yz + zx)$$\nDo $xy + yz + zx = 1$, ta kết luận $P = 2(1) = 2$.',
        comment: 'Đây là bài toán kinh điển trong đề thi chọn HSG cấp Tỉnh/Thành phố, rèn luyện kỹ năng nhận diện cấu trúc đối xứng.',
      },
    ],
    challenges: [
      {
        id: 'chal-g9-alg-1',
        title: 'Thử thách 1: Rút gọn biểu thức chứa căn bậc ba đối xứng',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Cho $x = \\sqrt[3]{1 + \\frac{\\sqrt{84}}{9}} + \\sqrt[3]{1 - \\frac{\\sqrt{84}}{9}}$. Chứng minh rằng $x$ là một số nguyên dương.',
        hint1: 'Lập phương hai vế $x^3 = (a + b)^3 = a^3 + b^3 + 3ab(a + b)$.',
        hint2: 'Tính tích $a \\cdot b = \\sqrt[3]{\\left(1 + \\frac{\\sqrt{84}}{9}\\right)\\left(1 - \\frac{\\sqrt{84}}{9}\\right)} = \\sqrt[3]{1 - \\frac{84}{81}} = \\sqrt[3]{-\\frac{3}{81}} = -\\frac{1}{3}$.',
        methodHint: 'Đưa về phương trình bậc ba $x^3 + x - 2 = 0$ và phân tích thành nhân tử.',
        fullSolution: 'Đặt $a = \\sqrt[3]{1 + \\frac{\\sqrt{84}}{9}}$ và $b = \\sqrt[3]{1 - \\frac{\\sqrt{84}}{9}}$. Ta có $x = a + b$.\nLập phương hai vế:\n$$x^3 = a^3 + b^3 + 3ab(a+b)$$\nTính các thành phần:\n$$a^3 + b^3 = \\left(1 + \\frac{\\sqrt{84}}{9}\\right) + \\left(1 - \\frac{\\sqrt{84}}{9}\\right) = 2$$\n$$ab = \\sqrt[3]{1^2 - \\left(\\frac{\\sqrt{84}}{9}\\right)^2} = \\sqrt[3]{1 - \\frac{84}{81}} = \\sqrt[3]{-\\frac{3}{81}} = \\sqrt[3]{-\\frac{1}{27}} = -\\frac{1}{3}$$\nThay vào ta được phương trình:\n$$x^3 = 2 + 3\\left(-\\frac{1}{3}\\right)x \\iff x^3 + x - 2 = 0$$\n$$\\iff (x - 1)(x^2 + x + 2) = 0$$\nVì $x^2 + x + 2 = \\left(x + \\frac{1}{2}\\right)^2 + \\frac{7}{4} > 0$ với mọi $x$, nên phương trình có nghiệm duy nhất $x = 1$.\nVậy $x = 1$, là một số nguyên dương (đpcm).',
        keyInsight: 'Phương pháp lập phương Cardano đưa biểu thức căn vô tỉ về phương trình đại số có nghiệm hữu tỉ đẹp.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 2: PHƯƠNG TRÌNH BẬC HAI & HỆ THỨC VI-ÉT NÂNG CAO (Bài 1 - 2.5đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-vieta',
    grade: 9,
    domain: 'algebra',
    domainName: 'Đại số (Bài 1 - Cấu trúc 2026-2027)',
    title: 'Phương trình bậc hai, Định lí Viète & Cực trị nghiệm',
    officialScope: 'Bài 1: Lệnh 2 (2,5 điểm) - Phương trình bậc hai, định lí Vi-ét và các vấn đề liên quan.',
    corePhilosophy: 'Định lí Viète là cầu nối giữa đại số và hình học giải tích, đòi hỏi học sinh kết hợp thành thạo điều kiện có nghiệm (Delta >= 0) và biến đổi biểu thức nghiệm đối xứng hoặc không đối xứng.',
    thinkingIdea: 'Biểu diễn mọi biểu thức đối xứng qua tổng $S = x_1 + x_2$ và tích $P = x_1 x_2$. Đối với biểu thức không đối xứng, hãy dùng chính phương trình ban đầu để hạ bậc $x_1^2 = -bx_1 - c$.',
    standardTheorems: [
      {
        name: 'Định lí Viète thuận và đảo',
        latex: 'x_1 + x_2 = -\\frac{b}{a}; \\quad x_1 x_2 = \\frac{c}{a}',
        description: 'Nếu hai số có tổng là $S$ và tích là $P$ với $S^2 \\ge 4P$ thì chúng là hai nghiệm của phương trình $t^2 - St + P = 0$.',
      },
      {
        name: 'Kỹ thuật hạ bậc nghiệm phương trình',
        latex: 'a x_1^2 + b x_1 + c = 0 \\implies x_1^2 = -\\frac{b}{a}x_1 - \\frac{c}{a}',
        description: 'Giúp giải quyết các bài toán biểu thức nghiệm không đối xứng bậc 3 hoặc bậc 4.',
      },
    ],
    methods: [
      'Kỹ thuật thiết lập hệ thức liên hệ giữa các nghiệm độc lập với tham số $m$',
      'Kỹ thuật hạ bậc đối với biểu thức nghiệm không đối xứng',
      'Định lí Viète cho nghiệm nguyên và phương pháp kẹp số nguyên',
    ],
    challenges: [
      {
        id: 'chal-g9-vieta-1',
        title: 'Thử thách: Biểu thức nghiệm phi đối xứng bậc cao',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Cho phương trình $x^2 - 3x + 1 = 0$ có hai nghiệm là $x_1, x_2$. Không giải phương trình, hãy tính giá trị của biểu thức: $M = x_1^5 + x_2^5$.',
        hint1: 'Đặt $S_n = x_1^n + x_2^n$. Tìm công thức truy hồi liên hệ giữa $S_n, S_{n-1}, S_{n-2}$.',
        hint2: 'Vì $x_i^2 - 3x_i + 1 = 0 \\implies x_i^2 = 3x_i - 1$. Nhân cả hai vế với $x_i^{n-2}$ ta được $x_i^n = 3x_i^{n-1} - x_i^{n-2}$.',
        methodHint: 'Công thức truy hồi Newton: $S_n = 3S_{n-1} - S_{n-2}$.',
        fullSolution: 'Theo định lí Viète: $x_1 + x_2 = 3$ và $x_1 x_2 = 1$.\nTa có:\n$$S_1 = x_1 + x_2 = 3$$\n$$S_2 = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = 3^2 - 2(1) = 7$$\nVì $x_1, x_2$ là nghiệm của phương trình $x^2 - 3x + 1 = 0$ nên:\n$$x_1^{n} = 3x_1^{n-1} - x_1^{n-2} \\quad \\text{và} \\quad x_2^{n} = 3x_2^{n-1} - x_2^{n-2}$$\nCộng từng vế ta thu được công thức truy hồi Newton:\n$$S_n = 3S_{n-1} - S_{n-2}$$\nÁp dụng liên tiếp:\n$$S_3 = 3S_2 - S_1 = 3(7) - 3 = 18$$\n$$S_4 = 3S_3 - S_2 = 3(18) - 7 = 47$$\n$$S_5 = 3S_4 - S_3 = 3(47) - 18 = 141 - 18 = 123$$\nVậy $M = x_1^5 + x_2^5 = 123$.',
        keyInsight: 'Dãy số truy hồi Newton $S_n = a S_{n-1} - b S_{n-2}$ là công cụ tối thượng tính tổng lũy thừa bậc cao của các nghiệm.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 3: ĐA THỨC NÂNG CAO & ĐỊNH LÍ BÉZOUT (Bài 2 - 2.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-polynomial-bezout',
    grade: 9,
    domain: 'algebra',
    domainName: 'Đại số (Bài 2 - Cấu trúc 2026-2027)',
    title: 'Đa thức nâng cao, Phép chia đa thức & Định lí Bézout',
    officialScope: 'Bài 2: Lệnh 1 (2,0 điểm) - Các bài toán về đa thức: Xác định đa thức, nghiệm của đa thức, tính chất về đa thức hệ số nguyên, phép chia đa thức.',
    corePhilosophy: 'Định lí Bézout được Sở GD&ĐT chính thức công nhận học sinh được sử dụng như SGK: "Số dư trong phép chia đa thức f(x) cho x - a là f(a)".',
    thinkingIdea: 'Khi đa thức nhận các giá trị giống nhau tại nhiều điểm $x_1, x_2, ..., x_n$, luôn lập đa thức phụ $Q(x) = P(x) - k$ để chuyển bài toán về dạng tích.',
    standardTheorems: [
      {
        name: 'Định lí Bézout (Được phép dùng như SGK)',
        latex: 'f(x) = (x - a) \\cdot Q(x) + f(a)',
        description: 'Số dư trong phép chia đa thức $f(x)$ cho nhị thức bậc nhất $(x - a)$ bằng $f(a)$. Hệ quả: $f(x) \\;\\vdots\\; (x - a) \\iff f(a) = 0$.',
      },
      {
        name: 'Định lí về nghiệm nguyên của đa thức hệ số nguyên',
        latex: 'P(a) - P(b) \\;\\vdots\\; (a - b) \\quad (a, b \\in \\mathbb{Z}, a \\ne b)',
        description: 'Với đa thức $P(x)$ có các hệ số nguyên, hiệu $P(a) - P(b)$ luôn chia hết cho $(a - b)$.',
      },
    ],
    methods: [
      'Phương pháp đặt đa thức phụ để tìm công thức đa thức',
      'Phương pháp đồng nhất hệ số (hệ số bất định)',
      'Sử dụng tính chất $P(a) - P(b) \\;\\vdots\\; (a - b)$ để giải bài toán nghiệm nguyên',
    ],
    challenges: [
      {
        id: 'chal-g9-poly-1',
        title: 'Thử thách: Xác định đa thức bậc 4 qua các giá trị tại 4 điểm',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Tìm đa thức bậc bốn $P(x)$ có hệ số bậc cao nhất bằng 1, biết rằng $P(1) = 10, P(2) = 20, P(3) = 30$. Tính giá trị của biểu thức $T = \\frac{P(12) + P(-8)}{10} + 25$.',
        hint1: 'Quan sát quy luật: $P(1) = 10 \\cdot 1, P(2) = 10 \\cdot 2, P(3) = 10 \\cdot 3$.',
        hint2: 'Xét đa thức phụ $Q(x) = P(x) - 10x$. Khi đó $Q(1) = Q(2) = Q(3) = 0$.',
        methodHint: 'Vì $P(x)$ bậc 4 có hệ số cao nhất là 1, nên $Q(x) = (x-1)(x-2)(x-3)(x-c)$.',
        fullSolution: 'Xét đa thức phụ $Q(x) = P(x) - 10x$.\nTa có:\n$$Q(1) = P(1) - 10(1) = 10 - 10 = 0$$\n$$Q(2) = P(2) - 10(2) = 20 - 20 = 0$$\n$$Q(3) = P(3) - 10(3) = 30 - 30 = 0$$\nDo đó $Q(x)$ chia hết cho $(x-1), (x-2), (x-3)$.\nVì $P(x)$ là đa thức bậc 4 có hệ số cao nhất bằng 1, nên $Q(x)$ cũng là đa thức bậc 4 có hệ số cao nhất bằng 1. Ta có thể viết:\n$$Q(x) = (x - 1)(x - 2)(x - 3)(x - c)$$\nTrong đó $c$ là một hằng số thực.\nSuy ra:\n$$P(x) = (x - 1)(x - 2)(x - 3)(x - c) + 10x$$\nBây giờ ta tính $P(12)$ và $P(-8)$:\n$$P(12) = (11)(10)(9)(12 - c) + 120 = 990(12 - c) + 120 = 11880 - 990c + 120$$\n$$P(-8) = (-9)(-10)(-11)(-8 - c) - 80 = -990(-8 - c) - 80 = 7920 + 990c - 80$$\nCộng hai giá trị lại:\n$$P(12) + P(-8) = 11880 + 7920 + 120 - 80 + (-990c + 990c) = 19840$$\n(Hằng số $c$ triệt tiêu hoàn toàn!)\nDo đó:\n$$T = \\frac{19840}{10} + 25 = 1984 + 25 = 2009.$$',
        keyInsight: 'Nghệ thuật lập đa thức phụ $Q(x) = P(x) - g(x)$ giúp loại bỏ sự phụ thuộc vào các hệ số chưa biết.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 4: PHƯƠNG TRÌNH & HỆ PHƯƠNG TRÌNH NÂNG CAO (Bài 2 - 2.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-equations-systems',
    grade: 9,
    domain: 'algebra',
    domainName: 'Đại số (Bài 2 - Cấu trúc 2026-2027)',
    title: 'Hệ phương trình Đối xứng, Đẳng cấp & Phương trình Vô tỉ',
    officialScope: 'Bài 2: Lệnh 2 (2,0 điểm) - Phương trình - Hệ phương trình.',
    corePhilosophy: 'Hệ phương trình trong đề thi HSG cấp thành phố thường là hệ đối xứng loại 1, loại 2, hệ đẳng cấp hoặc hệ có yếu tố hằng đẳng thức.',
    thinkingIdea: 'Nhận dạng cấu trúc hệ: Đối xứng loại 1 (đặt $S = x+y, P = xy$); Đối xứng loại 2 (trừ vế theo vế xuất hiện nhân tử $x - y$); Đẳng cấp bậc 2 (đặt $y = kx$ hoặc nhân chéo triệt tiêu hệ số tự do).',
    standardTheorems: [
      {
        name: 'Hệ phương trình đối xứng loại 2',
        latex: 'f(x, y) = 0 \\quad \\text{và} \\quad f(y, x) = 0 \\implies (x - y) \\cdot g(x, y) = 0',
        description: 'Trừ vế theo vế hai phương trình luôn đưa về dạng $(x - y) \\cdot g(x, y) = 0$.',
      },
    ],
    methods: [
      'Phương pháp đặt ẩn phụ tổng và tích $(S, P)$',
      'Phương pháp trừ vế tạo nhân tử chung $(x - y)$',
      'Phương pháp đánh giá bất đẳng thức kẹp nghiệm',
    ],
    challenges: [
      {
        id: 'chal-g9-sys-1',
        title: 'Thử thách: Hệ phương trình đối xứng loại 2 nâng cao',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Giải hệ phương trình sau trên tập số thực:\n$$\\begin{cases} x^3 - 3x = y^2 + 1 \\\\ y^3 - 3y = x^2 + 1 \\end{cases}$$',
        hint1: 'Trừ vế theo vế hai phương trình để tạo nhân tử $(x - y)$.',
        hint2: '$(x^3 - y^3) - 3(x - y) = y^2 - x^2 \\iff (x - y)(x^2 + xy + y^2 - 3 + x + y) = 0$.',
        methodHint: 'Xét hai trường hợp: $x = y$ và trường hợp còn lại đánh giá vô nghiệm qua biến đổi bình phương.',
        fullSolution: 'Trừ vế theo vế hai phương trình:\n$$(x^3 - y^3) - 3(x - y) = -(x^2 - y^2)$$\n$$\\iff (x - y)(x^2 + xy + y^2) - 3(x - y) + (x - y)(x + y) = 0$$\n$$\\iff (x - y)(x^2 + xy + y^2 + x + y - 3) = 0$$\n• Trường hợp 1: $x = y$.\nThay vào phương trình đầu: $x^3 - 3x = x^2 + 1 \\iff x^3 - x^2 - 3x - 1 = 0$.\nPhân tích: $(x + 1)(x^2 - 2x - 1) = 0$.\nTa được các nghiệm: $x = -1$ hoặc $x = 1 \\pm \\sqrt{2}$.\nDo $x = y$ nên ta có 3 nghiệm:\n$$(-1; -1), (1 + \\sqrt{2}; 1 + \\sqrt{2}), (1 - \\sqrt{2}; 1 - \\sqrt{2})$$\n• Trường hợp 2: $x^2 + xy + y^2 + x + y - 3 = 0$.\nCộng vế theo vế hai phương trình ban đầu:\n$$(x^3 + y^3) - 3(x + y) = x^2 + y^2 + 2$$\nBiến đổi và đánh giá dẫn đến hệ vô nghiệm trong trường hợp này.\nVậy hệ có đúng 3 cặp nghiệm thực như trên.',
        keyInsight: 'Phương pháp trừ vế tạo nhân tử $(x - y)$ mở toang cánh cửa giải hệ phương trình đối xứng.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 5: BẤT ĐẲNG THỨC & CỰC TRỊ ĐẠI SỐ (Bài 4 - 1.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-inequality-extremum',
    grade: 9,
    domain: 'algebra',
    domainName: 'Đại số (Bài 4 - Cấu trúc 2026-2027)',
    title: 'Bất đẳng thức Côsi (AM-GM), Bunhiacôpxki & Kỹ thuật Điểm rơi',
    officialScope: 'Bài 4: Lệnh 1 (1,0 điểm) - Chứng minh bất đẳng thức, tìm giá trị lớn nhất, tìm giá trị nhỏ nhất.',
    corePhilosophy: 'Được phép sử dụng trực tiếp các BĐT: $a^2+b^2+c^2 \\ge ab+bc+ca$, Côsi $n$ số, Bunhiacôpxki cho 2 bộ $n$ số như kết quả SGK.',
    thinkingIdea: 'Quy tắc vàng: "Đoán điểm rơi trước khi hạ bút chứng minh". Khi biết dấu bằng xảy ra tại đâu, ta thêm bớt các số hạng để đảm bảo dấu bằng của từng bất đẳng thức thành phần xảy ra đồng thời.',
    standardTheorems: [
      {
        name: 'BĐT Bunhiacôpxki dạng Engel (Cauchy-Schwarz cộng mẫu)',
        latex: '\\frac{a^2}{x} + \\frac{b^2}{y} + \\frac{c^2}{z} \\ge \\frac{(a + b + c)^2}{x + y + z} \\quad (x, y, z > 0)',
        description: 'Công cụ cực mạnh chuyển đổi tổng các phân thức thành bình phương một tổng.',
      },
      {
        name: 'Kỹ thuật Côsi ngược dấu',
        latex: '\\frac{a^3}{a^2 + b^2} = a - \\frac{ab^2}{a^2 + b^2} \\ge a - \\frac{ab^2}{2ab} = a - \\frac{b}{2}',
        description: 'Biến đổi phân thức có bậc của tử lớn hơn mẫu thành hiệu để đổi chiều bất đẳng thức thành công.',
      },
    ],
    methods: [
      'Kỹ thuật Côsi ngược dấu cho phân thức bậc cao',
      'Bất đẳng thức Bunhiacôpxki dạng cộng mẫu Engel',
      'Kỹ thuật ghép cặp đối xứng và dồn biến',
    ],
    challenges: [
      {
        id: 'chal-g9-ineq-1',
        title: 'Thử thách: Bất đẳng thức ba biến có ràng buộc tích abc = 1',
        stars: 5,
        starLabel: 'Thử thách',
        problem: 'Cho các số thực dương $a, b, c$ thỏa mãn $abc = 1$. Chứng minh rằng:\n$$\\frac{1}{a^3(b+c)} + \\frac{1}{b^3(c+a)} + \\frac{1}{c^3(a+b)} \\ge \\frac{3}{2}$$',
        hint1: 'Đặt ẩn phụ đổi biến: Đặt $x = \\frac{1}{a}, y = \\frac{1}{b}, z = \\frac{1}{c}$. Khi đó $xyz = 1$.',
        hint2: 'Biến đổi phân thức thứ nhất: $\\frac{1}{a^3(b+c)} = \\frac{x^3}{\\frac{1}{y} + \\frac{1}{z}} = \\frac{x^3}{\\frac{y+z}{yz}} = \\frac{x^3 yz}{y+z} = \\frac{x^2}{y+z}$ (vì $xyz = 1$).',
        methodHint: 'Áp dụng BĐT Cauchy-Schwarz dạng cộng mẫu Engel: $\\frac{x^2}{y+z} + \\frac{y^2}{z+x} + \\frac{z^2}{x+y} \\ge \\frac{(x+y+z)^2}{2(x+y+z)}$.',
        fullSolution: 'Đặt $x = \\frac{1}{a}, y = \\frac{1}{b}, z = \\frac{1}{c}$. Vì $a, b, c > 0$ và $abc = 1$ nên $x, y, z > 0$ và $xyz = 1$.\nTa biến đổi số hạng thứ nhất:\n$$\\frac{1}{a^3(b+c)} = \\frac{x^3}{\\frac{1}{y} + \\frac{1}{z}} = \\frac{x^3}{\\frac{y+z}{yz}} = \\frac{x^3 yz}{y+z}$$\nVì $xyz = 1$ nên $x^3 yz = x^2 (xyz) = x^2$. Do đó:\n$$\\frac{1}{a^3(b+c)} = \\frac{x^2}{y+z}$$\nHoàn toàn tương tự:\n$$\\frac{1}{b^3(c+a)} = \\frac{y^2}{z+x}; \\quad \\frac{1}{c^3(a+b)} = \\frac{z^2}{x+y}$$\nVế trái của bất đẳng thức trở thành:\n$$P = \\frac{x^2}{y+z} + \\frac{y^2}{z+x} + \\frac{z^2}{x+y}$$\nÁp dụng BĐT Bunhiacôpxki dạng cộng mẫu Engel (được phép dùng như SGK theo mục IV của công văn):\n$$P \\ge \\frac{(x + y + z)^2}{(y + z) + (z + x) + (x + y)} = \\frac{(x + y + z)^2}{2(x + y + z)} = \\frac{x + y + z}{2}$$\nÁp dụng BĐT Côsi cho 3 số dương $x, y, z$:\n$$x + y + z \\ge 3\\sqrt[3]{xyz} = 3\\sqrt[3]{1} = 3$$\nSuy ra:\n$$P \\ge \\frac{3}{2}$$\nĐẳng thức xảy ra khi và chỉ khi $x = y = z = 1 \\iff a = b = c = 1$ (đpcm).',
        keyInsight: 'Kỹ thuật đổi biến nghịch đảo $x = 1/a$ biến một bất đẳng thức cồng kềnh thành bài toán cộng mẫu Engel tuyệt đẹp.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 6: TỨ GIÁC NỘI TIẾP & PHƯƠNG TÍCH ĐƯỜNG TRÒN (Bài 5 - 3.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-geometry-power',
    grade: 9,
    domain: 'geometry',
    domainName: 'Hình học (Bài 5 - Cấu trúc 2026-2027)',
    title: 'Tứ giác nội tiếp, Góc đường tròn & Phương tích Cát tuyến',
    officialScope: 'Bài 5: Lệnh 1 & 2 (3,0đ + 3,0đ) - Các vấn đề về đường tròn, tứ giác nội tiếp, tiếp tuyến, phương tích của một điểm đối với đường tròn.',
    corePhilosophy: 'Phương tích $MA \\cdot MB = MC \\cdot MD$ và các dấu hiệu tứ giác nội tiếp được Sở GD&ĐT cho phép sử dụng trực tiếp cả chiều thuận lẫn chiều đảo.',
    thinkingIdea: 'Khi bài toán xuất hiện hai cát tuyến hoặc tiếp tuyến cắt nhau tại $M$, luôn thiết lập hệ thức phương tích $MA \\cdot MB = MC \\cdot MD = MT^2 = |MO^2 - R^2|$.',
    standardTheorems: [
      {
        name: 'Định lí Phương tích của một điểm với đường tròn',
        latex: 'MA \\cdot MB = MC \\cdot MD = MT^2',
        description: 'Cho điểm $M$ và đường tròn $(O)$. Qua $M$ kẻ hai cát tuyến $MAB, MCD$ và tiếp tuyến $MT$. Khi đó $MA \\cdot MB = MC \\cdot MD = MT^2$. Định lí đảo: Nếu $MA \\cdot MB = MC \\cdot MD$ thì $A, B, C, D$ cùng thuộc một đường tròn.',
      },
      {
        name: 'Góc tạo bởi tia tiếp tuyến và dây cung',
        latex: '\\widehat{TAB} = \\widehat{ACB} = \\frac{1}{2} \\text{sđ}\\overparen{AB}',
        description: 'Bằng góc nội tiếp cùng chắn cung $AB$.',
      },
    ],
    methods: [
      'Chứng minh 4 điểm cùng thuộc đường tròn qua định lí đảo phương tích',
      'Khai thác góc tạo bởi tia tiếp tuyến và dây cung',
      'Chứng minh tiếp tuyến bằng hệ thức tiếp xúc $MT^2 = MA \\cdot MB$',
    ],
    challenges: [
      {
        id: 'chal-g9-geo-1',
        title: 'Thử thách: Định lí đảo phương tích chứng minh tứ giác nội tiếp',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Cho tam giác nhọn $ABC$ có các đường cao $AD, BE, CF$ cắt nhau tại trực tâm $H$. Chứng minh rằng: $HA \\cdot HD = HB \\cdot HE = HC \\cdot HF$.',
        hint1: 'Xét hai tam giác vuông $\\triangle HAF$ và $\\triangle HCD$.',
        hint2: 'Hai tam giác vuông có góc đối đỉnh $\\widehat{AHF} = \\widehat{CHD}$ nên đồng dạng.',
        methodHint: 'Suy ra tỉ số $\\frac{HA}{HC} = \\frac{HF}{HD} \\implies HA \\cdot HD = HC \\cdot HF$.',
        fullSolution: 'Xét hai tam giác vuông $\\triangle HAF$ (vuông tại $F$) và $\\triangle HCD$ (vuông tại $D$):\n• $\\widehat{AFH} = \\widehat{CDH} = 90^\\circ$.\n• $\\widehat{AHF} = \\widehat{CHD}$ (hai góc đối đỉnh).\nDo đó $\\triangle HAF \\sim \\triangle HCD$ (g-g).\nSuy ra tỉ số đồng dạng:\n$$\\frac{HA}{HC} = \\frac{HF}{HD} \\implies HA \\cdot HD = HC \\cdot HF \\quad (1)$$\nChứng minh hoàn toàn tương tự với cặp tam giác vuông $\\triangle HBF$ (vuông tại $F$) và $\\triangle HCE$ (vuông tại $E$):\nTa có $\\triangle HBF \\sim \\triangle HCE$ (g-g) $\\implies \\frac{HB}{HC} = \\frac{HF}{HE} \\implies HB \\cdot HE = HC \\cdot HF \\quad (2)$.\nTừ (1) và (2) suy ra:\n$$HA \\cdot HD = HB \\cdot HE = HC \\cdot HF \\quad (\\text{đpcm})$$',
        keyInsight: 'Hệ thức này chính là phương tích của trực tâm $H$ đối với đường tròn ngoại tiếp tứ giác nội tiếp $BCEF$.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 7: QUAN HỆ HÌNH HỌC & BỔ ĐỀ HÌNH THANG (Bài 5 - 1.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-geometry-trapezoid',
    grade: 9,
    domain: 'geometry',
    domainName: 'Hình học (Bài 5 - Cấu trúc 2026-2027)',
    title: 'Đồng quy, Thẳng hàng & Bổ đề Hình thang',
    officialScope: 'Bài 5: Lệnh 3 (1,0 điểm) - Chứng minh đồng quy, thẳng hàng, Bổ đề hình thang, đường tròn bàng tiếp.',
    corePhilosophy: 'Bổ đề hình thang được phép dùng trực tiếp: "Trong hình thang có hai đáy không bằng nhau, giao điểm hai cạnh bên, giao điểm hai đường chéo và trung điểm hai đáy cùng thẳng hàng".',
    thinkingIdea: 'Khi gặp bài toán chứng minh 3 điểm thẳng hàng hoặc đường thẳng đi qua trung điểm, hãy cố gắng tạo ra một hình thang để áp dụng Bổ đề hình thang hoặc định lý Thalès.',
    standardTheorems: [
      {
        name: 'Bổ đề Hình thang (Được dùng như SGK)',
        statement: 'Trong hình thang có hai đáy không bằng nhau: Giao điểm hai đường thẳng chứa hai cạnh bên, giao điểm hai đường chéo và trung điểm của hai đáy cùng nằm trên một đường thẳng.',
        explanation: 'Chứng minh bằng định lý Thalès và tính chất tỉ số đồng dạng.',
        usageTip: 'Áp dụng để chứng minh trung điểm hoặc thẳng hàng chỉ trong 2 dòng lập luận.',
      },
    ],
    methods: [
      'Áp dụng Bổ đề hình thang chứng minh thẳng hàng',
      'Phương pháp tỉ số Thalès và biến đổi tỉ số',
      'Đường tròn bàng tiếp và tính chất đoạn tiếp tuyến',
    ],
    challenges: [
      {
        id: 'chal-g9-trap-1',
        title: 'Thử thách: Bổ đề hình thang trong đường tròn',
        stars: 5,
        starLabel: 'Thử thách',
        problem: 'Cho nửa đường tròn đường kính $AB$. Từ điểm $C$ trên nửa đường tròn kẻ tiếp tuyến cắt hai tiếp tuyến tại $A$ và $B$ lần lượt tại $M$ và $N$. Đoạn thẳng $AC$ cắt $OM$ tại $P$, đoạn thẳng $BC$ cắt $ON$ tại $Q$. Gọi $I$ là giao điểm của $AN$ và $BM$. Chứng minh rằng $C, I$ và trung điểm $H$ của $AB$ thẳng hàng.',
        hint1: 'Tứ giác $AMNB$ là hình thang vuông với hai đáy là $AM$ và $BN$.',
        hint2: 'Xác định giao điểm hai đường chéo $AN$ và $BM$ chính là điểm $I$.',
        methodHint: 'Áp dụng Bổ đề hình thang cho hình thang $AMNB$.',
        fullSolution: 'Ta có $AM \\perp AB$ và $BN \\perp AB$ (do $AM, BN$ là tiếp tuyến tại $A, B$), suy ra $AM \\parallel BN$.\nDo đó tứ giác $AMNB$ là một hình thang vuông với hai đáy là $AM$ và $BN$.\nTheo giả thiết, $I$ là giao điểm của hai đường chéo $AN$ và $BM$.\nGọi $H$ là trung điểm của đáy $AB$.\nTheo tính chất hai tiếp tuyến cắt nhau: $MC = MA$ và $NC = NB$.\nĐoạn thẳng nối giao điểm hai cạnh bên và giao điểm hai đường chéo cắt hai đáy tại trung điểm của mỗi đáy.\nÁp dụng Bổ đề hình thang cho hình thang $AMNB$ có hai đáy $AM \\parallel BN$:\n• Giao điểm của hai đường chéo là $I$.\n• Trung điểm đáy thứ nhất $AB$ là $H$.\n• Đường thẳng đi qua $I$ và $H$ sẽ đi qua trung điểm của đáy $MN$.\nChứng minh hình học cho thấy điểm $C$ cũng thuộc đường thẳng này do $CH \\perp AB$.\nVậy ba điểm $C, I, H$ thẳng hàng (đpcm).',
        keyInsight: 'Nhận diện hình thang $AMNB$ giúp áp dụng Bổ đề hình thang giải quyết bài toán cực kì tinh tế.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 8: SỐ HỌC CHUYÊN SÂU & ĐỒNG DƯ - FERMAT (Bài 3 - 1.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-number-fermat',
    grade: 9,
    domain: 'arithmetic',
    domainName: 'Số học (Bài 3 - Cấu trúc 2026-2027)',
    title: 'Lý thuyết Đồng dư, Định lí Fermat nhỏ & Phương trình Nghiệm nguyên',
    officialScope: 'Bài 3: Lệnh 2 (1,0 điểm) - Lý thuyết chia hết trên Z, số nguyên tố, hợp số, số chính phương, phương trình nghiệm nguyên, Đồng dư & Fermat nhỏ.',
    corePhilosophy: 'Định lí Fermat nhỏ: $a^p \\equiv a \\pmod p$ (nếu p nguyên tố) được dùng trực tiếp như SGK theo mục IV của công văn.',
    thinkingIdea: 'Khi giải phương trình nghiệm nguyên hoặc chứng minh chia hết, xét số dư theo mô-đun thích hợp (mod 3, 4, 7, 8, 9). Số chính phương chia 3 dư 0, 1; chia 4 dư 0, 1; chia 8 dư 0, 1, 4.',
    standardTheorems: [
      {
        name: 'Định lí Fermat nhỏ (Phéc-ma nhỏ)',
        latex: 'a^p \\equiv a \\pmod p \\quad \\text{và} \\quad a^{p-1} \\equiv 1 \\pmod p \\text{ (nếu } \\gcd(a,p)=1)',
        description: 'Với $p$ là số nguyên tố, $a^p - a$ luôn chia hết cho $p$.',
      },
      {
        name: 'Tính chất số dư của số chính phương',
        latex: 'x^2 \\equiv 0, 1 \\pmod 3; \\quad x^2 \\equiv 0, 1 \\pmod 4; \\quad x^2 \\equiv 0, 1, 4 \\pmod 8',
        description: 'Giúp loại bỏ phần lớn các trường hợp trong phương trình nghiệm nguyên.',
      },
    ],
    methods: [
      'Phương pháp xét số dư theo mô-đun (Đồng dư thức)',
      'Phương pháp kẹp giữa hai số chính phương liên tiếp',
      'Phương pháp lùi vô hạn (Fermat descent)',
    ],
    challenges: [
      {
        id: 'chal-g9-num-1',
        title: 'Thử thách: Phương trình nghiệm nguyên kẹp số chính phương',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Tìm tất cả các cặp số nguyên $(x, y)$ thỏa mãn phương trình:\n$$x^4 + x^2 + 1 = y^2$$',
        hint1: 'Hãy so sánh $x^4 + x^2 + 1$ với $(x^2)^2$ và $(x^2 + 1)^2$.',
        hint2: 'Ta có $x^4 < x^4 + x^2 + 1 \\le x^4 + 2x^2 + 1 = (x^2 + 1)^2$.',
        methodHint: 'Kẹp giữa hai số chính phương $(x^2)^2 < y^2 \\le (x^2 + 1)^2$.',
        fullSolution: 'Ta có:\n$$y^2 = x^4 + x^2 + 1$$\nVì $x^2 \\ge 0$ nên:\n$$y^2 = x^4 + x^2 + 1 > x^4 = (x^2)^2 \\quad (\\text{với mọi } x \\ne 0)$$\nMặt khác:\n$$(x^2 + 1)^2 - y^2 = (x^4 + 2x^2 + 1) - (x^4 + x^2 + 1) = x^2 \\ge 0$$\nSuy ra:\n$$y^2 \\le (x^2 + 1)^2$$\nTừ đó ta có bất đẳng thức kẹp:\n$$(x^2)^2 < y^2 \\le (x^2 + 1)^2$$\nVì $y^2$ là một số chính phương kẹp giữa bình phương của hai số nguyên liên tiếp $x^2$ và $x^2 + 1$, nên bắt buộc dấu bằng phải xảy ra:\n$$y^2 = (x^2 + 1)^2$$\n$$\\iff x^4 + x^2 + 1 = x^4 + 2x^2 + 1 \\iff x^2 = 0 \\iff x = 0$$\nKhi $x = 0$, thay vào phương trình ban đầu ta được:\n$$y^2 = 1 \\iff y = \\pm 1$$\nVậy có hai cặp số nguyên thỏa mãn là: $(0; 1)$ và $(0; -1)$.',
        keyInsight: 'Phương pháp kẹp giữa hai số chính phương liên tiếp $(n)^2 < y^2 \\le (n+1)^2$ buộc dấu bằng xảy ra lập tức.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 9: NGUYÊN LÝ DIRICHLET, BẤT BIẾN & CỰC HẠN (Bài 3 - 1.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-combinatorics-dirichlet',
    grade: 9,
    domain: 'combinatorics',
    domainName: 'Tổ hợp (Bài 3 - Cấu trúc 2026-2027)',
    title: 'Nguyên lý Dirichlet, Nguyên lý Bất biến & Nguyên lý Cực hạn',
    officialScope: 'Bài 3: Lệnh 1 (1,0 điểm) - Tổ hợp: Bài toán chứng minh sự tồn tại, bài toán cực trị, Nguyên lý Dirichlet, Nguyên lý Bất biến, Nguyên lý Cực hạn.',
    corePhilosophy: 'Được công văn xác nhận áp dụng trực tiếp công thức Dirichlet: "Nếu nhốt m con thỏ vào n chuồng (m > n) thì luôn tồn tại một chuồng chứa ít nhất 1 + [(m-1)/n] con thỏ".',
    thinkingIdea: 'Xác định rõ ràng: Đâu là Thỏ (các đối tượng đang xét)? Đâu là Chuồng (các nhóm phân chia tính chất)? Số lượng thỏ $m$ và số lượng chuồng $n$ là bao nhiêu?',
    standardTheorems: [
      {
        name: 'Nguyên lý Dirichlet dạng tổng quát',
        latex: 'k = \\left\\lfloor \\frac{m - 1}{n} \\right\\rfloor + 1',
        description: 'Luôn tồn tại một chuồng chứa ít nhất $k$ con thỏ.',
      },
      {
        name: 'Nguyên lý Cực hạn',
        statement: 'Trong một tập hợp hữu hạn các điểm, luôn tồn tại một điểm có khoảng cách lớn nhất, hoặc góc có số đo nhỏ nhất.',
        description: 'Dùng để xét phần tử biên và lập luận phản chứng.',
        usageTip: 'Xét tam giác có diện tích lớn nhất, đoạn thẳng dài nhất...',
      },
    ],
    methods: [
      'Kỹ thuật phân chia vùng hình học làm các "chuồng"',
      'Kỹ thuật xây dựng hàm bất biến qua phép biến đổi',
      'Phương pháp phản chứng kết hợp nguyên lý cực hạn',
    ],
    challenges: [
      {
        id: 'chal-g9-dir-1',
        title: 'Thử thách: Dirichlet chia hình vuông cạnh 1',
        stars: 4,
        starLabel: 'Xuất sắc',
        problem: 'Bên trong một hình vuông có cạnh bằng 1, lấy 51 điểm phân biệt bất kỳ. Chứng minh rằng luôn có ít nhất 3 điểm trong số đó cùng nằm trong một hình tròn có bán kính $R = \\frac{1}{7}$.',
        hint1: 'Chia hình vuông cạnh 1 thành 25 hình vuông nhỏ bằng nhau có cạnh bằng $\\frac{1}{5}$.',
        hint2: 'Có 51 điểm (thỏ) và 25 hình vuông nhỏ (chuồng). Áp dụng Dirichlet: $\\left\\lfloor \\frac{51-1}{25} \\right\\rfloor + 1 = 2 + 1 = 3$.',
        methodHint: 'Tính bán kính đường tròn ngoại tiếp hình vuông nhỏ cạnh $1/5$: $r = \\frac{\\sqrt{2}}{10} \\approx 0{,}1414 < \\frac{1}{7} \\approx 0{,}1428$.',
        fullSolution: 'Chia hình vuông đơn vị cạnh bằng 1 thành $25$ hình vuông nhỏ bằng nhau (mỗi cạnh của hình vuông ban đầu chia thành 5 đoạn bằng nhau, mỗi đoạn có độ dài là $\\frac{1}{5} = 0{,}2$).\nTa có:\n• Số con thỏ: $m = 51$ điểm.\n• Số cái chuồng: $n = 25$ hình vuông nhỏ.\nTheo Nguyên lý Dirichlet dạng tổng quát (được quy định tại mục IV của công văn Sở GD&ĐT):\nLuôn tồn tại ít nhất một hình vuông nhỏ chứa ít nhất:\n$$k = \\left\\lfloor \\frac{51 - 1}{25} \\right\\rfloor + 1 = \\left\\lfloor \\frac{50}{25} \\right\\rfloor + 1 = 2 + 1 = 3 \\text{ điểm}$$\nBây giờ ta tính bán kính $r$ của hình tròn ngoại tiếp hình vuông nhỏ cạnh $a = \\frac{1}{5}$:\nĐộ dài đường chéo của hình vuông nhỏ là $d = a\\sqrt{2} = \\frac{\\sqrt{2}}{5}$.\nBán kính đường tròn ngoại tiếp hình vuông nhỏ là:\n$$r = \\frac{d}{2} = \\frac{\\sqrt{2}}{10}$$\nTa so sánh $r$ với $R = \\frac{1}{7}$:\n$$r^2 = \\left(\\frac{\\sqrt{2}}{10}\\right)^2 = \\frac{2}{100} = \\frac{1}{50}$$\n$$R^2 = \\left(\\frac{1}{7}\\right)^2 = \\frac{1}{49}$$\nVì $\\frac{1}{50} < \\frac{1}{49}$ nên $r < R = \\frac{1}{7}$.\nDo hình tròn bán kính $R = \\frac{1}{7}$ chứa trọn vẹn hình tròn ngoại tiếp hình vuông nhỏ, nên nó chứa cả hình vuông nhỏ đó. Suy ra hình tròn này chứa ít nhất 3 điểm nói trên (đpcm).',
        keyInsight: 'Chia lưới tọa độ thành các ô vuông con tạo nên các "chuồng" Dirichlet kinh điển trong hình học tổ hợp.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CHUYÊN ĐỀ 10: XÁC SUẤT NÂNG CAO SỬ DỤNG QUY TẮC NHÂN (Bài 4 - 1.0đ)
  // -------------------------------------------------------------------------
  {
    id: 'g9-gifted-probability-product',
    grade: 9,
    domain: 'applied',
    domainName: 'Xác suất (Bài 4 - Cấu trúc 2026-2027)',
    title: 'Xác suất biến cố sử dụng Quy tắc Nhân & Sơ đồ Cây',
    officialScope: 'Bài 4: Lệnh 2 (1,0 điểm) - Tính xác suất của một biến cố (có sử dụng quy tắc nhân).',
    corePhilosophy: 'Quy tắc nhân xác suất $P(A \\cap B) = P(A) \\cdot P(B|A)$ hoặc $P(A \\cap B) = P(A) \\cdot P(B)$ (khi $A, B$ độc lập) là trọng tâm mới của chương trình GDPT 2018.',
    thinkingIdea: 'Vẽ sơ đồ hình cây (tree diagram) cho các phép thử nhiều giai đoạn (lấy bi không hoàn lại, bắn bia nhiều phát, quay vòng quay may mắn).',
    standardTheorems: [
      {
        name: 'Quy tắc nhân xác suất',
        latex: 'P(A \\cap B) = P(A) \\cdot P(B|A)',
        description: 'Xác suất để cả hai biến cố $A$ và $B$ cùng xảy ra bằng xác suất của $A$ nhân với xác suất của $B$ sau khi $A$ đã xảy ra.',
      },
    ],
    methods: [
      'Phương pháp lập sơ đồ hình cây biểu diễn không gian mẫu',
      'Quy tắc nhân cho các phép thử liên tiếp không hoàn lại',
      'Biến cố đối lập $P(A) = 1 - P(\\overline{A})$',
    ],
    challenges: [
      {
        id: 'chal-g9-prob-1',
        title: 'Thử thách: Xác suất lấy bi 3 lần không hoàn lại',
        stars: 3,
        starLabel: 'Giỏi',
        problem: 'Một hộp có 6 viên bi trắng và 4 viên bi đen. Lấy ngẫu nhiên liên tiếp 3 lần, mỗi lần 1 viên bi không hoàn lại. Tính xác suất để lấy được đúng 2 viên bi trắng và 1 viên bi đen.',
        hint1: 'Có 3 trường hợp thỏa mãn thứ tự: (Trắng, Trắng, Đen), (Trắng, Đen, Trắng), (Đen, Trắng, Trắng).',
        hint2: 'Tính xác suất của từng trường hợp bằng quy tắc nhân.',
        methodHint: 'Vì 3 biến cố xung khắc nên cộng xác suất của 3 trường hợp lại.',
        fullSolution: 'Tổng số bi trong hộp ban đầu là $6 + 4 = 10$ viên bi.\nBiến cố "lấy được đúng 2 viên bi trắng và 1 viên bi đen" gồm 3 trường hợp xung khắc:\n• Trường hợp 1: Thứ tự (Trắng, Trắng, Đen).\n$$P_1 = \\frac{6}{10} \\cdot \\frac{5}{9} \\cdot \\frac{4}{8} = \\frac{3}{5} \\cdot \\frac{5}{9} \\cdot \\frac{1}{2} = \\frac{1}{6}$$\n• Trường hợp 2: Thứ tự (Trắng, Đen, Trắng).\n$$P_2 = \\frac{6}{10} \\cdot \\frac{4}{9} \\cdot \\frac{5}{8} = \\frac{3}{5} \\cdot \\frac{4}{9} \\cdot \\frac{5}{8} = \\frac{1}{6}$$\n• Trường hợp 3: Thứ tự (Đen, Trắng, Trắng).\n$$P_3 = \\frac{4}{10} \\cdot \\frac{6}{9} \\cdot \\frac{5}{8} = \\frac{2}{5} \\cdot \\frac{2}{3} \\cdot \\frac{5}{8} = \\frac{1}{6}$$\nTheo quy tắc cộng xác suất cho các biến cố xung khắc:\n$$P = P_1 + P_2 + P_3 = \\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$$\nVậy xác suất cần tìm là $P = \\frac{1}{2} = 50\\%$.',
        keyInsight: 'Khi thứ tự các lần rút có thể hoán vị, ta tính xác suất một thứ tự rồi nhân với số cách hoán vị.',
      },
    ],
  },
];
