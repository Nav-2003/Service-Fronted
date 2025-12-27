import { Search, Navigation } from "lucide-react";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import BookingPendingOverlay from "../BookingComponent/BookingPending";
import ProviderList from "../BookingComponent/ProviderList";
import AssignedWorkerPanel from "../BookingComponent/AssignedWorkerPanel";
import { AuthContext } from "../config/AuthContext";

/* ================= ICONS ================= */

const customerIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
});

const workerIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
});

const selectedWorkerIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [48, 48],
});

/* ================= MAP HELPER ================= */

function FlyToSelected({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 0.5 });
    }
  }, [position]);

  return null;
}

/* ================= COMPONENT ================= */

export default function LocationSearchUI() {
  const { folkEmail } = useContext(AuthContext);
  const location = useLocation();

  const providers = location.state?.data || [];
  const customer = location.state
    ? [location.state.lat, location.state.lng]
    : [25.4432, 81.8479];

  const [selectedId, setSelectedId] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const [jobAccepted, setJobAccepted] = useState(false);

  const cardRefs = useRef({});

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* Scroll selected card */
  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId]);

  /* Selected provider (DERIVED STATE) */
  const selectedProvider = providers.find((p) => p._id === selectedId);

  /* 🔒 CRITICAL FIX — DO NOT LOSE SELECTION AFTER ACCEPT */
  useEffect(() => {
    if (jobAccepted && !selectedId && providers.length > 0) {
      // keep a valid provider when job is accepted
      setSelectedId(providers[0]._id);
    }
  }, [jobAccepted]);

  /* Sort providers */
  const sortedProviders = [...providers].sort((a, b) => {
    if (a._id === selectedId) return -1;
    if (b._id === selectedId) return 1;
    return 0;
  });

  const handleBookNow = async (email) => {
    setShowPending(true);

    await fetch("http://localhost:3000/api/worker/assignWorker", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        custmorEmail: folkEmail,
        workerEmail: email,
      }),
    });
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-gray-50">
      {/* ================= MAP ================= */}
      <div className="flex-1 relative order-first lg:order-last">
        {/* SEARCH BAR */}
        <div className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] sm:w-[70%] lg:w-[60%] max-w-xl">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services near you"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl">
              Search
            </button>
          </div>
        </div>

        {/* MAP */}
        <MapContainer
          center={customer}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <Marker position={customer} icon={customerIcon}>
            <Popup>You</Popup>
          </Marker>

          {providers.map((p) => (
            <Marker
              key={p._id}
              position={[p.lat, p.lng]}
              icon={p._id === selectedId ? selectedWorkerIcon : workerIcon}
              eventHandlers={{
                click: () => setSelectedId(p._id),
              }}
            >
              <Popup>
                <b>{p.name}</b>
              </Popup>
            </Marker>
          ))}

          {selectedProvider && (
            <FlyToSelected
              position={[selectedProvider.lat, selectedProvider.lng]}
            />
          )}
        </MapContainer>

        <button className="absolute bottom-6 right-6 z-[1000] bg-white p-4 rounded-full shadow-xl">
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* ================= LEFT PANEL (UNCHANGED) ================= */}
      {!jobAccepted ? (
        <ProviderList
          sortedProviders={sortedProviders}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          cardRefs={cardRefs}
          setShowPending={setShowPending}
          handleBookNow={handleBookNow}
        />
      ) : (
        <AssignedWorkerPanel worker={selectedProvider} />
      )}

      {/* ================= OVERLAY (UNCHANGED) ================= */}
      {showPending && selectedProvider && (
        <BookingPendingOverlay
          provider={selectedProvider}
          onClose={() => setShowPending(false)}
          onAccept={() => setJobAccepted(true)}
        />
      )}
    </div>
  );
}
