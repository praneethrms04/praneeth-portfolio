"use client";

import { motion } from "framer-motion";

const groups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind", "Zustand", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Python", "REST", "Socket.io"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            Toolkit
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/40 transition-colors"
            >
              <h3 className="text-white font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
