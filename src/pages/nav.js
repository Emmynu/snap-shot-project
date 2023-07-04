import React, { useReducer, useState } from "react";
import { Outlet,  useSearchParams, NavLink,Link } from "react-router-dom";
import "../css/nav.css"
import arrowUpIcon  from "../images/arrow-up.png"
import arrowDownIcon  from "../images/arrow-down.png"
import searchIcon from "../images/search-icon.png"
import darkModeIcon from "../images/dark-mode-icon.png"
import lightModeIcon from "../images/light-mode-icon.png"
import { createClient } from "pexels";
import ErrorHandler from "./error";


function reducer(state, action){
    if(action.type === "CHANGE_THEME"){
        state.isDarkMode = !state.isDarkMode
        if(state.isDarkMode){
          document.documentElement.classList.add("dark")
          localStorage.setItem("theme",JSON.stringify(state.isDarkMode))
        }
        else{
          document.documentElement.classList.remove("dark")
          localStorage.setItem("theme",JSON.stringify(state.isDarkMode))
        }
        return {...state, isDarkMode: state.isDarkMode}
    }
    if(action.type === "TOGGLE_FILTER"){
      state.showFilter  = !state.showFilter
      return{...state, showFilter: state.showFilter}
    }
    if(action.type === "TOGGLE_INPUT"){
      state.showSmInput  = !state.showSmInput
      return{...state, showSmInput: state.showSmInput}
    }

    return state
}



const changetheme = {
    isDarkMode: false,
    showFilter: false,
    showSmInput: false,
    
}


export default function NavigationBar(){
    const [state,dispatch] = useReducer(reducer, changetheme)
    const [searchValue, setSearchValue] = useState("")
    const [searchParams, setSearchParams]= useSearchParams()
    const [searchedPhotos, setSearchedPhotos] = useState([])
    const [searchedVideos,setSearchedVideos] = useState([])
    let type = searchParams.get("type")
    

    function getSearchedPhotos(){
      const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
      const query = searchValue;
      console.log(query);
      client.photos.search({ query, per_page: 36 }).then(photos => setSearchedPhotos(photos.photos)).catch(err=>{
        <ErrorHandler />
      });
     setSearchValue("")
    }

   function getSearchedVideo(){
    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
    const query = searchValue;
    client.videos.search({ query, per_page: 36 }).then(videos => setSearchedVideos(videos.videos))
    .catch(err => <ErrorHandler />);
    setSearchValue("")

    }

   
// function for toggling the theme of the website

    function changeTheme(){
        dispatch({type: "CHANGE_THEME"})
    }

    function toggleFilter(){
      dispatch({type: "TOGGLE_FILTER"})
    }

    function toggleInput(){
      dispatch({type: "TOGGLE_INPUT"})
    }

    function handleSubmit(e){
      e.preventDefault()
      if(searchValue.length > 0){
        if(type === "video"){
          getSearchedVideo()
        }
        else if(type === "photo"){
          getSearchedPhotos()
        }
        else if(type === null){
          getSearchedPhotos()
        }
      }
      else{
        console.log("Provide a value")
      }
    }


    let getTheme =  JSON.parse(localStorage.getItem("theme"))
    if(getTheme){
        document.documentElement.classList.add("dark")
      }
      else{
        document.documentElement.classList.remove("dark")
      }
    return(
      <>
       
       <nav className="nav ">
          <nav className="navigation-container ">
              <section>
                <h1 className="logo">Logo</h1>
              </section>

              <section className="nav-second-container relative">

                <div className="nav-second-container-sub">
                  <div className="segment-1">
                    <h1 className="type">{type || "Photos"}</h1>
                    <img src={state.showFilter ? arrowUpIcon : arrowDownIcon}  onClick={toggleFilter} className="cursor-pointer"/>
                  </div>

                  <form className="w-full" onSubmit={handleSubmit}>
                    <input type="text" placeholder={`search for ${type || "Photos"}`} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>
                  </form>

                  <button className="search" >
                    <img src={searchIcon} alt="search-icon" className="w-6"/>
                  </button>
                </div>
               
              </section>
              {/*  */}

              <section className="nav-third-section">
              <div>
                <img src={state.isDarkMode ? lightModeIcon : darkModeIcon} alt="theme-icon" className="w-7" onClick={changeTheme}/>
               </div>
                <button className="upload-btn">Upload</button>
                <button className="upload-btn">Sign In</button>
              </section>

              <section className="nav-fourth-section ">
               <div>
                  <img src={searchIcon} alt="search-icon" className="w-6" onClick={toggleInput}/>
               </div>

               <div>
                <img src={state.isDarkMode ? lightModeIcon : darkModeIcon} alt="theme-icon" className="w-6" onClick={changeTheme}/>
               </div>

               <div className="bar-container -mt-1">
                 <div className="bar-1"></div>
                 <div  className="bar-2"></div>
                 <div  className="bar-3"></div>
               </div>
              </section>
              
            </nav>

            <form className="flex justify-center" onSubmit={handleSubmit}>
                <input type="text" className={` ${state.showSmInput ? "sm-input" : "hidden"}`} placeholder={`search for ${type || "photos"}`} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>
            </form>

          <div className={`${state.showFilter ? "filter-box-container": "hidden"}`}>
             <div className="links">
                <NavLink to="?type=photo">Photos</NavLink>
             </div>
             <div className="links pb-1">
                <NavLink to="?type=video">Videos</NavLink>
             </div>
          </div>
       </nav>
        
        <Outlet context={{ searchValue, searchedPhotos,searchedVideos }}/>
      </>
    )
}
