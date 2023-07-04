import React, { useState } from "react";
import { useParams,Link } from "react-router-dom";
import  { createClient } from "pexels"
import loadingIcon from "../images/loading.png"
import "../css/home.css"
import LoadingData from "./loading";
 
export default function HomePhotoDetailedPage(){
    const [photos, setPhotos] = useState([])
    const [image, setImage] = useState([])
    const  params = useParams()
    const [error, setError] = useState(false)
    const [isLoading,  setIsLoading] = useState(true)

    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
    client.photos.show({ id: params.homePhotoId }).then(photo =>{
        setPhotos(photo)
        setImage(photo.src)
        setIsLoading(false)
    }).catch(
        (err)=>{
        setError(true)
        setIsLoading(false)
    })
  
    if(isLoading){
        return(
            <div>
               <LoadingData />
            </div>
        )
    }
    
    if(error){
        return(
            <div>
                <h2 className='error'>An Error Occured, Please try again.</h2>
            </div>
        )
    }
    return(
        <main className="home-detailed-photos-container mt-36">
            <section>
                {<img src={image.large2x}  />}
            </section>
            <section className="mt-2 md:mt-4 lg:mt-5">
                <h2 className="dark:text-slate-100"><span className="text-base font-medium">Shot by :  </span> <span className="text-xl font-bold">{photos.photographer}</span></h2>
                <h2 className="photo-alt dark:text-slate-100">{photos.alt}</h2>
                <section className="mt-3">
                    <Link to=".." className="download py-1.5 mr-3">Return to home</Link>
                    <button className="download">Download</button>
                </section>
            </section>
        </main>
    )
}