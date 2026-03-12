"use client";

import { motion } from "framer-motion";

const features = [
  { title: "100K+ Rows", desc: "High-performance virtualization", icon: "⚡" },
  { title: "AI Insights", desc: "Powered by Gemini", icon: "🤖" },
  { title: "Multi-Tenant", desc: "Department switching", icon: "🏢" },
  { title: "Real-time", desc: "Streaming responses", icon: "🔄" },
];

export default function BentoGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:bg-white/10 transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
