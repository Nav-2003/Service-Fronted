import { CreditCard, Wallet, X, ShieldCheck } from "lucide-react";

export default function PaymentMethodOverlay({
  provider,
  onClose,
  onPay,
}) {
  if (!provider) return null;

  return (
    /* BACKDROP */
    <div
      className="fixed inset-0 z-[9999]
                 bg-black/40 backdrop-blur-md
                 flex items-center justify-center px-4"
    >
      {/* CARD */}
      <div
        className="relative w-full max-w-md
                   bg-white/90 backdrop-blur-xl
                   rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.25)]
                   p-6"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4
                     rounded-full p-2
                     hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
          Confirm your booking
        </h2>
        <p className="text-sm text-gray-500 text-center mb-5">
          Choose a payment method to continue
        </p>

        {/* ₹50 INFO BOX */}
        <div
          className="bg-blue-50 border border-blue-100
                     rounded-2xl p-4 mb-5 text-center"
        >
          <p className="text-sm text-gray-700">
            A small <span className="font-semibold">₹50 confirmation fee</span>
            helps us prevent fake bookings and ensures the professional
            reserves time for you.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Fully refundable if you cancel the booking.
          </p>
        </div>

        {/* PROVIDER */}
        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-xs text-gray-500 mb-1">Service professional</p>
          <p className="font-medium text-gray-900">{provider.name}</p>
        </div>

        {/* PAYMENT METHODS */}
        <div className="space-y-3">
          <button
            onClick={() => onPay("UPI")}
            className="w-full flex items-center gap-4
                       border border-gray-200
                       rounded-2xl px-4 py-3
                       hover:bg-gray-50 hover:border-blue-300
                       transition"
          >
            <Wallet className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-800">
              UPI / Wallet
            </span>
          </button>

          <button
            onClick={() => onPay("CARD")}
            className="w-full flex items-center gap-4
                       border border-gray-200
                       rounded-2xl px-4 py-3
                       hover:bg-gray-50 hover:border-blue-300
                       transition"
          >
            <CreditCard className="w-6 h-6 text-blue-600" />
            <span className="font-medium text-gray-800">
              Credit / Debit Card
            </span>
          </button>

          <button
            onClick={() => onPay("COD")}
            className="w-full border border-gray-200
                       rounded-2xl px-4 py-3
                       hover:bg-gray-50 hover:border-blue-300
                       transition font-medium text-gray-800"
          >
            Cash after service
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={() => onPay("CONFIRM")}
          className="mt-6 w-full py-3 rounded-2xl
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold
                     shadow-[0_20px_40px_rgba(37,99,235,0.35)]
                     hover:shadow-[0_30px_60px_rgba(37,99,235,0.45)]
                     hover:scale-[1.02]
                     active:scale-[0.98]
                     transition-all duration-300"
        >
          Pay ₹50 & Confirm Booking
        </button>

        {/* TRUST */}
        <div className="flex items-center justify-center gap-2
                        text-xs text-gray-500 mt-4">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          100% secure & refundable
        </div>
      </div>
    </div>
  );
}
