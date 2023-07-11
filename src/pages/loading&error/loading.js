import React from "react"
import loadingIcon from  "../../images/loading.png"


export default function LoadingData(){
    return(
    <div className="mt-32">
        <img src={loadingIcon} alt='loading-icon'  className='loading select-none cursor-pointer'/>
    </div>
    )
}