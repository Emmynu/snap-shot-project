import React, { useEffect, useReducer, useState } from "react";
import { Link,useSearchParams, useOutletContext,NavLink } from 'react-router-dom';
import "../../css/home.css"
import "../../css/form.css"
import filterIcon from "../../images/filter-icon.png"
import { GetHomePhotos } from "./home-photos";
import GetHomeVideos from "./home-videos"
import playIcon from "../../images/play-icon.png"
import downloadIcon from "../../images/download.png"
import { downloadFile } from "./download";


//  the reducer function
function reducer(state, action){
  if(action.type === "TOGGLE_SM_FILTER"){
    state.showFilterSm  = !state.showFilterSm
    return{...state, showFilterSm: state.showFilterSm}
  }

  return state
}
// state for the reducer
const smFilters = {
  showFilterSm: false
}



export default function HomePage(){
    const [ searchParams, setSearchParams] = useSearchParams()
    const [state, dispatch] = useReducer(reducer, smFilters)
    const [currentUser, setCurrentUser] = useState("")

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginPassword, setLoginPassword] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    
    const [users, setUsers] = useState([])
    // passed from the parent Route as a context
    let { searchValue,searchedPhotos,searchedVideos } = useOutletContext()
    let filterType = searchParams.get("type")
    let videoLink;

    // useEffect

    // function for downloading each video
    function downloadVideo(id){
      // mapping over to check if the ids are equal before downloading...
      searchedVideos.map((video)=>{
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
   

  // function for downloading the image
  function downloadBtn(id){
    // checking if the ids match 
    searchedPhotos.find((item)=>{
        if(item.id === id){
            downloadFile(item.src.large2x,`${item.alt}+${item.id}`)
        }
    })
}

  // mapping over the fetched data(image) which was passed down using context as an object
    let imageContainer = <div className="image-container">{searchedPhotos.map((item)=>{
      const {id,url,src,photographer,photographer_url,avg_color,liked,alt} = item
      return(
               <div className="mt-4 md:mt-5 lg:mt-7 relative">
                 <Link to={`${id}`}> 
                    <img src={src.large2x} alt={id} className='image'/> 
                 </Link>
                  <img src={downloadIcon} alt="download" className="download-btn"  onClick={()=>downloadBtn(id)}/>
              </div>
      )
    })
}</div>
  // mapping over the fetched data(video) which was passed down using context as an object
    let videoContainer = <div className="image-container">
     { searchedVideos.map((video)=>{
      const {image,id,video_files} = video
      return(
          <section className="">
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
  })}
    </div>

    let HomeInfo = filterType === "video" ? <GetHomeVideos /> :  <GetHomePhotos/>
  
     if(!searchValue && filterType === "video"){
        HomeInfo = <GetHomeVideos />;
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
      <div className="relative">
       <main className="mt-32">
        {/* Filter for small devices with their links using to filter  */}
           <section className="sm-filter-box-container mt-12" onClick={toggleSmFilter}>
              <img src={filterIcon} alt="filter-icon" className="w-6 mr-2 select-none cursor-pointer"/>
              <h2 className="filter-text">Filters</h2>
           </section>

           {state.showFilterSm && <section >
                  <Link to="?type=photo" className="sm-links">Photos</Link>
                  <Link to="?type=video" className="sm-links">Videos</Link>
              </section>}
          </main>

          {/* Changing the label as users filters whether photo or video */}
           <h1 className="mt-8 ml-5 md:ml-5 lg:ml-6 lg:mt-6">
            <span className="header">{filterType !== null ? `Get Free ${filterType}s` : "Get Free Photos"}</span>
           </h1>
        <div >
            {HomeInfo}
        </div>
      </div>
    )
}
