import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Zap, Trophy, Clock, Flame, Award, ArrowLeft, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Question } from '../types';
import { storageService } from '../services/storageService';
import { playCorrectSound, playIncorrectSound, playFanfareSound } from '../utils/soundEffects';
import MathView from '../utils/mathRender';

interface MathArenaProps {
  onBack: () => void;
}

export const MathArena: React.FC<MathArenaProps> = ({ onBack }) => {
  const [arenaMode, setArenaMode] = useState<'individual' | 'class' | 'grade'>('individual');
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameover'>('lobby');
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentScore, setCurrentScore] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [arenaQuestions, setArenaQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);

  // Load questions
  useEffect(() => {
    const list = storageService.getQuestions();
    setArenaQuestions([...list].sort(() => Math.random() - 0.5));
  }, []);

  // Timer countdown
  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('gameover');
            playFanfareSound();
            confetti({ particleCount: 100, spread: 80 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStartGame = () => {
    setTimeLeft(60);
    setCurrentScore(0);
    setComboStreak(0);
    setQIndex(0);
    setGameState('playing');
  };

  const handleAnswerOption = (chosen: string) => {
    const q = arenaQuestions[qIndex];
    if (!q) return;

    const isCorrect = chosen.trim() === (q.correctAnswer as string).trim();
    if (isCorrect) {
      playCorrectSound();
      const comboMultiplier = Math.min(3, 1 + comboStreak * 0.2);
      const pointsAdded = Math.round(10 * comboMultiplier);
      setCurrentScore((prev) => prev + pointsAdded);
      setComboStreak((prev) => prev + 1);

      if ((comboStreak + 1) % 4 === 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      playIncorrectSound();
      setComboStreak(0);
    }

    // Next question
    if (qIndex < arenaQuestions.length - 1) {
      setQIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      setGameState('gameover');
      playFanfareSound();
    }
  };

  const currentQ = arenaQuestions[qIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* HEADER WITH TRỞ VỀ */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← TRỞ VỀ</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Chế độ:</span>
          {(['individual', 'class', 'grade'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                if (gameState === 'lobby') setArenaMode(m);
              }}
              disabled={gameState === 'playing'}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                arenaMode === m
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {m === 'individual' ? 'Cá nhân' : m === 'class' ? 'Theo Lớp' : 'Theo Khối'}
            </button>
          ))}
        </div>
      </div>

      {gameState === 'lobby' && (
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
            <Zap className="w-12 h-12 text-amber-200" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              ĐẤU TRƯỜNG TOÁN HỌC
            </h2>
            <p className="text-sm text-amber-100 leading-relaxed">
              Thử thách tính nhanh và giải toán chính xác trong 60 giây! Tích lũy chuỗi combo để nhân điểm số và giành cúp bảng vàng.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-amber-200 font-bold">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Thời gian: 60 Giây</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Combo x3 Điểm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>Bảng xếp hạng trực tiếp</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 bg-slate-950 hover:bg-black text-amber-400 font-black text-base rounded-2xl shadow-2xl hover:scale-105 transition-transform"
            >
              BẮT ĐẦU TRANH TÀI NGAY ⚡
            </button>
          </div>
        </div>
      )}

      {gameState === 'playing' && currentQ && (
        <div className="space-y-4">
          {/* TOP ARENA SCOREBOARD */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xl font-black">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" />
                <span>{timeLeft}s</span>
              </div>
              {comboStreak > 1 && (
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold text-xs animate-bounce shadow">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Combo x{comboStreak}!</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Điểm đấu trường</div>
              <div className="text-2xl font-black text-amber-400 font-mono leading-none">
                {currentScore}
              </div>
            </div>
          </div>

          {/* QUESTION CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Câu số {qIndex + 1} • {currentQ.topic}
            </div>

            <div className="text-lg font-bold text-slate-900 dark:text-white">
              <MathView text={currentQ.content} />
            </div>

            {currentQ.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerOption(opt)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 text-left text-sm font-semibold transition flex items-center gap-3 text-slate-800 dark:text-slate-200"
                  >
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span><MathView text={opt} /></span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              KẾT THÚC VÒNG ĐẤU TRƯỜNG!
            </h3>
            <p className="text-xs text-slate-500">
              Chúc mừng em đã hoàn thành xuất sắc lượt thi đấu tốc độ.
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-sm mx-auto space-y-3">
            <div className="text-xs text-slate-500 font-bold uppercase">Tổng điểm đạt được:</div>
            <div className="text-5xl font-black text-amber-500 font-mono">
              {currentScore}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              🎖️ Đạt danh hiệu: Dũng sĩ Toán học
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CHƠI LẠI VÒNG MỚI</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition"
            >
              VỀ TRANG CHỦ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
