import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Box,
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Filter,
  Search,
  Award,
  CheckCircle2,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import { MATH_GAMES_3D_LIST } from '../../data/mathGames3DData';
import { Game3DItem, GradeLevel } from '../../types/game3d';
import { ThreeSceneCanvas } from './ThreeSceneCanvas';
import { GameViewportOverlay } from './GameViewportOverlay';
import { proceduralAudio } from '../../utils/proceduralAudio';
import MathView from '../../utils/mathRender';

interface MathGames3DHubProps {
  initialGrade?: GradeLevel;
  initialGameId?: string;
  onBackToCurriculum?: () => void;
}

export const MathGames3DHub: React.FC<MathGames3DHubProps> = ({
  initialGrade = 6,
  initialGameId,
  onBackToCurriculum,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>(initialGrade);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<Game3DItem | null>(null);

  // 3D Scene Interactive Controls State
  const [wireframe, setWireframe] = useState(false);
  const [unfoldProgress, setUnfoldProgress] = useState(0);
  const [solidType, setSolidType] = useState<'cylinder' | 'cone' | 'sphere'>('cylinder');
  const [boxParams, setBoxParams] = useState({ a: 4, b: 3, c: 5 });
  const [showUnitCubes, setShowUnitCubes] = useState(false);
  const [sliceCutY, setSliceCutY] = useState(0.5);
  const [trigAngleDeg, setTrigAngleDeg] = useState(45);
  const [laserFired, setLaserFired] = useState(false);

  // Auto-select game if initialGameId was provided
  useEffect(() => {
    if (initialGameId) {
      const found = MATH_GAMES_3D_LIST.find((g) => g.id === initialGameId);
      if (found) {
        setActiveGame(found);
      }
    }
  }, [initialGameId]);

  // Reset parameters when changing active game
  const handleLaunchGame = (game: Game3DItem) => {
    proceduralAudio.playWhoosh();
    setActiveGame(game);
    setWireframe(false);
    setUnfoldProgress(0);
    setBoxParams({ a: 4, b: 3, c: 5 });
    setShowUnitCubes(false);
    setSliceCutY(0.5);
    setTrigAngleDeg(45);
    setLaserFired(false);
  };

  const handleFireLaser = () => {
    setLaserFired(true);
    setTimeout(() => {
      setLaserFired(false);
    }, 400);
  };

  // Filtered games
  const filteredGames = MATH_GAMES_3D_LIST.filter((g) => {
    const matchGrade = selectedGrade === 'all' || g.grade === selectedGrade;
    const matchQuery =
      !searchQuery ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchQuery;
  });

  return (
    <div className="w-full min-h-[calc(100vh-140px)] bg-slate-900 text-slate-100 flex flex-col">
      {/* ============================================================== */}
      {/* VIEW A: ACTIVE 3D GAME VIEWPORT (FULLSCREEN 3D CANVAS + HUD) */}
      {/* ============================================================== */}
      {activeGame ? (
        <div className="relative w-full h-[calc(100vh-120px)] min-h-[580px] bg-slate-950 overflow-hidden">
          <ThreeSceneCanvas
            game={activeGame}
            wireframe={wireframe}
            unfoldProgress={unfoldProgress}
            solidType={solidType}
            boxParams={boxParams}
            showUnitCubes={showUnitCubes}
            sliceCutY={sliceCutY}
            trigAngleDeg={trigAngleDeg}
            laserFired={laserFired}
          />
          <GameViewportOverlay
            game={activeGame}
            wireframe={wireframe}
            setWireframe={setWireframe}
            unfoldProgress={unfoldProgress}
            setUnfoldProgress={setUnfoldProgress}
            solidType={solidType}
            setSolidType={setSolidType}
            boxParams={boxParams}
            setBoxParams={setBoxParams}
            showUnitCubes={showUnitCubes}
            setShowUnitCubes={setShowUnitCubes}
            sliceCutY={sliceCutY}
            setSliceCutY={setSliceCutY}
            trigAngleDeg={trigAngleDeg}
            setTrigAngleDeg={setTrigAngleDeg}
            onFireLaser={handleFireLaser}
            onBackToList={() => setActiveGame(null)}
          />
        </div>
      ) : (
        /* ============================================================== */
        /* VIEW B: 3D MATH GAMES CATALOG & GRADE SELECTION */
        /* ============================================================== */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          {/* HEADER BANNER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-500/30 p-6 sm:p-10 shadow-2xl">
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Không gian mô phỏng 3D Toán THCS GDPT 2018</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Bộ Game Toán Học 3D Khối 6 – 9
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Hệ thống trò chơi và phòng thí nghiệm hình học không gian 3D bám sát từng bài học trong bộ sách
                <strong className="text-amber-400 font-bold"> Kết nối tri thức với cuộc sống</strong>. Trực quan
                hóa thể tích, diện tích xung quanh, mô hình trải phẳng, hằng đẳng thức và khối tròn xoay.
              </p>

              {onBackToCurriculum && (
                <div className="pt-2">
                  <button
                    onClick={onBackToCurriculum}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 shadow transition cursor-pointer"
                  >
                    <span>← TRỞ VỀ BÀI HỌC SGK</span>
                  </button>
                </div>
              )}
            </div>

            {/* Ambient Background Decorative Grid */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          {/* FILTER & SEARCH BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-850 p-4 rounded-2xl border border-slate-800 shadow-md">
            {/* Grade Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {(['all', 6, 7, 8, 9] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => {
                    proceduralAudio.playClick();
                    setSelectedGrade(grade);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedGrade === grade
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
                  }`}
                >
                  {grade === 'all' ? 'Tất cả các khối' : `Toán Khối ${grade}`}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên game, bài học, hình khối..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* GAMES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group relative bg-slate-850 hover:bg-slate-800 rounded-3xl border border-slate-800 hover:border-blue-500/50 p-6 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[11px] font-bold">
                      Toán {game.grade}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
                      {game.difficulty}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition leading-snug">
                      {game.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {game.subtitle}
                    </p>
                  </div>

                  {/* SGK Alignment Box */}
                  <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{game.chapterTitle}</span>
                    </div>
                    <div className="text-slate-300">
                      Bám sát: <span className="font-semibold text-white">{game.lessonTitle}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {game.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => handleLaunchGame(game)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition group-hover:scale-[1.02] cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>VÀO PHÒNG 3D NGAY</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Box className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm font-semibold">Không tìm thấy trò chơi 3D phù hợp với bộ lọc.</p>
              <button
                onClick={() => {
                  setSelectedGrade('all');
                  setSearchQuery('');
                }}
                className="text-xs text-blue-400 hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
