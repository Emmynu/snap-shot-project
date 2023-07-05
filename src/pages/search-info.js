const recentlySearchedItems = []
export default function searchInfo(value){
    recentlySearchedItems.push({searches:value})
    // console.log(recentlySearchedItems, trendingSearched);
    localStorage.setItem("recentlysearchedItems",JSON.stringify(recentlySearchedItems))
   
}
