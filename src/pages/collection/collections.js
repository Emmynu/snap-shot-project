import React, { useEffect, useState } from "react";
import {  getCollections } from "./collection-data";
import "../../css/collection.css"
import errorImage from "../../images/error.gif"
import { downloadFile } from "../main/download";
import { ref } from "firebase/storage";
import { remove } from "firebase/database";
import { db } from "../firebase/firebase-config";


export default function UserCollections(){
    const [collection, setCollections] = useState([])
    const [isError, setIsError] = useState(false)
    const id  = localStorage.getItem("id")


    function downloadCollectionImage(url,id){
        downloadFile(url, "image/collections"+ id)
        alert("downloaded")
    }

    useEffect(()=>{
       if(id === null || id === ""){
            window.location = "/signup"
       }
       else{
        try {
            getCollections(setCollections)
            setIsError(false)
        } catch (error) {
            setIsError(true)
        }
       }
    },[collection])

    let filteredCollection = collection.filter((item) =>{
        if(item.userId  === id){
            return true 
        }
        else{
            return false
        }
    })

    if(isError){
        return <>
            <h2 className="mt-32">An error occured please try again!</h2>
        </>
    }

    return(
        <section className="mt-32">
             <div className="title-container">
                <h1 className="title text-center dark:text-slate-50">Your Collections</h1>
            </div>

          {filteredCollection.length > 0 ?
          <section  className="collection-container">
          {filteredCollection.map((item)=>{
                return(
                    <div className="collection-image-container"  >
                        <img src={item.url} alt={item.id} className="image" onClick={()=>downloadCollectionImage(item.url,item.imageId)} />
                    </div>
                )
            })}
            </section>
            :   
            <div className=" mt-8">
            <div className="flex justify-center">
                <img src={errorImage} alt="" />
            </div>
            <h1 className="text-center font-bold text-xl dark:text-slate-50">No Image found</h1>    
        </div>}
          </section>
        // </section>
    )
}