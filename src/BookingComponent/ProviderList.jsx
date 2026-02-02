import { Star, MapPin, Clock } from "lucide-react";

export default function ProviderList({
  sortedProviders,
  selectedId,
  setSelectedId,
  cardRefs,
  handleBookNow,
}) {
  return (
    <div className="w-full lg:w-[30%] h-[40vh] lg:h-full border-t lg:border-r bg-white flex flex-col">
      <div className="px-5 py-4 border-b">
        <h2 className="text-lg font-semibold">Providers Nearby</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {sortedProviders.map((provider) => (
          <div
            key={provider._id}
            ref={(el) => (cardRefs.current[provider._id] = el)}
            onClick={() => setSelectedId(provider._id)}
            className={`rounded-2xl p-4 cursor-pointer transition ${
              provider._id === selectedId
                ? "border-2 border-blue-500 bg-blue-50 shadow-xl"
                : "border bg-white hover:shadow-md"
            }`}
          >
            <h3 className="font-semibold">{provider.name}</h3>
            <p className="text-sm text-gray-500">{provider.service}</p>

            <div className="flex gap-4 text-xs mt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4" />
                {provider.rating || 4.5}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {provider.distance || "0.5"} km
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                15 min
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (provider._id === selectedId)
                  handleBookNow(provider.email);
              }}
              disabled={provider._id !== selectedId}
              className={`mt-3 w-full py-2 rounded-xl ${
                provider._id === selectedId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
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
