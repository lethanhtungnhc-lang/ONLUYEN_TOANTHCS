import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { GradeCurriculum } from './components/GradeCurriculum';
import { PracticeSystem } from './components/PracticeSystem';
import { Admission10Hub } from './components/Admission10Hub';
import { GiftedMathHub } from './components/GiftedMathHub';
import { MathArena } from './components/MathArena';
import { ExamRoom } from './components/ExamRoom';
import { MatrixSpecViewer } from './components/MatrixSpecViewer';
import { DocumentManager } from './components/DocumentManager';
import { DashboardStudent } from './components/DashboardStudent';
import { DashboardTeacher } from './components/DashboardTeacher';
import { DashboardAdmin } from './components/DashboardAdmin';
import { AICoachModal } from './components/AICoachModal';
import { AIGenerateExamModal } from './components/AIGenerateExamModal';
import { SystemGuideModal } from './components/SystemGuideModal';
import { storageService } from './services/storageService';
import { User, Lesson, Exam, ThinkingChallenge, GradeLevel } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(storageService.getCurrentSession());
  const [currentTab, setCurrentTab] = useState<string>('curriculum');
  const [systemGuideOpen, setSystemGuideOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('toanthcs_theme') === 'dark';
    }
    return false;
  });

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register_teacher' | 'register_student'>('login');
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [pwaMode, setPwaMode] = useState<'install' | 'update'>('install');
  const [aiCoachOpen, setAiCoachOpen] = useState(false);
  const [activeChallengeForCoach, setActiveChallengeForCoach] = useState<ThinkingChallenge | null>(null);
  const [aiGenerateOpen, setAiGenerateOpen] = useState(false);

  // Sub-view entities
  const [activePracticeLesson, setActivePracticeLesson] = useState<Lesson | undefined>(undefined);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('toanthcs_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('toanthcs_theme', 'light');
    }
  }, [darkMode]);

  const handleOpenAuth = (mode: 'login' | 'register_teacher' | 'register_student') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') setCurrentTab('admin_dashboard');
    else if (user.role === 'teacher') setCurrentTab('teacher_dashboard');
    else setCurrentTab('curriculum');
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    setCurrentTab('curriculum');
  };

  const handleForceLogoutRequired = () => {
    handleLogout();
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleQuickRoleSwitch = (role: 'teacher' | 'student') => {
    if (role === 'teacher') {
      handleOpenAuth('register_teacher');
    } else {
      handleOpenAuth('register_student');
    }
  };

  const handleStartPractice = (lesson: Lesson) => {
    setActivePracticeLesson(lesson);
    setCurrentTab('practice');
  };

  const handleStartExam = (examId?: string) => {
    const all = storageService.getExams();
    const found = examId ? all.find((e) => e.id === examId) : all[0];
    if (found) {
      setActiveExam(found);
      setCurrentTab('exam_room');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* NAVBAR */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenInstall={() => {
          setPwaMode('install');
          setPwaModalOpen(true);
        }}
        onOpenUpdate={() => {
          setPwaMode('update');
          setPwaModalOpen(true);
        }}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onQuickRoleSwitch={handleQuickRoleSwitch}
        onOpenGuide={() => setSystemGuideOpen(true)}
      />

      {/* MAIN CONTENT ROUTER */}
      <main className="flex-1 pb-12">
        {currentTab === 'curriculum' && (
          <GradeCurriculum
            onStartPractice={handleStartPractice}
            onOpenExamForGrade={(grade) => {
              const all = storageService.getExams().filter((e) => e.grade === grade);
              if (all.length > 0) {
                setActiveExam(all[0]);
                setCurrentTab('exam_room');
              } else {
                setCurrentTab('exams');
              }
            }}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeSystem
            lesson={activePracticeLesson}
            onBack={() => setCurrentTab('curriculum')}
          />
        )}

        {currentTab === 'admission10' && (
          <Admission10Hub onStartExam={handleStartExam} />
        )}

        {currentTab === 'gifted' && (
          <GiftedMathHub
            onOpenAICoach={(challenge) => {
              setActiveChallengeForCoach(challenge);
              setAiCoachOpen(true);
            }}
          />
        )}

        {currentTab === 'arena' && (
          <MathArena onBack={() => setCurrentTab('curriculum')} />
        )}

        {currentTab === 'exams' && (
          <MatrixSpecViewer
            onBack={() => setCurrentTab('curriculum')}
            onOpenExam={(exam) => {
              setActiveExam(exam);
              setCurrentTab('exam_room');
            }}
            onOpenAIGenerate={() => setAiGenerateOpen(true)}
          />
        )}

        {currentTab === 'exam_room' && activeExam && (
          <ExamRoom
            exam={activeExam}
            onBack={() => setCurrentTab('exams')}
          />
        )}

        {currentTab === 'documents' && (
          <DocumentManager onBack={() => setCurrentTab('curriculum')} />
        )}

        {currentTab === 'student_dashboard' && (
          <DashboardStudent
            onBack={() => setCurrentTab('curriculum')}
            onOpenExam={handleStartExam}
          />
        )}

        {currentTab === 'teacher_dashboard' && (
          <DashboardTeacher
            onBack={() => setCurrentTab('curriculum')}
            onOpenAIGenerate={() => setAiGenerateOpen(true)}
          />
        )}

        {currentTab === 'admin_dashboard' && (
          <DashboardAdmin
            onBack={() => setCurrentTab('curriculum')}
            onAppUpdateTriggered={handleForceLogoutRequired}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <PWAInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        mode={pwaMode}
        onForceLogoutRequired={handleForceLogoutRequired}
      />

      <AICoachModal
        isOpen={aiCoachOpen}
        onClose={() => setAiCoachOpen(false)}
        challenge={activeChallengeForCoach}
      />

      <AIGenerateExamModal
        isOpen={aiGenerateOpen}
        onClose={() => setAiGenerateOpen(false)}
        onExamCreated={(exam) => {
          setActiveExam(exam);
          setCurrentTab('exams');
        }}
      />

      <SystemGuideModal
        isOpen={systemGuideOpen}
        onClose={() => setSystemGuideOpen(false)}
      />
    </div>
  );
}
