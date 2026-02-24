"use client";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Elena Martinez",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Former linguistics professor with 15+ years of experience in language education technology."
  },
  {
    name: "James Chen",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Ex-Google product manager passionate about creating engaging learning experiences."
  },
  {
    name: "Sarah Thompson",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Master's in Applied Linguistics, created curriculum for 30+ languages."
  },
  {
    name: "Dr. Michael Okonkwo",
    role: "AI Research Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "PhD in Machine Learning, specializing in NLP for language learning."
  }
];

const milestones = [
  { year: "2020", title: "Founded", description: "Started with a vision to make language learning accessible to everyone" },
  { year: "2021", title: "10K Learners", description: "Reached our first 10,000 active users" },
  { year: "2022", title: "50 Languages", description: "Expanded to support 50+ languages" },
  { year: "2023", title: "Series A", description: "Raised $10M to accelerate growth and innovation" },
  { year: "2024", title: "250K+ Users", description: "Proudly serving learners from 190+ countries" }
];

// Modern SVG Icons for values
const GlobeIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export default function About() {
  const { palette } = useTheme();
  const isDarkTheme = palette !== "default" && palette !== "custom";

  return (
    <section id="about" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-900/80' : 'bg-white'} transition-all duration-700`}>
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Mission</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-blue-200 max-w-3xl mx-auto">
            We believe that learning a language should be an accessible, enjoyable journey for everyone, everywhere.
          </p>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Breaking Down Language Barriers</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Fluent Horizons was born from a simple idea: everyone deserves the opportunity to learn a new language, regardless of their background or resources.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Our team of linguists, educators, and technologists work together to create an immersive, personalized learning experience that adapts to each learner's unique needs and goals.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">50+</p>
                <p className="text-slate-500 dark:text-slate-400">Languages</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">250K+</p>
                <p className="text-slate-500 dark:text-slate-400">Learners</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">190+</p>
                <p className="text-slate-500 dark:text-slate-400">Countries</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                {milestones.slice(0, 4).map((milestone, index) => (
                  <div key={index} className="text-center p-4">
                    <p className="text-2xl font-bold text-blue-600">{milestone.year}</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{milestone.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex justify-center mb-4">
                <GlobeIcon />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Accessibility</h4>
              <p className="text-slate-600 dark:text-slate-300">Language learning should be free from barriers of cost, location, or ability.</p>
            </div>
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex justify-center mb-4">
                <TargetIcon />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Personalization</h4>
              <p className="text-slate-600 dark:text-slate-300">Every learner is unique. Our AI adapts to individual learning styles and goals.</p>
            </div>
            <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex justify-center mb-4">
                <LightbulbIcon />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Innovation</h4>
              <p className="text-slate-600 dark:text-slate-300">We continuously push boundaries to make learning more effective and enjoyable.</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">Meet Our Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 text-center hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 dark:border-blue-900"
                />
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
