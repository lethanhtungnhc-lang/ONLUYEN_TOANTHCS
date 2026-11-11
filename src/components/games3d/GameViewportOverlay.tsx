import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  HelpCircle,
  BookOpen,
  Sliders,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layers,
  Box,
  Eye,
  Award,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Game3DItem, GameQuestion3D } from '../../types/game3d';
import { proceduralAudio } from '../../utils/proceduralAudio';
import MathView from '../../utils/mathRender';

interface GameViewportOverlayProps {
  game: Game3DItem;
  // Controls state
  wireframe: boolean;
  setWireframe: (val: boolean) => void;
  unfoldProgress: number;
  setUnfoldProgress: (val: number) => void;
  solidType: 'cylinder' | 'cone' | 'sphere';
  setSolidType: (val: 'cylinder' | 'cone' | 'sphere') => void;
  boxParams: { a: number; b: number; c: number };
  setBoxParams: React.Dispatch<React.SetStateAction<{ a: number; b: number; c: number }>>;
  showUnitCubes: boolean;
  setShowUnitCubes: (val: boolean) => void;
  sliceCutY: number;
  setSliceCutY: (val: number) => void;
  trigAngleDeg: number;
  setTrigAngleDeg: (val: number) => void;
  onFireLaser: () => void;
  onBackToList: () => void;
}

