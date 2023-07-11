import { useState } from "react";
import { auth } from "../firebase/firebase-config";
import { updatePassword } from "firebase/auth";

export default  function UpdatePassword(){
    const [newPassword, setNewPassword] = useState("")
    const currentUser = auth.currentUser
    console.log(currentUser);
   if(newPassword.length > 0){
     updatePassword(currentUser,newPassword)
   }
   

   return(
    <input type="password" value={newPassword} onChange={(e) =>setNewPassword(e.target.value)}/>
   )
}

async function  updatepassword(currentUser, newPassword){
    await updatePassword(currentUser,newPassword)
    alert("Password Change was sucessful")
}