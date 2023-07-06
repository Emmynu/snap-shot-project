import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom"
import { createClient } from "pexels";
import playIcon from "../images/play-icon.png"
import downloadIcon from "../images/download.png"
import { downloadFile } from "./download";
import ErrorHandler from "./error";
import LoadingData from "./loading";



export default function GetHomeVideos(){
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    let videoLink = ""

    function playVideo(id){
      // mapping over to check if the ids are equal before downloading...
        videos.map((video)=>{
            if(video.id === id){
                video.video_files.map((item)=>{
                // store the video url in a variable called videoLink
                 <Link to={`/video/${id}`}>{item}</Link>
                })
            }
            else{
                return false
            }
        })
    }

    function downloadVideo(id){
      // mapping over to check if the ids are equal before downloading...
        videos.map((video)=>{
            if(video.id === id){
                video.video_files.map((item)=>{
                // store the video url in a variable called videoLink
                    videoLink = item.link
                  // downloadFile is a function looking for two argument....the url and the name of the file
                    downloadFile(videoLink,item.file_type)
                })
            }
            else{
                return false
            }
        })

    }
     
    // fetching the data using channing 
    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
    client.videos.popular({ per_page: 36 }).then(videos => {
        setIsLoading(false)
        setIsError(false)
        setVideos(videos.videos) // fetching data
    }).catch(err=>{
        setIsError(true)
        setIsLoading(false)// catching errors
    });

    // checking loading state
    if(isLoading){
        return(
            <LoadingData/>
        )
    }

    // checking error state
    if(isError){
        return(
            <ErrorHandler/>
        ) 
    }

    //  Mapping over the array to display the fetched data
    let videoContainer = videos.map((video)=>{
        const {image,id,video_files} = video
        return(
           <Link to={`/video/${id}`}>
            <section>
                <div className="video-image-container relative">
                    <img src={image} alt="image_url"className="video-image cursor-pointer select-none" />
                    <button className="play-btn">
                        <img src={playIcon} alt="play-icon" className="bg-black rounded-md" onClick={()=>playVideo(id)}/>
                    </button>
                    <button className="download-btn">
                        <img src={downloadIcon} alt="download-icon" onClick={()=>downloadVideo(id)}/>
                    </button>
                </div>
            </section>
           </Link>
        )
    })
    // displaying the data if successfully fetched
    return(
        <section className="image-container">{videoContainer}</section>
    )
}