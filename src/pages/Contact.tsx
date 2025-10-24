import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Twitter, Github, Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-gray-900"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600"
        >
          Have questions or feedback? Our team is here to help you every step of the way.
        </motion.p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-6xl mx-auto px-6 md:grid md:grid-cols-2 gap-12 pb-24">
        {/* Left side: Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Let’s build something amazing together.</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Whether you have a question about features, pricing, or anything else — we’re ready to answer all your queries.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</h3>
              <a
                href="mailto:support@saasai.com"
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                support@saasai.com
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Follow us</h3>
              <div className="flex space-x-5 mt-2">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition">
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:support@saasai.com" className="text-gray-500 hover:text-blue-600 transition">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "subject"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "submitting"}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-white font-medium text-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:shadow-lg transition ${
                status === "submitting" ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {status === "submitting" ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
            </motion.button>

            {status === "success" && (
              <p className="text-green-600 bg-green-50 p-3 rounded-lg text-center mt-4">
                ✅ Message sent successfully! We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center mt-4">
                ❌ Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </motion.div>
      </section>
    </div>
  );
}
