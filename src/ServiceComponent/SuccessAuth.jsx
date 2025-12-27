import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessOverlay({ onClose }) {
 const navigate=useNavigate();
  return (
    <div
      className="fixed inset-0 z-[9999]
                 bg-black/40 backdrop-blur-md
                 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md
                   bg-white/90 backdrop-blur-xl
                   rounded-3xl
                   shadow-[0_40px_80px_rgba(0,0,0,0.25)]
                   p-8 text-center"
      >
        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full
                       bg-gradient-to-br from-emerald-500 to-green-600
                       flex items-center justify-center
                       shadow-[0_20px_40px_rgba(16,185,129,0.45)]"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank you for joining 🎉
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your profile has been submitted successfully.
          You’re now ready to start receiving job requests
          from customers near you.
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={()=>{onClose();navigate('/service/waitingRoom');}}
          className="
            w-full py-3 rounded-2xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-semibold
            flex items-center justify-center gap-2
            shadow-[0_20px_40px_rgba(37,99,235,0.35)]
            hover:shadow-[0_30px_60px_rgba(37,99,235,0.45)]
            transition-all duration-300
          "
        >
          Start Finding Customers
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* FOOTNOTE */}
        <p className="text-xs text-gray-500 mt-4">
          You can manage availability and jobs from your dashboard
        </p>
      </motion.div>
    </div>
  );
}
