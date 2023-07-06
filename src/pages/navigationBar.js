import React from "react";
import { Link } from "react-router-dom"

export default function Nav(){
    return(
        <nav className=" mt-32  absolute -ml-6 -top-14 bg-slate-600 pt-3 pb-9 h-fit px-7 w-full  text-white md:hidden lg:hidden">
        <main className="my-3 font-medium border-b border-slate-50 py-5">
            <Link to="/">Home</Link><br></br>
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Images</Link><br></br>
            <Link to="/">Search Images</Link><br></br>
        </main>

        <main className="my-3 font-medium border-b border-slate-50 py-5">
            <Link to="/">Home</Link><br></br>
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Images</Link><br></br>
            <Link to="/">Search Images</Link><br></br>
        </main>

        <main className="my-3 font-medium border-b border-slate-50 py-5  ">
            <Link to="/">Home</Link><br></br>
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Images</Link><br></br>
            <Link to="/">Search Images</Link><br></br>
        </main>

        <main className="my-3 font-medium border-b border-slate-50 py-5  ">
            <Link to="/">Home</Link><br></br>
            <Link to="/">Popular Videos</Link><br></br>
            <Link to="/">Trending Images</Link><br></br>
            <Link to="/">Search Images</Link><br></br>
        </main>
    </nav>
    )
}