import { useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
import PageAnimation from "../components/PageAnimation";


export default function Login(){


const navigate = useNavigate();

const location = useLocation();

const {login}=useAuth();



const [form,setForm]=useState({

email:"",
password:""

});





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const handleLogin = async(e)=>{


e.preventDefault();



try{


const res = await api.get(
`/users?email=${form.email}&password=${form.password}`
);





if(res.data.length === 0){


alert("Invalid email or password");

return;


}





const user = res.data[0];




login(user);




const redirectTo = location.state?.from || "/";

navigate(redirectTo), {state:{viewtransition:true}};




}

catch(error){


console.log(error);


}



};






return(

<PageAnimation>

<div className="auth-page">



<div className="auth-card">



<h1>
Welcome Back
</h1>




<p>
Login to continue your journey
</p>





<form onSubmit={handleLogin}>




<input

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

required

/>






<input

name="password"

type="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

required

/>







<button type="submit">

Login

</button>






<p className="auth-link">


Don't have an account?



<span

onClick={()=>navigate("/register")}

>

 Register

</span>



</p>





</form>



</div>




</div>


</PageAnimation>

)


}