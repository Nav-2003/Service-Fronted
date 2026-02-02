import { motion, AnimatePresence } from "framer-motion";
import FeedbackComponent from "./FeedComponent";
import { Star } from "lucide-react";

export default function FeedbackPanel({ selectedProvider }) {
  console.log(selectedProvider);
  return (
    <AnimatePresence mode="wait">
      {!selectedProvider ? (
        /* PREMIUM EMPTY STATE */
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex flex-col justify-center px-6 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="mb-8 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-gray-200" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-700">
              Reviews
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Verified customer feedback
            </p>
          </div>

          {/* Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      ) : (
        /* AUTO SHOW REVIEWS */
        <motion.div
          key="reviews"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <FeedbackComponent provider={selectedProvider} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
