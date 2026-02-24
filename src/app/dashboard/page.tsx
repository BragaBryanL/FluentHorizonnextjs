"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { 
  Flame, 
  Star, 
  BookOpen, 
  Trophy,
  Lock,
  Zap,
  Sparkles,
  Globe,
  Crown,
  GraduationCap,
  Target,
  Brain,
  Clock,
  Heart,
  Zap as Lightning,
  ChevronRight,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Play,
  CheckCircle2,
  XCircle,
  Timer,
  Volume2,
  Mic,
  Headphones,
  PenTool,
  MessageCircle,
  RefreshCw
} from "lucide-react";

// Floating languages data - Pool of 50 different languages
const floatingLanguagesPool = [
  { text: "Hello", lang: "English", color: "from-red-500 to-pink-500" },
  { text: "Hola", lang: "Spanish", color: "from-orange-500 to-yellow-500" },
  { text: "Привет", lang: "Russian", color: "from-blue-500 to-indigo-500" },
  { text: "谢谢", lang: "Chinese", color: "from-red-600 to-yellow-500" },
  { text: "かわいい", lang: "Japanese", color: "from-pink-500 to-rose-500" },
  { text: "Hallo", lang: "German", color: "from-yellow-500 to-amber-500" },
  { text: "Bonjour", lang: "French", color: "from-blue-400 to-blue-600" },
  { text: "Ciao", lang: "Italian", color: "from-green-500 to-emerald-500" },
  { text: "Olá", lang: "Portuguese", color: "from-green-600 to-lime-500" },
  { text: "안녕하세요", lang: "Korean", color: "from-purple-500 to-indigo-500" },
  { text: "Ahoj", lang: "Czech", color: "from-blue-600 to-cyan-500" },
  { text: "Witaj", lang: "Polish", color: "from-red-600 to-white" },
  { text: "Privet", lang: "Russian", color: "from-indigo-500 to-blue-600" },
  { text: "Zdravo", lang: "Serbian", color: "from-red-500 to-blue-500" },
  { text: "Hej", lang: "Swedish", color: "from-blue-500 to-cyan-500" },
  { text: "Hoi", lang: "Dutch", color: "from-orange-500 to-red-500" },
  { text: "Tere", lang: "Estonian", color: "from-blue-400 to-indigo-500" },
  { text: "Sveiki", lang: "Latvian", color: "from-maroon-500 to-red-500" },
  { text: "Labas", lang: "Lithuanian", color: "from-yellow-500 to-green-500" },
  { text: "Sziasztok", lang: "Hungarian", color: "from-green-500 to-teal-500" },
  { text: "Buna", lang: "Romanian", color: "from-blue-500 to-yellow-500" },
  { text: "Namaste", lang: "Hindi", color: "from-orange-500 to-pink-500" },
  { text: "مرحبا", lang: "Arabic", color: "from-green-500 to-teal-500" },
  { text: "שלום", lang: "Hebrew", color: "from-blue-500 to-cyan-500" },
  { text: "สวัสดี", lang: "Thai", color: "from-red-500 to-blue-500" },
  { text: "Xin chào", lang: "Vietnamese", color: "from-red-500 to-yellow-500" },
  { text: "Selamat", lang: "Malay", color: "from-yellow-500 to-red-500" },
  { text: "Kamusta", lang: "Tagalog", color: "from-blue-500 to-yellow-500" },
  { text: "Konnichiwa", lang: "Japanese", color: "from-rose-500 to-pink-500" },
  { text: "Sawubona", lang: "Zulu", color: "from-yellow-500 to-green-500" },
  { text: "Habari", lang: "Swahili", color: "from-green-500 to-teal-500" },
  { text: "Yo", lang: "Casual", color: "from-purple-500 to-pink-500" },
  { text: "Howdy", lang: "American", color: "from-yellow-500 to-orange-500" },
  { text: "Griasdi", lang: "Austrian", color: "from-red-500 to-white" },
  { text: "Dzień dobry", lang: "Polish", color: "from-white to-blue-500" },
  { text: "Dobrý den", lang: "Czech", color: "from-blue-500 to-white" },
  { text: "Goedendag", lang: "Dutch", color: "from-orange-500 to-yellow-500" },
  { text: "Kia ora", lang: "Maori", color: "from-green-500 to-cyan-500" },
  { text: "Salaam", lang: "Urdu", color: "from-green-500 to-cyan-500" },
  { text: "Mabuhay", lang: "Filipino", color: "from-yellow-500 to-blue-500" },
  { text: "Vanakkam", lang: "Tamil", color: "from-orange-500 to-yellow-500" },
  { text: "Dia dhuit", lang: "Irish", color: "from-green-500 to-yellow-500" },
  { text: "Sláinte", lang: "Scottish", color: "from-blue-500 to-cyan-500" },
  { text: "Bongu", lang: "Maltese", color: "from-red-500 to-white" },
  { text: "Molo", lang: "Xhosa", color: "from-green-500 to-yellow-500" },
  { text: "Oi", lang: "Brazilian", color: "from-green-500 to-yellow-500" },
  { text: "Arigatou", lang: "Japanese", color: "from-purple-500 to-pink-500" },
  { text: "Annyeong", lang: "Korean", color: "from-indigo-500 to-purple-500" },
  { text: "Salamat", lang: "Malay", color: "from-teal-500 to-cyan-500" },
];

