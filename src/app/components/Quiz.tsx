"use client";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizzesByLanguage: Record<string, Question[]> = {
  Spanish: [
    { id: 1, question: "How do you say 'Hello' in Spanish?", options: ["Hola", "Adiós", "Gracias", "Por favor"], correctAnswer: 0 },
    { id: 2, question: "What is 'Good morning' in Spanish?", options: ["Buenas noches", "Buenos días", "Buenas tardes", "¿Cómo estás?"], correctAnswer: 1 },
    { id: 3, question: "What does '¿Cuántos años tienes?' mean?", options: ["What's your name?", "How old are you?", "Where are you from?", "What do you do?"], correctAnswer: 1 },
    { id: 4, question: "How do you say 'Thank you' in Spanish?", options: ["Por favor", "Gracias", "De nada", "Lo siento"], correctAnswer: 1 },
    { id: 5, question: "What is 'Goodbye' in Spanish?", options: ["Hola", "Adiós", "Gracias", "Sí"], correctAnswer: 1 },
  ],
  French: [
    { id: 1, question: "How do you say 'Hello' in French?", options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"], correctAnswer: 0 },
    { id: 2, question: "What is 'Thank you' in French?", options: ["Merci", "Bonjour", "Au revoir", "Pardon"], correctAnswer: 0 },
    { id: 3, question: "How do you say 'Goodbye' in French?", options: ["Bonjour", "Au revoir", "Merci", "Oui"], correctAnswer: 1 },
    { id: 4, question: "What does 'Comment ça va?' mean?", options: ["What's your name?", "How are you?", "Where are you from?", "What time is it?"], correctAnswer: 1 },
    { id: 5, question: "How do you say 'Please' in French?", options: ["Merci", "S'il vous plaît", "Pardon", "Excusez-moi"], correctAnswer: 1 },
  ],
  Japanese: [
    { id: 1, question: "How do you say 'Hello' in Japanese?", options: ["こんにちは", "さようなら", "ありがとう", "すみません"], correctAnswer: 0 },
    { id: 2, question: "What is 'Thank you' in Japanese?", options: ["こんにちは", "さようなら", "ありがとう", "すみません"], correctAnswer: 2 },
    { id: 3, question: "How do you say 'Goodbye' in Japanese?", options: ["こんにちは", "さようなら", "ありがとう", "すみません"], correctAnswer: 1 },
    { id: 4, question: "What does 'すみません' mean?", options: ["Hello", "Thank you", "Sorry/Excuse me", "Goodbye"], correctAnswer: 2 },
    { id: 5, question: "How do you say 'Yes' in Japanese?", options: ["はい", "いいえ", "ありがとう", "すみません"], correctAnswer: 0 },
  ],
  German: [
    { id: 1, question: "How do you say 'Hello' in German?", options: ["Hallo", "Auf Wiedersehen", "Danke", "Bitte"], correctAnswer: 0 },
    { id: 2, question: "What is 'Thank you' in German?", options: ["Hallo", "Auf Wiedersehen", "Danke", "Bitte"], correctAnswer: 2 },
    { id: 3, question: "How do you say 'Goodbye' in German?", options: ["Hallo", "Auf Wiedersehen", "Danke", "Bitte"], correctAnswer: 1 },
    { id: 4, question: "What does 'Wie geht es Ihnen?' mean?", options: ["What's your name?", "How are you?", "Where are you from?", "What time is it?"], correctAnswer: 1 },
    { id: 5, question: "How do you say 'Please' in German?", options: ["Danke", "Bitte", "Entschuldigung", "Hallo"], correctAnswer: 1 },
  ],
};

interface QuizProps {
  language: string;
  onComplete?: (score: number, total: number) => void;
}

export default function Quiz({ language, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = quizzesByLanguage[language] || quizzesByLanguage["Spanish"];
  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      onComplete?.(score + (selectedAnswer === question.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center border border-white/10">
          <div className="text-6xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "💪"}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-blue-200 mb-6">You scored {score} out of {questions.length}</p>
          
          <div className="bg-white/5 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-bold text-cyan-400 mb-2">{percentage}%</div>
            <p className="text-blue-200">
              {percentage >= 80 ? "Excellent! You're a natural!" : 
               percentage >= 50 ? "Good job! Keep practicing!" : 
               "Keep learning! You'll improve!"}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full border border-white/10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-blue-200 text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                  isAnswered
                    ? idx === question.correctAnswer
                      ? "bg-green-500/20 border-2 border-green-500 text-green-400"
                      : idx === selectedAnswer
                        ? "bg-red-500/20 border-2 border-red-500 text-red-400"
                        : "bg-white/5 text-blue-200"
                    : "bg-white/5 text-white hover:bg-white/10 border-2 border-transparent hover:border-cyan-500/50"
                }`}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 mr-3 text-sm">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
