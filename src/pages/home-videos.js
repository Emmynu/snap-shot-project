import React, { useReducer, useState } from "react";
import { NavLink } from "react-router-dom"
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
    // const [state,dispatch] = useReducer(reducer,videoState)
    let videoLink = ""

    function playVideo(id){
        videos.map((video)=>{
            if(video.id === id){
                video.video_files.map((item)=>{
                    videoLink = item.link
                    console.log(videoLink);
                })
            }
            else{
                return false
            }
        })
    }

    function downloadVideo(id){
        videos.map((video)=>{
            if(video.id === id){
                video.video_files.map((item)=>{
                    videoLink = item.link
                    downloadFile(videoLink,item.file_type)
                })
            }
            else{
                return false
            }
        })
    }

    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
    client.videos.popular({ per_page: 36 }).then(videos => {
        setIsLoading(false)
        setIsError(false)
        setVideos(videos.videos)
    }).catch(err=>{
        setIsError(true)
        setIsLoading(false)
    });

    if(isLoading){
        return(
            <LoadingData/>
        )
    }

    if(isError){
        return(
            <ErrorHandler/>
        ) 
    }
    
    let videoContainer = videos.map((video)=>{
        const {image,id,video_files} = video
        return(
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
        )
    })
    return(
        <>{videoContainer}</>
    )
}