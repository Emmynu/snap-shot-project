export function downloadFile(url,imageName){
    fetch(url).then(resp=>resp.blob()).then(file =>{
        let convertUrl = URL.createObjectURL(file)
        let a = document.createElement("a")
        a.href = convertUrl
        a.download = imageName
        document.body.appendChild(a)
        a.click()
        a.remove()
    })
}