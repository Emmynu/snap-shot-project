import React, { useState } from "react";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import "../../css/upload.css"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

export default function UploadFiles(){
    const [files, setFiles] = useState(null)
    const [uploaded, setUploaded] = useState("Upload Files")
    const [error,setError] = useState(false)
    let fromLocal = localStorage.getItem("id")

    function uploadimage(){
        if(files == null || files.length <= 0) {
            setError(true)

            setTimeout(() => {
              setError(false)
            }, 3000);
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
               setError(true)
            }
          }
          else{
            <Navigate to="/signup"/>
          }
       }
    }
    return(
        <div className="mt-32">
          {error && <h2 className="text-center text-lg mb-3 text-red-600 font-medium">An error occured! Please try again.</h2>}
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