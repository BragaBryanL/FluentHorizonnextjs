"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import AuthModal from "./AuthModal";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import { useTheme } from "./context/ThemeContext";

const languages = [
  { name: "English", flagUrl: "https://flagcdn.com/gb.svg", description: "Master global communication.", speakers: "1.5B", difficulty: "Medium", script: "Latin" },
  { name: "Spanish", flagUrl: "https://flagcdn.com/es.svg", description: "Speak the world's second-most native language.", speakers: "543M", difficulty: "Easy", script: "Latin" },
  { name: "French", flagUrl: "https://flagcdn.com/fr.svg", description: "Experience the language of love and diplomacy.", speakers: "280M", difficulty: "Medium", script: "Latin" },
  { name: "Chinese", flagUrl: "https://flagcdn.com/cn.svg", description: "Unlock the most spoken language on earth.", speakers: "1.1B", difficulty: "Hard", script: "Hanzi" },
  { name: "Arabic", flagUrl: "https://flagcdn.com/sa.svg", description: "Connect with rich history and culture.", speakers: "319M", difficulty: "Hard", script: "Arabic" },
  { name: "German", flagUrl: "https://flagcdn.com/de.svg", description: "Explore Europe's powerhouse language.", speakers: "132M", difficulty: "Medium", script: "Latin" },
  { name: "Japanese", flagUrl: "https://flagcdn.com/jp.svg", description: "Dive into technology and tradition.", speakers: "125M", difficulty: "Hard", script: "Hiragana" },
  { name: "Russian", flagUrl: "https://flagcdn.com/ru.svg", description: "Discover the language of Tolstoy.", speakers: "258M", difficulty: "Hard", script: "Cyrillic" },
  { name: "Italian", flagUrl: "https://flagcdn.com/it.svg", description: "Enjoy art, food, and history.", speakers: "68M", difficulty: "Easy", script: "Latin" },
  { name: "Korean", flagUrl: "https://flagcdn.com/kr.svg", description: "Explore K-culture and innovation.", speakers: "77M", difficulty: "Medium", script: "Hangul" },
  { name: "Portuguese", flagUrl: "https://flagcdn.com/pt.svg", description: "Connect across continents.", speakers: "250M", difficulty: "Easy", script: "Latin" },
  { name: "Hindi", flagUrl: "https://flagcdn.com/in.svg", description: "Explore the world's largest democracy.", speakers: "600M", difficulty: "Hard", script: "Devanagari" },
];

type PaletteType = "default" | "ocean" | "sunset" | "forest" | "custom";

