"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  language: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Fluent Horizons transformed my career. Learning Spanish through this platform helped me land a job in Miami. The interactive lessons are incredibly engaging!",
    rating: 5,
    language: "Spanish"
  },
  {
    id: 2,
    name: "Marcus Weber",
    role: "Business Analyst",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "The Japanese course is phenomenal. I went from zero to conversational in just 6 months. The cultural insights really helped me connect with clients in Tokyo.",
    rating: 5,
    language: "Japanese"
  },
  {
    id: 3,
    name: "Emma Laurent",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Learning French has always been my dream. Fluent Horizons made it achievable with their structured curriculum and native speaker practice sessions.",
    rating: 5,
    language: "French"
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "As someone who travels constantly, learning multiple languages through Fluent Horizons has been a game-changer. The mobile app is perfect for on-the-go learning.",
    rating: 4,
    language: "German"
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "International Relations",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    content: "The Arabic course helped me prepare for my posting in Dubai. The pronunciation guides and cultural context made all the difference.",
    rating: 5,
    language: "Arabic"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Chef",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "Learning Italian to connect with my heritage was made beautiful thanks to Fluent Horizons. The food and culture modules are delicious!",
    rating: 5,
    language: "Italian"
  }
];

export default function Testimonials() {
  const { palette } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const isDarkTheme = palette !== "default" && palette !== "custom";
  
  return (
    <section id="testimonials" className={`py-20 px-4 ${isDarkTheme ? 'bg-gradient-to-b from-slate-900/80 to-blue-900/80' : 'bg-gradient-to-b from-white to-blue-50'} transition-all duration-700`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">250,000+</span> Learners
          </h2>
          <p className="text-lg text-slate-600 dark:text-blue-200 max-w-2xl mx-auto">
            Join thousands of satisfied students who transformed their lives through language learning
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="relative mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? "text-yellow-400" : "text-slate-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-4 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-slate-500 dark:text-slate-400">{testimonials[currentIndex].role}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {testimonials[currentIndex].language}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-slate-700 transition-all group"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-slate-700 transition-all group"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-blue-400"
              }`}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { value: "250K+", label: "Active Learners" },
            { value: "50+", label: "Languages" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "4.9", label: "App Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {stat.value}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
