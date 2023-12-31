import { createClient } from 'pexels';
import { Link } from "react-router-dom"
import downloadIcon from "../../images/download.png"
import { useState } from 'react';
import { downloadFile } from './download';
import ErrorHandler from '../loading&error/error';
import LoadingData from '../loading&error/loading';
import "../../index.css"

export function GetHomePhotos(){
    const [homePhotos, setHomePhotos] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[isError, setIsError] = useState(false)
    
    // fetching the data using channing
    const client = createClient('WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ');// api key
    client.photos.curated({ per_page: 36 }).then(photos => {
        setHomePhotos(photos.photos)
        setIsLoading(false)
        setIsError(false)
    }) // fetching the data
    .catch(err => {
        setIsLoading(false)
        setIsError(true)
    }); // catching errors


    // function for downloading each image if their ids are a match by mapping over to check
    function downloadBtn(id){
        homePhotos.find((item)=>{
            if(item.id === id){
                downloadFile(item.src.large2x,`${item.alt}+${item.id}`)
            }
        })
    }

    //  Mapping over the array to display the fetched data

   let photo =  homePhotos.map((picture)=>{
        const {id,url,src,photographer,photographer_url,avg_color,liked,alt} = picture
        return(
                 <div className="mt-4 md:mt-5 lg:mt-7 relative">
                   <Link to={`${id}`}> <img src={src.large2x} alt={id} className='image'/></Link>
                    <button className="download-btn" onClick={()=>downloadBtn(id)}>
                        <img src={downloadIcon} alt="download" />
                    </button>
                   
                </div>
        )
    })

    // checking loading state
    if(isLoading){
        return(
           <LoadingData/>
        )
    }

    // checking error state
    if(isError){
        return(
            <>
                <ErrorHandler/>
            </>
        ) 
    }
    // displaying the data if successfully fetched
    return(
       <div className='image-container'>{photo}</div>
    )
}