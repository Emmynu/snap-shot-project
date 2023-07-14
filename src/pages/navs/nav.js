import React, { useReducer, useState } from "react";
import { Outlet,  useSearchParams, NavLink,Link } from "react-router-dom";
import "../../css/nav.css"
import arrowUpIcon  from "../../images/arrow-up.png"
import arrowDownIcon  from "../../images/arrow-down.png"
import searchIcon from "../../images/search-icon.png"
import darkModeIcon from "../../images/dark-mode-icon.png"
import lightModeIcon from "../../images/light-mode-icon.png"
import searchInfo from "../main/search-info";
import Nav from "./navigationBar";
import { getSearchedPhotos,getSearchedVideo } from "../main/get-searched-info";
let fromLocal = localStorage.getItem("id")


// reducer function
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
    if(action.type === "TOGGLE_NAV_SM"){
      state.showNavigations = !state.showNavigations
      return{...state, showNavigations:state.showNavigations}
    }
   throw new Error("No matching action")
}

// state for the reducer
const changetheme = {
    isDarkMode: false,
    showFilter: false,
    showSmInput: false,
    showRecentlySearchedItems:false,
    SearchedItemsFromLocalStorage: JSON.parse(localStorage.getItem("recentlysearchedItems")) || [],
    showNavigations:false,
}


export default function NavigationBar(){
    const [state,dispatch] = useReducer(reducer, changetheme)
    const [searchValue, setSearchValue] = useState("")
    const [searchParams, setSearchParams]= useSearchParams()
    const [searchedPhotos, setSearchedPhotos] = useState([])
    const [searchedVideos,setSearchedVideos] = useState([])
    let type = searchParams.get("type")
  
   
// function for toggling the theme of the website
    function changeTheme(){
        dispatch({type: "CHANGE_THEME"})
    }

// function for toggling filter for small screen sizes
    function toggleFilter(){
      dispatch({type: "TOGGLE_FILTER"})
    }
// function for toggling input for small screen sizes
    function toggleInput(){
      dispatch({type: "TOGGLE_INPUT"})
    }

    function toggleNav(){
      dispatch({type: "TOGGLE_NAV_SM"})
    }

    function handleSubmit(e){
      e.preventDefault()
      if(searchValue.length > 0){
        if(type === "video"){
          getSearchedVideo(searchedVideos, setSearchedVideos,searchValue)
        }
        else if(type === "photo"){
          getSearchedPhotos(searchedPhotos, setSearchedPhotos,searchValue);
        }
       searchInfo(searchValue)
      }
    }

// getting the theme from localstorage to apply the correct theme if true or false
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
                <Link  to="/" className="logo">Logo</Link>
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
                {/* <button className="upload-btn">Upload</button> */}
               {fromLocal === "" || fromLocal === null ? <Link to="/login" className="upload-btn">Upload</Link>: <Link to="/upload" className="upload-btn">Upload</Link>}
                <Link to="/signup" className="upload-btn">Sign In</Link>
              </section>

            <section className="nav-fourth-section ">
               <div>
                  <img src={searchIcon} alt="search-icon" className="w-6" onClick={toggleInput}/>
               </div>

               <div>
                <img src={state.isDarkMode ? lightModeIcon : darkModeIcon} alt="theme-icon" className="w-6" onClick={changeTheme}/>
               </div>

              {!state.showNavigations ?  <div className="bar-container transition-all -mt-1" onClick={toggleNav}>
                  <div className="bar-1"></div>
                  <div  className="bar-2"></div>
                  <div  className="bar-3"></div>
               </div> : <span onClick={toggleNav} className="text-2xl transition-all font-medium ml-0.5 mt-0 text-emerald-600">X</span>
                }
            </section>
              {state.showNavigations && <Nav />}
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
             <div className="links pb-1 -mt-1">
              <NavLink to="/collections" className="font-semibold text-medium underline">Collections</NavLink>
             </div>
          </div>
       </nav>
        <Outlet context={{ searchValue, searchedPhotos,searchedVideos }}/>
      </>
    )
}

