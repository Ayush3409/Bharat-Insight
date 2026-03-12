"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12">
        <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
        <p className="text-gray-400 text-lg mb-8">
          Access powerful analytics and AI-driven insights from Indian public data
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
}
