import React, { useReducer, useState } from "react";
import { Link,useSearchParams, useOutletContext } from 'react-router-dom';
import "../css/home.css"
import filterIcon from "../images/filter-icon.png"
import { GetHomePhotos } from "./home-photos";
import GetHomeVideos from "./home-videos"
import playIcon from "../images/play-icon.png"
import downloadIcon from "../images/download.png"
import { downloadFile } from "./download";


function reducer(state, action){
  if(action.type === "TOGGLE_SM_FILTER"){
    state.showFilterSm  = !state.showFilterSm
    return{...state, showFilterSm: state.showFilterSm}
  }

  return state
}

const smFilters = {
  showFilterSm: false
}

export default function HomePage(){
    const [ searchParams, setSearchParams] = useSearchParams()
    const [state, dispatch] = useReducer(reducer, smFilters)
    let { searchValue,searchedPhotos,searchedVideos } = useOutletContext()
    let videoLink;
    function downloadVideo(id){
      searchedVideos.map((video)=>{
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

  function downloadBtn(id){
    searchedPhotos.find((item)=>{
        if(item.id === id){
            downloadFile(item.src.large2x,`${item.alt}+${item.id}`)
        }
    })
}

    let imageContainer = searchedPhotos.map((item)=>{
      const {id,url,src,photographer,photographer_url,avg_color,liked,alt} = item
      return(
               <div className="mt-4 md:mt-5 lg:mt-7 relative">
                 <Link to={`${id}`}> 
                    <img src={src.large2x} alt={id} className='image'/> 
                 </Link>
                  <button className="download-btn" onClick={()=>downloadBtn(id)}>
                      <img src={downloadIcon} alt="download" />
                  </button>
                 
              </div>
      )
    })

    let videoContainer = searchedVideos.map((video)=>{
      const {image,id,video_files} = video
      return(
          <section>
              <div className="relative">
                  <Link to={`/video/${id}`}> <img src={image} alt={id} className="video-image cursor-pointer select-none" /></Link>
                  <button className="play-btn">
                      <img src={playIcon} alt="play-icon" className="bg-black rounded-md"/>
                  </button>
                  <button className="download-btn">
                      <img src={downloadIcon} alt="download-icon" onClick={()=>downloadVideo(id)}/>
                  </button>
              </div>
          </section>
      )
  })
    console.log(searchValue);
    let filterType = searchParams.get("type")

    let HomeInfo = filterType === "video" ? <GetHomeVideos /> :  <GetHomePhotos/>
  
     if(!searchValue && filterType === "video"){
        HomeInfo = <GetHomeVideos />
     }
     else if(!searchValue && filterType === "photo"){
        HomeInfo = <GetHomePhotos />
     }
     else if(searchValue && filterType === "photo"){
        HomeInfo = imageContainer
     }
     else if(searchValue && filterType === "video"){
      HomeInfo = videoContainer
    }


    function toggleSmFilter(){
      dispatch({type: "TOGGLE_SM_FILTER"})
    }

    return(
      <>
       <main className="mt-36  ">
           <section className="sm-filter-box-container" onClick={toggleSmFilter}>
              <img src={filterIcon} alt="filter-icon" className="w-6 mr-2 select-none cursor-pointer"/>
              <h2 className="filter-text">Filters</h2>
           </section>

           {state.showFilterSm ? <section >
                  <Link to="?type=photo" className="sm-links">Photos</Link>
                  <Link to="?type=video" className="sm-links">Videos</Link>
              </section>: null}
          </main>
        <div className='image-container'>
            {HomeInfo}
        </div>
      </>
    )
}