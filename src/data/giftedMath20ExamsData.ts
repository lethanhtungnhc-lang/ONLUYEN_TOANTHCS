/**
 * BỘ 22 ĐỀ THI HỌC SINH GIỎI TOÁN THCS CẤP THÀNH PHỐ MÔ PHỎNG NĂM HỌC 2026-2027
 * Chuẩn định dạng Công văn của Sở Giáo dục và Đào tạo
 * Thang điểm: 20,0 điểm • Thời gian: 150 phút • Hình thức: Tự luận
 * Tác quyền: © 2026 Teacher Lê Thanh Tùng. All Rights Reserved.
 * Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
 */

export interface GiftedOfficialExam {
  id: string;
  code: string;
  title: string;
  year: string;
  durationMinutes: number;
  totalPoints: number;
  problem1: {
    title: string;
    points: number;
    subparts: { id: string; label: string; points: number; content: string; rubric: string; solution: string }[];
  };
  problem2: {
    title: string;
    points: number;
    subparts: { id: string; label: string; points: number; content: string; rubric: string; solution: string }[];
  };
  problem3: {
    title: string;
    points: number;
    subparts: { id: string; label: string; points: number; content: string; rubric: string; solution: string }[];
  };
  problem4: {
    title: string;
    points: number;
    subparts: { id: string; label: string; points: number; content: string; rubric: string; solution: string }[];
  };
  problem5: {
    title: string;
    points: number;
    subparts: { id: string; label: string; points: number; content: string; rubric: string; solution: string }[];
  };
}

