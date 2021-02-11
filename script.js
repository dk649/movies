window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=00a7fa5f1683c9a2219bedb30bcc6581&page=1'
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=00a7fa5f1683c9a2219bedb30bcc6581&query="'
    const MOVIE_DETAILS = 'https://www.themoviedb.org/movie/'

    const form = document.getElementById('form')
    const search = document.getElementById('search')
    const main = document.getElementById('main')
    getMovies(API_URL); 

    async function getMovies(url) {

        const response = await fetch(url)
        const data = await response.json()

        console.log(data.results)

        showMovies(data.results);
    }

    function showMovies(movies) {

        main.innerHTML = "";
        movies.forEach((movie) => {
                const {title, poster_path, vote_average, overview} = movie

                const movieEl = document.createElement('div')
                movieEl.classList.add('movie');
                movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}"alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>`

                

            main.appendChild(movieEl);

            movieEl.addEventListener('click', () =>{
                //  console.log(movie.id);
                window.open(MOVIE_DETAILS + movie.id); 
               
            })


        });

            function getClassByRate (vote) {

                if (vote >= 8) {
                    return 'green';

                } else if (vote >= 5) {

                    return 'orange';


                } else {

                    return 'red';
                }
            }

    }

    form.addEventListener('submit', (event) =>{

        event.preventDefault()

        const searchTerm = search.value

        if(searchTerm && searchTerm != '') {
                getMovies(SEARCH_API + searchTerm)

                search.value = ''
        } else {
            window.location.reload();
        }
    });


    



});
