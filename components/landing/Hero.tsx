"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Bharat Insight</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-Driven Analytics Platform for Indian Public Data
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Explore Dashboard
            </Link>
            <button className="px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 glass rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Interactive Chart Preview</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
