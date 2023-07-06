const recentlySearchedItems = []
export default function searchInfo(value){
    recentlySearchedItems.push({id:new Date().getTime().toString(), searches:value})
    localStorage.setItem("recentlysearchedItems",JSON.stringify(recentlySearchedItems))
   
}
