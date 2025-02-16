import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Lightbulb, Globe, Shield, FolderKanban } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background with enhanced gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-95 z-0" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center mix-blend-overlay opacity-20" />

      <div className="relative z-10 text-white">
        {/* Top Navigation */}
        <header className="container mx-auto flex justify-between items-center px-6 py-8">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              ThinkTank
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <Link to="/signin">
              <Button variant="primary" text="Sign In" className="text-sm" />
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div
          className="container mx-auto px-6 pt-12 pb-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Digital
            <span className="block bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Second Brain
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Seamlessly capture, organize, and access your digital knowledge.
            Transform scattered information into structured thoughts.
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/signup">
              <Button 
                variant="primary" 
                text="Start Your Journey" 
                className="text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield className="w-8 h-8 text-indigo-400" />,
                title: "Secure Storage",
                description: "Enterprise-grade encryption keeps your data safe and private."
              },
              {
                icon: <FolderKanban className="w-8 h-8 text-purple-400" />,
                title: "Smart Organization",
                description: "Powerful tagging and categorization for effortless retrieval."
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-400" />,
                title: "Access Anywhere",
                description: "Sync across all your devices with real-time updates."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}