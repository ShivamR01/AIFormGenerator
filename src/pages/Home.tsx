import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wand2,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Layers,
  ArrowRight,
  Check,
  Database,
  Layout,
  PencilRuler,
} from "lucide-react";

// ==========================================================
// Reusable Glass Card Component
// ==========================================================
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: object;
}

const GlassCard = ({
  children,
  className = "",
  whileHover = { scale: 1.03 },
}: GlassCardProps) => (
  <motion.div
    whileHover={whileHover}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

// ==========================================================
// Animation Variants for Framer Motion
// ==========================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ==========================================================
// Main Home Component
// ==========================================================
export function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* ================= FUTURISTIC AURORA BG ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-20rem] top-[-10rem] h-[40rem] w-[60rem] rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-20 blur-3xl" />
        <div className="absolute right-[-15rem] top-[15rem] h-[30rem] w-[50rem] rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 opacity-10 blur-3xl" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/50 bg-blue-500/10 shadow-lg">
            <Wand2 className="h-10 w-10 text-blue-300" />
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
            AI-Powered Form Generator
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-300 md:text-xl">
            Transform your workflow with AI. Describe your form — we build it
            instantly, securely, and beautifully.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-[0_0_20px_theme(colors.blue.500/50)] transition-all hover:scale-105 hover:shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="#features" // Smooth scroll or link
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= VISUAL SHOWCASE ================= */}
      <motion.section
        className="relative z-10 mx-auto -mt-10 max-w-6xl px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <GlassCard className="p-4 sm:p-6">
          <div className="relative h-64 overflow-hidden rounded-lg md:h-[400px]">
            {/* Fake App UI */}
            <div className="absolute inset-0 flex">
              <div className="w-1/4 min-w-[150px] border-r border-white/10 bg-white/5 p-4">
                <div className="mb-4 h-5 w-3/4 rounded-full bg-white/20" />
                <div className="mb-3 h-3 w-full rounded-full bg-white/10" />
                <div className="mb-3 h-3 w-5/6 rounded-full bg-white/10" />
                <div className="mb-3 h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-1/2 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 p-6">
                <div className="mb-6 h-8 w-1/2 rounded-lg bg-white/20" />
                <div className="mb-4 h-10 w-full rounded-lg bg-white/10" />
                <div className="mb-4 h-10 w-full rounded-lg bg-white/10" />
                <div className="mb-4 h-10 w-3/4 rounded-lg bg-white/10" />
                <div className="h-10 w-1/3 rounded-lg bg-blue-500/50" />
              </div>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950/50 to-transparent" />
          </div>
        </GlassCard>
      </motion.section>

      {/* ================= CURVED SHAPED SECTION ================= */}
      <div className="relative z-0 mt-[-50px] overflow-hidden rounded-t-[50px] bg-gray-900/50 pt-32 pb-24 backdrop-blur-md">
        {/* ================= HOW IT WORKS ================= */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-500/20 p-3 text-blue-300">
                  <PencilRuler className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">1. Describe</h3>
                <p className="text-gray-300">
                  Explain what you need. "A contact form with name, email, and
                  message."
                </p>
              </GlassCard>
            </motion.div>
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-purple-500/20 p-3 text-purple-300">
                  <Wand2 className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">2. Generate</h3>
                <p className="text-gray-300">
                  Our AI instantly builds the form, backend, and validation for
                  you.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div variants={itemVariants}>
              <GlassCard className="p-8 text-center">
                <div className="mb-4 inline-block rounded-full bg-green-500/20 p-3 text-green-300">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">3. Analyze</h3>
                <p className="text-gray-300">
                  Collect submissions and view powerful insights on your
                  dashboard.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= FEATURES ================= */}
        <motion.section
          id="features"
          className="mx-auto max-w-7xl px-6 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            Why Choose Us
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Zap className="h-7 w-7 text-blue-400" />,
                title: "Fast Form Generation",
                desc: "AI generates fully functional forms instantly with field validation and styling.",
              },
              {
                icon: <Shield className="h-7 w-7 text-green-400" />,
                title: "Data Security",
                desc: "Enterprise-grade security, encrypted storage, and private forms for peace of mind.",
              },
              {
                icon: <Database className="h-7 w-7 text-amber-400" />,
                title: "Backend Included",
                desc: "We handle the database, API, and submission logic. Just build and deploy.",
              },
            ].map((f) => (
              <motion.div key={f.title} variants={itemVariants}>
                <GlassCard className="p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 shadow-sm">
                    {f.icon}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{f.title}</h3>
                  <p className="leading-relaxed text-gray-300">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= TESTIMONIALS ================= */}
        <motion.section
          className="mx-auto max-w-6xl px-6 py-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Globe className="mx-auto mb-4 h-10 w-10 text-blue-400" />
          <h2 className="mb-10 text-4xl font-bold">Loved by Teams Worldwide</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Arjun Mehta",
                role: "Startup Founder",
                quote:
                  "This app saved us weeks of development time. It’s like having a full frontend engineer powered by AI.",
              },
              {
                name: "Sara Liu",
                role: "Product Manager",
                quote:
                  "The simplicity and power are unmatched. Our forms are up and running in minutes, not days.",
              },
              {
                name: "James Patel",
                role: "Developer",
                quote:
                  "I never thought generating dynamic forms could be this smooth. Absolute game-changer!",
              },
            ].map((t) => (
              <motion.div key={t.name} variants={itemVariants}>
                <GlassCard className="p-8 text-left">
                  <Layers className="mb-4 h-6 w-6 text-blue-400" />
                  <p className="mb-4 italic text-gray-300">“{t.quote}”</p>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= PRICING ================= */}
        <motion.section
          className="mx-auto max-w-7xl px-6 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
            Find the Plan for You
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <motion.div variants={itemVariants}>
              <GlassCard className="flex h-full flex-col p-8">
                <h3 className="text-xl font-bold">Hobby</h3>
                <p className="mt-2 text-4xl font-extrabold">
                  $0
                  <span className="text-base font-normal text-gray-400">
                    / mo
                  </span>
                </p>
                <p className="mt-2 text-gray-400">For personal projects.</p>
                <ul className="mt-6 flex-1 space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>3 Forms</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>50 Submissions/mo</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>AI Form Generation</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 block w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Start Free
                </Link>
              </GlassCard>
            </motion.div>

            {/* Pro Plan (Highlighted) */}
            <motion.div variants={itemVariants}>
              <GlassCard className="relative flex h-full flex-col border-2 border-blue-500 p-8 shadow-[0_0_30px_theme(colors.blue.500/50)]">
                <div className="absolute -top-4 right-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="mt-2 text-4xl font-extrabold">
                  $15
                  <span className="text-base font-normal text-gray-400">
                    / mo
                  </span>
                </p>
                <p className="mt-2 text-gray-400">For professionals & teams.</p>
                <ul className="mt-6 flex-1 space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>Unlimited Forms</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>5,000 Submissions/mo</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>Analytics Dashboard</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>Remove Branding</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-center font-semibold transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </GlassCard>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div variants={itemVariants}>
              <GlassCard className="flex h-full flex-col p-8">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="mt-2 text-4xl font-extrabold">Custom</p>
                <p className="mt-2 text-gray-400">For large-scale needs.</p>
                <ul className="mt-6 flex-1 space-y-3">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>Unlimited Submissions</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>SSO & Custom Security</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>Dedicated Support</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="mt-8 block w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Contact Sales
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= FINAL CTA ================= */}
        <motion.section
          className="mx-auto max-w-5xl px-6 py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <GlassCard className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Build in Seconds?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">
              Join thousands of developers and businesses who are saving time and
              building smarter, not harder.
            </p>
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-[0_0_20px_theme(colors.blue.500/50)] transition-all hover:scale-105 hover:shadow-2xl"
            >
              Start Building For Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </GlassCard>
        </motion.section>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-gray-950 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Forms. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
