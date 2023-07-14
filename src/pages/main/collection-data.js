import { db } from "../firebase/firebase-config";
import { onValue, ref, push } from "firebase/database";
import ErrorHandler from "../loading&error/error";

export function storeCollections(url){
    try {
        let collections = {
            id: localStorage.getItem("id"),
            url
        }
        push(ref(db, "collections"),collections)
    } catch (error) {
        console.log(error.message);
    }
}

export function displayCollections(getCollections){
    let collectionsRef = ref(db,"collections")
    onValue(collectionsRef,(collection=>{
        getCollections(Object.values(collection.val()))
    }))
}