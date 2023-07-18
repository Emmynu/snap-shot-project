import { db } from "../firebase/firebase-config";   
import { onValue, ref, push } from "firebase/database";
import { deleteObject } from "firebase/storage";

export function storeCollections(url){
    try {
        let collections = {
            userId: localStorage.getItem("id"),
            imageId:new Date().getTime().toString(),
            url
        }
        push(ref(db, "collections"),collections)
    } catch (error) {
        console.log(error.message);
    }
}

export function getCollections(getCollections){
    let collectionsRef = ref(db,"collections")
    onValue(collectionsRef,(collection=>{
        getCollections(Object.values(collection.val()))
    }))
}
