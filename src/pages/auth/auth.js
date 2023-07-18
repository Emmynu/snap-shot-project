import { db } from "../firebase/firebase-config";
import { onValue, ref, set,push } from "firebase/database";
import ErrorHandler from "../loading&error/error";


export async function createUser(usersData){
     push(ref(db, "users/"),usersData)
}


export async function loginUser(getCurrentUser){
    const userRef = ref(db, "users/")
    onValue(userRef, (data)=>{
        let users =  Object.values(data.val() )
        getCurrentUser(users)
    })
}



