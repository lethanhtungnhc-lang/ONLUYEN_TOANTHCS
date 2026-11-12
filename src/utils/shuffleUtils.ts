import { Question, Exam } from '../types';

/**
 * Fisher-Yates array shuffling algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles a single question's options and updates its correctAnswer pointer
 */
export function shuffleQuestionOptions(q: Question): Question {
  if (q.type !== 'multiple_choice' || !q.options || q.options.length < 2) {
    return { ...q };
  }

  // Extract pure option text and map to original index
  const originalOptions = q.options.map((opt) => opt.replace(/^[A-D]\.\s*/, '').trim());
  const correctRaw = (q.correctAnswer as string).replace(/^[A-D]\.\s*/, '').trim();

  // Find which option was originally correct
  let originalCorrectIdx = originalOptions.findIndex((opt) => opt === correctRaw);
  if (originalCorrectIdx === -1) {
    // If correctAnswer was just 'A', 'B', 'C', 'D'
    const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
    const letter = (q.correctAnswer as string).trim().toUpperCase();
    if (letter in letterMap) {
      originalCorrectIdx = letterMap[letter];
    } else {
      originalCorrectIdx = 0;
    }
  }

  const correctText = originalOptions[originalCorrectIdx];

  // Shuffle the options
  const shuffledTexts = shuffleArray(originalOptions);
  const newCorrectIdx = shuffledTexts.findIndex((opt) => opt === correctText);
  const letters = ['A', 'B', 'C', 'D'];

  const newOptions = shuffledTexts.map((opt, idx) => `${letters[idx]}. ${opt}`);
  const newCorrectAnswer = `${letters[newCorrectIdx]}. ${correctText}`;

  return {
    ...q,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

/**
 * Shuffles questions order AND options order for an array of questions
 */
export function shuffleQuestionsAndOptions(questions: Question[]): Question[] {
  const shuffledOrder = shuffleArray(questions);
  return shuffledOrder.map((q, idx) => {
    const withShuffledOptions = shuffleQuestionOptions(q);
    return {
      ...withShuffledOptions,
      order: idx + 1,
    };
  });
}

/**
 * Shuffles an entire Exam paper (all 4 parts) and updates exam code
 */
export function shuffleExamPaper(exam: Exam, newVariantCode?: string): Exam {
  const code = newVariantCode || String(Math.floor(100 + Math.random() * 900));

  const shuffledParts = exam.parts.map((part) => {
    return {
      ...part,
      questions: shuffleQuestionsAndOptions(part.questions),
    };
  });

  return {
    ...exam,
    code,
    title: `${exam.title} (Mã đề đảo: ${code})`,
    parts: shuffledParts,
  };
}
