import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Car,
  Scissors,
  Hammer,
  Paintbrush,
  Wind,
  Tv,
} from "lucide-react";

const services = [
  {
    title: "Plumber",
    desc: "Pipe repairs, installations & maintenance",
    icon: Wrench,
    bg: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    title: "Electrician",
    desc: "Wiring, fixtures & electrical repairs",
    icon: Zap,
    bg: "from-yellow-50 to-yellow-100",
    iconBg: "bg-yellow-500",
  },
  {
    title: "Mechanic",
    desc: "Vehicle repairs & maintenance",
    icon: Car,
    bg: "from-red-50 to-red-100",
    iconBg: "bg-red-500",
  },
  {
    title: "Barber",
    desc: "Haircuts, styling & grooming",
    icon: Scissors,
    bg: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    title: "Carpenter",
    desc: "Furniture, woodwork & installations",
    icon: Hammer,
    bg: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    title: "Painter",
    desc: "Interior & exterior painting",
    icon: Paintbrush,
    bg: "from-green-50 to-green-100",
    iconBg: "bg-green-600",
  },
  {
    title: "AC Technician",
    desc: "AC installation, repair & servicing",
    icon: Wind,
    bg: "from-cyan-50 to-cyan-100",
    iconBg: "bg-cyan-600",
  },
  {
    title: "TV Repair",
    desc: "TV & electronics repair services",
    icon: Tv,
    bg: "from-indigo-50 to-indigo-100",
    iconBg: "bg-indigo-600",
  },
];

export default function Services() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* ================= AURORA BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[120px]" />
        <div className="absolute top-10 -right-40 w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-300/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Popular Services
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Browse trusted professionals near you
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative overflow-hidden cursor-pointer
                  rounded-3xl p-6
                  bg-white/70 backdrop-blur-xl
                  border border-white/40
                  shadow-[0_20px_40px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
                  transition-all
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    w-14 h-14 rounded-2xl
                    ${s.iconBg}
                    flex items-center justify-center
                    shadow-lg mb-6
                  `}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* TEXT */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>

                {/* HOVER GLOW */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0
                             hover:opacity-100 transition
                             bg-gradient-to-br from-white/30 to-transparent
                             pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
