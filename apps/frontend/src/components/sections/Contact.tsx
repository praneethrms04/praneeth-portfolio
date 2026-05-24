"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
          Get in touch
        </span>
        <h2 className="text-4xl font-bold text-white mt-2 mb-4">
          Let&apos;s build something
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Open to full-time roles, freelance projects, and interesting
          collaborations. The fastest way to reach me is by email.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:praneethrms04@gmail.com"
            className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Email Me
          </a>
          <a
            href="https://github.com/praneethrms04"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/praneethrms04"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
