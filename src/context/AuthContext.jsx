import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export function AuthProvider({children}){ // el children hwa el components el gayin mn el app.jsx


const [user,setUser]=useState( // el user hwa el object el gay mn el login
JSON.parse(localStorage.getItem("user")) || null // lw fe user mwgood fe el localStorage y3mlha parse w y7otha fe el state lw la2 y7otha null
);



const login=(userData)=>{

setUser(userData);

localStorage.setItem(
"user",
JSON.stringify(userData)
);

};



const logout=()=>{

setUser(null);

localStorage.removeItem("user");

};



return(

<AuthContext.Provider
value={{
user,
login,
logout
}}
>

{children}

</AuthContext.Provider>


)

}



export function useAuth(){

return useContext(AuthContext);

}