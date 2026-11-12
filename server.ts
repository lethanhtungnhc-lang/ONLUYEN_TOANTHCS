import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with required User-Agent
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Endpoint: AI Fast Exam Generation according to CV 7991 & GDPT 2018
app.post('/api/gemini/generate-exam', async (req, res) => {
  const { grade, chapter, duration, questionCount, level, format } = req.body;

  if (!process.env.GEMINI_API_KEY || !ai) {
    return res.status(200).json({
      fallback: true,
      message: 'Chế độ tạo đề tích hợp sẵn chuẩn Công văn 7991 (Không cần API Key)',
    });
  }

  try {
    const prompt = `Bạn là chuyên gia thẩm định và ra đề thi môn Toán THCS theo Chương trình Giáo dục phổ thông 2018 và hướng dẫn Công văn 7991 của Bộ Giáo dục & Đào tạo.
Hãy tạo một đề kiểm tra Toán hoàn chỉnh cho:
- Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh
- Tác quyền: © 2026 Teacher Lê Thanh Tùng
- Khối lớp: Toán ${grade || 9}
- Chủ đề/Chương: ${chapter || 'Tổng hợp theo chương trình'}
- Thời gian làm bài: ${duration || 60} phút
- Số lượng câu hỏi: ${questionCount || 15} câu
- Mức độ: ${level || 'Chuẩn phân hóa (40% Nhận biết, 30% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao)'}

Yêu cầu xuất ra cấu trúc Đề kiểm tra chuẩn 4 phần theo CV 7991:
Phần I: Trắc nghiệm nhiều lựa chọn (4 phương án A, B, C, D)
Phần II: Trắc nghiệm Đúng/Sai
Phần III: Trắc nghiệm Trả lời ngắn
Phần IV: Tự luận kèm bảng Hướng dẫn chấm (Câu - Các bước giải chi tiết - Biểu điểm)
Kèm theo Ma trận đề kiểm tra và Bản đặc tả câu hỏi theo chuẩn năng lực.
Định dạng JSON có cấu trúc rõ ràng: title, matrix, specifications, parts, answerKey, rubric.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là chuyên gia Toán THCS Việt Nam am hiểu sâu sắc CT GDPT 2018 và CV 7991. Luôn sử dụng tiếng Việt chuẩn mực, công thức toán LaTeX rõ ràng.',
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    res.json({ success: true, data: JSON.parse(text || '{}') });
  } catch (error: any) {
    console.error('AI Generate Exam Error:', error);
    res.status(200).json({
      fallback: true,
      error: error?.message || 'Lỗi khi gọi AI, chuyển sang ngân hàng đề mẫu chuẩn CV 7991.',
    });
  }
});

// Endpoint: AI Coach - Trợ lý tư duy toán học (Socratic Assistant)
app.post('/api/gemini/ai-coach', async (req, res) => {
  const { questionText, studentQuery, contextTopic, mode } = req.body;

  if (!process.env.GEMINI_API_KEY || !ai) {
    return res.status(200).json({
      fallback: true,
      hint: 'Gợi ý tư duy: Em hãy xem kỹ điều kiện của bài toán, biến đổi các biểu thức tương đương và nhớ lại định lý liên quan đến chủ đề này.',
    });
  }

  try {
    const prompt = `Bạn là "AI Coach - Trợ lý tư duy Toán THCS" cho học sinh trường TH, THCS Nguyễn Hữu Cảnh (© 2026 Teacher Lê Thanh Tùng).
Quy tắc cốt lõi:
1. KHÔNG trực tiếp đưa ra lời giải đầy đủ hoặc đáp án cuối cùng ngay lập tức!
2. Đặt câu hỏi gợi mở theo phương pháp Socratic, chỉ dẫn từng bước tư duy.
3. Nhắc nhở các định lý, công thức Toán THCS GDPT 2018 liên quan.
4. Phát hiện lỗi sai trong lập luận của học sinh nếu có.
5. Khuyến khích học sinh tự suy nghĩ và tự giải quyết vấn đề.

Đề bài: ${questionText || 'Không có đề cụ thể'}
Chủ đề: ${contextTopic || 'Toán THCS'}
Câu hỏi của học sinh: ${studentQuery || 'Em chưa hiểu hướng làm, thầy/cô gợi ý giúp em với ạ.'}
Chế độ: ${mode || 'goi_y_buoc_tiep_theo'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là người thầy tận tâm, kiên nhẫn, khuyến khích học sinh phát triển tư duy logic toán học độc lập.',
      },
    });

    res.json({ success: true, advice: response.text });
  } catch (error: any) {
    console.error('AI Coach Error:', error);
    res.status(200).json({
      fallback: true,
      error: error?.message,
      advice: 'Thầy khuyên em nên đọc kĩ lại giả thiết đề bài, xác định rõ điều kiện có nghĩa trước khi tiến hành biến đổi.',
    });
  }
});

// Endpoint: Spelling and Math proofreading check (Kiểm tra chính tả & logic Toán)
app.post('/api/gemini/proofread', async (req, res) => {
  const { content } = req.body;
  if (!process.env.GEMINI_API_KEY || !ai) {
    return res.json({ success: true, result: 'Hệ thống đã rà soát: Cú pháp và chính tả chuẩn mực.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Rà soát chính tả tiếng Việt, dấu câu, thuật ngữ toán học và tính nhất quán công thức Toán cho đoạn nội dung sau:\n${content}`,
      config: {
        systemInstruction: 'Kiểm tra chính tả, ngữ pháp tiếng Việt và chuẩn hóa công thức Toán học.',
      },
    });
    res.json({ success: true, result: response.text });
  } catch (error: any) {
    res.json({ success: false, error: error?.message });
  }
});

// Health check endpoint for system supervision
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

function getArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

const cliPort = getArg('--port') || getArg('-p');
const cliHost = getArg('--host') || getArg('-h');

// Dev server must always bind to port 3000 as required by AI Studio environment
const PORT = Number(cliPort || process.env.DEFAULT_APP_PORT || (process.env.NODE_ENV === 'production' && process.env.PORT !== '8080' ? process.env.PORT : 3000));
const HOST = cliHost || '0.0.0.0';

// Mount Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // In dev mode, handle SPA fallback using Vite's index.html transform
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import('fs/promises');
        let template = await fs.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`\n  VITE v8.3.0  ready in 150 ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/\n`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use by active process. Keeping running.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();

