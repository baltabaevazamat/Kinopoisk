const API_KEY = 'd1be829f-6d98-42b1-903a-fc126355e54d'

const API_URL_POPULAR =  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const API_URL_TOP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1'

let portal = ''
const topFilm = document.querySelector('.top')
const getTop = () => {
    topFilm.addEventListener('click',()=>{
        getMovies(API_URL_TOP)
    })
}
getTop()


const getMovies = async(url) =>{
    const request = await fetch(url,{
        headers: {
            "Content-Type":"application/json",
            'X-API-KEY':API_KEY
        }
    })
  
    const response = await request.json()
    renderMovies(response.films)
}
getMovies(API_URL_POPULAR)


const getMoviesById = async(id) =>{
    const request = await fetch(API_URL_DETAILS+id,{
        headers: {
            "Content-Type":"application/json",
            'X-API-KEY':API_KEY
        }
    })
  
    const response = await request.json()
    renderDetails(response)
}

const renderDetails = (details) =>{
    output.innerHTML=''
    const img = document.createElement('img')
    img.src = details.posterUrl
    const description = document.createElement('h1')
    description.textContent=details.description
    const button = document.createElement('button')
    button.textContent='GO Back'
    button.className="back"
    button.addEventListener('click',()=>{
        if(portal){
            getMovies(API_URL_SEARCH+portal)
        }else{
            getMovies(API_URL_POPULAR)
           
        }
        // text.addEventListener('keyup',(e)=>{
        //     if(e.key==='Enter'){
        //         search()
        //     }
        // })
    })



    output.append(img,description,button)
}





const output = document.querySelector('.output')
const renderMovies = (data) =>{
    console.log(data);
    output.innerHTML=''
    if(data.length>0){
    
        data.map(el=>{

            const ball = document.createElement('span')
            ball.className='ball'
            ball.textContent= el.rating
            const img = document.createElement('img')
            const card = document.createElement('div')
            card.className='card'
            const title = document.createElement('p')
            title.textContent=el.nameRu
            const genres = document.createElement('p')
            genres.textContent=el.genres.map(el=>{
                return ' ' + ` ${el.genre}`
            })
    
             img.addEventListener('click',()=>{
                getMoviesById(el.filmId)
                
             })
             

            
            img.src = el.posterUrl
    
            card.append(ball,img,title,genres)
            output.append(card)
        })
    }else{
        output.textContent='Таких фильмов в базе нету'
    }
    
   
}

const input = document.querySelector('input')
const search = document.querySelector('.search')

const searchMovies = () =>{

    search.addEventListener('click',()=>{
        if(input.value && input.value.trim()){
            getMovies(API_URL_SEARCH+input.value)
            portal=input.value
            console.log(portal)
              
        }else{
            getMovies(API_URL_POPULAR)
            portal=''
        }
      
    })
}
searchMovies()

const enterMovies = () =>{


    input.addEventListener('keyup',(e)=>{
        if(e.key==='Enter'){
        if(input.value && input.value.trim()){
            getMovies(API_URL_SEARCH+input.value)
            portal=input.value
            console.log(portal)
              
        }else{
            getMovies(API_URL_POPULAR)
            portal=''
        }
    }
      
    })
}

enterMovies()