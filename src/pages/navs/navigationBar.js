import React from "react";
import { Link } from "react-router-dom"
import gitHubIcon from "../../images/github-icon.png"
import instagramIcon from "../../images/instagram-icon.png"
import linkedinIcon from "../../images/linkedin-icon.png"

export default function Nav(){
    let showForm =  JSON.parse(localStorage.getItem("show-form"))

    function toggleForm(){
       showForm = !showForm
    //    localStorage.setItem("show-form",JSON.stringify(showForm))
    localStorage.setItem("show-form", JSON.stringify(showForm))
    }

    return(
        <nav className="sm-nav-bar">

        <main className="sm-nav-section">
            <Link to="/">Home</Link><br></br>
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Images</Link><br></br>        
        </main>

        <main className="sm-nav-section">
            <Link to="/">Your Profile</Link><br></br>
            <Link to="/">Collections</Link><br></br>
            <Link to="/">Uploaded Images</Link><br></br>
        </main>

        <main className="sm-nav-section">
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Searches</Link><br></br>
            <Link to="/">Search for Images</Link><br></br>
        </main>

        <main className=" px-2 border-b border-slate-50 py-4 mb-3">
        <button  className="sm-nav-button" onClick={toggleForm}>Sign In</button>
        <Link to="upload" className="sm-nav-button">Upload </Link>
        </main>

        <main className="font-medium text-sm  py-6 pl-3 flex justify-center items-center">
            <Link to="https://github.com/Emmynu">
                <img src={gitHubIcon} alt="github-icon" className="w-8 bg-slate-50 rounded-sm"/>
            </Link>
            <Link to="/">
                <img src={instagramIcon} alt="instagram-icon" className="w-8 bg-slate-50 rounded-sm ml-2" />
            </Link>
            <Link to="/">
                <img src={linkedinIcon} alt="linkedin-icon"  className="w-8 bg-slate-50 rounded-sm ml-2"/>
            </Link>        
        </main>
    </nav>
    )
}