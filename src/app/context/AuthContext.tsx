"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}

interface Progress {
  xp: number;
  level: number;
  streak: number;
  lastActivity: string;
  wordsLearned: number;
  lessonsCompleted: number;
  hoursLearned: number;
  languageProgress: Record<string, {
    progress: number;
    completedLessons: number;
    totalLessons: number;
    quizScores: number[];
    lastStudied: string;
  }>;
  achievements: string[];
  dailyGoals: {
    lessons: { current: number; target: number };
    xp: { current: number; target: number };
    streak: { current: number; target: number };
    words: { current: number; target: number };
  };
}

interface AuthContextType {
  user: User | null;
  progress: Progress | null;
  isAuthenticated: boolean;
  login: (email: string, name: string, rememberMe?: boolean) => void;
  signup: (email: string, name: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProgress: (updates: Partial<Progress>) => void;
  addXP: (amount: number) => void;
  completeLesson: (language: string) => void;
  updateLanguageProgress: (language: string, updates: Partial<Progress['languageProgress'][string]>) => void;
  saveQuizScore: (language: string, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateDailyGoals: (updates: Partial<Progress['dailyGoals']>) => void;
  checkAndUpdateStreak: () => void;
}

const defaultProgress: Progress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActivity: new Date().toISOString(),
  wordsLearned: 0,
  lessonsCompleted: 0,
  hoursLearned: 0,
  languageProgress: {},
  achievements: [],
  dailyGoals: {
    lessons: { current: 0, target: 3 },
    xp: { current: 0, target: 500 },
    streak: { current: 0, target: 14 },
    words: { current: 0, target: 20 },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const router = useRouter();

  // Load user and progress from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fluent_user");
    const storedProgress = localStorage.getItem("fluent_progress");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setProgress(parsedProgress);
      // Check streak on load
      checkStreakOnLoad(parsedProgress);
    } else {
      setProgress(defaultProgress);
    }
  }, []);

  const checkStreakOnLoad = (storedProgress: Progress) => {
    const lastActivity = new Date(storedProgress.lastActivity);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken
      setProgress(prev => prev ? {
        ...prev,
        streak: 0,
        dailyGoals: {
          ...prev.dailyGoals,
          streak: { current: 0, target: prev.dailyGoals.streak.target }
        }
      } : null);
    }
  };

  const checkAndUpdateStreak = () => {
    if (!progress) return;
    
    const lastActivity = new Date(progress.lastActivity);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day, no streak update needed
      return;
    }
    
    if (diffDays === 1) {
      // Consecutive day, increment streak
      const newStreak = progress.streak + 1;
      const newLevel = Math.floor(newStreak / 7) + 1;
      
      const updatedProgress = {
        ...progress,
        streak: newStreak,
        level: newLevel,
        lastActivity: now.toISOString(),
        dailyGoals: {
          ...progress.dailyGoals,
          streak: { current: newStreak, target: progress.dailyGoals.streak.target }
        }
      };
      
      setProgress(updatedProgress);
      localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    } else {
      // Streak broken
      const updatedProgress = {
        ...progress,
        streak: 0,
        lastActivity: now.toISOString(),
        dailyGoals: {
          ...progress.dailyGoals,
          streak: { current: 0, target: progress.dailyGoals.streak.target }
        }
      };
      
      setProgress(updatedProgress);
      localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    }
  };

  const login = (email: string, name: string, rememberMe: boolean = false) => {
    const newUser = {
      name,
      email,
      avatar: "/language-hero.svg",
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem("fluent_user", JSON.stringify(newUser));
    
    if (rememberMe) {
      localStorage.setItem("fluent_remember", "true");
    } else {
      localStorage.removeItem("fluent_remember");
    }
    
    // Initialize or load progress
    const storedProgress = localStorage.getItem("fluent_progress");
    if (!storedProgress) {
      const initialProgress = {
        ...defaultProgress,
        lastActivity: new Date().toISOString(),
      };
      setProgress(initialProgress);
      localStorage.setItem("fluent_progress", JSON.stringify(initialProgress));
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Password validation
    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters long" };
    }
    if (!/[A-Z]/.test(password)) {
      return { success: false, error: "Password must contain at least one uppercase letter" };
    }
    if (!/[a-z]/.test(password)) {
      return { success: false, error: "Password must contain at least one lowercase letter" };
    }
    if (!/[0-9]/.test(password)) {
      return { success: false, error: "Password must contain at least one number" };
    }
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("fluent_users") || "[]");
    if (existingUsers.find((u: User) => u.email === email)) {
      return { success: false, error: "An account with this email already exists" };
    }
    
    // Save new user
    const newUser = {
      name,
      email,
      avatar: "/language-hero.svg",
      createdAt: new Date().toISOString(),
    };
    
    existingUsers.push({ ...newUser, password }); // In real app, hash the password!
    localStorage.setItem("fluent_users", JSON.stringify(existingUsers));
    
    // Auto-login after signup
    login(email, name, true);
    
    return { success: true };
  };

  const logout = () => {
    const rememberMe = localStorage.getItem("fluent_remember") === "true";
    
    setUser(null);
    localStorage.removeItem("fluent_user");
    
    if (!rememberMe) {
      localStorage.removeItem("fluent_progress");
      localStorage.removeItem("fluent_remember");
      setProgress(defaultProgress);
    }
    
    router.push("/");
  };

  const updateProgress = (updates: Partial<Progress>) => {
    if (!progress) return;
    
    const updatedProgress = { ...progress, ...updates, lastActivity: new Date().toISOString() };
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    checkAndUpdateStreak();
  };

  const addXP = (amount: number) => {
    if (!progress) return;
    
    const newXP = progress.xp + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;
    
    const updatedProgress = {
      ...progress,
      xp: newXP,
      level: newLevel,
      lastActivity: new Date().toISOString(),
      dailyGoals: {
        ...progress.dailyGoals,
        xp: { 
          current: Math.min(progress.dailyGoals.xp.current + amount, progress.dailyGoals.xp.target), 
          target: progress.dailyGoals.xp.target 
        }
      }
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    checkAndUpdateStreak();
  };

  const completeLesson = (language: string) => {
    if (!progress) return;
    
    const langProgress = progress.languageProgress[language] || {
      progress: 0,
      completedLessons: 0,
      totalLessons: 50,
      quizScores: [],
      lastStudied: new Date().toISOString(),
    };
    
    const newCompletedLessons = langProgress.completedLessons + 1;
    const newProgress = Math.min(Math.round((newCompletedLessons / langProgress.totalLessons) * 100), 100);
    
    const updatedLanguageProgress = {
      ...progress.languageProgress,
      [language]: {
        ...langProgress,
        completedLessons: newCompletedLessons,
        progress: newProgress,
        lastStudied: new Date().toISOString(),
      }
    };
    
    const updatedProgress = {
      ...progress,
      lessonsCompleted: progress.lessonsCompleted + 1,
      languageProgress: updatedLanguageProgress,
      lastActivity: new Date().toISOString(),
      dailyGoals: {
        ...progress.dailyGoals,
        lessons: {
          current: Math.min(progress.dailyGoals.lessons.current + 1, progress.dailyGoals.lessons.target),
          target: progress.dailyGoals.lessons.target
        }
      }
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    addXP(50); // Award XP for completing a lesson
    checkAndUpdateStreak();
  };

  const updateLanguageProgress = (language: string, updates: Partial<Progress['languageProgress'][string]>) => {
    if (!progress) return;
    
    const langProgress = progress.languageProgress[language] || {
      progress: 0,
      completedLessons: 0,
      totalLessons: 50,
      quizScores: [],
      lastStudied: new Date().toISOString(),
    };
    
    const updatedLanguageProgress = {
      ...progress.languageProgress,
      [language]: {
        ...langProgress,
        ...updates,
        lastStudied: new Date().toISOString(),
      }
    };
    
    const updatedProgress = {
      ...progress,
      languageProgress: updatedLanguageProgress,
      lastActivity: new Date().toISOString(),
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
  };

  const saveQuizScore = (language: string, score: number) => {
    if (!progress) return;
    
    const langProgress = progress.languageProgress[language] || {
      progress: 0,
      completedLessons: 0,
      totalLessons: 50,
      quizScores: [],
      lastStudied: new Date().toISOString(),
    };
    
    const updatedQuizScores = [...langProgress.quizScores, score];
    const avgScore = Math.round(updatedQuizScores.reduce((a, b) => a + b, 0) / updatedQuizScores.length);
    
    const updatedLanguageProgress = {
      ...progress.languageProgress,
      [language]: {
        ...langProgress,
        quizScores: updatedQuizScores,
        progress: Math.min(langProgress.progress + 5, 100), // 5% progress per quiz
        lastStudied: new Date().toISOString(),
      }
    };
    
    const updatedProgress = {
      ...progress,
      languageProgress: updatedLanguageProgress,
      lastActivity: new Date().toISOString(),
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    
    // Award XP based on score
    const xpEarned = score >= 80 ? 30 : score >= 50 ? 20 : 10;
    addXP(xpEarned);
    checkAndUpdateStreak();
  };

  const unlockAchievement = (achievementId: string) => {
    if (!progress) return;
    
    if (progress.achievements.includes(achievementId)) return; // Already unlocked
    
    const updatedProgress = {
      ...progress,
      achievements: [...progress.achievements, achievementId],
      lastActivity: new Date().toISOString(),
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
    addXP(100); // Bonus XP for achievement
  };

  const updateDailyGoals = (updates: Partial<Progress['dailyGoals']>) => {
    if (!progress) return;
    
    const updatedProgress = {
      ...progress,
      dailyGoals: {
        ...progress.dailyGoals,
        ...updates,
      },
      lastActivity: new Date().toISOString(),
    };
    
    setProgress(updatedProgress);
    localStorage.setItem("fluent_progress", JSON.stringify(updatedProgress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProgress,
        addXP,
        completeLesson,
        updateLanguageProgress,
        saveQuizScore,
        unlockAchievement,
        updateDailyGoals,
        checkAndUpdateStreak,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
