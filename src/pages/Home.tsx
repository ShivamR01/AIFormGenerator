// Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  animate,
  useMotionValue,
} from "framer-motion";
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
  Github,
  ChevronDown,
  Minus,
  Cpu,
  Brain,
  Rocket,
} from "lucide-react";
import React, { useRef } from "react";

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
  whileHover = { scale: 1.02, transition: { duration: 0.2 } },
}: GlassCardProps) => (
  <motion.div
    whileHover={whileHover}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

// ==========================================================
// Reusable Accordion Component
// ==========================================================
const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GlassCard className="mb-4 overflow-hidden">
      <motion.div
        className="flex cursor-pointer items-center justify-between p-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-6 pt-4 text-gray-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

// ==========================================================
// NEW: Animated Counter Component
// ==========================================================
interface AnimatedCounterProps {
  to: number;
  suffix?: string;
}

const AnimatedCounter = ({ to, suffix = "" }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, to, {
        duration: 2,
        ease: "easeOut",
      });
    }
  }, [inView, count, to]);

  return (
    <span ref={ref}>
      {rounded}
      {suffix}
    </span>
  );
};


// ==========================================================
// Animation Variants
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
  // 3D Hero Card Scroll Animation
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 10]);

  // Logo Scroller Animation
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

  const steps = [
    {
      icon: <PencilRuler className="h-6 w-6 text-blue-300" />,
      title: "1. Describe",
      desc: "Start with a simple prompt. 'A contact form with name, email, and message.'",
    },
    {
      icon: <Wand2 className="h-6 w-6 text-purple-300" />,
      title: "2. Generate",
      desc: "Our AI instantly builds the form, styles it, and configures the backend.",
    },
    {
      icon: <Layout className="h-6 w-6 text-green-300" />,
      title: "3. Embed",
      desc: "Copy a single line of code to embed the form anywhere on your website.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-amber-300" />,
      title: "4. Analyze",
      desc: "Collect submissions and view powerful insights on your dashboard.",
    },
  ];

  // Sticky Scroll Section Content
  const stickyFeatures = [
    {
      title: "Context-Aware Generation",
      description:
        "Our AI doesn't just read keywords. It understands context, dependencies, and data types, ensuring fields like 'Country' and 'State' are automatically linked.",
      icon: <Brain className="h-12 w-12 text-blue-300" />,
    },
    {
      title: "Instant Backend Logic",
      description:
        "We don't just build the frontend. The AI instantly provisions a secure backend, database, and API endpoint for every form you create.",
      icon: <Database className="h-12 w-12 text-green-300" />,
    },
    {
      title: "Smart Validation",
      description:
        "Forget manual regex. Our AI adds server-side and client-side validation for emails, phone numbers, and even complex password rules automatically.",
      icon: <Shield className="h-12 w-12 text-purple-300" />,
    },
  ];

  // Hero Title Animation
  const heroTitle = "AI-Powered Form Generator";
  const heroTitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const heroLetterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white [background-image:radial-gradient(white_0.5px,_transparent_0.5px)] [background-size:2rem_2rem]">
      
      {/* ================= SUPER-PREMIUM BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-70">
        {/* === REPLACE THIS WITH A REAL VIDEO FOR MAX EFFECT === */}
        {/* <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          src="/path/to/your/premium-bg-video.mp4" 
        /> */}
        
        {/* Animated Aurora Fallback */}
        <motion.div 
          className="absolute left-[-20rem] top-[-10rem] h-[40rem] w-[60rem] rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute right-[-15rem] top-[15rem] h-[30rem] w-[50rem] rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 opacity-10 blur-3xl"
           animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 5,
          }}
        />
        <div className="absolute bottom-0 left-1/3 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 opacity-10 blur-3xl" />
      </div>

      {/* ================= SUPER-ENHANCED HERO ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 text-center" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/50 bg-blue-500/10 shadow-lg">
            <Wand2 className="h-10 w-10 text-blue-300" />
          </div>
          <motion.h1 
            className="relative z-10 mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl"
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
          >
            {heroTitle.split(" ").map((word, i) => (
              <span key={i} className="inline-block whitespace-nowrap">
                {word.split("").map((letter, j) => (
                  <motion.span 
                    key={j} 
                    className="inline-block"
                    variants={heroLetterVariants}
                  >
                    {letter}
                  </motion.span>
                ))}
                &nbsp;
              </span>
            ))}
          </motion.h1>
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
          </div>
        </motion.div>
        
        {/* == NEW 3D Animated Card == */}
        <motion.div
          className="relative z-0 mx-auto mt-20 max-w-4xl"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            rotateX,
            rotateY,
          }}
        >
          <GlassCard className="p-4 sm:p-6">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-[400px]">
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
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950/50 to-transparent" />
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* ================= TRUSTED BY (INFINITE SCROLLER) ================= */}
      <section className="relative z-10 py-24">
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

      {/* ================= NEW: ANIMATED STATS ================= */}
      <motion.section 
        className="mx-auto max-w-7xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <h3 className="text-5xl font-extrabold text-blue-300">
                <AnimatedCounter to={10} suffix="K+" />
              </h3>
              <p className="mt-2 text-lg text-gray-400">Forms Generated</p>
            </GlassCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <h3 className="text-5xl font-extrabold text-purple-300">
                <AnimatedCounter to={5000} suffix="+" />
              </h3>
              <p className="mt-2 text-lg text-gray-400">Active Developers</p>
            </GlassCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8">
              <h3 className="text-5xl font-extrabold text-green-300">
                <AnimatedCounter to={2} suffix="M+" />
              </h3>
              <p className="mt-2 text-lg text-gray-400">Hours Saved</p>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= SHAPED DIVIDER (SWOOSH) ================= */}
      <div className="relative z-0 h-32 bg-transparent [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)]">
        <div className="absolute inset-0 -z-10 bg-gray-900 [clip-path:polygon(0_0,_100%_0,_100%_100%,_50%_50%,_0_100%)]" />
      </div>

      {/* ================= HOW IT WORKS (STEPPER) ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Get Started in 4 Simple Steps
        </h2>
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-9 top-0 z-0 h-full w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative z-10 mb-12 flex items-start"
              variants={itemVariants}
            >
              <div className="flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-500/50 bg-gray-900 p-4">
                {step.icon}
              </div>
              <div className="ml-6">
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* ================= NEW: STICKY SCROLLING SECTION ================= */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="sticky top-24 h-min lg:top-32">
            <motion.h2 
              className="mb-6 text-4xl font-extrabold"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Our AI is 
              <span className="ml-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Different
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We go beyond simple keyword matching. Our AI understands relational logic to build forms that are not just beautiful, but truly intelligent from the start.
            </motion.p>
          </div>
          
          <div className="flex flex-col gap-8">
            {stickyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassCard className="p-8">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
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
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Build <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Smarter</span>,
          Not Harder
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div variants={itemVariants} className="lg:col-span-2">
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
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Shield className="h-6 w-6 text-green-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Enterprise Security</h3>
              <p className="text-gray-300">
                All data is encrypted at rest and in transit.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20">
                <TrendingUp className="h-6 w-6 text-amber-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Real-time Analytics</h3>
              <p className="text-gray-300">
                Track submissions and analyze trends with one click.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <GlassCard className="flex h-full flex-col items-center justify-between p-6 sm:flex-row">
              <div>
                <h3 className="mb-2 text-xl font-bold">Instant Generation</h3>
                <p className="max-w-md text-gray-300">
                  Go from prompt to live form in under 30 seconds.
                </p>
              </div>
              <Zap className="h-16 w-16 text-blue-400 sm:ml-6" />
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= ASYMMETRIC SECTION DIVIDER ================= */}
      <div className="relative z-0 bg-gray-900 py-32 [clip-path:polygon(0_10%,_100%_0,_100%_90%,_0_100%)]">
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
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-8">
              <h3 className="text-xl font-bold">Hobby</h3>
              <p className="mt-2 text-4xl font-extrabold">
                $0
                <span className="text-base font-normal text-gray-400">
                  / mo
                </span>
              </p>
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

          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-8">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="mt-2 text-4xl font-extrabold">Custom</p>
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

      {/* ================= FEATURE COMPARISON TABLE ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={itemVariants}
      >
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Compare All Features
        </h2>
        <GlassCard className="overflow-hidden p-6 md:p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-4 font-semibold">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold">Hobby</th>
                  <th className="py-4 px-4 text-center font-semibold text-blue-300">Pro</th>
                  <th className="py-4 pl-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4">Forms</td>
                  <td className="py-4 px-4 text-center text-gray-300">3</td>
                  <td className="py-4 px-4 text-center text-blue-300">Unlimited</td>
                  <td className="py-4 pl-4 text-center text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4">Submissions</td>
                  <td className="py-4 px-4 text-center text-gray-300">50/mo</td>
                  <td className="py-4 px-4 text-center text-blue-300">5,000/mo</td>
                  <td className="py-4 pl-4 text-center text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 pr-4">Analytics Dashboard</td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-gray-600" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 mx-auto text-green-400" /></td>
                  <td className="py-4 pl-4 text-center"><Check className="h-5 w-5 mx-auto text-green-400" /></td>
                </tr>
                <tr>
                  <td className="py-4 pr-4">Dedicated Support</td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-gray-600" /></td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-gray-600" /></td>
                  <td className="py-4 pl-4 text-center"><Check className="h-5 w-5 mx-auto text-green-400" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.section>

      {/* ================= FAQ ================= */}
      <motion.section
        className="mx-auto max-w-4xl px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Frequently Asked Questions
        </h2>
        <Accordion title="How does the AI form generation work?">
          <p>You provide a simple text prompt (e.g., "A contact form with name, email, and message") and our AI model generates the complete form, including validated fields and backend logic, in seconds.</p>
        </Accordion>
        <Accordion title="Can I embed the forms on my own website?">
          <p>Yes! After generating a form, you can embed it on any website using a simple snippet of code we provide. You can also share it as a standalone page.</p>
        </Accordion>
        <Accordion title="Is my data secure?">
          <p>Absolutely. All form data is encrypted at rest and in transit. We are fully GDPR compliant and take data security very seriously. Enterprise plans offer additional security features like SSO.</p>
        </Accordion>
      </motion.section>

      {/* ================= FINAL CTA (SHAPED) ================= */}
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