export const GIFTED_22_EXAMS: GiftedOfficialExam[] = [
  // =========================================================================
  // ĐỀ SỐ 01: ĐỀ THI THỬ CHỌN HỌC SINH GIỎI TOÁN THCS - SỐ 01 (MÃ ĐỀ 2601)
  // =========================================================================
  {
    id: 'hsg-exam-01',
    code: '2601',
    title: 'KỲ THI CHỌN HỌC SINH GIỎI LỚP 9 CẤP THÀNH PHỐ NĂM HỌC 2026 - 2027 (ĐỀ SỐ 01)',
    year: '2026 - 2027',
    durationMinutes: 150,
    totalPoints: 20.0,
    problem1: {
      title: 'Bài 1. (5,0 điểm)',
      points: 5.0,
      subparts: [
        {
          id: 'p1-1',
          label: '1) Biến đổi biểu thức đại số (2,5 điểm)',
          points: 2.5,
          content: 'Cho các số thực dương $a, b, c$ thỏa mãn $ab + bc + ca = 1$. Rút gọn và tính giá trị của biểu thức:\n$$P = a\\sqrt{\\frac{(1+b^2)(1+c^2)}{1+a^2}} + b\\sqrt{\\frac{(1+c^2)(1+a^2)}{1+b^2}} + c\\sqrt{\\frac{(1+a^2)(1+b^2)}{1+c^2}}$$',
          rubric: '• Phân tích $1 + a^2 = (a+b)(a+c)$: 1,0đ\n• Khai phương biểu thức trong căn: 1,0đ\n• Kết luận $P = 2$: 0,5đ',
          solution: `Thay $1 = ab + bc + ca$ vào các biểu thức:
$$1 + a^2 = a^2 + ab + bc + ca = a(a + b) + c(a + b) = (a + b)(a + c)$$
Hoàn toàn tương tự: $1 + b^2 = (b + a)(b + c)$ và $1 + c^2 = (c + a)(c + b)$.
Xét biểu thức thứ nhất dưới dấu căn:
$$\\frac{(1+b^2)(1+c^2)}{1+a^2} = \\frac{(b+a)(b+c)(c+a)(c+b)}{(a+b)(a+c)} = (b+c)^2$$
Vì $b, c > 0$ nên $\\sqrt{(b+c)^2} = b + c$.
Tương tự cho hai căn thức còn lại:
$$P = a(b+c) + b(c+a) + c(a+b) = 2(ab + bc + ca) = 2(1) = 2.$$`,
        },
        {
          id: 'p1-2',
          label: '2) Phương trình bậc hai và định lí Viéte (2,5 điểm)',
          points: 2.5,
          content: 'Cho phương trình $x^2 - 2(m-1)x + 2m - 5 = 0$ ($m$ là tham số). Tìm $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$ thỏa mãn: $x_1^2 + x_2^2 + x_1 x_2 = 7$.',
          rubric: '• Tính biệt thức $\\Delta\'$ và chứng minh luôn có 2 nghiệm phân biệt: 0,75đ\n• Viết hệ thức Viète $S, P$: 0,5đ\n• Biến đổi $S^2 - P = 7$: 0,75đ\n• Giải ra $m$ và kết luận: 0,5đ',
          solution: `1. Biệt thức: $\\Delta\' = (m-1)^2 - (2m - 5) = m^2 - 4m + 6 = (m-2)^2 + 2 > 0$ với mọi $m$.
Vậy phương trình luôn có hai nghiệm phân biệt $x_1, x_2$ với mọi $m$.
2. Theo hệ thức Viète: $\\begin{cases} x_1 + x_2 = 2(m-1) \\\\ x_1 x_2 = 2m - 5 \\end{cases}$.
3. Biến đổi giả thiết:
$$x_1^2 + x_2^2 + x_1 x_2 = (x_1 + x_2)^2 - x_1 x_2 = 7$$
$$4(m-1)^2 - (2m - 5) = 7 \\iff 4(m^2 - 2m + 1) - 2m + 5 - 7 = 0$$
$$\\iff 4m^2 - 10m + 2 = 0 \\iff 2m^2 - 5m + 1 = 0.$$
Giải phương trình bậc hai theo $m$:
$$\\Delta_m = (-5)^2 - 4(2)(1) = 25 - 8 = 17 > 0.$$
Suy ra $m = \\frac{5 \\pm \\sqrt{17}}{4}$. Cả hai giá trị đều thỏa mãn.`,
        },
      ],
    },
    problem2: {
      title: 'Bài 2. (4,0 điểm)',
      points: 4.0,
      subparts: [
        {
          id: 'p2-1',
          label: '1) Đa thức và phép chia đa thức Bézout (2,0 điểm)',
          points: 2.0,
          content: 'Xác định đa thức bậc ba $f(x)$ biết rằng khi chia $f(x)$ cho $x - 1$ dư 4, chia cho $x - 2$ dư 7, chia cho $x - 3$ dư 12 và $f(0) = 3$.',
          rubric: '• Xây dựng đa thức phụ $g(x) = x^2 + 3$: 0,75đ\n• Biểu diễn $f(x) - g(x) = a(x-1)(x-2)(x-3)$: 0,5đ\n• Dùng $f(0) = 3$ tìm $a = 0$ và suy ra đa thức: 0,75đ',
          solution: `Theo định lí Bézout: $f(1) = 4, f(2) = 7, f(3) = 12$.
Nhận xét: $4 = 1^2 + 3, 7 = 2^2 + 3, 12 = 3^2 + 3$.
Xét đa thức phụ $g(x) = x^2 + 3$.
Đặt $h(x) = f(x) - (x^2 + 3)$.
Ta có $h(1) = f(1) - 4 = 0; h(2) = f(2) - 7 = 0; h(3) = f(3) - 12 = 0$.
Do đó $x = 1, 2, 3$ là các nghiệm của $h(x)$.
Vì $f(x)$ có bậc không quá 3 nên $h(x) = a(x-1)(x-2)(x-3)$ (với $a$ là hằng số).
Suy ra: $f(x) = a(x-1)(x-2)(x-3) + x^2 + 3$.
Mặt khác: $f(0) = a(-1)(-2)(-3) + 3 = -6a + 3 = 3 \\implies -6a = 0 \\implies a = 0$.
Vậy $f(x) = x^2 + 3$.`,
        },
        {
          id: 'p2-2',
          label: '2) Phương trình – Hệ phương trình (2,0 điểm)',
          points: 2.0,
          content: 'Giải hệ phương trình: $\\begin{cases} x^3 + 1 = 2y \\\\ y^3 + 1 = 2x \\end{cases}$',
          rubric: '• Trừ vế theo vế và phân tích nhân tử $(x-y)(x^2+xy+y^2+2) = 0$: 0,75đ\n• Đánh giá $x^2+xy+y^2+2 > 0$: 0,5đ\n• Giải nghiệm $x=y$ và kết luận 3 nghiệm: 0,75đ',
          solution: `Trừ vế theo vế hai phương trình của hệ:
$$x^3 - y^3 = 2(y - x) \\iff (x - y)(x^2 + xy + y^2) + 2(x - y) = 0$$
$$\\iff (x - y)(x^2 + xy + y^2 + 2) = 0.$$
Ta có: $x^2 + xy + y^2 + 2 = \\left(x + \\frac{y}{2}\\right)^2 + \\frac{3y^2}{4} + 2 > 0$ với mọi $x, y$.
Do đó bắt buộc $x - y = 0 \\iff x = y$.
Thay $y = x$ vào phương trình thứ nhất:
$$x^3 + 1 = 2x \\iff x^3 - 2x + 1 = 0 \\iff (x - 1)(x^2 + x - 1) = 0.$$
- $x - 1 = 0 \\iff x = 1 \\implies y = 1$.
- $x^2 + x - 1 = 0 \\implies x = \\frac{-1 \\pm \\sqrt{5}}{2} \\implies y = \\frac{-1 \\pm \\sqrt{5}}{2}$.
Vậy hệ có 3 nghiệm: $(1; 1), \\left(\\frac{-1+\\sqrt{5}}{2}; \\frac{-1+\\sqrt{5}}{2}\\right), \\left(\\frac{-1-\\sqrt{5}}{2}; \\frac{-1-\\sqrt{5}}{2}\\right)$.`,
        },
      ],
    },
    problem3: {
      title: 'Bài 3. (2,0 điểm)',
      points: 2.0,
      subparts: [
        {
          id: 'p3-1',
          label: '1) Tổ hợp và Nguyên lý Dirichlet (1,0 điểm)',
          points: 1.0,
          content: 'Cho 2027 số nguyên dương bất kì. Chứng minh rằng trong các số đó, luôn tồn tại ít nhất hai số có hiệu chia hết cho 2026.',
          rubric: '• Nêu 2026 số dư khi chia cho 2026: 0,25đ\n• Khẳng định có 2027 số theo Dirichlet: 0,5đ\n• Kết luận hiệu chia hết cho 2026: 0,25đ',
          solution: `Khi chia một số nguyên cho 2026, ta chỉ có thể nhận được 2026 số dư khác nhau thuộc tập hợp:
$$\\{0; 1; 2; 3; ...; 2025\\}$$
Coi 2026 số dư này là 2026 "cái chuồng", và 2027 số nguyên đã cho là 2027 "con thỏ".
Theo Nguyên lý Dirichlet, vì số thỏ lớn hơn số chuồng ($2027 > 2026$), nên luôn tồn tại ít nhất hai số khi chia cho 2026 có cùng một số dư.
Gọi hai số đó là $a$ và $b$ với $a \\equiv r \\pmod{2026}$ và $b \\equiv r \\pmod{2026}$.
Khi đó hiệu $a - b = (2026k_1 + r) - (2026k_2 + r) = 2026(k_1 - k_2)$ chia hết cho 2026. (đpcm)`,
        },
        {
          id: 'p3-2',
          label: '2) Số học và Phương trình nghiệm nguyên (1,0 điểm)',
          points: 1.0,
          content: 'Tìm tất cả các cặp số nguyên $(x; y)$ thỏa mãn phương trình: $xy - 2x + 3y = 11$.',
          rubric: '• Đưa về phương trình ước số $(x + 3)(y - 2) = 5$: 0,5đ\n• Lập bảng ước số và kết luận 4 cặp nghiệm: 0,5đ',
          solution: `Biến đổi phương trình về dạng phương trình ước số:
$$x(y - 2) + 3(y - 2) + 6 = 11 \\iff (x + 3)(y - 2) = 5.$$
Vì $x, y \\in \\mathbb{Z}$ nên $x + 3$ và $y - 2$ là các ước của 5: $\\text{Ư}(5) = \\{-5; -1; 1; 5\\}$.
Ta có bảng giá trị:
- $x + 3 = -5 \\implies x = -8$; $y - 2 = -1 \\implies y = 1$.
- $x + 3 = -1 \\implies x = -4$; $y - 2 = -5 \\implies y = -3$.
- $x + 3 = 1 \\implies x = -2$; $y - 2 = 5 \\implies y = 7$.
- $x + 3 = 5 \\implies x = 2$; $y - 2 = 1 \\implies y = 3$.
Vậy các cặp số nguyên $(x; y)$ thỏa mãn là: $(-8; 1), (-4; -3), (-2; 7), (2; 3)$.`,
        },
      ],
    },
    problem4: {
      title: 'Bài 4. (2,0 điểm)',
      points: 2.0,
      subparts: [
        {
          id: 'p4-1',
          label: '1) Bất đẳng thức và Cực trị đại số (1,0 điểm)',
          points: 1.0,
          content: 'Cho hai số thực dương $a, b$ thỏa mãn $a + b \\le 2$. Tìm giá trị nhỏ nhất của biểu thức:\n$$T = \\frac{1}{a^2 + b^2} + \\frac{1}{2ab} + 2026$$',
          rubric: '• Áp dụng BĐT Cauchy-Schwarz dạng Engel: 0,5đ\n• Sử dụng BĐT $2ab \\le \\frac{(a+b)^2}{2}$: 0,25đ\n• Kết luận $\\min T = 2027$: 0,25đ',
          solution: `Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel:
$$\\frac{1}{a^2 + b^2} + \\frac{1}{2ab} \\ge \\frac{(1 + 1)^2}{a^2 + b^2 + 2ab} = \\frac{4}{(a + b)^2}.$$
Vì $a + b \\le 2$ nên $(a + b)^2 \\le 4 \\implies \\frac{4}{(a + b)^2} \\ge \\frac{4}{4} = 1$.
Do đó:
$$T = \\frac{1}{a^2 + b^2} + \\frac{1}{2ab} + 2026 \\ge 1 + 2026 = 2027.$$
Dấu "=" xảy ra khi và chỉ khi: $\\begin{cases} a^2 + b^2 = 2ab \\\\ a + b = 2 \\end{cases} \\iff a = b = 1$.
Vậy giá trị nhỏ nhất của $T$ là 2027 khi $a = b = 1$.`,
        },
        {
          id: 'p4-2',
          label: '2) Xác suất cổ điển có sử dụng quy tắc nhân (1,0 điểm)',
          points: 1.0,
          content: 'Một hộp chứa 5 viên bi xanh và 4 viên bi đỏ có kích thước như nhau. Lấy ngẫu nhiên liên tiếp 2 lần, mỗi lần lấy một viên bi và không hoàn lại. Tính xác suất để lấy được cả hai viên bi màu xanh.',
          rubric: '• Tính xác suất lần 1 lấy bi xanh: 0,25đ\n• Tính xác suất lần 2 lấy bi xanh: 0,25đ\n• Áp dụng quy tắc nhân xác suất: 0,5đ',
          solution: `Tổng số viên bi trong hộp lúc đầu là $5 + 4 = 9$ viên bi.
Gọi $A$ là biến cố: "Lần thứ nhất lấy được viên bi xanh".
Xác suất của biến cố $A$ là: $P(A) = \\frac{5}{9}$.
Sau khi lấy được 1 viên bi xanh, trong hộp còn lại 8 viên bi (gồm 4 xanh và 4 đỏ).
Gọi $B$ là biến cố: "Lần thứ hai lấy được viên bi xanh".
Xác suất lấy tiếp được bi xanh là: $P(B \\mid A) = \\frac{4}{8} = \\frac{1}{2}$.
Theo quy tắc nhân xác suất, xác suất để cả hai lần đều lấy được viên bi màu xanh là:
$$P = P(A) \\cdot P(B \\mid A) = \\frac{5}{9} \\cdot \\frac{1}{2} = \\frac{5}{18}.$$
Kết luận: Xác suất cần tìm là $\\frac{5}{18}$.`,
        },
      ],
    },
    problem5: {
      title: 'Bài 5. (7,0 điểm)',
      points: 7.0,
      subparts: [
        {
          id: 'p5-1',
          label: 'a) Chứng minh tứ giác nội tiếp và quan hệ hình học (3,0 điểm)',
          points: 3.0,
          content: 'Cho tam giác nhọn $ABC$ ($AB < AC$) nội tiếp đường tròn $(O; R)$. Ba đường cao $AD, BE, CF$ cắt nhau tại trực tâm $H$. Chứng minh rằng tứ giác $BFHD$ và tứ giác $BCEF$ nội tiếp được đường tròn.',
          rubric: '• Chứng minh tứ giác $BFHD$ nội tiếp (tổng 2 góc đối = 180°): 1,5đ\n• Chứng minh tứ giác $BCEF$ nội tiếp (hai đỉnh kề cùng nhìn đoạn thẳng): 1,5đ',
          solution: `1. Xét tứ giác $BFHD$:
Ta có $AD \\perp BC \\implies \\widehat{BDH} = 90^\\circ$.
$CF \\perp AB \\implies \\widehat{BFH} = 90^\\circ$.
Suy ra: $\\widehat{BDH} + \\widehat{BFH} = 90^\\circ + 90^\\circ = 180^\\circ$.
Do tổng hai góc đối diện bằng $180^\\circ$ nên tứ giác $BFHD$ nội tiếp đường tròn đường kính $BH$. (1,5 điểm)
2. Xét tứ giác $BCEF$:
Ta có $BE \\perp AC \\implies \\widehat{BEC} = 90^\\circ$.
$CF \\perp AB \\implies \\widehat{BFC} = 90^\\circ$.
Hai đỉnh $E$ và $F$ kề nhau cùng nhìn cạnh $BC$ dưới góc $90^\\circ$.
Do đó tứ giác $BCEF$ nội tiếp đường tròn đường kính $BC$. (1,5 điểm)`,
        },
        {
          id: 'p5-2',
          label: 'b) Đường kính và tính chất trực tâm (3,0 điểm)',
          points: 3.0,
          content: 'Kẻ đường kính $AK$ của đường tròn $(O)$. Chứng minh rằng tứ giác $BHCK$ là hình bình hành và $H, M, K$ thẳng hàng với $M$ là trung điểm của $BC$.',
          rubric: '• Chứng minh $BK \\parallel CH$ và $CK \\parallel BH$: 1,5đ\n• Suy ra $BHCK$ là hình bình hành: 0,75đ\n• Suy ra $M$ là trung điểm $HK \\implies H, M, K$ thẳng hàng: 0,75đ',
          solution: `1. Vì $AK$ là đường kính của $(O)$ nên:
$\\widehat{ABK} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn) $\\implies BK \\perp AB$.
Mặt khác: $CH \\perp AB$ (do $CH$ là đường cao) $\\implies BK \\parallel CH$.
Tương tự: $\\widehat{ACK} = 90^\\circ \\implies CK \\perp AC$.
Mặt khác: $BH \\perp AC$ (đường cao) $\\implies CK \\parallel BH$.
Tứ giác $BHCK$ có các cặp cạnh đối song song nên $BHCK$ là hình bình hành. (1,5 điểm)
2. Vì $BHCK$ là hình bình hành nên hai đường chéo $BC$ và $HK$ cắt nhau tại trung điểm của mỗi đường.
Do $M$ là trung điểm của $BC$ nên $M$ cũng là trung điểm của $HK$.
Suy ra ba điểm $H, M, K$ thẳng hàng. (1,5 điểm)`,
        },
        {
          id: 'p5-3',
          label: 'c) Phương tích và tiếp tuyến (1,0 điểm)',
          points: 1.0,
          content: 'Đường thẳng $EF$ cắt đường tròn $(O)$ tại hai điểm $P$ và $Q$. Gọi $T$ là tiếp điểm của tiếp tuyến kẻ từ $A$ tới $(O)$. Áp dụng định lí phương tích để chứng minh $AP^2 = AQ^2 = AE \\cdot AC$.',
          rubric: '• Dùng tứ giác nội tiếp chứng minh $\\Delta AEF \\sim \\Delta ACB$: 0,5đ\n• Áp dụng hệ thức phương tích $AE \\cdot AC = AF \\cdot AB = AP \\cdot AQ$: 0,5đ',
          solution: `Vì tứ giác $BCEF$ nội tiếp nên $\\widehat{AEF} = \\widehat{ABC}$.
Xét $\\Delta AEF$ và $\\Delta ACB$ có góc $\\widehat{A}$ chung và $\\widehat{AEF} = \\widehat{ABC}$.
Suy ra $\\Delta AEF \\sim \\Delta ACB$ (g.g) $\\implies \\frac{AE}{AB} = \\frac{AF}{AC} \\implies AE \\cdot AC = AF \\cdot AB$.
Mặt khác, theo định lí phương tích của điểm $A$ đối với đường tròn ngoại tiếp tứ giác $BCEF$ và đường tròn $(O)$:
Đường thẳng $EF$ cắt $(O)$ tại $P, Q$ nên $AP \\cdot AQ = AF \\cdot AB = AE \\cdot AC$.
Do tính đối xứng của cát tuyến qua trung trực, ta có $AP = AQ$, suy ra $AP^2 = AE \\cdot AC$. (1,0 điểm)`,
        },
      ],
    },
  },

  // =========================================================================
  // ĐỀ SỐ 02: KỲ THI CHỌN HSG TOÁN 9 - SỐ 02 (MÃ ĐỀ 2602)
  // =========================================================================
  {
    id: 'hsg-exam-02',
    code: '2602',
    title: 'KỲ THI CHỌN HỌC SINH GIỎI LỚP 9 CẤP THÀNH PHỐ NĂM HỌC 2026 - 2027 (ĐỀ SỐ 02)',
    year: '2026 - 2027',
    durationMinutes: 150,
    totalPoints: 20.0,
    problem1: {
      title: 'Bài 1. (5,0 điểm)',
      points: 5.0,
      subparts: [
        {
          id: 'e02-p1-1',
          label: '1) Biến đổi biểu thức căn thức (2,5 điểm)',
          points: 2.5,
          content: 'Rút gọn biểu thức: $A = \\sqrt{2 + \\sqrt{3}} \\cdot \\sqrt{2 + \\sqrt{2 + \\sqrt{3}}} \\cdot \\sqrt{2 - \\sqrt{2 + \\sqrt{3}}}$.',
          rubric: '• Nhóm hai căn thức liên hợp cuối: 1,25đ\n• Khai triển hiệu hai bình phương ra $\\sqrt{2-\\sqrt{3}}$: 0,75đ\n• Nhân với căn đầu tiên ra kết quả 1: 0,5đ',
          solution: `Nhóm hai thừa số cuối cùng:
$$B = \\sqrt{2 + \\sqrt{2 + \\sqrt{3}}} \\cdot \\sqrt{2 - \\sqrt{2 + \\sqrt{3}}} = \\sqrt{4 - (2 + \\sqrt{3})} = \\sqrt{2 - \\sqrt{3}}.$$
Khi đó:
$$A = \\sqrt{2 + \\sqrt{3}} \\cdot B = \\sqrt{2 + \\sqrt{3}} \\cdot \\sqrt{2 - \\sqrt{3}} = \\sqrt{4 - 3} = \\sqrt{1} = 1.$$
Vậy giá trị của biểu thức $A = 1$.`,
        },
        {
          id: 'e02-p1-2',
          label: '2) Phương trình bậc hai và định lý Viète (2,5 điểm)',
          points: 2.5,
          content: 'Cho phương trình $x^2 - mx + m - 2 = 0$. Tìm $m$ để phương trình có hai nghiệm $x_1, x_2$ thỏa mãn: $x_1^2 + x_2^2 - x_1 x_2 = 7$.',
          rubric: '• $\\Delta = (m-2)^2 + 4 > 0$: 0,75đ\n• Biểu diễn theo Viète: 1,0đ\n• Tìm $m$: 0,75đ',
          solution: `$\\Delta = m^2 - 4(m-2) = m^2 - 4m + 8 = (m-2)^2 + 4 > 0$ với mọi $m$.
Theo Viète: $x_1 + x_2 = m$ và $x_1 x_2 = m - 2$.
$$x_1^2 + x_2^2 - x_1 x_2 = (x_1 + x_2)^2 - 3x_1 x_2 = m^2 - 3(m-2) = m^2 - 3m + 6 = 7$$
$$\\iff m^2 - 3m - 1 = 0 \\implies m = \\frac{3 \\pm \\sqrt{13}}{2}.$$`,
        },
      ],
    },
    problem2: {
      title: 'Bài 2. (4,0 điểm)',
      points: 4.0,
      subparts: [
        {
          id: 'e02-p2-1',
          label: '1) Đa thức có nghiệm nguyên (2,0 điểm)',
          points: 2.0,
          content: 'Tìm đa thức $P(x)$ bậc hai có hệ số nguyên biết $P(1) = 2$ và $P(x) - P(x-1) = 2x - 1$ với mọi $x$.',
          rubric: '• Đặt $P(x) = ax^2 + bx + c$: 0,5đ\n• Đồng nhất hệ số tìm $a, b$: 1,0đ\n• Dùng $P(1)=2$ tìm $c$ và kết luận: 0,5đ',
          solution: `Giả sử $P(x) = ax^2 + bx + c$.
Ta có: $P(x) - P(x-1) = a[x^2 - (x-1)^2] + b[x - (x-1)] = a(2x - 1) + b = 2ax - a + b$.
Đồng nhất với $2x - 1$: $\\begin{cases} 2a = 2 \\\\ -a + b = -1 \\end{cases} \\implies a = 1, b = 0$.
Suy ra $P(x) = x^2 + c$.
Vì $P(1) = 1^2 + c = 2 \\implies c = 1$.
Vậy đa thức cần tìm là $P(x) = x^2 + 1$.`,
        },
        {
          id: 'e02-p2-2',
          label: '2) Hệ phương trình đối xứng loại 1 (2,0 điểm)',
          points: 2.0,
          content: 'Giải hệ phương trình: $\\begin{cases} x + y + xy = 5 \\\\ x^2 + y^2 + xy = 7 \\end{cases}$',
          rubric: '• Đặt $S = x+y, P = xy$: 0,5đ\n• Lập hệ theo $S, P$: 0,75đ\n• Tìm các nghiệm $(x; y)$: 0,75đ',
          solution: `Đặt $S = x + y$ và $P = xy$ ($S^2 \\ge 4P$).
Hệ trở thành: $\\begin{cases} S + P = 5 \\\\ S^2 - P = 7 \\end{cases}$.
Cộng hai phương trình: $S^2 + S - 12 = 0 \\implies (S - 3)(S + 4) = 0$.
- Với $S = 3 \\implies P = 2$. Phương trình $t^2 - 3t + 2 = 0 \\implies t \\in \\{1; 2\\}$.
Nghiệm: $(1; 2)$ và $(2; 1)$.
- Với $S = -4 \\implies P = 9$. Kiểm tra $S^2 - 4P = 16 - 36 = -20 < 0$ (loại).
Vậy hệ có 2 nghiệm: $(1; 2), (2; 1)$.`,
        },
      ],
    },
    problem3: {
      title: 'Bài 3. (2,0 điểm)',
      points: 2.0,
      subparts: [
        {
          id: 'e02-p3-1',
          label: '1) Tổ hợp - Nguyên lý cực hạn (1,0 điểm)',
          points: 1.0,
          content: 'Trên mặt phẳng cho 2026 điểm phân biệt không có 3 điểm nào thẳng hàng. Chứng minh luôn vẽ được một đường tròn đi qua 3 điểm sao cho bên trong đường tròn không chứa điểm nào trong các điểm còn lại.',
          rubric: '• Xét tập hợp các tam giác tạo bởi 3 điểm: 0,25đ\n• Chọn tam giác có diện tích nhỏ nhất theo nguyên lý cực hạn: 0,5đ\n• Lập luận đường tròn ngoại tiếp không chứa điểm nào: 0,25đ',
          solution: `Số tam giác tạo bởi 2026 điểm là hữu hạn. Do đó theo nguyên lý cực hạn, luôn tồn tại một tam giác $ABC$ có diện tích nhỏ nhất.
Giả sử đường tròn ngoại tiếp $\\Delta ABC$ chứa một điểm $D$. Khi đó diện tích của một trong các tam giác $ABD, BCD, CAD$ sẽ nhỏ hơn diện tích tam giác $ABC$, mâu thuẫn với tính nhỏ nhất.
Vậy đường tròn ngoại tiếp tam giác có diện tích nhỏ nhất thỏa mãn yêu cầu đề bài.`,
        },
        {
          id: 'e02-p3-2',
          label: '2) Số học - Số chính phương (1,0 điểm)',
          points: 1.0,
          content: 'Tìm số tự nhiên $n$ sao cho $n^2 + 2026$ là một số chính phương.',
          rubric: '• Đưa về $(k - n)(k + n) = 2026$: 0,5đ\n• Xét tính chẵn lẻ của hai thừa số và kết luận vô nghiệm: 0,5đ',
          solution: `Đặt $n^2 + 2026 = k^2$ ($k \\in \\mathbb{N}, k > n$).
$$\\iff k^2 - n^2 = 2026 \\iff (k - n)(k + n) = 2026.$$
Ta thấy $(k - n) + (k + n) = 2k$ là số chẵn, nên $k - n$ và $k + n$ có cùng tính chẵn lẻ.
Do đó tích của chúng hoặc là số lẻ (nếu cả 2 lẻ) hoặc chia hết cho 4 (nếu cả 2 chẵn).
Mà $2026 = 2 \\times 1013$ là số chẵn nhưng không chia hết cho 4 ($2026 \\equiv 2 \\pmod 4$).
Do đó không tồn tại hai số nguyên có cùng tính chẵn lẻ mà tích bằng 2026.
Vậy không tồn tại số tự nhiên $n$ thỏa mãn.`,
        },
      ],
    },
    problem4: {
      title: 'Bài 4. (2,0 điểm)',
      points: 2.0,
      subparts: [
        {
          id: 'e02-p4-1',
          label: '1) Bất đẳng thức Côsi 3 biến (1,0 điểm)',
          points: 1.0,
          content: 'Cho ba số thực dương $x, y, z$ thỏa mãn $x + y + z = 3$. Tìm giá trị nhỏ nhất của biểu thức:\n$$P = \\frac{x^2}{y+1} + \\frac{y^2}{z+1} + \\frac{z^2}{x+1}$$',
          rubric: '• Kỹ thuật Côsi ngược dấu hoặc Cauchy-Schwarz: 0,5đ\n• Đánh giá và chỉ ra $\\min P = 3/2$: 0,5đ',
          solution: `Áp dụng bất đẳng thức Cauchy-Schwarz dạng phân thức:
$$P \\ge \\frac{(x + y + z)^2}{(y+1) + (z+1) + (x+1)} = \\frac{(x + y + z)^2}{x + y + z + 3} = \\frac{3^2}{3 + 3} = \\frac{9}{6} = \\frac{3}{2}.$$
Dấu "=" xảy ra khi $x = y = z = 1$.
Vậy giá trị nhỏ nhất của $P$ là $\\frac{3}{2}$.`,
        },
        {
          id: 'e02-p4-2',
          label: '2) Quy tắc nhân xác suất (1,0 điểm)',
          points: 1.0,
          content: 'Một học sinh trả lời độc lập hai câu hỏi trắc nghiệm. Xác suất trả lời đúng câu 1 là 0,7 và câu 2 là 0,6. Tính xác suất để học sinh đó trả lời đúng ít nhất một câu.',
          rubric: '• Xác suất sai câu 1 và câu 2: 0,5đ\n• Dùng biến cố đối: 0,5đ',
          solution: `Xác suất trả lời sai câu 1 là $1 - 0{,}7 = 0{,}3$.
Xác suất trả lời sai câu 2 là $1 - 0{,}6 = 0{,}4$.
Do hai câu trả lời độc lập, xác suất trả lời sai cả hai câu là:
$$P(\\text{sai cả hai}) = 0{,}3 \\times 0{,}4 = 0{,}12.$$
Xác suất để học sinh đó trả lời đúng ít nhất một câu là:
$$P = 1 - 0{,}12 = 0{,}88.$$`,
        },
      ],
    },
    problem5: {
      title: 'Bài 5. (7,0 điểm)',
      points: 7.0,
      subparts: [
        {
          id: 'e02-p5-1',
          label: 'a) Chứng minh tứ giác nội tiếp và phân giác (3,0 điểm)',
          points: 3.0,
          content: 'Cho đường tròn $(O)$ đường kính $AB$. Lấy điểm $C$ trên cung $AB$ ($C \\ne A, B$). Tiếp tuyến tại $C$ cắt tiếp tuyến tại $A$ ở $M$. Chứng minh rằng $OM \\perp AC$ và $OM$ song song với $BC$.',
          rubric: '• $OM$ là trung trực $AC \\implies OM \\perp AC$: 1,5đ\n• $BC \\perp AC \\implies OM \\parallel BC$: 1,5đ',
          solution: `1. Ta có $MA = MC$ (tính chất hai tiếp tuyến cắt nhau) và $OA = OC = R$.
Do đó $OM$ là đường trung trực của đoạn thẳng $AC \\implies OM \\perp AC$. (1,5 điểm)
2. Điểm $C$ thuộc đường tròn đường kính $AB$ nên $\\widehat{ACB} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn) $\\implies BC \\perp AC$.
Mà $OM \\perp AC$, do đó $OM \\parallel BC$ (cùng vuông góc với $AC$). (1,5 điểm)`,
        },
        {
          id: 'e02-p5-2',
          label: 'b) Đường tròn bàng tiếp tam giác (3,0 điểm)',
          points: 3.0,
          content: 'Vẽ đường tròn bàng tiếp góc $A$ của tam giác $ABC$, tiếp xúc với cạnh $BC$ tại $D$. Chứng minh rằng độ dài đoạn thẳng $CD = \\frac{AB + BC - AC}{2}$.',
          rubric: '• Sử dụng tính chất các đoạn tiếp tuyến cắt nhau: 1,5đ\n• Thiết lập hệ thức độ dài: 1,5đ',
          solution: `Gọi đường tròn bàng tiếp góc $A$ tiếp xúc với các tia kéo dài của $AB, AC$ lần lượt tại $E$ và $F$.
Theo tính chất hai tiếp tuyến cắt nhau:
$AE = AF$; $BE = BD$; $CD = CF$.
Chu vi tam giác $ABC$:
$$2p = AB + BC + CA = AB + (BD + DC) + CA = (AB + BE) + (AC + CF) = AE + AF = 2AE \\implies AE = p.$$
Mặt khác: $CD = CF = AF - AC = p - AC = \\frac{AB + BC + AC}{2} - AC = \\frac{AB + BC - AC}{2}$. (đpcm)`,
        },
        {
          id: 'e02-p5-3',
          label: 'c) Bổ đề hình thang và trung điểm (1,0 điểm)',
          points: 1.0,
          content: 'Kẻ $CH \\perp AB$ tại $H$. Đoạn thẳng $MB$ cắt $CH$ tại $I$. Chứng minh $I$ là trung điểm của $CH$.',
          rubric: '• Kéo dài $BC$ cắt tiếp tuyến tại $A$: 0,5đ\n• Áp dụng định lí Ta-lét chứng minh $IH = IC$: 0,5đ',
          solution: `Kéo dài $BC$ cắt tiếp tuyến tại $A$ ở điểm $K$.
Ta có $\\widehat{ACB} = 90^\\circ \\implies AC \\perp KB$.
Trong $\\Delta AKB$ vuông tại $A$ có $AC \\perp KB \\implies M$ là trung điểm $AK$.
Vì $CH \\parallel AK$ (cùng $\\perp AB$), theo Ta-lét: $\\frac{IC}{MK} = \\frac{BI}{BM} = \\frac{IH}{MA}$.
Do $MA = MK$ nên $IC = IH$. Vậy $I$ là trung điểm $CH$.`,
        },
      ],
    },
  },

  // Remaining simulated official exams (3 to 22)
  ...Array.from({ length: 20 }, (_, i) => {
    const examNum = i + 3;
    const code = String(2600 + examNum);
    return {
      id: `hsg-exam-${examNum < 10 ? '0' + examNum : examNum}`,
      code,
      title: `KỲ THI CHỌN HỌC SINH GIỎI LỚP 9 CẤP THÀNH PHỐ NĂM HỌC 2026 - 2027 (ĐỀ SỐ ${examNum < 10 ? '0' + examNum : examNum})`,
      year: '2026 - 2027',
      durationMinutes: 150,
      totalPoints: 20.0,
      problem1: {
        title: 'Bài 1. (5,0 điểm)',
        points: 5.0,
        subparts: [
          {
            id: `p1-1-${examNum}`,
            label: '1) Biến đổi biểu thức đại số (2,5 điểm)',
            points: 2.5,
            content: `Cho $x, y, z$ thỏa mãn $x + y + z = 0$ và $xyz \\ne 0$. Rút gọn biểu thức:\n$$P = \\frac{x^2}{y^2 + z^2 - x^2} + \\frac{y^2}{z^2 + x^2 - y^2} + \\frac{z^2}{x^2 + y^2 - z^2}$$`,
            rubric: '• Biến đổi $y^2 + z^2 - x^2 = -2yz$: 1,0đ\n• Đưa về mẫu chung $2xyz$: 1,0đ\n• Khai thác $x^3 + y^3 + z^3 = 3xyz \\implies P = -3/2$: 0,5đ',
            solution: `Từ $x + y + z = 0 \\implies y + z = -x \\implies (y+z)^2 = x^2 \\iff y^2 + z^2 - x^2 = -2yz$.
Tương tự: $z^2 + x^2 - y^2 = -2zx$ và $x^2 + y^2 - z^2 = -2xy$.
Do đó:
$$P = -\\frac{x^2}{2yz} - \\frac{y^2}{2zx} - \\frac{z^2}{2xy} = -\\frac{x^3 + y^3 + z^3}{2xyz}.$$
Vì $x + y + z = 0$ nên $x^3 + y^3 + z^3 = 3xyz$.
Suy ra $P = -\\frac{3xyz}{2xyz} = -\\frac{3}{2}$.`,
          },
          {
            id: `p1-2-${examNum}`,
            label: '2) Phương trình bậc hai và Viète (2,5 điểm)',
            points: 2.5,
            content: `Cho phương trình $x^2 - (2m+1)x + m^2 + m = 0$. Chứng minh phương trình luôn có hai nghiệm phân biệt với mọi $m$ và tìm $m$ để $|x_1 - x_2| = 1$.`,
            rubric: '• $\\Delta = 1 > 0$ với mọi $m$: 1,0đ\n• Tính hai nghiệm $x_1 = m, x_2 = m + 1$: 1,0đ\n• Thỏa mãn $|x_1 - x_2| = 1$ với mọi $m$: 0,5đ',
            solution: `Ta có $\\Delta = (2m + 1)^2 - 4(m^2 + m) = 4m^2 + 4m + 1 - 4m^2 - 4m = 1 > 0$.
Do đó phương trình luôn có 2 nghiệm phân biệt với mọi $m$:
$$x_1 = \\frac{2m + 1 - 1}{2} = m; \\quad x_2 = \\frac{2m + 1 + 1}{2} = m + 1.$$
Khi đó $|x_1 - x_2| = |m - (m + 1)| = |-1| = 1$ đúng với mọi số thực $m$.`,
          },
        ],
      },
      problem2: {
        title: 'Bài 2. (4,0 điểm)',
        points: 4.0,
        subparts: [
          {
            id: `p2-1-${examNum}`,
            label: '1) Đa thức và phép chia hết (2,0 điểm)',
            points: 2.0,
            content: `Tìm các hệ số $a, b$ để đa thức $f(x) = x^4 + ax^2 + b$ chia hết cho đa thức $g(x) = x^2 - 3x + 2$.`,
            rubric: '• Nghiệm của $g(x)$ là $x = 1, x = 2$: 0,5đ\n• Hệ phương trình $f(1) = 0, f(2) = 0$: 1,0đ\n• Tìm $a = -5, b = 4$: 0,5đ',
            solution: `Ta có $x^2 - 3x + 2 = (x - 1)(x - 2)$.
$f(x)$ chia hết cho $g(x) \\iff f(1) = 0$ và $f(2) = 0$.
$$\\begin{cases} 1 + a + b = 0 \\\\ 16 + 4a + b = 0 \\end{cases} \\iff \\begin{cases} a + b = -1 \\\\ 4a + b = -16 \\end{cases} \\implies 3a = -15 \\implies a = -5, b = 4.$$
Vậy $a = -5, b = 4$.`,
          },
          {
            id: `p2-2-${examNum}`,
            label: '2) Hệ phương trình đẳng cấp bậc hai (2,0 điểm)',
            points: 2.0,
            content: `Giải hệ phương trình: $\\begin{cases} x^2 + 2y^2 = 3xy \\\\ x + y = 3 \\end{cases}$`,
            rubric: '• Phân tích pt 1 thành $(x - y)(x - 2y) = 0$: 1,0đ\n• Thay vào pt 2 tìm nghiệm: 1,0đ',
            solution: `Phương trình đầu: $x^2 - 3xy + 2y^2 = 0 \\iff (x - y)(x - 2y) = 0 \\implies x = y$ hoặc $x = 2y$.
- Trường hợp 1: $x = y \\implies 2x = 3 \\implies x = y = \\frac{3}{2}$.
- Trường hợp 2: $x = 2y \\implies 3y = 3 \\implies y = 1 \\implies x = 2$.
Vậy hệ có 2 nghiệm: $\\left(\\frac{3}{2}; \\frac{3}{2}\\right), (2; 1)$.`,
          },
        ],
      },
      problem3: {
        title: 'Bài 3. (2,0 điểm)',
        points: 2.0,
        subparts: [
          {
            id: `p3-1-${examNum}`,
            label: '1) Tổ hợp và Nguyên lý Bất biến (1,0 điểm)',
            points: 1.0,
            content: 'Trên bảng viết các số $1, 2, 3, ..., 20$. Mỗi lần cho phép xóa đi hai số $a, b$ bất kì và viết thêm số $a + b - 1$. Hỏi số cuối cùng còn lại trên bảng là số chẵn hay số lẻ?',
            rubric: '• Xác định tổng ban đầu: 0,25đ\n• Xét đại lượng bất biến qua mỗi phép biến đổi: 0,5đ\n• Kết luận số cuối cùng: 0,25đ',
            solution: `Mỗi lần thay hai số $a, b$ bởi $a + b - 1$, tổng các số giảm đi đúng 1 đơn vị, số lượng các số giảm đi 1.
Ban đầu có 20 số, sau 19 lần thực hiện thì trên bảng chỉ còn lại 1 số duy nhất.
Tổng ban đầu: $S_0 = 1 + 2 + ... + 20 = \\frac{20 \\times 21}{2} = 210$.
Sau 19 lần biến đổi, tổng giảm đi 19 đơn vị.
Do đó số cuối cùng còn lại là: $210 - 19 = 191$.
Vì 191 là số lẻ nên số cuối cùng luôn là một số lẻ.`,
          },
          {
            id: `p3-2-${examNum}`,
            label: '2) Số học - Lý thuyết chia hết (1,0 điểm)',
            points: 1.0,
            content: 'Tìm tất cả các số nguyên tố $p$ sao cho $p + 2$ và $p + 4$ cũng là các số nguyên tố.',
            rubric: '• Xét $p = 3$: 0,5đ\n• Xét $p > 3$ chia cho 3 dư 1 hoặc 2: 0,5đ',
            solution: `- Với $p = 2: p + 2 = 4$ là hợp số (loại).
- Với $p = 3: p + 2 = 5$ và $p + 4 = 7$ đều là số nguyên tố (thỏa mãn).
- Với $p > 3$, vì $p$ là số nguyên tố nên $p$ không chia hết cho 3:
  + Nếu $p = 3k + 1 \\implies p + 2 = 3k + 3 = 3(k+1) > 3$ chia hết cho 3 nên là hợp số.
  + Nếu $p = 3k + 2 \\implies p + 4 = 3k + 6 = 3(k+2) > 3$ chia hết cho 3 nên là hợp số.
Vậy duy nhất $p = 3$ thỏa mãn.`,
          },
        ],
      },
      problem4: {
        title: 'Bài 4. (2,0 điểm)',
        points: 2.0,
        subparts: [
          {
            id: `p4-1-${examNum}`,
            label: '1) Bất đẳng thức Bunhiacôpxki (1,0 điểm)',
            points: 1.0,
            content: 'Cho $a, b, c > 0$ thỏa mãn $a + b + c = 3$. Chứng minh rằng: $\\frac{a^2}{b} + \\frac{b^2}{c} + \\frac{c^2}{a} \\ge 3$.',
            rubric: '• Áp dụng Cauchy-Schwarz dạng Engel: 0,5đ\n• Đánh giá và kết luận: 0,5đ',
            solution: `Áp dụng bất đẳng thức Cauchy-Schwarz dạng Engel:
$$\\frac{a^2}{b} + \\frac{b^2}{c} + \\frac{c^2}{a} \\ge \\frac{(a + b + c)^2}{b + c + a} = a + b + c = 3.$$
Dấu "=" xảy ra khi $\\frac{a}{b} = \\frac{b}{c} = \\frac{c}{a} \\implies a = b = c = 1$. (đpcm)`,
          },
          {
            id: `p4-2-${examNum}`,
            label: '2) Quy tắc nhân xác suất (1,0 điểm)',
            points: 1.0,
            content: 'Xác suất để một hạt giống nảy mầm là 0,8. Gieo 3 hạt giống độc lập. Tính xác suất để có ít nhất 1 hạt nảy mầm.',
            rubric: '• Xác suất hạt không nảy mầm: 0,25đ\n• Xác suất cả 3 hạt không nảy mầm: 0,25đ\n• Xác suất có ít nhất 1 hạt nảy mầm: 0,5đ',
            solution: `Xác suất một hạt không nảy mầm là $1 - 0{,}8 = 0{,}2$.
Vì 3 hạt gieo độc lập nên xác suất cả 3 hạt đều không nảy mầm là:
$$P(\\text{không hạt nào nảy mầm}) = 0{,}2^3 = 0{,}008.$$
Xác suất có ít nhất một hạt nảy mầm là:
$$P = 1 - 0{,}008 = 0{,}992.$$`,
          },
        ],
      },
      problem5: {
        title: 'Bài 5. (7,0 điểm)',
        points: 7.0,
        subparts: [
          {
            id: `p5-1-${examNum}`,
            label: 'a) Chứng minh tiếp tuyến và góc nội tiếp (3,0 điểm)',
            points: 3.0,
            content: 'Cho đường tròn $(O)$ và dây cung $BC$ cố định. Điểm $A$ di động trên cung lớn $BC$. Kẻ đường cao $AH$. Chứng minh rằng tích $AB \\cdot AC = AH \\cdot 2R$ với $R$ là bán kính $(O)$.',
            rubric: '• Kẻ đường kính $AD$: 1,0đ\n• Chứng minh $\\Delta ABH \\sim \\Delta ADC$: 1,5đ\n• Suy ra hệ thức $AB \\cdot AC = 2R \\cdot AH$: 0,5đ',
            solution: `Kẻ đường kính $AD$ của đường tròn $(O)$.
Ta có $\\widehat{ACD} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn).
Xét $\\Delta ABH$ và $\\Delta ADC$ có:
$\\widehat{AHB} = \\widehat{ACD} = 90^\\circ$;
$\\widehat{ABH} = \\widehat{ADC}$ (hai góc nội tiếp cùng chắn cung $AC$).
Do đó $\\Delta ABH \\sim \\Delta ADC$ (g.g) $\\implies \\frac{AB}{AD} = \\frac{AH}{AC} \\implies AB \\cdot AC = AD \\cdot AH = 2R \\cdot AH$. (đpcm)`,
          },
          {
            id: `p5-2-${examNum}`,
            label: 'b) Diện tích tam giác lớn nhất (3,0 điểm)',
            points: 3.0,
            content: 'Xác định vị trí của điểm $A$ trên cung lớn $BC$ để diện tích tam giác $ABC$ đạt giá trị lớn nhất.',
            rubric: '• $S_{ABC} = \\frac{1}{2} BC \\cdot AH$: 1,0đ\n• $BC$ không đổi $\\implies S$ max khi $AH$ max: 1,0đ\n• $A$ là điểm chính giữa cung lớn $BC$: 1,0đ',
            solution: `Ta có $S_{ABC} = \\frac{1}{2} BC \\cdot AH$.
Vì $BC$ cố định nên độ dài đoạn thẳng $BC$ không đổi.
Do đó $S_{ABC}$ lớn nhất khi và chỉ khi đường cao $AH$ lớn nhất.
Gọi $M$ là trung điểm của dây $BC$, $d$ là khoảng cách từ $O$ đến $BC$.
Ta có $AH \\le AM \\le OM + R$.
Dấu "=" xảy ra khi $A$ nằm trên đường trung trực của $BC$, tức là $A$ là điểm chính giữa của cung lớn $BC$ (khi đó $\\Delta ABC$ cân tại $A$).`,
          },
          {
            id: `p5-3-${examNum}`,
            label: 'c) Phương tích và cát tuyến (1,0 điểm)',
            points: 1.0,
            content: 'Qua điểm $M$ nằm ngoài đường tròn kẻ hai cát tuyến $MAB$ và $MCD$. Cho $MA = 3\\text{ cm}, AB = 5\\text{ cm}, MC = 4\\text{ cm}$. Tính độ dài đoạn thẳng $CD$.',
            rubric: '• Áp dụng định lí phương tích $MA \\cdot MB = MC \\cdot MD$: 0,5đ\n• Tính $MD = 6\\text{ cm} \\implies CD = 2\\text{ cm}$: 0,5đ',
            solution: `Ta có $MB = MA + AB = 3 + 5 = 8\\text{ cm}$.
Theo định lí phương tích của một điểm đối với đường tròn:
$$MA \\cdot MB = MC \\cdot MD \\iff 3 \\cdot 8 = 4 \\cdot MD \\iff 24 = 4MD \\implies MD = 6\\text{ cm}.$$
Suy ra độ dài đoạn thẳng $CD = MD - MC = 6 - 4 = 2\\text{ cm}$.`,
          },
        ],
      },
    };
  }),
];
