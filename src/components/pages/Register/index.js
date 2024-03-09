// import {useState} from 'react'
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import './index.css'


// const Register=()=>{
  
//   const [name,setName]=useState("")
//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("")
//   const [cpassword,setCpassword]=useState("")
//   console.log(email)
//   console.log(name)
//   console.log(password)
 
//   const handleSubmit=async ()=>{

//     console.log("yes")
//     ;
//     if (password!==cpassword){
//       toast.success("hello");
//     }
    
//     try { const res= await axios.post(`http://localhost:8081/api/v1/auth/register`,{name,email,password});
//     console.log(res)
//     if (res.data.success){
//       // navigate('/login');
//       console.log("success")
      
//       toast.success(res.data.message);
//     }
//     else{
//       console.log("fail")
//       toast.error(res.data.message)
//     }

      
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong!")
      
//     }
    
//   }

//   return(
//     <div className="containers">
//       <div className="form">
//         <h1>Register</h1>
//         <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Name" />
//         <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your mail"/>
//         <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
//         <input type="password" onChange={(e)=>{setCpassword(e.target.value)}} placeholder='Confirm Password'/>
//         <button className="button" onClick={handleSubmit}>Register</button>
//       </div>


//     </div>
//   )
// }
// export default Register
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import './index.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate = useNavigate();
  const [submit,setSubmit]=useState(false)

  const handleSubmit = async () => {
    if (password !== cpassword) {
      
      toast.error('Passwords do not match');
      return;
    }
setSubmit(true)

    try {
      const res = await axios.post(`http://localhost:8081/api/v1/auth/register`, { name, email, password });
      console.log(res);

      if (res.data.success) {
       await toast.success(res.data.message);
        navigate('/login')
      } else {
        console.log('fail');
        setSubmit(false)
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setSubmit(false)
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="containers">
      <div className="form">
        <div className="registerimage"><img  className="image" src="https://icons4web.com/wp-content/uploads/2017/07/Register-icon.-Red-glossy-web-icon-with-shadow-141358.jpg" alt=""/>  <h1>Register</h1></div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your mail" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" onChange={(e) => setCpassword(e.target.value)} placeholder="Confirm Password" />
        {submit?<ClipLoader color="#ffffff"  size={15} />: <button className="button" onClick={handleSubmit}>
          SUBMIT
        </button>}
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
