import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";

// Utility for 16:9 aspect ratio
const aspectStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  maxWidth: "960px", // typical landscape width
  maxHeight: "540px", // typical landscape height
  aspectRatio: "16/9",
  background: "white",
  borderRadius: "1.5rem",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  overflowY: "auto",
  position: "relative",
};

const benefits = [
  "Attend Grappler's Atlas open mats and meetups in cities around the world (20+ cities running regular events — train, roll, connect)",
  "Get access to the exclusive Grappler's Atlas Chat (Telegram & web) and find training partners, local tips, and travel insights in real time",
  "Meet grapplers for training, sparring, and friendship — matched by belt level, travel plans, and gym style",
  "Get unlimited access to BJJ gym listings in 100+ countries with reviews, visitor tips, drop-in rules, and class schedules",
  'Keep track of your training journey: log your "mat miles," gym visits, roll history, and belt progress',
  "Unlock powerful filters: search cities by gym quality, drop-in friendliness, visa ease, weather, safety, and training costs",
  "Join a tribe of nomadic martial artists traveling, training, and growing together",
  "Learn how to get sports visas, train abroad legally, and connect with local communities",
  "Get alerts when BJJ seminars, camps, or competitions are happening in cities you're visiting",
  "Use our Recovery Finder™ to discover places with saunas, physios, ice baths, and healthy food",
  "Use the BJJ-FIRE calculator to find where to live long-term while training daily on a modest budget",
  "Be first to know about new BJJ camps, affiliate offers, or gear deals in your region",
  "Get access to MatSafe Pro™ – our database of safe gyms (hygiene, injury prevention, coaching quality) curated by the community",
];

type JoinOverlayProps = {
  onClose: () => void;
};

const JoinOverlay: React.FC<JoinOverlayProps> = ({ onClose }) => {
  // State for the email and belt level fields
  const [email, setEmail] = useState("");
  const [belt, setBelt] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div style={aspectStyle} className="relative flex flex-col mx-auto my-auto p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        {/* Header */}
        <div className="mb-4 mt-2 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Join Grappler's Atlas
          </h2>
          <p className="text-lg font-medium text-gray-700">
            The Global BJJ Community for Travelers and Locals Alike
          </p>
        </div>

        {/* Benefits List */}
        <ul className="flex-1 overflow-y-auto my-4 space-y-3">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-base text-gray-800">
              <CheckCircle className="text-green-600 mt-1" size={22} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Email and Belt Level Fields */}
        <div className="mb-4 mt-2 flex flex-col gap-3">
          {/* Email input */}
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* Belt level select */}
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={belt}
            onChange={e => setBelt(e.target.value)}
          >
            <option value="">Select your belt level...</option>
            <option value="white">White Belt</option>
            <option value="blue">Blue Belt</option>
            <option value="purple">Purple Belt</option>
            <option value="brown">Brown Belt</option>
            <option value="black">Black Belt</option>
            <option value="other">Other / Prefer not to say</option>
          </select>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-lg transition-colors duration-200 mt-2 mb-3"
          // TODO: Hook up to your join/signup logic
        >
          Join Grapplers Atlas →
        </button>

        {/* Agreement Notice */}
        <p className="text-xs text-gray-500 text-center mt-1">
          By signing up, you agree to our <a href="#" className="underline">Code of Respect</a>, <a href="#" className="underline">Safety Policy</a>, and <a href="#" className="underline">Community Guidelines</a>.
        </p>
      </div>
    </div>
  );
};

export default JoinOverlay;