import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";


export default function Register(){


const navigate = useNavigate();



const [form,setForm] = useState({

name:"",
email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const handleRegister = async(e)=>{


e.preventDefault();


try{


// check if email exists

const res = await api.get(
`/users?email=${form.email}`
);



if(res.data.length > 0){


alert("Email already exists");

return;


}




// create user

await api.post(
"/users",
form
);



alert("Account created successfully");


// go login page

navigate("/login");



}

catch(error){


console.log(error);


}



};





return(


<div className="auth-page">


<div className="auth-card">


<h1>
Create Account
</h1>



<p>
Start your journey with MasrGo
</p>




<form onSubmit={handleRegister}>



<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>





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

Register

</button>






<p className="auth-link">

Already have an account?


<span
onClick={()=>navigate("/login")}
>

 Login

</span>


</p>




</form>




</div>



</div>


)


}