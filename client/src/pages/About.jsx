import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    { title: "Interactive Learning", description: "Engaging content with hands-on practice" },
    { title: "AI-Powered", description: "Smart learning path tailored to your needs" },
    { title: "Track Progress", description: "Monitor your growth in real-time" },
    { title: "Expert Content", description: "Curated by industry professionals" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black p-4 sm:p-6 md:p-8">
      {/* Logo and Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <img 
          src="/logo.png" 
          alt="OneStack Logo" 
          className="w-28 h-28 mx-auto mb-1 drop-shadow-xl"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 dark:text-purple-100 mb-4">
          Welcome to OneStack
        </h1>
        <p className="text-lg md:text-xl text-purple-800 dark:text-purple-200 max-w-2xl mx-auto">
          Your comprehensive learning platform that brings together the best of technology education,
          making it accessible, engaging, and effective for everyone.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="glass-morphism rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            style={{
              rotate: Math.random() * 4 - 2 + 'deg',
              translateY: (index % 2) * 20 + 'px'
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-purple-800 dark:text-purple-200">
              {feature.title}
            </h3>
            <p className="text-purple-700 dark:text-purple-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Info Points */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto min-h-[300px]"
      >
        {[
          { text: "18+ Technical Domains", position: "top-0 left-10" },
          { text: "Most Curated Content", position: "top-20 right-20" },
          { text: "Real-world Projects", position: "bottom-10 left-1/4" },
          { text: "AI-Powered Learning", position: "top-40 left-1/3" },
          { text: "Interactive Learning", position: "bottom-20 right-10" },
          { text: "Top notch Resouces", position: "top-20 left-1/3" },
        ].map((item, index) => (
          <motion.div
            key={item.text}
            variants={itemVariants}
            className={`absolute ${item.position} glass-morphism rounded-lg p-4 shadow-xl cursor-pointer
                     hover:scale-110 transition-transform duration-300
                     backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20`}
            whileHover={{
              rotate: Math.random() * 10 - 5,
              transition: { duration: 0.2 }
            }}
          >
            <p className="text-purple-900 dark:text-purple-100 font-medium">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
