import React from "react";
import  ErrrorImage from "../../images/error.gif"
import { Link } from "react-router-dom";

export default function PageNotFound(){
    return(
        <main>
            <div className="flex justify-center">
                <img src={ErrrorImage} alt="page-not-found-image" />
            </div>
            <div className="text-center font-bold -mt-4">
                <h2 className="text-lg">Sorry! Page Not Found</h2>
                <Link to=".." className="mt-2 text-base">Go back home</Link>
            </div>
        </main>
    )
}