export const GameViewportOverlay: React.FC<GameViewportOverlayProps> = ({
  game,
  wireframe,
  setWireframe,
  unfoldProgress,
  setUnfoldProgress,
  solidType,
  setSolidType,
  boxParams,
  setBoxParams,
  showUnitCubes,
  setShowUnitCubes,
  sliceCutY,
  setSliceCutY,
  trigAngleDeg,
  setTrigAngleDeg,
  onFireLaser,
  onBackToList,
}) => {
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'quiz' | 'formulas'>('controls');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion: GameQuestion3D | undefined = game.questions[currentQuestionIndex];

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    proceduralAudio.setMuted(nextMuted);
    if (!nextMuted) proceduralAudio.playClick();
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleSelectOption = (value: string) => {
    if (isSubmitted) return;
    proceduralAudio.playClick();
    setSelectedOption(value);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isSubmitted || !currentQuestion) return;
    setIsSubmitted(true);

    const chosen = currentQuestion.options.find((o) => o.value === selectedOption);
    if (chosen?.isCorrect) {
      proceduralAudio.playSuccessChord();
      setScore((prev) => prev + currentQuestion.points);
      setCorrectCount((prev) => prev + 1);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } else {
      proceduralAudio.playIncorrectBuzz();
    }
  };

  const handleNextQuestion = () => {
    proceduralAudio.playWhoosh();
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuestionIndex + 1 < game.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      proceduralAudio.playVictoryFanfare();
    }
  };

  const handleResetQuiz = () => {
    proceduralAudio.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setCorrectCount(0);
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
      {/* TOP HEADER BAR (Minimal & Non-obstructive) */}
      <div className="flex items-center justify-between pointer-events-auto">
        <button
          onClick={onBackToList}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700/80 shadow-md text-xs font-semibold backdrop-blur-md transition cursor-pointer"
        >
          <span>← TRỞ VỀ DANH SÁCH GAME</span>
        </button>

        {/* Score & Audio Toolbar */}
        <div className="flex items-center gap-2">
          {score > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-500/90 text-slate-950 font-black px-3 py-1 rounded-xl text-xs shadow-md">
              <Award className="w-4 h-4" />
              <span>{score} ĐIỂM</span>
            </div>
          )}

          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 border border-slate-700/80 shadow-md text-xs backdrop-blur-md transition cursor-pointer"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 border border-slate-700/80 shadow-md text-xs backdrop-blur-md transition cursor-pointer"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* UNIFIED BOTTOM CONTROL DOCK (Three.js Skill Section 5) */}
      <div
        className={`pointer-events-auto mx-auto w-full max-w-4xl transition-all duration-300 transform ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Tab Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => {
              proceduralAudio.playClick();
              setIsDockCollapsed(!isDockCollapsed);
            }}
            className="flex items-center gap-1.5 px-4 py-1 rounded-t-xl bg-slate-900/90 hover:bg-slate-800 border-t border-x border-slate-700 text-slate-300 text-xs font-semibold shadow-lg backdrop-blur-md cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-4 h-4 text-blue-400" />
                <span>▴ Hiện Bảng Điều Khiển</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-blue-400" />
                <span>▾ Ẩn Gọn Bảng Điều Khiển</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-5 backdrop-blur-xl text-slate-100 space-y-4">
          {/* Dock Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  proceduralAudio.playClick();
                  setActiveTab('controls');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'controls'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Điều Khiển 3D</span>
              </button>

              <button
                onClick={() => {
                  proceduralAudio.playClick();
                  setActiveTab('quiz');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Thử Thách & Câu Đố ({game.questions.length})</span>
              </button>

              <button
                onClick={() => {
                  proceduralAudio.playClick();
                  setActiveTab('formulas');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeTab === 'formulas'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Công Thức SGK</span>
              </button>
            </div>

            {/* Curriculum Reference Stamp */}
            <div className="hidden sm:block text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">{game.curriculumStandard.split(':')[0]}</span>
            </div>
          </div>

          {/* TAB 1: 3D SLIDERS & CONTROLS */}
          {activeTab === 'controls' && (
            <div className="space-y-4">
              {/* Box Volume Game Controls (Grade 6) */}
              {game.type === 'box_volume' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Slider a (Length) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Chiều dài (a):</span>
                      <span className="font-mono font-bold text-blue-400">{boxParams.a} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="7"
                      step="1"
                      value={boxParams.a}
                      onChange={(e) => {
                        proceduralAudio.playClick();
                        setBoxParams((prev) => ({ ...prev, a: Number(e.target.value) }));
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  {/* Slider b (Width) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Chiều rộng (b):</span>
                      <span className="font-mono font-bold text-blue-400">{boxParams.b} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="6"
                      step="1"
                      value={boxParams.b}
                      onChange={(e) => {
                        proceduralAudio.playClick();
                        setBoxParams((prev) => ({ ...prev, b: Number(e.target.value) }));
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  {/* Slider c (Height) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Chiều cao (c):</span>
                      <span className="font-mono font-bold text-blue-400">{boxParams.c} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="6"
                      step="1"
                      value={boxParams.c}
                      onChange={(e) => {
                        proceduralAudio.playClick();
                        setBoxParams((prev) => ({ ...prev, c: Number(e.target.value) }));
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Cube Identity Exploder Controls (Grade 8) */}
              {game.type === 'cube_identity' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-pink-400" />
                      <span>Thanh trượt Bóc Tách Không Gian (Exploded View 3D):</span>
                    </span>
                    <span className="font-mono font-bold text-pink-400">{Math.round(unfoldProgress * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={unfoldProgress}
                    onChange={(e) => {
                      proceduralAudio.playClick();
                      setUnfoldProgress(Number(e.target.value));
                    }}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Khối nguyên vẹn (a+b)³</span>
                    <span>Tách rời 8 khối: a³, 3a²b, 3ab², b³</span>
                  </div>
                </div>
              )}

              {/* Revolution Solids Controls (Grade 9) */}
              {game.type === 'revolution_solids' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Chọn khối tròn xoay:</span>
                    {(['cylinder', 'cone', 'sphere'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          proceduralAudio.playClick();
                          setSolidType(type);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
                          solidType === type
                            ? 'bg-violet-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {type === 'cylinder' ? 'Hình Trụ' : type === 'cone' ? 'Hình Nón' : 'Hình Cầu'}
                      </button>
                    ))}
                  </div>

                  {/* Slicing plane slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Độ cao mặt phẳng cắt lát ngang:</span>
                      <span className="font-mono text-violet-400">{Math.round(sliceCutY * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={sliceCutY}
                      onChange={(e) => {
                        proceduralAudio.playClick();
                        setSliceCutY(Number(e.target.value));
                      }}
                      className="w-full accent-violet-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Trig Artillery Controls (Grade 9) */}
              {game.type === 'trig_artillery' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-bold">Góc nâng pháo đài (Góc α):</span>
                      <span className="font-mono font-bold text-red-400 text-sm">{trigAngleDeg}°</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="75"
                      step="1"
                      value={trigAngleDeg}
                      onChange={(e) => {
                        proceduralAudio.playClick();
                        setTrigAngleDeg(Number(e.target.value));
                      }}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-400 font-mono">
                      tan({trigAngleDeg}°) ≈ {Math.tan((trigAngleDeg * Math.PI) / 180).toFixed(3)}
                    </div>
                    <button
                      onClick={() => {
                        proceduralAudio.playLaserShot();
                        onFireLaser();
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                    >
                      ⚡ KHAI HỎA TIA NĂNG LƯỢNG
                    </button>
                  </div>
                </div>
              )}

              {/* Toggles bar (Unfold Net, Wireframe, Unit cubes) */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800 text-xs">
                {/* Net Unfold toggle (for box and prism) */}
                {(game.type === 'box_volume' || game.type === 'prism_architect') && (
                  <button
                    onClick={() => {
                      proceduralAudio.playWhoosh();
                      setUnfoldProgress(unfoldProgress > 0.5 ? 0 : 1);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                      unfoldProgress > 0.5
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>{unfoldProgress > 0.5 ? 'Đóng hộp 3D' : 'Trải phẳng mặt (Net Unfold)'}</span>
                  </button>
                )}

                {/* Show Unit Cubes toggle (for box volume) */}
                {game.type === 'box_volume' && (
                  <button
                    onClick={() => {
                      proceduralAudio.playClick();
                      setShowUnitCubes(!showUnitCubes);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                      showUnitCubes ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showUnitCubes ? 'Ẩn khối đơn vị' : 'Hiện các khối đơn vị 1x1x1'}</span>
                  </button>
                )}

                {/* Wireframe Mode */}
                <button
                  onClick={() => {
                    proceduralAudio.playClick();
                    setWireframe(!wireframe);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer font-semibold ${
                    wireframe ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <span>{wireframe ? 'Tắt khung dây' : 'Bật khung dây Wireframe'}</span>
                </button>

                {/* Live Math Calculation Readout */}
                {game.type === 'box_volume' && (
                  <div className="ml-auto font-mono text-[11px] text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
                    V = {boxParams.a} × {boxParams.b} × {boxParams.c} ={' '}
                    <span className="font-bold text-white">{boxParams.a * boxParams.b * boxParams.c}</span> cm³
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE QUIZ & TASKS */}
          {activeTab === 'quiz' && currentQuestion && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {currentQuestion.taskTitle} (Câu {currentQuestionIndex + 1}/{game.questions.length})
                  </span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">+{currentQuestion.points} ĐIỂM</span>
              </div>

              {/* Question Text */}
              <div className="text-xs sm:text-sm text-slate-100 bg-slate-800/70 p-3.5 rounded-xl border border-slate-700 leading-relaxed">
                {currentQuestion.problemText}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt.value;
                  let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';

                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-600/90 text-white border-emerald-500 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-600/90 text-white border-rose-500';
                    } else {
                      btnStyle = 'bg-slate-800/50 text-slate-400 border-slate-800';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-blue-600 text-white border-blue-500 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.value)}
                      disabled={isSubmitted}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt.label}</span>
                      {isSubmitted && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />}
                      {isSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submission & Feedback */}
              {!isSubmitted ? (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    KIỂM TRA ĐÁP ÁN
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-1 border-t border-slate-800">
                  {/* Detailed Explanation */}
                  <div className="text-xs bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 text-slate-200 space-y-1">
                    <div className="font-bold text-emerald-400">Hướng dẫn giải chi tiết:</div>
                    <div>{currentQuestion.options.find((o) => o.value === selectedOption)?.explanation}</div>
                    <div className="pt-1 text-slate-300 font-mono text-[11px]">
                      <MathView text={currentQuestion.formulaLatex} />
                    </div>
                  </div>

                  {/* Next Question / Finish */}
                  <div className="flex justify-end gap-2">
                    {currentQuestionIndex + 1 < game.questions.length ? (
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        <span>CÂU TIẾP THEO</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-400">
                          🎉 Hoàn thành xuất sắc! ({correctCount}/{game.questions.length} câu đúng)
                        </span>
                        <button
                          onClick={handleResetQuiz}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>LÀM LẠI</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FORMULA CHEAT SHEET */}
          {activeTab === 'formulas' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Hệ thống công thức SGK Kết nối tri thức:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {game.formulas.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5"
                  >
                    <div className="text-[11px] font-bold text-blue-400">{f.name}</div>
                    <div className="text-xs font-mono text-white py-1">
                      <MathView text={f.latex} block />
                    </div>
                    {f.note && <div className="text-[11px] text-slate-400 italic">{f.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