const VISIBLE_BUBBLES = 10;

// Mock data for courses
const mockCourses = [
  { 
    id: 1,
    name: "Spanish", 
    flagUrl: "https://flagcdn.com/es.svg", 
    progress: 60,
    nextLesson: "Past Tense Verbs",
    xpToNext: 150,
    totalLessons: 45,
    completedLessons: 27,
    difficulty: "Intermediate",
    color: "from-orange-500 to-red-500",
    streak: 12,
    hoursLearned: 48
  },
  { 
    id: 2,
    name: "French", 
    flagUrl: "https://flagcdn.com/fr.svg", 
    progress: 35,
    nextLesson: "Basic Greetings",
    xpToNext: 200,
    totalLessons: 50,
    completedLessons: 17,
    difficulty: "Beginner",
    color: "from-blue-500 to-indigo-500",
    streak: 5,
    hoursLearned: 22
  },
  { 
    id: 3,
    name: "Japanese", 
    flagUrl: "https://flagcdn.com/jp.svg", 
    progress: 10,
    nextLesson: "Hiragana Basics",
    xpToNext: 300,
    totalLessons: 60,
    completedLessons: 6,
    difficulty: "Beginner",
    color: "from-pink-500 to-rose-500",
    streak: 3,
    hoursLearned: 8
  },
  { 
    id: 4,
    name: "German", 
    flagUrl: "https://flagcdn.com/de.svg", 
    progress: 0,
    nextLesson: "Start Learning",
    xpToNext: 100,
    totalLessons: 55,
    completedLessons: 0,
    difficulty: "Beginner",
    color: "from-yellow-500 to-amber-500",
    streak: 0,
    hoursLearned: 0
  },
];

const mockAchievements = [
  { id: 1, name: "First Lesson", icon: GraduationCap, unlocked: true, description: "Complete your first lesson", progress: 100, category: "learning" },
  { id: 2, name: "7 Day Streak", icon: Flame, unlocked: true, description: "Practice for 7 days in a row", progress: 100, category: "streak" },
  { id: 3, name: "Polyglot", icon: Globe, unlocked: false, description: "Learn 5 different languages", progress: 60, category: "mastery" },
  { id: 4, name: "Master", icon: Crown, unlocked: false, description: "Complete an advanced course", progress: 0, category: "mastery" },
  { id: 5, name: "Speed Demon", icon: Zap, unlocked: false, description: "Complete 10 lessons in one day", progress: 70, category: "speed" },
  { id: 6, name: "Perfect Score", icon: Sparkles, unlocked: true, description: "Get 100% on a lesson", progress: 100, category: "accuracy" },
  { id: 7, name: "Vocabulary Builder", icon: BookOpen, unlocked: true, description: "Learn 100 new words", progress: 100, category: "vocabulary" },
  { id: 8, name: "Conversation Starter", icon: MessageCircle, unlocked: false, description: "Complete 50 speaking exercises", progress: 40, category: "speaking" },
];

const mockLeaderboard = [
  { id: 1, name: "Maria Garcia", avatar: "🇪🇸", xp: 12500, rank: 1, country: "Spain" },
  { id: 2, name: "John Smith", avatar: "🇺🇸", xp: 11200, rank: 2, country: "USA" },
  { id: 3, name: "Yuki Tanaka", avatar: "🇯🇵", xp: 10800, rank: 3, country: "Japan" },
  { id: 4, name: "You", avatar: "👤", xp: 8750, rank: 4, isUser: true, country: "Local" },
  { id: 5, name: "Emma Wilson", avatar: "🇬🇧", xp: 8200, rank: 5, country: "UK" },
];

// Daily goals
const dailyGoals = [
  { id: 1, type: "lesson", current: 2, target: 3, icon: BookOpen, color: "text-green-400" },
  { id: 2, type: "xp", current: 450, target: 500, icon: Star, color: "text-yellow-400" },
  { id: 3, type: "streak", current: 12, target: 14, icon: Flame, color: "text-orange-400" },
  { id: 4, type: "words", current: 15, target: 20, icon: PenTool, color: "text-cyan-400" },
];

