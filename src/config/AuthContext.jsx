import { createContext,useState } from "react";

export const AuthContext=createContext();

export const AuthProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [userSign,setUserSign]=useState(false);
  const [workerSign,setWorkerSign]=useState(false);
  const [folkEmail,setFolkEmail]=useState("");
  const [bookingId,setBookingId]=useState();
  const [service,setService]=useState();

  return (
    <AuthContext.Provider value={{signIn,setSignIn,signUp,setSignUp,userSign,setUserSign,workerSign,
      setWorkerSign,folkEmail,setFolkEmail,bookingId,setBookingId,service,setService
    }}>
      {children}
    </AuthContext.Provider>
  );
};