const floatingChars = [
  { char: "A", lang: "English", size: "text-5xl", opacity: "opacity-20", delay: "0s" },
  { char: "你好", lang: "Chinese", size: "text-6xl", opacity: "opacity-15", delay: "0.5s" },
  { char: "こんにちは", lang: "Japanese", size: "text-4xl", opacity: "opacity-25", delay: "1s" },
  { char: "مرحبا", lang: "Arabic", size: "text-5xl", opacity: "opacity-20", delay: "1.5s" },
  { char: "Привет", lang: "Russian", size: "text-4xl", opacity: "opacity-15", delay: "2s" },
  { char: "Bonjour", lang: "French", size: "text-5xl", opacity: "opacity-20", delay: "2.5s" },
  { char: "Hola", lang: "Spanish", size: "text-6xl", opacity: "opacity-25", delay: "3s" },
  { char: "Ciao", lang: "Italian", size: "text-4xl", opacity: "opacity-15", delay: "3.5s" },
  { char: "안녕하세요", lang: "Korean", size: "text-5xl", opacity: "opacity-20", delay: "4s" },
  { char: "नमस्ते", lang: "Hindi", size: "text-4xl", opacity: "opacity-25", delay: "4.5s" },
  { char: "Hello", lang: "English", size: "text-3xl", opacity: "opacity-10", delay: "5s" },
  { char: "Mundo", lang: "Spanish", size: "text-3xl", opacity: "opacity-10", delay: "5.5s" },
  { char: "世界", lang: "Chinese", size: "text-5xl", opacity: "opacity-15", delay: "6s" },
  { char: "Планета", lang: "Russian", size: "text-4xl", opacity: "opacity-20", delay: "6.5s" },
  { char: "Terre", lang: "French", size: "text-3xl", opacity: "opacity-10", delay: "7s" },
];

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const { palette, setPalette, customColors } = useTheme();
  const [search, setSearch] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setShowAuth(true);
    window.addEventListener('open-auth-modal', handler);
    return () => window.removeEventListener('open-auth-modal', handler);
  }, []);

  const filteredLanguages = useMemo(() => 
    languages.filter(lang => 
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.script.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleSearchClear = () => setSearch("");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300";
      case "Medium": return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300";
      case "Hard": return "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300";
      default: return "bg-zinc-100 text-zinc-700";
    }
  };

  const paletteGradients: Record<PaletteType, string> = {
    ocean: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
    sunset: "bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600",
    forest: "bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800",
    default: "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50",
    custom: "bg-gradient-to-br from-slate-50 via-white to-blue-50",
  };

  const textColors: Record<PaletteType, { primary: string; secondary: string; accent: string }> = {
    ocean: { primary: "text-white", secondary: "text-blue-200", accent: "text-cyan-300" },
    sunset: { primary: "text-white", secondary: "text-orange-100", accent: "text-yellow-300" },
    forest: { primary: "text-white", secondary: "text-green-100", accent: "text-emerald-300" },
    default: { primary: "text-slate-900", secondary: "text-slate-600", accent: "text-blue-600" },
    custom: { primary: "text-slate-900", secondary: "text-slate-600", accent: "text-blue-600" },
  };

  const colors = textColors[palette];
  const isLightTheme = palette === "default" || palette === "custom";

  return (
    <div className="relative min-h-screen font-sans w-full overflow-x-hidden" style={palette === "custom" ? { background: customColors.background } : {}}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${paletteGradients[palette]} transition-all duration-1000`}></div>
        {floatingChars.map((item, idx) => (
          <div
            key={`${item.lang}-${idx}`}
            className={`absolute font-bold ${item.size} animate-float pointer-events-none ${
              isLightTheme ? "text-slate-300" : `${item.opacity} ${colors.accent}`
            }`}
            style={{
              left: `${(idx * 7) % 85 + 5}%`,
              top: `${(idx * 11) % 65 + 15}%`,
              animationDelay: item.delay,
              transform: `rotate(${idx * 25 - 100}deg)`,
              textShadow: isLightTheme ? "0 0 15px rgba(0,0,0,0.1)" : `0 0 20px currentColor, 0 0 40px currentColor`,
              opacity: isLightTheme ? 0.15 : undefined,
            }}
          >
            {item.char}
          </div>
        ))}
        {!isLightTheme && (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <main className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 w-full">
        <div className="max-w-6xl mx-auto text-center mb-16 sm:mb-24">
          <div className="animate-fade-in">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border mb-6 animate-slide-up ${
              isLightTheme ? "bg-blue-50 border-blue-200" : "bg-white/10 border-white/20"
            }`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className={`text-sm font-medium ${colors.secondary}`}>Join 50,000+ learners worldwide</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 ${colors.primary} leading-tight animate-slide-up`}>
              Speak Any Language,
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Connect Everywhere
              </span>
            </h1>

            <p className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 ${colors.secondary} transition-colors duration-300 animate-slide-up`}>
              Master any language with AI-powered lessons, native speakers, and immersive practice. Your journey to fluency starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up">
              <button
                onClick={() => setShowAuth(true)}
                className={`px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                  isLightTheme ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25" : "bg-white text-slate-900 hover:bg-gray-100"
                }`}
              >
                Start Learning Free <span className="ml-2">→</span>
              </button>
              <button
                className={`px-8 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 active:scale-95 ${
                  isLightTheme ? "border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600" : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                View Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12 animate-fade-in">
              {[
                { number: "50K+", label: "Active Learners" },
                { number: "12+", label: "Languages" },
                { number: "98%", label: "Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-2xl sm:text-3xl font-bold ${colors.primary}`}>{stat.number}</div>
                  <div className={`text-sm ${colors.secondary}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="courses" className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${colors.primary}`}>Explore Languages</h2>
            <p className={`text-lg ${colors.secondary}`}>Choose your path to fluency</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages or scripts..."
                className={`w-full px-6 py-4 pr-14 rounded-2xl border backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg shadow-xl ${
                  isLightTheme ? "bg-white border-slate-300 text-slate-900 placeholder-slate-400" : "bg-white/10 border-white/20 text-white placeholder-white/50"
                }`}
              />
              {search ? (
                <button
                  onClick={handleSearchClear}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isLightTheme ? "text-slate-400 hover:text-slate-600" : "text-white/50 hover:text-white"}`}
                  aria-label="Clear search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 ${isLightTheme ? "text-slate-400" : "text-white/50"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLanguages.map((lang, idx) => (
              <div
                key={lang.name}
                className={`relative rounded-3xl p-6 backdrop-blur-md border transition-all duration-300 cursor-pointer group animate-fade-in-card hover:scale-105 hover:-translate-y-2 ${
                  isLightTheme ? "bg-white border-slate-200 shadow-lg hover:shadow-xl" : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
                onMouseEnter={() => setActiveCard(lang.name)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={lang.flagUrl} alt={`${lang.name} flag`} fill className="object-cover" unoptimized />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(lang.difficulty)}`}>{lang.difficulty}</span>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isLightTheme ? "text-slate-900" : "text-white"} group-hover:text-cyan-300 transition-colors`}>{lang.name}</h3>
                <p className={`text-sm mb-4 ${isLightTheme ? "text-slate-600" : "text-white/70"}`}>{lang.description}</p>

                <div className={`flex items-center justify-between text-xs ${isLightTheme ? "text-slate-500" : "text-white/50"}`}>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {lang.speakers} speakers
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {lang.script}
                  </span>
                </div>

                <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform ${
                  isLightTheme ? "bg-blue-600 text-white" : "bg-cyan-400 text-slate-900"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className={`text-6xl mb-4 ${colors.secondary}`}>🔍</div>
              <p className={`text-xl ${colors.secondary}`}>No languages found matching "{search}"</p>
            </div>
          )}
        </section>

        {showAuth && (
          <div className="z-40">
            <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />
          </div>
        )}
      </main>

      <Testimonials />
      <Pricing />
      <About />
      <Contact />

      <button
        className={`fixed bottom-8 right-8 z-50 backdrop-blur-md border p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all ${
          isLightTheme ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
        }`}
        onClick={() => setShowSettings(true)}
        aria-label="Open theme settings"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-title"
          onClick={() => setShowSettings(false)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className={`rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 relative animate-slide-up ${isLightTheme ? "bg-white" : "bg-slate-900"}`}
          >
            <button
              className={`absolute top-4 right-4 hover:text-blue-600 ${isLightTheme ? "text-slate-400" : "text-slate-500"}`}
              onClick={() => setShowSettings(false)}
              aria-label="Close settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 id="settings-title" className={`text-2xl font-bold mb-6 text-center ${isLightTheme ? "text-slate-900" : "text-white"}`}>
              Choose Your Theme
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "ocean", name: "Ocean Night", gradient: "from-slate-900 via-blue-900 to-slate-900" },
                { id: "sunset", name: "Sunset", gradient: "from-orange-500 via-rose-500 to-pink-600" },
                { id: "forest", name: "Forest", gradient: "from-green-800 via-emerald-700 to-teal-800" },
                { id: "default", name: "Daylight", gradient: "from-slate-50 via-blue-50 to-indigo-50" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setPalette(theme.id as PaletteType)}
                  className={`relative p-4 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 ${palette === theme.id ? "ring-4 ring-cyan-400 ring-offset-2" : ""}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}></div>
                  <div className="relative text-center py-8">
                    <div className="text-white font-semibold">{theme.name}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-2xl ${isLightTheme ? "bg-slate-100" : "bg-slate-800"}`}>
              <p className={`text-sm text-center ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>
                🎨 More themes and customization options coming soon!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
