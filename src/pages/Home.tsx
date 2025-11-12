import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  animate,
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
  Users,
  Briefcase,
  Megaphone,
  Globe2,
  Link2,
  GitBranch,
  Star,
  Twitter,
  Linkedin,
} from "lucide-react";

// ==========================================================
// Reusable Glass Card Component (For Dark BG) - WITH SHAPE
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
    className={`relative overflow-hidden rounded-2xl border border-purple-300/10 bg-purple-900/50 backdrop-blur-lg shadow-xl ${className}`}
    style={{
      clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)",
    }}
  >
    {children}
  </motion.div>
);

// ==========================================================
// Reusable Light Card Component (For Light BG) - WITH SHAPE
// ==========================================================
const LightCard = ({
  children,
  className = "",
  whileHover = { y: -5, transition: { duration: 0.2 } },
}: GlassCardProps) => (
  <motion.div
    whileHover={whileHover}
    className={`overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-lg ${className}`}
    style={{
      clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
    }}
  >
    {children}
  </motion.div>
);

// ==========================================================
// Reusable Accordion Component (For Light BG)
// ==========================================================
const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-purple-200">
      <motion.div
        className="flex cursor-pointer items-center justify-between py-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-purple-950">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-purple-500" />
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
            <div className="pb-6 text-purple-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================================
// Reusable Section Divider (Optimized)
// ==========================================================
interface SectionDividerProps {
  type:
    | "wave-up"
    | "wave-down"
    | "curve-up"
    | "curve-down"
    | "slant-up"
    | "slant-down"
    | "swoop-up"
    | "swoop-down"
    | "ridge-up"
    | "ridge-down";
  fillClass: string; // e.g., "fill-white", "fill-purple-950", "fill-purple-100"
}

const SectionDivider = ({ type, fillClass }: SectionDividerProps) => {
  const paths = {
    "wave-up": "M0,64 C240,0,480,0,720,64 C960,128,1200,128,1440,64 L1440,100 L0,100 Z",
    "wave-down": "M0,36 C240,100,480,100,720,36 C960,-28,1200,-28,1440,36 L1440,0 L0,0 Z",
    "curve-up": "M0,100 C480,0,960,0,1440,100 L1440,100 L0,100 Z",
    "curve-down": "M0,0 C480,100,960,100,1440,0 L1440,0 L0,0 Z",
    "slant-up": "M0,100 L1440,0 L1440,100 L0,100 Z",
    "slant-down": "M0,0 L1440,100 L1440,0 L0,0 Z",
    "swoop-up": "M0,100 C100,0,1340,0,1440,100 L1440,100 L0,100 Z",
    "swoop-down": "M0,0 C100,100,1340,100,1440,0 L1440,0 L0,0 Z",
    "ridge-up": "M0,100 L720,0 L1440,100 L1440,100 L0,100 Z",
    "ridge-down": "M0,0 L720,100 L1440,0 L1440,0 L0,0 Z",
  };

  return (
    <div className={`relative w-full h-20 md:h-32 lg:h-40 ${fillClass} -mb-1`}>
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d={paths[type]} className="w-full" />
      </svg>
    </div>
  );
};

// ==========================================================
// Reusable Tabbed Section (For Light BG)
// ==========================================================
const useCases = [
  {
    id: "devs",
    title: "For Developers",
    icon: Code,
    content: "Stop wrestling with boilerplate. Generate secure, production-ready forms, hooks, and validation in seconds. Integrate with webhooks, GitHub, or any backend with ease. Focus on your app's core logic, not on building another contact form.",
    feature: "Includes full API access & CLI tool."
  },
  {
    id: "marketers",
    title: "For Marketers",
    icon: Megaphone,
    content: "Launch campaigns faster than ever. Create lead-gen forms, surveys, and registration pages with a simple text prompt. All submissions feed directly into your analytics dashboard. A/B test different form versions without writing a line of code.",
    feature: "Native integration with common CRMs."
  },
  {
    id: "agencies",
    title: "For Agencies",
    icon: Briefcase,
    content: "Deliver client projects in record time. Impress clients with beautiful, functional forms generated instantly. Manage all client forms from a single, white-labeled dashboard and provide them with their own analytics view.",
    feature: "Offer team collaboration & client seats."
  },
];

