import React, { useReducer, useState } from "react";
import { Outlet,  useSearchParams, NavLink,Link, json } from "react-router-dom";
import "../css/nav.css"
import arrowUpIcon  from "../images/arrow-up.png"
import arrowDownIcon  from "../images/arrow-down.png"
import searchIcon from "../images/search-icon.png"
import darkModeIcon from "../images/dark-mode-icon.png"
import lightModeIcon from "../images/light-mode-icon.png"
import { createClient } from "pexels";
import ErrorHandler from "./error";
import searchInfo from "./search-info";



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
      state.showRecentlySearchedItems = !state.showRecentlySearchedItems
      return{...state, showSmInput: state.showSmInput,showRecentlySearchedItems:state.showRecentlySearchedItems}
    }
    if(action.type=== "SHOW_SEARCH_CONTENT"){
      state.showRecentlySearchedItems = !state.showRecentlySearchedItems
      return {...state,showRecentlySearchedItems:state.showRecentlySearchedItems}
    }
    // if(action.type === "DELETE_SEARCH"){
    //   state.SearchedItemsFromLocalStorage= state.SearchedItemsFromLocalStorage.filter((item)=>item.id !== action.payload)
    //   return{...state, SearchedItemsFromLocalStorage:state.SearchedItemsFromLocalStorage}  
    // }

    return state
}



const changetheme = {
    isDarkMode: false,
    showFilter: false,
    showSmInput: false,
    showRecentlySearchedItems:false,
    SearchedItemsFromLocalStorage: JSON.parse(localStorage.getItem("recentlysearchedItems")) || []

}


export default function NavigationBar(){
    const [state,dispatch] = useReducer(reducer, changetheme)
    const [searchValue, setSearchValue] = useState("")
    const [searchParams, setSearchParams]= useSearchParams()
    const [searchedPhotos, setSearchedPhotos] = useState([])
    const [searchedVideos,setSearchedVideos] = useState([])
    const [isError, setIsError] = useState(false)
    let type = searchParams.get("type")
    
     let searches = <div className="recent-searches">
            <span className="parent-searches">
              <h2  className="search-text">Recent searches</h2>
              <h2  className=" text-sm search-text">clear all</h2>
            </span>

          {state.SearchedItemsFromLocalStorage.map((search)=>{
            console.log(search);
          return (
            <div className="parent-searches border-b border-slate-400 ml-3 mr-2">
              <h2 className="mt-3  pb-2">{search.searches}</h2>
              <button className="search-text" >x</button>
          </div>)})}
        </div>

   function getSearchedPhotos(){
      const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
      const query = searchValue;
      client.photos.search({ query, per_page: 36 }).then(photos => {setSearchedPhotos(photos.photos); setIsError(false)}).catch(err=>{
        setIsError(true)
      });
    }

   function getSearchedVideo(){
    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');
    const query = searchValue;
    client.videos.search({ query, per_page: 36 }).then(videos =>{ setSearchedVideos(videos.videos);setIsError(false)})
    .catch(err => setIsError(true));
  }
  function showSearchInfos(){
   dispatch({type: "SHOW_SEARCH_CONTENT"})
  }
    if(isError){
      return(
        <div>
           <ErrorHandler />
           <Link to="/" >Back to Home</Link>
        </div>
      )
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
          getSearchedPhotos();
        }
       searchInfo(searchValue)
       state.showRecentlySearchedItems = false
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
                    <input type="text" placeholder={`search for ${type || "Photos"}`} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} onClick={showSearchInfos}/>
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
                <input type="text" className={` ${state.showSmInput ? "sm-input" : "hidden"}`} placeholder={`search for ${type || "photos"}`} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} onClick={showSearchInfos}/>
            </form>

          <div className={`${state.showFilter ? "filter-box-container": "hidden"}`}>
             <div className="links">
                <NavLink to="?type=photo">Photos</NavLink>
             </div>
             <div className="links pb-1">
                <NavLink to="?type=video">Videos</NavLink>
             </div>
          </div>
          <div>
            {state.showRecentlySearchedItems ? searches: null}
        </div>
       </nav>
        <Outlet context={{ searchValue, searchedPhotos,searchedVideos }}/>
      </>
    )
}
