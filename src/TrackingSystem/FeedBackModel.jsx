import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedbackModal({ open, onClose, onSubmit, workerName }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const navigate=useNavigate();

  const handleSubmit = () => {
    if (rating === 0) return;

    onSubmit({
      rating,
      comment,
    });

    setRating(0);
    setHover(0);
    setComment("");
  };

 

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="
              bg-white w-[380px] rounded-3xl shadow-2xl
              p-6 relative
            "
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            {/* HEADER */}
            <div className="flex flex-col items-center mb-6">
              <CheckCircle className="w-14 h-14 text-emerald-500 mb-3" />
              <h2 className="text-xl font-bold">Service Completed 🎉</h2>
              <p className="text-gray-500 text-sm mt-1">
                How was your experience with <span className="font-semibold">{workerName}</span>?
              </p>
            </div>

            {/* ⭐ STAR RATING */}
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-colors
                      ${
                        (hover || rating) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    `}
                  />
                </motion.button>
              ))}
            </div>

            {/* COMMENT BOX */}
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write something about the service (optional)..."
                rows={3}
                className="
                  w-full border rounded-xl px-4 py-3 text-sm
                  outline-none resize-none
                  focus:ring-2 focus:ring-blue-400
                "
              />
            </div>

            {/* SUBMIT BUTTON */}
          <button
  onClick={handleSubmit}
  disabled={rating === 0}
  className={`
    w-full flex items-center justify-center gap-2 py-3 rounded-xl
    text-white font-semibold text-base
    transition-all duration-300
    ${
      rating === 0
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_15px_35px_rgba(59,130,246,0.45)] hover:shadow-[0_22px_50px_rgba(59,130,246,0.65)] hover:scale-[1.03] active:scale-[0.97]"
    }
  `}
>
  <Send className="w-5 h-5" />
  Submit Feedback
</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
