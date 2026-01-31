import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../config/AuthContext";

export default function ProfileMenu() {
  const { folkEmail } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!folkEmail) return null;

  return (
    <div className="relative z-50" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full
                   bg-gradient-to-br from-gray-200 to-gray-300
                   text-gray-800 font-semibold
                   flex items-center justify-center
                   hover:shadow-md hover:scale-105
                   transition-all duration-150"
      >
        {folkEmail.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-1/2 top-full mt-3 -translate-x-1/2 w-64
                     rounded-2xl bg-white/95 backdrop-blur
                     border border-gray-200
                     shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                     p-4 animate-fade-in"
        >
          <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
            Signed in as
          </p>

          <p className="text-sm font-medium text-gray-900 break-all mb-3">
            {folkEmail}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-3" />

          {/* My Bookings Link */}
          <button
            onClick={() => {
              navigate("/bookingsInform");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl
                       text-sm font-medium text-gray-700
                       hover:bg-gray-100 transition"
          >
            My Bookings
          </button>
          <button
          onClick={()=>navigate('/service/waitingRoom')}
      className="w-full flex items-center justify-between
                 px-3 py-2 rounded-xl
                 text-sm font-medium text-gray-700
                 hover:bg-gray-100
                 transition"
    >
      Find Work
      <span className="text-gray-400">→</span>
    </button>
        </div>
      )}
    </div>
  );
}
