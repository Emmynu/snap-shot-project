import React, { useEffect, useState } from "react";
import demo from "../../images/demo.jpg"
import { NavLink } from "react-router-dom";
import { loginUser } from "./auth";


export default function Login(){
    const [email, setEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [logUserIn, setLogUserIn] = useState([])
    const [errorState, setErrorState] = useState("")
    
    useEffect(()=>{
      loginUser(setLogUserIn)
    },[logUserIn])
    
    function handleLogin(){
        if(loginPassword.length > 0 && email.length > 0){
         try {
          logUserIn.filter((user)=>{
              if(user.email === email && user.password === loginPassword){
                  localStorage.setItem("id", JSON.stringify(user.userId))
                  window.location = "/"
              }
         
          })
         } catch (error) {
          setErrorState("An error occured. Please try again")
         }
        }
        else{
          setErrorState("Please fill out all input field")

          setTimeout(() => {
            setErrorState("")
          }, 2000);
        }
    }

    return(
        <main className="form-container">
          <span className="form-error">{errorState}</span>
        <div className="flex justify-center items-center mb-5 ">
            <NavLink to="/signup"  className={({isActive})=>isActive ? "active" : "none-active"} end>Register</NavLink >
            <NavLink to="/login" className={({isActive})=>isActive ? "active" : "none-active"} end>Login</NavLink >
          </div>
           {/* login Page */}
           <section>
            {/* container */}
            <section className="grid grid-cols-1 items-start  md:grid-cols-2 lg:grid-cols-2">

              <article className="md:w-3/4 lg:3/4">
                <img src={demo} className="login-image"/>
              </article>

              <article>
                <h2 className="label mt-2">Log in to your account</h2>

                {/* login options */}
                <div></div>
                {/* end of login options */}

                <h2 className="email-option">log in with an email</h2>
            
                <div className="form">
                  <input  type="email" className="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <input  type="password" className="password" placeholder="Password"  value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                  <h2 className="forgot-password-label">Forgot your password?</h2>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                </div>
              </article>

            </section>

          </section>

          {/* end of login page */}
        </main>
    )
}