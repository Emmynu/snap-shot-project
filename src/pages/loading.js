import React from "react"
import loadingIcon from "../images/loading.png"


export default function LoadingData(){
    return(
    <div>
        <img src={loadingIcon} alt='loading-icon'  className='loading'/>
    </div>
    )
}