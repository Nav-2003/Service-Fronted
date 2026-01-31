import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Briefcase,
  IdCard,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import socket from "../config/socket";
import { AuthContext } from "../config/AuthContext";
import SignInOverlay from "../AuthComponent/SignInOverlay";

const Api = import.meta.env.VITE_BACKEND_API;
var flag = false;

export default function WorkerSignupForm() {
  const { setFolkEmail } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  // ✅ NEW STATE
  const [initialAmount, setInitialAmount] = useState("");

  const [lat, setlat] = useState();
  const [lng, setlng] = useState();
  const [exist, setexist] = useState(false);

  useEffect(() => {
    flag = false;
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      socket.emit("checkEmail", { email });
      socket.on("emailResult", (msg) => {
        flag = msg.exits;
        setexist(flag);
      });
    }
  }, [email]);

  /* LOCATION */
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => reject("Location permission denied")
      );
    });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { lat, lng } = await getLocation();
      setlat(lat);
      setlng(lng);

      const response = await fetch(`${Api}/api/workerAuth/signUp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          service,
          aadhar,
          pass: password,
          lat,
          lng,
          initialAmount, // ✅ SENT TO BACKEND
        }),
      });

      await response.json();
      setFolkEmail(email);
      setShowSignIn(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
          Start Earning With Us
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Join as a verified service professional
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            icon={<User />}
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Phone Number"
            icon={<Phone />}
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <InputField
            label="Email Address"
            icon={<Mail />}
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SERVICE */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Service Category
            </label>
            <div className="mt-1 flex items-center gap-3 bg-white rounded-xl border px-4 py-3 focus-within:border-emerald-500 transition">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              >
                <option value="">Select your service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Barber">Barber</option>
              </select>
            </div>
          </div>

          {/* ✅ INITIAL BOOKING AMOUNT */}
          <InputField
            label="Initial Booking Amount"
            icon={<Briefcase />}
            type="number"
            min="0"
            placeholder="Amount customer must pay initially"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
          />

          <InputField
            label="Aadhaar Number"
            icon={<IdCard />}
            type="text"
            maxLength={12}
            placeholder="12-digit Aadhaar number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Create Password
            </label>
            <div className="mt-1 flex items-center gap-3 bg-white rounded-xl border px-4 py-3 focus-within:border-emerald-500 transition">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full outline-none bg-transparent text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 shadow-[0_20px_40px_rgba(16,185,129,0.35)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.45)] transition-all duration-300"
          >
            Start Earning
          </motion.button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          Your details will be securely verified before activation.
        </p>
      </motion.div>

      {showSignIn && <SignInOverlay onClose={() => setShowSignIn(false)} />}
    </div>
  );
}

function InputField({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center gap-3 bg-white rounded-xl border px-4 py-3 focus-within:border-emerald-500 transition">
        <span className="w-5 h-5 text-gray-400">{icon}</span>
        <input {...props} className="w-full outline-none bg-transparent text-sm" />
      </div>

      {flag && label === "Email Address" && (
        <p className="mt-1 text-sm text-red-500">⚠️ Email already exists</p>
      )}
    </div>
  );
}
