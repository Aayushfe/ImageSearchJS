const accessKey = "M8mNO52M3yLXAF2DBZuZ_yIGZTRNgDpHHM4xkQMRQCQ";

const formElem = document.querySelector('form')
const inputElem = document.getElementById('search-input')
const searchResults = document.querySelector('.search-results')
const shoMorBtn = document.getElementById('show-more-button') 

let inpData =""
let page = 1

async function searchImg(){

    const url =  `https://api.unsplash.com/search/photos?page=${page}&query=${inputElem.value}&client_id=${accessKey}`
    let res = await fetch(url)
    let data = await res.json()
    let results = data.results
    if(page===1){
        searchResults.innerHTML=""
    }

    results.map((result)=>{
        const imgWrap = document.createElement('div')
        imgWrap.classList.add('search-result')
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imgLink = document.createElement('a')
        imgLink.href = result.links.html
        imgLink.target = "_blank"
        imgLink.textContent = result.alt_description

        imgWrap.appendChild(image)
        imgWrap.appendChild(imgLink)
        searchResults.appendChild(imgWrap)
    })

    page++
    if(page>1){
        shoMorBtn.style.display = "block"
    }
}

formElem.addEventListener('submit',(e)=>{
    e.preventDefault();
    page=1;
    searchImg   ()
})
shoMorBtn.addEventListener('click',(e)=>{
    searchImg()    
})