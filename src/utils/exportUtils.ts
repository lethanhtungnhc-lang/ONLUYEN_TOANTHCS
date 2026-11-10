import * as XLSX from 'xlsx';
import { User, Exam, Matrix, Specification, Rubric, ExamResult } from '../types';

/**
 * 36. Xuất danh sách học sinh tham gia dạng .xlsx
 */
export function exportStudentsToExcel(students: User[], className?: string) {
  const data = students.map((s, index) => ({
    'STT': index + 1,
    'Họ và tên': s.fullName,
    'Lớp': s.className || className || '6A1',
    'Tên đăng nhập': s.username,
    'Số điện thoại': s.phone || 'Chưa cập nhật',
    'Email': s.email || 'N/A',
    'Ngày đăng ký': s.createdAt ? new Date(s.createdAt).toLocaleDateString('vi-VN') : '2026-09-05',
    'Trạng thái': s.isLocked ? 'Đã khóa' : 'Đang hoạt động',
    'Đơn vị trường': s.school || 'Trường TH, THCS Nguyễn Hữu Cảnh',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách học sinh');

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // STT
    { wch: 24 }, // Họ tên
    { wch: 10 }, // Lớp
    { wch: 16 }, // Username
    { wch: 14 }, // SĐT
    { wch: 22 }, // Email
    { wch: 14 }, // Ngày ĐK
    { wch: 16 }, // Trạng thái
    { wch: 32 }, // Đơn vị
  ];

  XLSX.writeFile(workbook, `Danh_sach_hoc_sinh_${className || 'THCS'}.xlsx`);
}

/**
 * Xuất danh sách kết quả thi / làm bài dạng .xlsx
 */
export function exportResultsToExcel(results: ExamResult[], examTitle: string) {
  const data = results.map((r, index) => ({
    'STT': index + 1,
    'Họ và tên': r.userName,
    'Lớp': r.className || '9A1',
    'Tên bài kiểm tra': r.examTitle,
    'Điểm số': r.score.toFixed(1),
    'Điểm tối đa': r.maxScore,
    'Tỷ lệ đúng (%)': `${r.percentage}%`,
    'Thời gian làm (phút)': Math.round(r.timeSpentSeconds / 60),
    'Số câu đúng': r.correctCount,
    'Số câu sai': r.wrongCount,
    'Thời gian nộp': new Date(r.submittedAt).toLocaleString('vi-VN'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kết quả kiểm tra');
  XLSX.writeFile(workbook, `Ket_qua_${examTitle.replace(/\s+/g, '_')}.xlsx`);
}

/**
 * 37. Xuất Đề kiểm tra chuẩn 4 phần theo CV 7991 sang file Word (.doc)
 * Có tiêu ngữ, đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
 * Tác quyền: © 2026 Teacher Lê Thanh Tùng
 */
export function exportExamToWord(
  exam: Exam,
  matrix?: Matrix,
  spec?: Specification,
  rubric?: Rubric
) {
  const htmlContent = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>${exam.title}</title>
    <style>
      body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.4; color: #000; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th, td { border: 1px solid #000; padding: 6px 8px; font-size: 11pt; }
      th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
      .header-table td { border: none; padding: 2px 0; }
      .text-center { text-align: center; }
      .text-right { text-align: right; }
      .bold { font-weight: bold; }
      .section-title { font-size: 13pt; font-weight: bold; margin-top: 18px; margin-bottom: 8px; text-transform: uppercase; }
      .question-block { margin-bottom: 12px; }
      .options-grid { margin-left: 20px; }
      .footer-note { margin-top: 30px; font-style: italic; font-size: 11pt; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
    </style>
  </head>
  <body>
    <!-- HEADER ĐƠN VỊ -->
    <table class="header-table" style="width: 100%;">
      <tr>
        <td style="width: 50%; text-align: center; vertical-align: top;">
          <span style="font-size: 12pt;">PHÒNG GD&ĐT HUYỆN/QUẬN</span><br/>
          <span style="font-size: 12pt; font-weight: bold;">TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH</span><br/>
          <span style="font-size: 10pt;">--------------------</span>
        </td>
        <td style="width: 50%; text-align: center; vertical-align: top;">
          <span style="font-size: 12pt; font-weight: bold;">ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TOÁN LỚP ${exam.grade}</span><br/>
          <span style="font-size: 11pt;">NĂM HỌC 2025 - 2026</span><br/>
          <span style="font-size: 11pt; font-style: italic;">Thời gian làm bài: ${exam.durationMinutes} phút (không kể thời gian giao đề)</span>
        </td>
      </tr>
    </table>

    <div style="text-align: center; margin: 15px 0;">
      <h2 style="margin: 0; font-size: 14pt; text-transform: uppercase;">${exam.title}</h2>
      <p style="margin: 4px 0; font-size: 11pt; font-style: italic;">(Cấu trúc đề kiểm tra xây dựng theo Công văn 7991 và Chương trình GDPT 2018)</p>
      <p style="margin: 4px 0; font-size: 11pt; font-weight: bold;">MÃ ĐỀ THI: ${exam.code || '101'}</p>
    </div>

    <!-- NỘI DUNG ĐỀ THI 4 PHẦN -->
    ${exam.parts
      .map(
        (part) => `
      <div class="section-title">PHẦN ${getRomanNumeral(part.partNumber)}: ${part.title}</div>
      <p style="font-style: italic; margin-bottom: 10px;">${part.instruction}</p>
      ${part.questions
        .map(
          (q, qIdx) => `
        <div class="question-block">
          <p><strong>Câu ${qIdx + 1} (${q.points} điểm):</strong> ${cleanLatexForWord(q.content)}</p>
          ${
            q.options && q.options.length > 0
              ? `<div class="options-grid">
                  <table style="border: none; margin: 4px 0;">
                    <tr>
                      <td style="border: none; width: 50%; padding: 2px;"><strong>A.</strong> ${cleanLatexForWord(q.options[0] || '')}</td>
                      <td style="border: none; width: 50%; padding: 2px;"><strong>B.</strong> ${cleanLatexForWord(q.options[1] || '')}</td>
                    </tr>
                    <tr>
                      <td style="border: none; width: 50%; padding: 2px;"><strong>C.</strong> ${cleanLatexForWord(q.options[2] || '')}</td>
                      <td style="border: none; width: 50%; padding: 2px;"><strong>D.</strong> ${cleanLatexForWord(q.options[3] || '')}</td>
                    </tr>
                  </table>
                </div>`
              : ''
          }
        </div>
      `
        )
        .join('')}
    `
      )
      .join('')}

    <div style="text-align: center; margin: 25px 0;">
      <strong>-------------------- HẾT --------------------</strong><br/>
      <span style="font-style: italic; font-size: 11pt;">(Cán bộ coi thi không giải thích gì thêm)</span>
    </div>

    <br style="page-break-before: always;" />

    <!-- PHẦN IV / HƯỚNG DẪN CHẤM CHI TIẾT THEO CÔNG VĂN 7991 -->
    <div style="text-align: center; margin-top: 20px;">
      <h3 style="margin: 0; font-size: 13pt; text-transform: uppercase;">HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT</h3>
      <p style="font-style: italic; font-size: 11pt;">(Bản quyền: © 2026 Teacher Lê Thanh Tùng - Trường TH, THCS Nguyễn Hữu Cảnh)</p>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 15%;">Câu</th>
          <th style="width: 70%;">Hướng dẫn chi tiết từng bước</th>
          <th style="width: 15%;">Biểu điểm</th>
        </tr>
      </thead>
      <tbody>
        ${(rubric?.rows || getDefaultRubricRows(exam))
          .map(
            (r) => `
          <tr>
            <td style="text-align: center; font-weight: bold; vertical-align: top;">${r.questionCode}</td>
            <td>
              ${r.detailedGuide.map((step: string, idx: number) => `<div>• ${cleanLatexForWord(step)} <span style="color: #666; font-size: 10pt;">(${r.partialScores[idx] || 0.25}đ)</span></div>`).join('')}
              ${r.notes ? `<div style="font-style: italic; color: #444; margin-top: 4px;">* Ghi chú: ${r.notes}</div>` : ''}
            </td>
            <td style="text-align: center; font-weight: bold; vertical-align: middle;">${r.totalPoints} đ</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <div class="footer-note">
      Bản quyền tài liệu: © 2026 Teacher Lê Thanh Tùng. All Rights Reserved.<br/>
      Đơn vị sử dụng: Trường TH, THCS Nguyễn Hữu Cảnh
    </div>
  </body>
  </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `De_Kiem_Tra_Toan_${exam.grade}_${exam.title.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getRomanNumeral(num: number): string {
  switch (num) {
    case 1: return 'I';
    case 2: return 'II';
    case 3: return 'III';
    case 4: return 'IV';
    default: return `${num}`;
  }
}

function cleanLatexForWord(text: string): string {
  if (!text) return '';
  return text
    .replace(/\$\$(.*?)\$\$/g, '$1')
    .replace(/\$(.*?)\$/g, '$1')
    .replace(/\\frac{(.*?)}{(.*?)}/g, '($1)/($2)')
    .replace(/\\sqrt{(.*?)}/g, '√($1)')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\ne/g, '≠')
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\pm/g, '±')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\pi/g, 'π');
}

function getDefaultRubricRows(exam: Exam) {
  const rows: any[] = [];
  let qCounter = 1;
  exam.parts.forEach((p) => {
    p.questions.forEach((q) => {
      rows.push({
        questionCode: `Câu ${qCounter++}`,
        part: `Phần ${p.partNumber}`,
        detailedGuide: [
          q.breakdown?.method || 'Nêu phương pháp giải và điều kiện xác định',
          ...(q.breakdown?.steps || ['Thực hiện phép tính theo quy tắc', 'Đối chiếu điều kiện và rút ra kết luận']),
        ],
        partialScores: [q.points * 0.4, q.points * 0.6],
        totalPoints: q.points,
        notes: 'Chấp nhận các cách giải khác đúng theo chuẩn kiến thức.',
      });
    });
  });
  return rows;
}
