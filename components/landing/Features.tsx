"use client";

import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Built for Performance</h2>
          <p className="text-gray-400 text-lg">Modern tech stack for enterprise-grade analytics</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">🎯 Virtualization</h3>
            <p className="text-gray-400">Render 100,000+ rows smoothly with TanStack Virtual</p>
          </div>
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">🔍 Smart Search</h3>
            <p className="text-gray-400">Fuzzy search and multi-column filtering with Fuse.js</p>
          </div>
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">⚙️ Command Palette</h3>
            <p className="text-gray-400">Cmd+K navigation for power users</p>
          </div>
        </div>
      </div>
    </section>
  );
}
