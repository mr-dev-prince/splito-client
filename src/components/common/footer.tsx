import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import React, { useRef } from "react";

const Footer = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const footerLinks = {
    product: ["Dashboard", "Groups", "Personal expenses", "Insights"],
    company: ["About", "FAQs", "Privacy", "Terms"],
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#020617] text-slate-200">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden border border-white"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-[-3vw] left-0 flex w-full justify-center select-none"
        >
          <motion.h1
            animate={{ y: ["-5%", "5%", "-5%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[20vw] leading-none font-black whitespace-nowrap text-blue-500"
          >
            SPLITO
          </motion.h1>
        </motion.div>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] will-change-transform" />
        <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px] will-change-transform" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="bg-linear-to-r from-white to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
                Splito<span className="text-blue-500">.</span>
              </h3>
              <p className="mt-4 max-w-xs text-base leading-relaxed text-slate-400">
                The modern way to manage group finances without the headache.
                Designed for clarity, built for trust.
              </p>
              <div className="mt-6 flex gap-4">
                {[FaGithub, FaXTwitter, FaInstagram].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, color: "#60a5fa" }}
                    className="text-slate-500 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            {Object.entries(footerLinks).map(([title, links], idx) => (
              <div key={title}>
                <p className="mb-6 text-xs font-bold tracking-widest text-blue-500 uppercase">
                  {title}
                </p>
                <ul className="space-y-4">
                  {links.map((link, i) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 + idx * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href="#"
                        className="group flex items-center text-slate-400 transition-colors hover:text-white"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/5 bg-white/2 p-8 backdrop-blur-sm">
              <p className="mb-2 text-lg font-semibold text-white">
                Ready to split?
              </p>
              <p className="mb-6 text-sm text-slate-400">
                Join 10,000+ users managing expenses smarter.
              </p>

              <motion.button
                ref={buttonRef}
                style={{ x, y }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileTap={{ scale: 0.95 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-shadow hover:shadow-blue-500/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Try Splito Now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <motion.div
                  className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Splito Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>
              Built with <span className="animate-pulse text-red-500">❤️</span>{" "}
              by{" "}
              <a
                target="_blank"
                href="https://github.com/mr-dev-prince"
                className="text-slate-300 transition-colors hover:text-blue-400"
              >
                Prince
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
