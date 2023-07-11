import React, { useState } from "react";
import { useParams,Link, useLocation } from "react-router-dom";
import  { createClient } from "pexels"
import "../../css/home.css"
import LoadingData from "../loading&error/loading";
import ErrorHandler from "../loading&error/error";
import { downloadFile } from "./download";
 
export default function HomeVideoDetailedPage(){
    const [videos, setVideos] = useState([])
    const  params = useParams()
    const [error, setError] = useState(false)
    const [isLoading,  setIsLoading] = useState(true)
    const [downloading, setDownloading] = useState(false)
    let videoLink = {}
    console.log(params);

    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');

    client.videos.show({ id: params.videoId }).then(video => {
        setVideos(video)
        setIsLoading(false)
        setError(false)
    }).catch(err=>{
        setIsLoading(false)
        setError(true)
    })



    function downLoadVideo(url,name){
        setDownloading(true)
        downloadFile(url,name)
        setTimeout(()=>{
            setDownloading(false)
        },4000)
    }


  
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
                <ErrorHandler/>
            </div>
        )
    }
    return(
        <main className="home-detailed-photos-container mt-36">
            <section>
         {   videos.video_files.map((item)=>{
            const {id,link,file_type} = item
            videoLink = {link, type:file_type}
          })}
                <video className="w-full" height="320" controls>
                    <source src={videoLink.link}></source>
                </video>
            </section>
            <section className="mt-2 md:mt-4 lg:mt-5 lg:ml-6">
                <h2 className="dark:text-slate-100"><span className="text-base font-medium">Shot by :  </span> <span className="text-xl font-bold">{videos.user.name}</span></h2>
                <section className="mt-3">
                    <Link to=".." className="download py-1.5 mr-3">Return to home</Link>
                    <button className="download" onClick={() => downLoadVideo(videoLink.link,videos.user.name)}>{downloading ? "Downloading...": "Download"}</button>
                </section>
            </section>
        </main>
    )
}