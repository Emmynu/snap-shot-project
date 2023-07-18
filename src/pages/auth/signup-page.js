import React, { useState, useEffect } from "react";
import demo from "../../images/demo.jpg"
import { NavLink } from "react-router-dom";
import { loginUser } from "./auth";
import { push,ref,set } from "firebase/database";
import { db } from "../firebase/firebase-config";

export default function CreateUser(){
    const [username, setUsername] = useState("")
    const [isLoaing, setIsLoading] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [users, setUsers] = useState([])
    const [isError, setisError] = useState("")
    
    useEffect(()=>{
    loginUser(setUsers)
      // console.log(users);
    },[users])

    function handleSubmit(e){
        e.preventDefault()

        if(username.length > 0 && userEmail.length > 0 && userPassword.length > 0){
            let userData = {
                userId: new Date().getTime(),
                username: username,
                email:userEmail,
                password:userPassword
            }
            
           users.filter((user)=>{
              if(user.email !== userEmail && user.username !== username){
                push(ref(db, "users/"),userData)
                setIsLoading(true)

                setTimeout(()=>{
                  window.location ="/login"
                },2000)
              }
              else{
               setisError("User Exists")
              }
           })


        }
        else{
          setisError("Please fill out all input field")

           setTimeout(()=>{
            setisError("")
           },2000)

        }
    }
    return(
        <>
      {/* sign up / login page */}
      <main className="form-container">
          {/* register page */}
          <section>
          <div className="flex justify-center items-center mb-5 ">
            <NavLink to="/signup"  className={({isActive})=>isActive ? "active" : "none-active"} end>Register</NavLink >
            <NavLink to="/login" className={({isActive})=>isActive ? "active" : "none-active"} end>Login</NavLink >
          </div>
          <section className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-2">

            <article className="w-full md:w-3/4 lg:3/4">
              <img src={demo} className="login-image"/>
            </article>

            <article>
              <h2 className="label mt-2">Create an account</h2>

              {/* state */}
              <span className="form-error">{isError}</span>

              {/* end of state */}

              <h2 className="email-option">register with an email</h2>

              <form className="form" onSubmit={handleSubmit}>
                <input  type="text" className="email" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} required/> 
                <input  type="email" className="email" placeholder="Email"  value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} required/>
                <input  type="password" className="password" placeholder="Password"  value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} required/>
                <button className="login-btn"  onClick={handleSubmit}>{isLoaing ? "Loading..." : "Register"}</button>
              </form>

            </article>

            </section>
          </section>

          {/* end of register */}
        </main>
        </>
    )
}