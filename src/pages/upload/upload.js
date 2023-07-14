import React, { useState } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import "../../css/upload.css"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function UploadFiles(){
    const [files, setFiles] = useState(null)
    const [uploaded, setUploaded] = useState("Upload Files")
    let fromLocal = localStorage.getItem("id")

    function uploadimage(){
        if(files == null || files.length <= 0) {
            alert("Please choose a file")
        }
       else{
          if(fromLocal !== "" || fromLocal !== null){
            try {
                const imageRefernce = ref(storage, `${fromLocal}/${files.name}`)
                setUploaded("Loading...")
                uploadBytes(imageRefernce, files).then(resp=>{
                    setFiles(null)
                    setUploaded("Upload Files")
                })
            } catch (error) {
                console.log(error.message);
            }
          }
          else{
            <Navigate to="/signup"/>
          }
       }
    }
    return(
        <div className="mt-32">
          <div className="flex justify-center">
            <input type="file" onChange={(e)=> setFiles(e.target.files[0])} className="upload-input"/>
          </div>
        <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row">
            <button onClick={uploadimage} className="upload-btn upload">{uploaded}</button>
            <Link to="/myupload" className="upload-btn upload text-center">Get Images</Link>
        </div>
          
        </div>
    )
}