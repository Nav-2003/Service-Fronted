import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../config/AuthContext";
import SuccessOverlay from "../ServiceComponent/SuccessAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import socket from "../config/socket";


const Api=import.meta.env.VITE_BACKEND_API;

export default function SignInOverlay({ onClose, onSubmit }) {
  const {signIn,setSignIn,userSign,setUserSign,workerSign,setWorkerSign,setFolkEmail,folkEmail}=useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [close,setClose]=useState(true);
  const [location,setLocation]=useState();
  const [loading,setLoading]=useState(false);

  
  const navigate=useNavigate();
 
 useEffect(() => {

  if (!navigator.geolocation) return;
  const id = navigator.geolocation.watchPosition(
    (pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => console.error(err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 30000,
    }
  );

  return () => navigator.geolocation.clearWatch(id);
}, []);

  const handleSignInButton=async()=>{
       setLoading(true);
       const response = await fetch(
        `${Api}/api/userAuth/signIn`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({email, password,lat:location.lat,lng:location.lng}),
        } 
      );
      setFolkEmail(email);
      const data = await response.json();
      setSignIn(data.sign);
      setUserSign(data.user);
      setWorkerSign(data.worker);
      setClose(data.worker);
      setLoading(false);
      socket.emit("register-Socket",{email});
      if(userSign){setClose(false);navigate('/');}
    }

  return ((close)&&
  <div
      className="fixed inset-0 z-[9999]
                 bg-black/50 backdrop-blur-md
                 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md
                   bg-white/90 backdrop-blur-xl
                   rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)]
                   p-8"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4
                     p-2 rounded-full
                     hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Sign in to continue .....
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1 flex items-center gap-3
                          bg-white rounded-xl border px-4 py-3
                          focus-within:border-blue-500 transition">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* PASSWORD */}
         {/* PASSWORD */}
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center gap-3
                          border rounded-xl px-4 py-3
                          bg-white focus-within:border-blue-500 transition">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

        {/* SIGN IN BUTTON */}
      <motion.button
  whileHover={{ scale: loading ? 1 : 1.03 }}
  whileTap={{ scale: loading ? 1 : 0.97 }}
  onClick={handleSignInButton}
  disabled={loading}
  className={`w-full py-4 rounded-2xl mt-10
    bg-gradient-to-r from-blue-600 to-indigo-600
    text-white font-semibold text-lg
    shadow-[0_20px_40px_rgba(37,99,235,0.35)]
    hover:shadow-[0_30px_60px_rgba(37,99,235,0.5)]
    transition-all duration-300
    flex items-center justify-center
    ${loading ? "cursor-not-allowed opacity-90" : ""}
  `}
>
  {loading ? (
    <div className="flex items-center gap-3">
      <HashLoader size={22} color="white" />
      <span className="tracking-wide">Signing in...</span>
    </div>
  ) : (
    "Sign In"
  )}
</motion.button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-5">
          Secure login · Your data is protected
        </p>
      </motion.div>
      {workerSign&&(<SuccessOverlay onClose={()=>setClose(false)}/>)}
    </div>
  );
}
