import React, { useEffect, useState } from "react";
import { displayCollections } from "./collection-data";
import loadingImage from "../../images/loading-icon.png"
import "../../css/collection.css"
import errorImage from "../../images/error.gif"


export default function UserCollections(){
    const [collection, setCollections] = useState([])
    const [isError, setIsError] = useState(false)
    const id  = localStorage.getItem("id")

    useEffect(()=>{
       if(id === null || id === ""){
            window.location = "/signup"
       }
       else{
        try {
            displayCollections(setCollections)
            setIsError(false)
        } catch (error) {
            setIsError(true)
        }
       }
    },[collection])
    let filteredCollection = collection.filter((item) =>{
        if(item.id  === id){
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
                <h1 className="title text-center">Your Collections</h1>
            </div>
          {filteredCollection.length > 0 ?
          <section  className="collection-container">
          {filteredCollection.map((item)=>{
                return(
                    <div className="collection-image-container">
                        <img src={item.url} alt={item.id} className="image"/>
                    </div>
                )
            })}
            </section>
            :   
            <div className=" mt-8">
            <div className="flex justify-center">
                <img src={errorImage} alt="" />
            </div>
            <h1 className="text-center font-bold text-xl">No Image found</h1>    
        </div>}
          </section>
        // </section>
    )
}