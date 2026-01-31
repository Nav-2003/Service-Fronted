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

const Api = import.meta.env.VITE_BACKEND_API;

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
  const { folkEmail, setBookingId, bookingId, service } =
    useContext(AuthContext);

  const location = useLocation();

  /* ================= CUSTOMER LOCATION STATE ================= */

  const [customerLocation, setCustomerLocation] = useState(() => {
    if (location.state?.lat && location.state?.lng) {
      return {
        lat: location.state.lat,
        lng: location.state.lng,
      };
    }
    return null;
  });

  const customer = customerLocation
    ? [customerLocation.lat, customerLocation.lng]
    : [25.4432, 81.8479];

  /* ================= PROVIDERS ================= */

  const [providers, setProviders] = useState(
    location.state?.data || []
  );

  const [selectedId, setSelectedId] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const [jobAccepted, setJobAccepted] = useState(false);

  const cardRefs = useRef({});

  /* ================= FETCH LOCATION IF MISSING ================= */

  useEffect(() => {
    if (!customerLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCustomerLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => console.warn("Location permission denied")
      );
    }
  }, []);

  /* ================= IMPROVED POLLING ================= */

  useEffect(() => {
    if (!customerLocation || !service) return;

    let intervalId;
    let isFetching = false;

    const fetchProviders = async () => {
      if (isFetching) return; // prevent overlap
      isFetching = true;

      try {
        const response = await fetch(
          `${Api}/api/serviceAvailable/getServiceData`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service,
              lat: customerLocation.lat,
              lng: customerLocation.lng,
            }),
          }
        );

        const result = await response.json();

        setProviders((prev) => {
          if (
            selectedId &&
            !result.data?.find((p) => p._id === selectedId)
          ) {
            setSelectedId(null);
          }
          return result.data || [];
        });
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        isFetching = false;
      }
    };

    // initial fetch
    fetchProviders();

    const startPolling = () => {
      if (!intervalId) {
        intervalId = setInterval(fetchProviders, 5000);
      }
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // pause when tab inactive
    const handleVisibility = () => {
      if (document.hidden) stopPolling();
      else startPolling();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    startPolling();

    return () => {
      stopPolling();
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [customerLocation, service, selectedId]);

  /* ================= LOCK SCROLL ================= */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* ================= AUTO SCROLL CARD ================= */

  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedId]);

  /* ================= DERIVED ================= */

  const selectedProvider = providers.find(
    (p) => p._id === selectedId
  );

  const sortedProviders = [...providers].sort((a, b) => {
    if (a._id === selectedId) return -1;
    if (b._id === selectedId) return 1;
    return 0;
  });

  /* ================= BOOK HANDLER ================= */

  const handleBookNow = async (email) => {
    setShowPending(true);

    const response = await fetch(
      `${Api}/api/worker/assignWorker`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          custmorEmail: folkEmail,
          workerEmail: email,
          service,
        }),
      }
    );

    const data = await response.json();
    setBookingId(data.bookingId);
  };

  /* ================= RENDER ================= */

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-gray-50">
      {/* MAP */}
      <div className="flex-1 relative order-first lg:order-last">
        <MapContainer center={customer} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          <Marker position={customer} icon={customerIcon}>
            <Popup>You</Popup>
          </Marker>

          {providers.map((p) => (
            <Marker
              key={p._id}
              position={[Number(p.lat), Number(p.lng)]}
              icon={
                p._id === selectedId
                  ? selectedWorkerIcon
                  : workerIcon
              }
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
              position={[
                Number(selectedProvider.lat),
                Number(selectedProvider.lng),
              ]}
            />
          )}
        </MapContainer>

        <button className="absolute bottom-6 right-6 z-[1000] bg-white p-4 rounded-full shadow-xl">
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* LEFT PANEL */}
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

      {/* OVERLAY */}
      {showPending && selectedProvider && (
        <BookingPendingOverlay
          provider={selectedProvider}
          bookingId={bookingId}
          onClose={() => setShowPending(false)}
          onAccept={() => setJobAccepted(true)}
        />
      )}
    </div>
  );
}
