import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Layers, Cpu, Globe2, Sparkles } from "lucide-react";

export function About() {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-amber-400" />,
      title: "Lightning Fast",
      desc: "Generate responsive AI-powered forms in seconds from prompt to publish.",
    },
    {
      icon: <Shield className="w-10 h-10 text-emerald-400" />,
      title: "Secure & Reliable",
      desc: "Enterprise-grade security keeps your data safe, private, and always backed up.",
    },
    {
      icon: <Layers className="w-10 h-10 text-sky-400" />,
      title: "Fully Customizable",
      desc: "Easily modify forms to match your exact needs and branding.",
    },
  ];

  const values = [
    {
      icon: <Cpu className="w-10 h-10 text-blue-600 mb-4" />,
      title: "Innovation",
      desc: "Redefining productivity and creativity with AI-powered form solutions.",
    },
    {
      icon: <Globe2 className="w-10 h-10 text-indigo-600 mb-4" />,
      title: "Accessibility",
      desc: "Powerful technology made simple and available to everyone.",
    },
    {
      icon: <Shield className="w-10 h-10 text-purple-600 mb-4" />,
      title: "Trust & Security",
      desc: "Your data privacy is our top priority with end-to-end protection.",
    },
  ];

  return (
    <div className="relative bg-gray-50 text-gray-900 overflow-hidden">
      {/* ================= Interactive Floating Blobs ================= */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ x: [0, 200, 0], y: [0, 150, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-teal-400 opacity-20 rounded-full filter blur-2xl"
        animate={{ x: [0, -180, 0], y: [0, -100, 0] }}
        transition={{ repeat: Infinity, duration: 50, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-15 rounded-full filter blur-3xl"
        animate={{ x: [0, 220, 0], y: [0, 120, 0] }}
        transition={{ repeat: Infinity, duration: 45, ease: "easeInOut" }}
      />

      {/* ================= Particle Dots ================= */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          initial={{ x: Math.random() * 1200, y: Math.random() * 800 }}
          animate={{
            x: [
              Math.random() * 1200,
              Math.random() * 1200,
              Math.random() * 1200,
            ],
            y: [
              Math.random() * 800,
              Math.random() * 800,
              Math.random() * 800,
            ],
          }}
          transition={{ repeat: Infinity, duration: 60 + Math.random() * 40, ease: "linear" }}
        />
      ))}

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-28 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            About SaasAI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Revolutionizing AI-powered form creation for businesses and teams —
            fast, secure, and beautifully designed.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <div className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-lg font-medium text-indigo-700 shadow-md">
              Trusted by 500+ Companies
            </div>
            <div className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-lg font-medium text-indigo-700 shadow-md">
              100k+ Forms Generated
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold text-gray-900 mb-4"
          >
            Why Choose SaasAI?
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience innovation built for speed, security, and simplicity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white/90 rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all backdrop-blur-md"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="py-24 px-6 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            What drives us to deliver the best AI form experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {values.map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/90 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all backdrop-blur-md"
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-700">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white py-24 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Shaping the Future of Form Creation
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Join SaasAI to create smarter forms, faster than ever. Build,
            automate, and interact with intelligent forms.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/signup"
              className="inline-block bg-white text-indigo-700 font-semibold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Join Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/docs"
              className="inline-block border border-white text-white py-4 px-10 rounded-xl hover:bg-white hover:text-indigo-700 transition-all"
            >
              Learn More
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
