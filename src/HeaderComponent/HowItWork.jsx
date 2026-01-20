import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  CalendarCheck,
  CreditCard,
  MapPin,
  Briefcase,
  Wallet,
} from "lucide-react";

const clientSteps = [
  {
    title: "Choose a Service",
    desc: "Select the service you need from trusted professionals nearby.",
    icon: Search,
  },
  {
    title: "Book Instantly",
    desc: "Pick a time and confirm your booking in seconds.",
    icon: CalendarCheck,
  },
  {
    title: "Track & Pay Securely",
    desc: "Track the worker live and pay only after service completion.",
    icon: CreditCard,
  },
];

const workerSteps = [
  {
    title: "Create Profile",
    desc: "Sign up and list your skills, experience, and availability.",
    icon: Briefcase,
  },
  {
    title: "Get Nearby Jobs",
    desc: "Receive job requests from nearby customers instantly.",
    icon: MapPin,
  },
  {
    title: "Earn & Grow",
    desc: "Complete jobs, get paid fast, and grow your reputation.",
    icon: Wallet,
  },
];

export default function HowItWorks() {
  const [mode, setMode] = useState("client");

  const steps = mode === "client" ? clientSteps : workerSteps;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[120px]" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Simple, fast & reliable for everyone
          </p>
        </motion.div>

        {/* ================= TOGGLE ================= */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/70 backdrop-blur-xl p-2 rounded-2xl border border-white/40 shadow-lg flex gap-2">
            {["client", "worker"].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`px-6 py-2 rounded-xl font-medium transition-all
                  ${
                    mode === item
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }
                `}
              >
                {item === "client" ? "For Clients" : "For Workers"}
              </button>
            ))}
          </div>
        </div>

        {/* ================= STEPS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="
                  relative bg-white/70 backdrop-blur-xl
                  border border-white/40
                  rounded-3xl p-8
                  shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
                  transition-all
                "
              >
                {/* STEP NUMBER */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                  {i + 1}
                </div>

                {/* ICON */}
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* TEXT */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.desc}
                </p>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
