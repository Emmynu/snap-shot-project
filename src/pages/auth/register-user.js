import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
let showForm = JSON.parse(localStorage.getItem("show-form"))

export default async function createUser(name, email,password){
    if(name && email && password){
    try {
        await createUserWithEmailAndPassword(auth,name,email,password)
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