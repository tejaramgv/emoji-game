import * as
 React from 'react'
 import { FaBars } from 'react-icons/fa';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import {useState,useEffect,useContext} from 'react';
 import {jwtDecode} from 'jwt-decode';
import {Link} from 'react-router-dom'
import {store} from '../../App'
import './index.css'

const NavBar = () => {
const [toggle,setToggle]=useContext(store)
const [bar,setBars]=useState(false)
const bars = () => {
  setBars(!bar)
  
};

console.log(toggle)
 const logout=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("otp")
  setToggle(false)
  console.log(toggle.loggedIn)
  console.log(toggle.expire)
}


  return (
    <div className="header">
      <div className="gamelogo">
      <div className="innerlogo">
      <img
        src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
        alt="emoji logo"/><span className="logo">Laugh Line</span></div>
          <FaBars onClick={bars} className="bars" size={30} color="white" />
      </div>
      <div className={`score ${bar?"":"display"}`}>
      <Link to="/" className="link">HOME</Link>
      {toggle?<Link onClick={logout} className="link" >LOGOUT</Link>:
        <>
       <Link to="/register" className="link">REGISTER</Link>
       <Link to="/login" className="link">LOGIN</Link></>}
      </div>
    </div>
  
  )
}
export default NavBar
