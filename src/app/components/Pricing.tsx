"use client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface Plan {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    color: "from-slate-500 to-slate-600",
    features: [
      "Access to 5 languages",
      "Basic vocabulary lessons",
      "1 practice session/day",
      "Community forum access",
      "Mobile app access"
    ]
  },
  {
    name: "Pro",
    price: 12.99,
    period: "month",
    popular: true,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Access to all 50+ languages",
      "Unlimited practice sessions",
      "AI-powered pronunciation coach",
      "Offline download capability",
      "Certificate of completion",
      "Priority support",
      "Advanced grammar lessons",
      "Live native speaker conversations"
    ]
  },
  {
    name: "Enterprise",
    price: 49.99,
    period: "month",
    color: "from-violet-500 to-purple-600",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom learning paths",
      "API access",
      "Dedicated account manager",
      "Analytics & reporting",
      "SSO integration",
      "Custom branding"
    ]
  }
];

export default function Pricing() {
  const { palette } = useTheme();
  const [isAnnual, setIsAnnual] = useState(false);
  const isDarkTheme = palette !== "default" && palette !== "custom";

  return (
    <section id="pricing" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-900/80' : 'bg-slate-50'} transition-all duration-700`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-blue-200 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your learning goals. Upgrade or downgrade anytime.
          </p>

          {/* Toggle - Fixed to prevent overlap */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium transition-colors whitespace-nowrap ${!isAnnual ? "text-slate-800 dark:text-white" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-20 h-9 bg-blue-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex-shrink-0"
              aria-label={isAnnual ? "Switch to monthly billing" : "Switch to annual billing"}
              type="button"
            >
              <span
                className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow transition-transform duration-200 ${
                  isAnnual ? "translate-x-11" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors whitespace-nowrap ${isAnnual ? "text-slate-800 dark:text-white" : "text-slate-500"}`}>
              Annual <span className="text-green-500 font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 transition-all hover:-translate-y-2 ${
                plan.popular ? "border-blue-500 ring-4 ring-blue-500/20" : "border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-slate-800 dark:text-white">
                    ${isAnnual && plan.price > 0 ? (plan.price * 0.8).toFixed(2) : plan.price}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {plan.price === 0 ? "" : `/${isAnnual ? "mo" : plan.period}`}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-blue-500/25`
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {plan.price === 0 ? "Get Started Free" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>

        {/* Money-back guarantee - Using modern icons instead of emojis */}
        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mt-12">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>30-day money-back guarantee</span>
          <span className="mx-2">•</span>
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>No questions asked</span>
          <span className="mx-2">•</span>
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
