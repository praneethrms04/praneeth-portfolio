"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">
            Building software that ships
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-gray-400 leading-relaxed"
          >
            <p>
              I&apos;m Praneeth, a Full Stack engineer with a growing focus on
              microservices and DevOps. My GitHub has 80+ repos — real
              applications across the MERN stack, TypeScript, Next.js, and
              Python, plus a steady move into distributed systems.
            </p>
            <p>
              Recent builds include a multi-machine{" "}
              <span className="text-white">System Health Monitor</span> (Python
              agents · Express · MongoDB · React/TanStack), a{" "}
              <span className="text-white">Social Media Microservices</span>{" "}
              backend in Node.js, a{" "}
              <span className="text-white">MERN AI Image Generator</span>, a
              full <span className="text-white">LMS platform</span>, and this
              portfolio — itself a real microservices system with auth,
              content, AI, and gateway services.
            </p>
            <p>
              I care about correctness, developer experience, and shipping
              things that actually work in production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Public repos", value: "80+" },
              { label: "Microservices shipped", value: "5" },
              { label: "Primary stacks", value: "MERN · Next · Python" },
              { label: "Focus", value: "Backend · DevOps · AI" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="text-white font-semibold text-lg">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