// Quick activities
const quickActivities = [
  { id: 1, name: "Daily Review", xp: 30, time: "5 min", icon: RefreshCw, color: "from-blue-500 to-cyan-500" },
  { id: 2, name: "Speaking Practice", xp: 50, time: "10 min", icon: Mic, color: "from-purple-500 to-pink-500" },
  { id: 3, name: "Vocabulary Drill", xp: 40, time: "8 min", icon: Brain, color: "from-green-500 to-emerald-500" },
  { id: 4, name: "Listening", xp: 35, time: "7 min", icon: Headphones, color: "from-amber-500 to-orange-500" },
];

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return count;
}

// Progress ring component
function ProgressRing({ progress, size = 60, strokeWidth = 6, color = "stroke-cyan-500" }: { progress: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        className="text-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={color}
      />
    </svg>
  );
}

// Floating Language Bubble Component - Limited to 10 visible
function FloatingLanguage({ text, lang, color, index, direction }: { text: string; lang: string; color: string; index: number; direction: string }) {
  const randomLeft = Math.random() * 80 + 5;
  const randomDelay = Math.random() * 15;
  const randomDuration = Math.random() * 10 + 20;
  const randomSize = Math.random() * 25 + 55;
  
  // Determine animation based on direction
  const getAnimation = () => {
    switch(direction) {
      case 'up':
        return 'animate-float-up';
      case 'down':
        return 'animate-float-down';
      case 'left':
        return 'animate-float-left';
      case 'right':
        return 'animate-float-right';
      case 'diagonal-up':
        return 'animate-float-diagonal-up';
      case 'diagonal-down':
        return 'animate-float-diagonal-down';
      default:
        return 'animate-float-up';
    }
  };
  
  return (
    <div 
      className={`absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg backdrop-blur-sm ${getAnimation()} opacity-20 hover:opacity-40 transition-opacity cursor-pointer z-0`}
      style={{
        left: `${randomLeft}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        '--tw-gradient-from': color.split(' ')[1] || '#3b82f6',
        '--tw-gradient-to': color.split(' ')[3] || '#8b5cf6',
      } as React.CSSProperties}
      title={lang}
    >
      <span className="text-[10px]">{text}</span>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"home" | "courses" | "achievements" | "leaderboard">("home");
  const { user, logout } = useAuth();
  const [visibleBubbles, setVisibleBubbles] = useState<Array<{lang: typeof floatingLanguagesPool[0]; direction: string}>>([]);
  
  // Animated stats
  const streak = 12;
  const totalXp = 8750;
  const lessonsCompleted = 48;
  const currentLevel = 8;
  const wordsLearned = 342;
  const hoursLearned = 78;
  
  const animatedStreak = useCountUp(streak);
  const animatedXp = useCountUp(totalXp);
  const animatedLessons = useCountUp(lessonsCompleted);
  const animatedWords = useCountUp(wordsLearned);
  const animatedHours = useCountUp(hoursLearned);

  // Initialize with random 10 bubbles from pool of 50
  useEffect(() => {
    const directions = ['up', 'down', 'left', 'right', 'diagonal-up', 'diagonal-down'];
    const shuffled = [...floatingLanguagesPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, VISIBLE_BUBBLES);
    
    setVisibleBubbles(selected.map(lang => ({
      lang,
      direction: directions[Math.floor(Math.random() * directions.length)]
    })));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please sign in to view your dashboard</h1>
          <Link href="/" className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating Languages Background - Only 10 visible from pool of 50 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {visibleBubbles.map((bubble, index) => (
          <FloatingLanguage 
            key={index} 
            text={bubble.lang.text} 
            lang={bubble.lang.lang} 
            color={bubble.lang.color} 
            index={index}
            direction={bubble.direction}
          />
        ))}
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header with User Avatar & Level */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Avatar with Progress Ring */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/25">
                {user.name?.charAt(0) || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1">
                <ProgressRing progress={65} size={28} strokeWidth={3} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{user.name?.split(' ')[0]}</span>
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30">
                  <Trophy className="w-3 h-3" />
                  Level {currentLevel}
                </span>
                <span className="text-blue-200 text-sm">Keep going! You're doing great</span>
              </div>
            </div>
          </div>
          
          {/* Today's Date */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-white/80 text-sm font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Streak */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Streak</p>
                    <p className="text-xl font-bold text-white">{animatedStreak} <span className="text-sm font-normal text-orange-400">days</span></p>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Total XP</p>
                    <p className="text-xl font-bold text-white">{animatedXp.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Words */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <PenTool className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Words</p>
                    <p className="text-xl font-bold text-white">{animatedWords.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Hours</p>
                    <p className="text-xl font-bold text-white">{animatedHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goals Section */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-white">Today's Goals</h2>
                </div>
                <span className="text-sm text-blue-200">
                  {dailyGoals.filter(g => g.current >= g.target).length}/{dailyGoals.length} completed
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dailyGoals.map((goal) => {
                  const IconComponent = goal.icon;
                  const isComplete = goal.current >= goal.target;
                  return (
                    <div 
                      key={goal.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isComplete 
                          ? "bg-green-500/10 border-green-500/30" 
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className={`w-4 h-4 ${goal.color}`} />
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white/30" />
                        )}
                      </div>
                      <div className="text-lg font-bold text-white">{goal.current}/{goal.target}</div>
                      <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            isComplete ? "bg-green-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                          }`}
                          style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Activities */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Quick Practice
                </h2>
                <Link href="/dashboard/practice" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <button
                      key={activity.id}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${activity.color} hover:opacity-90 transition-all hover:scale-105 group text-left`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-semibold text-white text-sm">{activity.name}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white/80 text-xs">+{activity.xp} XP</span>
                        <span className="text-white/60 text-xs">{activity.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  My Languages
                </h2>
                <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Browse more <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Flag */}
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-white/10">
                          <Image
                            src={course.flagUrl}
                            alt={`${course.name} flag`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base font-semibold text-white truncate">{course.name}</h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${course.color} text-white`}>
                              {course.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-blue-200">
                              <Flame className="w-3 h-3 text-orange-400" /> {course.streak} days
                            </span>
                            <span className="flex items-center gap-1 text-xs text-blue-200">
                              <Clock className="w-3 h-3" /> {course.hoursLearned}h
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-blue-200">Progress</span>
                          <span className="font-medium text-white">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-500`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Next Lesson */}
                      <div className="mt-3 p-2.5 bg-white/5 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-300">Next</p>
                          <p className="text-sm font-medium text-white truncate">{course.nextLesson}</p>
                        </div>
                        <button className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${course.color} hover:opacity-90 transition-opacity`}>
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Weekly Progress
                </h3>
              </div>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const dayProgress = [100, 80, 60, 100, 45, 90, 30][i];
                  const isToday = i === new Date().getDay() - 1;
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <span className={`text-xs w-8 ${isToday ? 'text-cyan-400 font-medium' : 'text-blue-200'}`}>{day}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isToday ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-white/20'}`}
                          style={{ width: `${dayProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-200 w-8 text-right">{dayProgress}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  Recent Achievements
                </h3>
              </div>
              <div className="space-y-3">
                {mockAchievements.filter(a => a.unlocked).slice(0, 4).map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{achievement.name}</p>
                        <p className="text-xs text-blue-200 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
                <button 
                  onClick={() => setActiveTab("achievements")}
                  className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 py-2"
                >
                  View all achievements →
                </button>
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Leaderboard
                </h3>
                <button 
                  onClick={() => setActiveTab("leaderboard")}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  View all
                </button>
              </div>
              <div className="space-y-2">
                {mockLeaderboard.slice(0, 4).map((person) => (
                  <div 
                    key={person.id}
                    className={`flex items-center gap-3 p-2 rounded-xl ${person.isUser ? 'bg-cyan-500/10 border border-cyan-500/20' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      person.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      person.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                      person.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {person.rank}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
                      {person.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${person.isUser ? 'text-cyan-300 font-medium' : 'text-white'}`}>
                        {person.name}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-white">{person.xp.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90 italic text-sm">"The expert in anything was once a beginner."</p>
                  <p className="text-cyan-400 text-xs mt-2">— Helen Hayes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for floating animations */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float-down {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(-360deg); opacity: 0; }
        }
        @keyframes float-left {
          0% { transform: translateX(100vw) translateY(50vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateX(-20vw) translateY(-50vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float-right {
          0% { transform: translateX(-20vw) translateY(50vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateX(100vw) translateY(-50vh) rotate(-360deg); opacity: 0; }
        }
        @keyframes float-diagonal-up {
          0% { transform: translate(20vw, 100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translate(-20vw, -100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float-diagonal-down {
          0% { transform: translate(-20vw, -100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translate(20vw, 100vh) rotate(-360deg); opacity: 0; }
        }
        .animate-float-up { animation: float-up linear infinite; }
        .animate-float-down { animation: float-down linear infinite; }
        .animate-float-left { animation: float-left linear infinite; }
        .animate-float-right { animation: float-right linear infinite; }
        .animate-float-diagonal-up { animation: float-diagonal-up linear infinite; }
        .animate-float-diagonal-down { animation: float-diagonal-down linear infinite; }
      `}</style>
    </div>
  );
}
