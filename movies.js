const movieslist = document.getElementById('movielist');
const input = document.getElementById('inp');
const button = document.getElementById('btn');

button.addEventListener('click',function()
{
    const searchText = input.value;
    searchMovie(searchText)
})

function searchMovie(searchText){
    const apiKey = "ee61237c"
    const apiurl = `https://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`
    fetch(apiurl)
    .then(function(res){return res.json()})
    .then(function(data){
        console.log(data)
        displayMovies(data)
    })
    .catch(function(err)
    {
        console.error(err)
    })
}

function displayMovies(data){
    movieslist.innerHTML = ''
    if (data.Response === 'True')
    {
        data.Search.forEach(function (movie)
        {
            const movieCard = document.createElement('div')
            movieCard.classList.add('movieCard')
            movieCard.innerHTML = `
            <img src = ${movie.Poster} alt = ${movie.Title}/>
            <h2>${movie.Title}</h2>
            <p>Release Year: ${movie.Year}</p>
            <a href="https://www.google.com/search?q=imdb+${movie.Title}/" target = "_blank">
            <button>For Details</button>
            </a>
            `
            movieslist.appendChild(movieCard)
        });
    }
    else
    {
        movieslist.innerHTML = `<strong>No Movies Found. Search Again</strong>`
    }
}