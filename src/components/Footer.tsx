import React from "react";
import { Twitter, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">AIFormGenerator</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering businesses with intelligent AI-powered form solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@saasai.com"
                aria-label="Email"
                className="text-gray-400 hover:text-red-400 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Dashboard", "Generator", "Pricing", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Documentation", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-1 text-sm">
              <li>Email: <a href="mailto:contact@saasai.com" className="hover:text-white">contact@saasai.com</a></li>
              <li>Support: <a href="mailto:support@saasai.com" className="hover:text-white">support@saasai.com</a></li>
              <li>Phone: <a href="tel:+15551234567" className="hover:text-white">+1 (555) 123-4567</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AIFormGenerator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
