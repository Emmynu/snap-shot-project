import { useEffect, useState } from "react"
import { storage } from "../firebase/firebase-config"
import { getDownloadURL, listAll,ref } from "firebase/storage"
import errorImage from "../../images/error.gif"

import "../../css/upload.css"
import { downloadFile } from "../main/download"

let images =  []
let uid = localStorage.getItem("id")
let uploadedImages = JSON.parse(localStorage.getItem("image"))  || []

function getUploadedImages(){
    try {
        const imageRef = ref(storage, uid)
        listAll(imageRef).then(resp =>{
            resp.items.map((item)=>{
                getDownloadURL(item).then(url =>{
                    let getImages = {
                        userId:uid,
                        url: url
                    }
                   images.push(getImages)
                    localStorage.setItem("image",JSON.stringify(images))
               })
            })
        })
    } catch (error) {
        alert("An error occured please try again")
    }
}

export default function UploadedFiles(){

    useEffect(()=>{
        getUploadedImages()
    },[])

    
    return(
       <main className="mt-32 ">
         <div className="title-container">
                <h1 className="title text-center">Your Photos</h1>
            </div>
        <section  className="">
            { uploadedImages.length > 0 ?
                <section className="upload-image-container">
                { uploadedImages.map((image)=>{
                    const {userId,url} = image
                    return(
                    <div className="upload-image-parent">
                        <img src={url} alt={userId} className="upload-image"/>
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
       </main>
    )
        }

      

          