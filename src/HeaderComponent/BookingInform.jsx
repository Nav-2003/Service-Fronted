import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";

const cards = [
  {
    title: "Live Booking",
    desc: "Track your worker in real-time and stay updated until the job is done.",
    icon: Clock,
    route: "/bookingsInform/live",
    glow: "from-blue-400/40 to-cyan-400/40",
  },
  {
    title: "Completed Booking",
    desc: "View completed services, invoices, and payment history anytime.",
    icon: CheckCircle,
    route: "/bookingsInform/completed",
    glow: "from-green-400/40 to-emerald-400/40",
  },
  {
    title: "Cancelled Booking",
    desc: "Check cancelled bookings with refund and cancellation details.",
    icon: XCircle,
    route: "/bookingsInform/cancelled",
    glow: "from-red-400/40 to-pink-400/40",
  },
];

export default function BookingFlow() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900"
        >
          Booking Overview
        </motion.h2>

        <p className="text-gray-600 mt-3">
          Manage your bookings in one place
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.button
                key={card.title}
                onClick={() => navigate(card.route)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative text-left"
              >
                {/* Glow */}
                <div
                  className={`absolute -inset-[1px] rounded-3xl opacity-0
                              group-hover:opacity-100 transition
                              bg-gradient-to-br ${card.glow}`}
                />

                {/* Card */}
                <div
                  className="relative rounded-3xl bg-white p-8
                             shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                             border border-gray-100"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-blue-50
                               flex items-center justify-center mb-6
                               group-hover:scale-110 transition"
                  >
                    <Icon className="text-blue-600" size={26} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold
                                  text-blue-600 group-hover:gap-3 transition">
                    View Details <ArrowRight size={16} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
