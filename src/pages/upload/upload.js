import React, { useState } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes,listAll, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase/firebase-config";
import "../../css/upload.css"

const refImage = ref(storage, "images/")
export default function UploadFiles(){
    const [files, setFiles] = useState(null)
    const [images,setImages] = useState([])
    const [uploaded, setUploaded] = useState("Upload Files")

    // function uploadimage(){
    //     if(files === null)return

    //     const imageRef = ref(storage, `images/${files.name + "udghavdnjwdj"}`)
    //     uploadBytes(imageRef, files).then(resp => {
    //         console.log("suceessful, image uploaded");
    //     })
    // }

    // function getImages(){
    //     listAll(refImage).then(resp => {
    //         resp.items.map((item)=>{
    //             getDownloadURL(item).then(url=>{
    //                 setImages([...images, url])
    //             })
    //         })
    //     })
    // }

    console.log(auth?.currentUser?.uid)
    function uploadimage(){
        if(files == null || files.length <= 0) {
            alert("Please choose a file")
        }
       else{
            const imageRefernce = ref(storage, `images/${files.name}`)
            setUploaded("Loading...")
            uploadBytes(imageRefernce, files).then(resp=>{
                setFiles(null)
                setUploaded("Upload Files")
            }).catch(err=>{
                alert(err.message)
            })
           
       }
    }
    return(
        <div className="mt-32">
          <div className="flex justify-center">
            <input type="file" onChange={(e)=> setFiles(e.target.files[0])} className="upload-input"/>
          </div>
        <div className="flex justify-center items-center">
            <button onClick={uploadimage} className="upload-btn upload">{uploaded}</button>
            {/* <button onClick={getImages}>Get Images</button> */}
        </div>
          
        </div>
    )
}

  {/* <div>{images.map((image)=>{
                return(
                    <img src={image} />
                )
            })}</div> */}