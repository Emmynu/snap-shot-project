import { createClient } from "pexels";
let API_KEY = "WOoM2JZpjLLERoU7VozswwS1EfF9c6zq14zzmlVikGB5Oii93KGWmtBJ"

export function getSearchedPhotos(photoContainer,containerFunction,value){
    const client = createClient(API_KEY);
    const query = value;
    client.photos.search({ query, per_page: 36 }).then(photos => {containerFunction(photos.photos)})
       .catch(err=>{console.log(err.message)});
  }

 export function getSearchedVideo(videoContainer,containerFunction, value){
    const client = createClient(API_KEY);
    const query = value;
    client.videos.search({ query, per_page: 36 }).then(videos =>{containerFunction(videos.videos)})
    .catch(err =>console.log(err.message) );
  }