import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
let showForm = JSON.parse(localStorage.getItem("show-form"))


export default async function loginUserIn(email,password){
    if(email && password){
        try {
            await signInWithEmailAndPassword(auth,email,password)
            alert("user created")
            showForm = false
            localStorage.setItem("show-form",JSON.stringify(showForm))
        } catch (error) {
            console.log(error);
        }
        }
    else{
     alert("invalid details")
    }
}

