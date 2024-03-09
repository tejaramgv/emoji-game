
// import './index.css'

// const Login=()=>{




//     return(
//         <>
//         <div className="loginContainer">
//             <div className="box">
//                 <h1>Login</h1>
//                 <input type="text" placeholder="Enter email"/>
//                 <input type="password" placeholder="Password"/>
//                 <button className="button">SEND OTP</button>
//             </div>
//         </div>
        
        
//         </>
//     )
// }
// export default Login


import React, { useState, useRef,useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import {store} from '../../../App'
// import { css } from '@emotion/react';
import axios from 'axios';
import './index.css';

const Login = () => {
  const [toggle,setToggle]=useContext(store)
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpBoxes = useRef([]);
  const [submit,setSubmit]=useState(false)
  const navigate=useNavigate()
const [rotp,setRotp]=useState('')
let Tok;
const handleSubmit=async()=>{
    setSubmit(true)
    if(email.length<=5 || password.length<=3){
        toast.error("Please Enter valid Credentials!")
        setSubmit(false);
        return;
    }
    try {
        const res = await axios.post(`http://localhost:8081/api/v1/auth/login`, {  email, password });
       Tok=res.data.jwtToken
       localStorage.setItem("token",Tok)
        console.log("teja"+Tok)
        
  
        if (res.data.success) {
         const response = await axios.post('http://localhost:8081/api/v1/auth/send-otp', { email });
      console.log(response.data);
      if (response.data.success){
     toast.success(response.data.message);
     setRotp(response.data.otp)
     setSubmit(false);
       }
       else{
        toast.error(res.data.message);
       }




        } else {
          console.log('fail');
          toast.error(res.data.message);
        }
      } catch (error) {
        setSubmit(false)
        console.error(error);
        toast.error('Something went wrong!');
      }

}
const verifyOtp=()=>{
    const string=otp.join("")
    if (rotp.length===0){
  
        toast.error("Invalid Otp")
        return;
    }
    if(rotp===string){
      localStorage.setItem("otp",rotp)
      console.log("otp"+localStorage.getItem("otp"))
        setToggle(true)
        navigate('/')
        return;
    }
    toast.error("Wrong otp")
}



  const handleInputChange = (index, value) => {
    // Validate input to be a single digit
    if (/^[0-9]$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      // Move focus to the next input box
      if (index < otp.length - 1 && otpBoxes.current[index + 1]) {
        otpBoxes.current[index + 1].focus();
      }
    }
  };

  const handleClear = () => {

    setOtp(['', '', '', '', '', '']);
    if (otpBoxes.current[0]) {
      otpBoxes.current[0].focus();
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="boxs">
            
        <div className="login">
        <img className="loginimage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQulYBd04zip5tPKtFqgLX0AimyysyCgTBFg&usqp=CAU" alt=""/> 
         <h1>Login</h1></div>
          <input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />{submit?<ClipLoader color="#ffffff"  size={15} />
          :<button className="button" onClick={handleSubmit}>GET OTP</button>}
          <div className="otp">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={(input) => (otpBoxes.current[index] = input)}
              maxLength={1}
            />
          ))}
          
          </div>
          <div className="btn">
          <button className="button" onClick={handleClear}>
            Clear
          </button>
          <button className="button" onClick={verifyOtp}>Login</button>
          </div>
        
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default Login;
