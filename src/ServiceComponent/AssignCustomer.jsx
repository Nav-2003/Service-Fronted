import { CheckCircle, XCircle, MapPin, User } from "lucide-react";

export default function QuickMatch({ data = {
  name: "Amit Sharma",
  distance: 2.4 // in KM
}
, onAccept, onReject }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[360px] rounded-3xl bg-white shadow-2xl p-6 animate-scaleIn">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            New Match
          </p>

          <div className="mt-3 flex justify-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <User className="w-7 h-7 text-emerald-600" />
            </div>
          </div>

          <h2 className="mt-3 text-2xl font-extrabold text-gray-800">
            {data.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            is requesting your service
          </p>
        </div>

        {/* Distance */}
        <div className="rounded-2xl bg-gray-50 p-4 flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">
            {data.distance} km away
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 text-gray-600 font-semibold hover:bg-gray-100 transition"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>

          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 transition"
          >
            <CheckCircle className="w-5 h-5" />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
