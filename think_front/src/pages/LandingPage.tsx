import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components//Button";
// import { LightbulbIcon } from "@heroicons/react/24/solid"; // Using Heroicons for bulb icon

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-800 via-purple-900 to-gray-900 text-white">
      {/* Get Started Button - Now at the Top Center */}
      <motion.div
        className="absolute top-80 ml-96"
        whileHover={{ scale: 1.1 }}
      >
        <Link to="/Signup">
          <Button variant="primary" text="Get Started" className="px-6 py-3 text-lg" />
        </Link>
      </motion.div>

      {/* Top Navigation */}
      <header className="flex justify-between items-center px-8 py-5">
        {/* Logo & Name */}
        <div className="flex items-center gap-3 text-3xl font-bold">
          {/* <LightbulbIcon className="w-9 h-9 text-yellow-400" /> */}
          <span>ThinkTank</span>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-6">
          <Link to="/Signin">
            <Button variant="primary" text="Sign In" />
          </Link>
          <Link to="/Signup">
            <Button variant="primary" text="Sign Up" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold leading-tight max-w-3xl">
          Save & Organize Your <span className="text-yellow-400"> Important Links & Notes </span>
        </h1>
        <p className="mt-5 text-xl text-gray-300 max-w-2xl">
          Keep track of your favorite YouTube videos, Twitter threads, documents, and notes in one place.
        </p>
      </motion.div>

      {/* Why Use ThinkTank Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-20 bg-black bg-opacity-50">
        {[
          { title: "🔒 Secure Storage", text: "Your data is safe and encrypted with top-tier security." },
          { title: "📂 Easy Organization", text: "Tag, search, and find your saved items quickly." },
          { title: "🌎 Access Anywhere", text: "Sync your content seamlessly across all devices." }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-lg bg-gray-800 shadow-xl hover:bg-gray-700 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="text-gray-300 mt-3">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
