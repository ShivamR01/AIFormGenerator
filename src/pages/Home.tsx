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
  Terminal,
  Code,
  Github, // Example for logo scroller
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
  whileHover = { scale: 1.02 },
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ==========================================================
// Main Home Component
// ==========================================================
export function Home() {
  const logoVariants = {
    animate: {
      x: "-100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const logos = [
    <Github key="1" className="h-8 w-8" />,
    <Layers key="2" className="h-8 w-8" />,
    <Database key="3" className="h-8 w-8" />,
    <Globe key="4" className="h-8 w-8" />,
    <Layout key="5" className="h-8 w-8" />,
    <PencilRuler key="6" className="h-8 w-8" />,
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* ================= FUTURISTIC AURORA BG ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
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
              to="/login"
              className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= TRUSTED BY (INFINITE SCROLLER) ================= */}
      <section className="relative z-10 py-16">
        <div className="absolute inset-0 -z-10 bg-white/5 [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]" />
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-semibold uppercase text-gray-400">
            Trusted by developers at
          </p>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex"
              variants={logoVariants}
              initial={{ x: "0%" }}
              animate="animate"
            >
              <div className="flex w-max shrink-0 items-center justify-around gap-16 px-8 text-gray-500">
                {[...logos, ...logos].map((logo, i) => (
                  <span key={i}>{logo}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES BENTO GRID ================= */}
      <motion.section
        className="relative z-10 mx-auto max-w-7xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-4 text-center text-4xl font-extrabold">
          Build <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Smarter</span>,
          Not Harder
        </h2>
        <p className="mb-12 text-center text-lg text-gray-300">
          Everything you need, powered by AI.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* == Main AI Prompt Card == */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-blue-300" />
                <h3 className="text-lg font-semibold">AI Command Center</h3>
              </div>
              <div className="flex-1 rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm">
                <p className="text-green-400">
                  <span className="text-blue-400">&gt;</span> create a contact
                  form
                </p>
                <p className="text-gray-400">
                  ... fields: name (text), email (email), message (textarea)
                </p>
                <p className="mt-2 text-green-400">
                  <span className="text-blue-400">&gt;</span>{" "}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4">
                <p className="mb-2 font-mono text-sm text-gray-500">
                  // Generated Code
                </p>
                <Code className="h-12 w-12 text-gray-700 opacity-50" />
              </div>
            </GlassCard>
          </motion.div>

          {/* == Security Card == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Shield className="h-6 w-6 text-green-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Enterprise Security</h3>
              <p className="text-gray-300">
                All data is encrypted at rest and in transit. Secure, private,
                and reliable.
              </p>
            </GlassCard>
          </motion.div>

          {/* == Analytics Card == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20">
                <TrendingUp className="h-6 w-6 text-amber-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Real-time Analytics</h3>
              <p className="text-gray-300">
                Track submissions, analyze trends, and export your data with one
                click.
              </p>
            </GlassCard>
          </motion.div>

          {/* == Instant Generation Card == */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <GlassCard className="flex h-full flex-col items-center justify-between p-6 sm:flex-row">
              <div>
                <h3 className="mb-2 text-xl font-bold">Instant Generation</h3>
                <p className="max-w-md text-gray-300">
                  Go from a text prompt to a fully functional, live-hosted form
                  in under 30 seconds.
                </p>
              </div>
              <Zap className="h-16 w-16 text-blue-400 sm:ml-6" />
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= ASYMMETRIC SECTION DIVIDER ================= */}
      <div className="relative z-0 bg-gray-900 py-32 [clip-path:polygon(0_10%,_100%_0,_100%_90%,_0_100%)]">
        {/* ================= TESTIMONIALS ================= */}
        <motion.section
          className="relative z-10 mx-auto max-w-6xl px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
                <GlassCard className="h-full p-8 text-left">
                  <Layers className="mb-4 h-6 w-6 text-blue-400" />
                  <p className="mb-4 flex-1 italic text-gray-300">
                    “{t.quote}”
                  </p>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* ================= PRICING ================= */}
      <motion.section
        className="relative z-10 -mt-16 mx-auto max-w-7xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
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
                {[
                  "3 Forms",
                  "50 Submissions/mo",
                  "AI Form Generation",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
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
            <div className="relative h-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_30px_theme(colors.blue.500/50)]">
              <div className="relative h-full w-full rounded-[15px] bg-gray-950 p-8">
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
                  {[
                    "Unlimited Forms",
                    "5,000 Submissions/mo",
                    "Analytics Dashboard",
                    "Remove Branding",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 block w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-center font-semibold transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-8">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="mt-2 text-4xl font-extrabold">Custom</p>
              <p className="mt-2 text-gray-400">For large-scale needs.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  "Unlimited Submissions",
                  "SSO & Custom Security",
                  "Dedicated Support",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-gray-300">{item}</span>
</li>
                ))}
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

      {/* ================= FINAL CTA (IN ASYMMETRIC SECTION) ================= */}
      <section className="relative overflow-hidden py-32 [clip-path:polygon(0_15%,_100%_0,_100%_100%,_0_100%)]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 to-gray-950" />
        <motion.div
          className="mx-auto max-w-5xl px-6 pt-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
        </motion.div>
      </section>
    </div>
  );
}
