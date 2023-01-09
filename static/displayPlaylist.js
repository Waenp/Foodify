$( document ).ready(function linkPlaylist(){

  const url = "http://localhost:5007/playlist";

  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

  .then((response) =>{
    return response.json();
  })

  .then((data) => {
    let playlist = data;
    let recipeObj = localStorage.getItem("recipeObj");
    let recipe = JSON.parse(recipeObj);
    $('#playlistDish').text(recipe.title);
    let description = recipe.summary.split(".")
    $('#playlistDesc').text(description[0]);
    $('#playlistMood').text(playlist.mood);
    $('#playlistCuisine').text(playlist.cuisine);
    $('#playlistTempo').text(playlist.tempo);
    $('#playlistImage').attr("src", playlist.images[0].url)
    $("#spotifyButton").attr("href","https://open.spotify.com/playlist/" + playlist.id)

  })

  .catch(function(){

  })
})