const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const activeUseCase = useCases.find(u => u.id === activeTab)!;

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-center gap-2 p-2 bg-purple-200/60 rounded-xl">
        {useCases.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 relative px-4 py-3 text-sm sm:text-base font-semibold rounded-lg transition-colors ${
              activeTab === tab.id
                ? "text-purple-950"
                : "text-purple-600 hover:text-purple-950"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-white rounded-lg shadow-md z-0"
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <tab.icon className={`h-5 w-5 text-purple-700`} />
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xl text-purple-800 mb-4">
            {activeUseCase.content}
          </p>
          <p className="font-semibold text-purple-950">
            {activeUseCase.feature}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ==========================================================
// Code Showcase Component (Monochromatic)
// ==========================================================
const codeSnippets = {
  react: `import { useForm } from 'aiformgen-react';

export default function ContactForm() {
  const { register, handleSubmit, errors } = useForm('contact-form-id');
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <input {...register('email')} placeholder="Email" />
      <textarea {...register('message')} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}`,
  html: `<script src="https://cdn.aiformgen.com/v1.js" defer></script>

<div data-aiformgen-id="contact-form-id"></div>`,
  curl: `curl -X POST 'https://api.aiformgen.com/v1/submit/contact-form-id' \\
  -H 'Content-Type: application/json' \\
  -d '{
        "name": "Jane Doe",
        "email": "jane@example.com",
        "message": "Hello!"
      }'`
};

const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'curl'>('react');
  
  const TabButton = ({ id, label }: { id: 'react' | 'html' | 'curl', label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === id 
          ? 'text-fuchsia-400' 
          : 'text-purple-300 hover:text-purple-100'
      }`}
    >
      {label}
      {activeTab === id && (
        <motion.div
          layoutId="codeTabIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-fuchsia-400"
        />
      )}
    </button>
  );

  return (
    <GlassCard className="lg:col-span-3">
      <div className="flex items-center justify-between border-b border-purple-300/10 px-4">
        <div className="flex gap-1">
          <TabButton id="react" label="React" />
          <TabButton id="html" label="HTML/Embed" />
          <TabButton id="curl" label="cURL API" />
        </div>
        <div className="flex items-center gap-1.5 p-4">
          <div className="w-3 h-3 rounded-full bg-purple-700"></div>
          <div className="w-3 h-3 rounded-full bg-purple-700"></div>
          <div className="w-3 h-3 rounded-full bg-purple-700"></div>
        </div>
      </div>
      <div className="p-6 bg-purple-950/30">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-left overflow-x-auto"
          >
            {/* Syntax Highlighting (simplified) */}
            <code className="font-mono text-purple-100" dangerouslySetInnerHTML={{
              __html: codeSnippets[activeTab]
                .replace(/'(.*?)'/g, '<span class="text-fuchsia-300">\'$1\'</span>')
                .replace(/(import|export|default|from|const|return)/g, '<span class="text-purple-400">$1</span>')
                .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-purple-500">$1</span>')
                .replace(/(\/\/.*|\<\!--.*--\>)/g, '<span class="text-purple-500 italic">$1</span>')
            }} />
          </motion.pre>
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

// ==========================================================
// Animated Stat Component (NEW)
// ==========================================================
const AnimatedStat = ({ to, label, suffix = "", prefix = "" }: { to: number, label: string, suffix?: string, prefix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useSpring(count, { damping: 30, stiffness: 100 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, to, {
        duration: 2,
        ease: "easeOut",
      });
    }
  }, [isInView, to, count]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-5xl md:text-6xl font-extrabold text-purple-950 mb-2">
        {prefix}
        <motion.span>{rounded.to((v) => v.toFixed(suffix.includes('.') ? 1 : 0))}</motion.span>
        {suffix}
      </h3>
      <p className="text-lg text-purple-700">{label}</p>
    </div>
  );
};

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

  const steps = [
    {
      icon: <PencilRuler className="h-10 w-10 text-purple-600" />,
      title: "1. Describe",
      desc: "Start with a simple prompt. 'A contact form with name, email, and message.'",
    },
    {
      icon: <Wand2 className="h-10 w-10 text-purple-600" />,
      title: "2. Generate",
      desc: "Our AI instantly builds the form, styles it, and configures the backend.",
    },
    {
      icon: <Layout className="h-10 w-10 text-purple-600" />,
      title: "3. Embed",
      desc: "Copy a single line of code to embed the form anywhere on your website.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-purple-600" />,
      title: "4. Analyze",
      desc: "Collect submissions and view powerful insights on your dashboard.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-purple-50 text-purple-950">
      {/* ================= HERO (DARK) ================= */}
      <section className="relative z-10 mx-auto max-w-full px-6 pb-24 pt-32 text-center bg-purple-950">
        {/* ================= FUTURISTIC AURORA BG ================= */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
          <div className="absolute left-[-20rem] top-[-10rem] h-[40rem] w-[60rem] rounded-full bg-gradient-to-r from-purple-900 via-fuchsia-800 to-purple-950 opacity-30 blur-3xl" />
          <div className="absolute right-[-15rem] top-[15rem] h-[30rem] w-[50rem] rounded-full bg-gradient-to-r from-fuchsia-900 to-purple-900 opacity-20 blur-3xl" />
          
          {/* Glowing Grid (NEW) */}
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]">
             <div className="absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(to_right,theme(colors.purple.300/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.purple.300/0.05)_1px,transparent_1px)]"></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-600 bg-purple-900/50 shadow-lg">
            <Wand2 className="h-10 w-10 text-fuchsia-400" />
          </div>
          <h1 className="relative z-10 mb-6 text-5xl font-extrabold text-white md:text-7xl">
            AI-Powered Form Generator
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-purple-200 md:text-xl">
            Transform your workflow with AI. Describe your form — we build it
            instantly, securely, and beautifully.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="group flex items-center justify-center gap-2 rounded-xl bg-fuchsia-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-fuchsia-400"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-purple-600 bg-purple-950 px-8 py-3 text-lg font-semibold text-purple-100 backdrop-blur-md transition-all hover:bg-purple-900"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* ================= VISUAL SHOWCASE ================= */}
        <motion.section
          className="relative z-10 mx-auto -mb-20 md:-mb-32 max-w-6xl px-6 pt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GlassCard className="p-4 sm:p-6">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-[400px]">
              {/* Fake App UI */}
              <div className="absolute inset-0 flex">
                <div className="w-1/4 min-w-[150px] border-r border-purple-300/10 bg-purple-900/30 p-4">
                  <div className="mb-4 h-5 w-3/4 rounded-full bg-purple-300/20" />
                  <div className="mb-3 h-3 w-full rounded-full bg-purple-300/10" />
                  <div className="mb-3 h-3 w-5/6 rounded-full bg-purple-300/10" />
                  <div className="mb-3 h-3 w-full rounded-full bg-purple-300/10" />
                  <div className="h-3 w-1/2 rounded-full bg-purple-300/10" />
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-6 h-8 w-1/2 rounded-lg bg-purple-300/20" />
                  <div className="mb-4 h-10 w-full rounded-lg bg-purple-300/10" />
                  <div className="mb-4 h-10 w-full rounded-lg bg-purple-300/10" />
                  <div className="mb-4 h-10 w-3/4 rounded-lg bg-purple-300/10" />
                  <div className="h-10 w-1/3 rounded-lg bg-purple-300/20" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-950/50 to-transparent" />
            </div>
          </GlassCard>
        </motion.section>
      </section>

      {/* ================= DIVIDER (DARK to LIGHT) ================= */}
      <SectionDivider type="wave-down" fillClass="fill-purple-950" />

      {/* ================= HOW IT WORKS (LIGHT) ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-24 bg-purple-50 text-purple-950"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-16 text-center text-4xl font-extrabold">
          Get Started in 4 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
            >
              <LightCard className="p-8 text-center h-full bg-white">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                  {step.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-purple-900">{step.title}</h3>
                <p className="text-purple-700">{step.desc}</p>
              </LightCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= ANIMATED STATS (LIGHT) (NEW) ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-24 bg-purple-50 text-purple-950"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="mb-16 text-center text-4xl font-extrabold">
          Trusted by the Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatedStat to={500} suffix="k+" label="Forms Generated" />
          <AnimatedStat to={1.2} suffix="s" label="Avg. Generation Time" />
          <AnimatedStat to={99.9} suffix="%" label="Uptime" />
        </div>
      </motion.section>
      
      {/* ================= TRUSTED BY (LIGHTER GRAY) ================= */}
      <section className="relative z-10 py-20 bg-purple-100">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-semibold uppercase text-purple-500">
            Trusted by developers at
          </p>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex"
              variants={logoVariants}
              initial={{ x: "0%" }}
              animate="animate"
            >
              <div className="flex w-max shrink-0 items-center justify-around gap-16 px-8 text-purple-400">
                {[...logos, ...logos].map((logo, i) => (
                  <span key={i}>{logo}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DIVIDER (LIGHT to DARK) ================= */}
      <SectionDivider type="wave-up" fillClass="fill-purple-100" />

      {/* ================= CODE SHOWCASE (DARK) ================= */}
      <motion.section
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 bg-purple-950"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-4 text-center text-4xl font-extrabold text-white">
          From Prompt to Production
        </h2>
        <p className="mb-12 text-center text-lg text-purple-200 max-w-3xl mx-auto">
          We don't just build a form. We give you the production-ready code, embeddable scripts, and API endpoints to integrate it anywhere.
        </p>
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <CodeShowcase />
        </motion.div>
      </motion.section>

      {/* ================= FEATURES BENTO GRID (DARK) ================= */}
      <motion.section
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 bg-purple-950"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-4 text-center text-4xl font-extrabold text-white">
          Build Smarter, Not Harder
        </h2>
        <p className="mb-12 text-center text-lg text-purple-200">
          Everything you need, powered by AI.
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* == Main AI Prompt Card == */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-purple-300" />
                <h3 className="text-lg font-semibold text-white">AI Command Center</h3>
              </div>
              <div className="flex-1 rounded-lg border border-purple-300/10 bg-purple-900/50 p-4 font-mono text-sm">
                <p className="text-purple-200">
                  <span className="text-purple-400">&gt;</span> create a contact
                  form
                </p>
                <p className="text-purple-300">
                  ... fields: name (text), email (email), message (textarea)
                </p>
                <p className="text-purple-300">
                  ... style: minimalist, dark theme
                </p>
                <p className="mt-2 text-purple-200">
                  <span className="text-purple-400">&gt;</span>{" "}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
              <div className="mt-4 rounded-lg border border-purple-300/10 bg-purple-900/50 p-4">
                <p className="mb-2 font-mono text-sm text-purple-500">
                  // Generated Code
                </p>
                <Code className="h-12 w-12 text-purple-700 opacity-50" />
              </div>
            </GlassCard>
          </motion.div>

          {/* == Security Card == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <Shield className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Enterprise Security</h3>
              <p className="text-purple-200">
                All data is encrypted. Secure, private, and reliable.
              </p>
            </GlassCard>
          </motion.div>

          {/* == Analytics Card == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <TrendingUp className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Real-time Analytics</h3>
              <p className="text-purple-200">
                Track submissions, analyze trends, and export data.
              </p>
            </GlassCard>
          </motion.div>

          {/* == Integrations Card == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <Globe2 className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Integrations</h3>
              <p className="text-purple-200">
                Connect to webhooks, Zapier, Slack, and more.
              </p>
            </GlassCard>
          </motion.div>

          {/* == Team Collab == */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <Users className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Team Collaboration</h3>
              <p className="text-purple-200">
                Invite team members and manage forms together.
              </p>
            </GlassCard>
          </motion.div>
          
          {/* == Instant Generation Card == */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <GlassCard className="flex h-full flex-col items-center justify-between p-6 sm:flex-row">
              <div>
                <h3 className="mb-2 text-xl font-bold text-white">Instant Generation</h3>
                <p className="max-w-md text-purple-200">
                  Go from prompt to fully functional form in under 30 seconds.
                </p>
              </div>
              <Zap className="h-16 w-16 text-fuchsia-400 sm:ml-6 mt-4 sm:mt-0" />
            </GlassCard>
          </motion.div>

          {/* == Custom Domain == */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
             <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <Link2 className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Custom Domains</h3>
              <p className="text-purple-200">
                Host forms on your own domain.
          _     </p>
            </GlassCard>
          </motion.div>
          
          {/* == Version Control == */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
      _      <GlassCard className="flex h-full flex-col p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <GitBranch className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Version Control</h3>
              <p className="text-purple-200">
                Track changes and roll back to previous versions.
              </p>
            </GlassCard>
          </motion.div>
          
        </div>
      </motion.section>

      {/* ================= DIVIDER (DARK to LIGHT) ================= */}
      <SectionDivider type="curve-down" fillClass="fill-purple-950" />

      {/* ================= USE CASES (LIGHT) ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-24 bg-purple-50 text-purple-950"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="mb-12 text-center text-4xl font-extrabold">
          Built for Your Entire Team
        </h2>
        <TabbedSection />
      </motion.section>
      
      {/* ================= TESTIMONIALS (LIGHTER GRAY) ================= */}
      <SectionDivider type="swoop-up" fillClass="fill-purple-50" />
      <motion.section
        className="relative z-10 mx-auto max-w-full px-6 py-24 bg-purple-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          <Globe className="mx-auto mb-4 h-10 w-10 text-purple-600" />
          <h2 className="mb-12 text-center text-4xl font-extrabold text-purple-950">Loved by Teams Worldwide</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Arjun Mehta",
                role: "Startup Founder",
                avatarColor: "bg-purple-800",
                quote:
                  "This app saved us weeks of development time. It’s like having a full frontend engineer powered by AI.",
              },
              {
                name: "Sara Liu",
                role: "Product Manager",
                avatarColor: "bg-purple-600",
                quote:
                  "The simplicity and power are unmatched. Our forms are up and running in minutes, not days.",
              },
              {
                name: "James Patel",
                role: "Developer",
                avatarColor: "bg-purple-900",
                quote:
                  "I never thought generating dynamic forms could be this smooth. Absolute game-changer!",
              },
            ].map((t) => (
              <motion.div key={t.name} variants={itemVariants}>
                <LightCard className="h-full p-8 text-left flex flex-col bg-white">
                  <div className="flex mb-4">
                    <Star className="w-5 h-5 text-purple-900 fill-purple-900" />
                    <Star className="w-5 h-5 text-purple-900 fill-purple-900" />
                    <Star className="w-5 h-5 text-purple-900 fill-purple-900" />
                    <Star className="w-5 h-5 text-purple-900 fill-purple-900" />
                    <Star className="w-5 h-5 text-purple-900 fill-purple-900" />
                  </div>
                  <p className="mb-6 flex-1 text-lg italic text-purple-800">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-semibold text-xl mr-4`}>
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-950">{t.name}</h4>
                      <p className="text-sm text-purple-500">{t.role}</p>
                    </div>
                  </div>
Â             </LightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= DIVIDER (LIGHT to DARK) ================= */}
      <SectionDivider type="slant-up" fillClass="fill-purple-100" />

      {/* ================= PRICING (DARK) ================= */}
      <motion.section
        className="relative z-10 -mt-16 mx-auto max-w-7xl px-6 py-24 bg-purple-950"
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
              <h3 className="text-xl font-bold text-white">Hobby</h3>
              <p className="mt-2 text-4xl font-extrabold text-white">
                $0
                <span className="text-base font-normal text-purple-300">
                  / mo
                </span>
              </p>
              <p className="mt-2 text-purple-300">For personal projects.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  "3 Forms",
                  "50 Submissions/mo",
                  "AI Form Generation",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-purple-300" />
                    <span className="text-purple-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="mt-8 block w-full rounded-lg border border-purple-600 bg-purple-950 px-6 py-3 text-center font-semibold text-purple-100 backdrop-blur-md transition-all hover:bg-purple-900"
              >
                Start Free
              </Link>
            </GlassCard>
          </motion.div>

          {/* Pro Plan (Highlighted) */}
          <motion.div variants={itemVariants}>
            <div className="relative h-full rounded-2xl border-2 border-fuchsia-500 p-[2px] shadow-[0_0_30px_theme(colors.fuchsia.500/50)]"
                 style={{clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% 100%, 0 100%)"}}
            >
              <div className="relative h-full w-full rounded-[15px] bg-purple-950 p-8">
                <div className="absolute -top-4 right-6 rounded-full bg-fuchsia-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white">Pro</h3>
                <p className="mt-2 text-4xl font-extrabold text-white">
                  $15
                  <span className="text-base font-normal text-purple-300">
                    / mo
                  </span>
                </p>
                <p className="mt-2 text-purple-300">For professionals & teams.</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {[
                    "Unlimited Forms",
                    "5,000 Submissions/mo",
                    "Analytics Dashboard",
                    "Remove Branding",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="h-5 w-5 flex-shrink-0 text-white" />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 block w-full rounded-lg bg-fuchsia-500 px-6 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:bg-fuchsia-400"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div variants={itemVariants}>
            <GlassCard className="flex h-full flex-col p-8">
              <h3 className="text-xl font-bold text-white">Enterprise</h3>
              <p className="mt-2 text-4xl font-extrabold text-white">Custom</p>
              <p className="mt-2 text-purple-300">For large-scale needs.</p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  "Unlimited Submissions",
                  "SSO & Custom Security",
                  "Dedicated Support",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
Â                   <Check className="h-5 w-5 flex-shrink-0 text-purple-300" />
                    <span className="text-purple-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 block w-full rounded-lg border border-purple-600 bg-purple-950 px-6 py-3 text-center font-semibold text-purple-100 backdrop-blur-md transition-all hover:bg-purple-900"
t>
                Contact Sales
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= FEATURE COMPARISON TABLE (DARK) ================= */}
      <motion.section
        className="mx-auto max-w-7xl px-6 py-30 bg-purple-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={itemVariants}
      >
        <h2 className="mb-12 text-center text-4xl font-extrabold text-white">
          Compare All Features
        </h2>
        <GlassCard className="overflow-hidden p-6 md:p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left text-white">
              <thead>
                <tr className="border-b border-purple-300/10">
                  <th className="py-4 pr-4 font-semibold">Feature</th>
                  <th className="py-4 px-4 text-center font-semibold">Hobby</th>
                  <th className="py-4 px-4 text-center font-semibold text-fuchsia-300">Pro</th>
                  <th className="py-4 pl-4 text-center font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-purple-300/10">
                  <td className="py-4 pr-4">Forms</td>
                  <td className="py-4 px-4 text-center text-purple-200">3</td>
                  <td className="py-4 px-4 text-center text-fuchsia-200">Unlimited</td>
                t <td className="py-4 pl-4 text-center text-purple-200">Unlimited</td>
                </tr>
                <tr className="border-b border-purple-300/10">
                  <td className="py-4 pr-4">Submissions</td>
                  <td className="py-4 px-4 text-center text-purple-200">50/mo</td>
                  <td className="py-4 px-4 text-center text-fuchsia-200">5,000/mo</td>
                  <td className="py-4 pl-4 text-center text-purple-200">Unlimited</td>
                </tr>
                <tr className="border-b border-purple-300/10">
                  <td className="py-4 pr-4">AI Form Generation</td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 mx-auto text-purple-300" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 mx-auto text-fuchsia-300" /></td>
                  <td className="py-4 pl-4 text-center"><Check className="h-5 w-5 mx-auto text-purple-300" /></td>
                </tr>
                <tr className="border-b border-purple-300/10">
                  <td className="py-4 pr-4">Analytics Dashboard</td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-purple-600" /></td>
                  <td className="py-4 px-4 text-center"><Check className="h-5 w-5 mx-auto text-fuchsia-300" /></td>
                  <td className="py-4 pl-4 text-center"><Check className="h-5 w-5 mx-auto text-purple-300" /></td>
A             </tr>
                <tr>
                  <td className="py-4 pr-4">Dedicated Support</td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-purple-600" /></td>
                  <td className="py-4 px-4 text-center"><Minus className="h-5 w-5 mx-auto text-purple-600" /></td>
tr               <td className="py-4 pl-4 text-center"><Check className="h-5 w-5 mx-auto text-purple-300" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.section>

      {/* ================= DIVIDER (DARK to LIGHT) ================= */}
      <SectionDivider type="wave-down" fillClass="fill-purple-950" />

      {/* ================= FAQ (LIGHT) ================= */}
      <motion.section
        className="mx-auto max-w-4xl px-6 py-24 bg-purple-100 text-purple-950"
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
section       </Accordion>
        <Accordion title="Can I embed the forms on my own website?">
          <p>Yes! After generating a form, you can embed it on any website using a simple snippet of code we provide. You can also share it as a standalone page.</p>
        </Accordion>
        <Accordion title="What happens if I go over my submission limit?">
          <p>On the Hobby plan, your forms will be temporarily disabled until the next billing cycle. On the Pro plan, we offer overage pricing or the option to upgrade to an Enterprise plan.</p>
        </Accordion>
        <Accordion title="Is my data secure?">
          <p>Absolutely. All form data is encrypted at rest and in transit. We are fully GDPR compliant and take data security very seriously. Enterprise plans offer additional security features like SSO.</p>
        </Accordion>
      </motion.section>

      {/* ================= DIVIDER (LIGHT to DARK) ================= */}
      <SectionDivider type="ridge-up" fillClass="fill-purple-100" />
      
      {/* ================= FINAL CTA (DARK) ================= */}
      <section className="relative overflow-hidden py-32 bg-purple-950">
        <motion.div
          className="mx-auto max-w-5xl px-6"
          variants={itemVariants}
  t       initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <GlassCard className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
s             Ready to Build in Seconds?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-purple-200">
              Join thousands of developers and businesses who are saving time and
              building smarter, not harder.
            </p>
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-fuchsia-400"
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
