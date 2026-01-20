import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Rocket,
  HeartHandshake,
} from "lucide-react";

const values = [
  {
    title: "Trusted Professionals",
    desc: "Every worker is verified, trained, and reviewed to ensure quality service every time.",
    icon: ShieldCheck,
  },
  {
    title: "People First",
    desc: "We empower local workers while making life easier for customers.",
    icon: Users,
  },
  {
    title: "Fast & Reliable",
    desc: "Instant bookings, live tracking, and on-time service—no surprises.",
    icon: Rocket,
  },
  {
    title: "Built on Trust",
    desc: "Transparent pricing, secure payments, and honest ratings.",
    icon: HeartHandshake,
  },
];

export default function AboutUs() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-blue-400/30 rounded-full blur-[120px]" />
        <div className="absolute top-20 -right-40 w-[550px] h-[550px] bg-purple-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-300/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            About LocalServices
          </h2>
          <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto">
            We connect customers with skilled local professionals — fast,
            transparent, and reliable. Whether you need a plumber today or a
            technician tomorrow, we make it effortless.
          </p>
        </motion.div>

        {/* ================= STORY ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-xl
                     border border-white/40
                     rounded-3xl p-10
                     shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                     mb-20"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Finding reliable local services shouldn’t be stressful. Our mission
            is to create a platform where customers feel confident and workers
            feel empowered. We focus on quality, fairness, and technology that
            genuinely improves everyday life.
          </p>
        </motion.div>

        {/* ================= VALUES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {values.map((v, i) => {
            const Icon = v.icon;
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
                {/* ICON */}
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* TEXT */}
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {v.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {v.desc}
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
