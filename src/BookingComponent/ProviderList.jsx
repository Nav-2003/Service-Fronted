import { Star, MapPin, Clock } from "lucide-react";

export default function ProviderList({
  sortedProviders,
  selectedId,
  setSelectedId,
  cardRefs,
  setShowPending,
  handleBookNow,
}) {
  return (
    <div className="w-full lg:w-[30%] h-[40vh] lg:h-full border-t lg:border-t-0 lg:border-r bg-white flex flex-col">

      <div className="px-5 py-4 border-b">
        <h2 className="text-lg font-semibold">Providers Nearby</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {sortedProviders.map((provider) => (
          <div
            key={provider._id}
            ref={(el) => (cardRefs.current[provider._id] = el)}
            onClick={() => setSelectedId(provider._id)}
            className={`rounded-2xl p-4 cursor-pointer transition
              ${
                provider._id === selectedId
                  ? "border-2 border-blue-500 bg-blue-50 shadow-xl"
                  : "border border-gray-100 bg-white hover:shadow-md"
              }`}
          >
            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
            <p className="text-sm text-gray-500">{provider.service}</p>

            <div className="flex items-center gap-4 text-xs mt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4" />
                {provider.rating}
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                {provider.distance} km
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                {provider.eta || "15 min"}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (provider._id !== selectedId) return;
                setShowPending(true);
                handleBookNow(provider.email);
              }}
              disabled={provider._id !== selectedId}
              className={`mt-3 w-full py-2 rounded-xl transition
                ${
                  provider._id === selectedId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
