import { useContext, createContext, useState, useEffect } from "react";
import { EmailLogin, LogOut, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export default function AuthContextProvider({children}){
  const [user, setUser] = useState(); //null에서 시작
  console.log("현재 user", user);

  useEffect(()=>{
    onUserStateChange((newuser)=>{
      setUser(newuser);   
    })
  }, []);

  return (
    <AuthContext.Provider value={{user, EmailLogin:EmailLogin, LogOut:LogOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(){
  return useContext(AuthContext);
}