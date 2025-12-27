import { motion } from "framer-motion";
import { Mail,Lock,User,Phone,Eye,EyeOff,X,} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../config/AuthContext";

export default function SignupOverlay({ onClose, onSubmit }) {
  const{setFolkEmail,folkEmail}=useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const response=await fetch('http://localhost:3000/api/userAuth/signUp',{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,phone,password})
    });
    const result=await response.json();
    setFolkEmail(email);
    console.log(result);
  };

  return (
    (!folkEmail)&&
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
          className="absolute top-4 right-4 p-2
                     rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Find trusted professionals near you
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <Input
            icon={<User />}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <Input
            icon={<Mail />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PHONE */}
          <Input
            icon={<Phone />}
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="flex items-center gap-3
                          border rounded-xl px-4 py-3
                          bg-white focus-within:border-blue-500 transition">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Create password"
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

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="
              w-full mt-4 py-4 text-lg font-semibold text-white
              rounded-2xl
              bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
              shadow-[0_20px_40px_rgba(79,70,229,0.4)]
              hover:shadow-[0_30px_60px_rgba(79,70,229,0.55)]
              transition-all duration-300
            ">
            Sign Up & Continue
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-5">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3
                    border rounded-xl px-4 py-3
                    bg-white focus-within:border-blue-500 transition">
      <span className="text-gray-400">{icon}</span>
      <input
        {...props}
        className="flex-1 outline-none bg-transparent text-sm"
      />
    </div>
  );
}
