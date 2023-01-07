
function yourFunction() {
  const main = document.getElementById("playlistBody");

  if (window.innerWidth <= 1200) {
    // När skärmen är mindre än X px
    main.innerHTML = `
      <nav id="navbar" class="container-fluid container-xl d-flex align-items-center p-3">
        <div class="me-auto">
          <a id="home" class="text-black" href="/views/index.html">
            <img src="/static/images/speakers-icon-spotify.png" alt="Logo" width="44" height="64" class="d-inline-block mb-1 me-1"></a>
        </div>

        <div class="d-flex flex-column text-end">
          <a id="about" class="text-black" href="/views/about.html">About</a>
          <a id="popularRecipes" class="text-black" href="/views/recipes/popular.html">Popular recipes</a>
        </div>
      </nav>

      <div id="playlistContainerSmall" class="container text-black p-4 p-sm-5">
        <div class="row row-cols-1 row-cols-xl-2 justify-content-center">

          <div class="col text-center text-xl-start px-0">
            <h2 id="playlistHeader" class="display-3 pb-3">Here's your playlist!</h2>
            <h4 id="playlistLabel" class="pb-5">Open your playlist in the Spotify app or play it from the recipe page. Enjoy!</h4>
          </div>

          <div id="playlistCard" class="col ps-0">
            <div id="cardContent" class="position-absolute">
              <div class="p-3">
                <h3 class="fs-1">Spaghetti Carbonara</h3>
                <h5 class="fs-5" class="w-50">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire.</h5>
                <h4 class="playlistMood">Romantic</h4>
                <h4 class="playlistMood">Relaxed</h4>
                <h4 class="playlistMood"></h4>
              </div>
            </div>
          </div>

          <div class="col text-center">
            <div class="d-inline-flex flex-column flex-md-row py-5">
              <a href="step-3.html" type="submit" id="spotifyButton" class="btn d-flex justify-content-center align-items-center mb-2 me-md-3">OPEN SPOTIFY</a>
              <a href="step-3.html" type="submit" id="recipeButton" class="btn d-flex justify-content-center align-items-center">RECIPE</a>
            </div>
          </div>

        </div>
      </div>`;

  } else {
    // När skärmen är större än X px
    main.innerHTML = `
      <nav id="navbar" class="container-fluid container-xl d-flex align-items-center p-3">
        <div class="me-auto">
          <a id="home" class="text-black" href="/views/index.html">
            <img src="/static/images/speakers-icon-spotify.png" alt="Logo" width="24" height="36" class="d-inline-block mb-1 me-1">Foodify
          </a>
        </div>
        <div>
          <a id="about" class="text-black" href="/views/about.html">About</a>
        </div>
        <div class="ps-4">
          <a id="popularRecipes" class="text-black" href="/views/recipes/popular.html">Popular recipes</a>
        </div>
      </nav>

      <div id="playlistContainerLarge" class="container vh-100 position-absolute start-50 top-50 translate-middle d-flex align-items-center">
        <div class="container text-black p-4">
          <div class="row row-cols-2">

            <div class="col-5">
              <div id="playlistCard">
              <div id="cardContent" class="position-absolute p-3 d-flex flex-column align-items-start pt-5">
              <div id="playlistPadding"></div>

                  <h3 id="playlistDish">Spaghetti Carbonara</h3>
                  <h5 id="playlistDesc" class="w-50">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire.</h5>
                  <div class="mt-auto pb-3">
                    <h4 class="playlistMood">Romantic</h4>
                    <h4 class="playlistMood">Relaxed</h4>
                    <h4 class="playlistMood">Italian</h4>
                  </div>

                </div>
              </div>
            </div>

            <div class="col-7 ps-3 d-flex align-items-center">
              <div class="d-flex flex-column align-items-start">
                <h2 id="playlistHeader" class="display-2">Here's your playlist!</h2>
                <h4 id="playlistLabelLarge" class="pb-3">Open your playlist in the Spotify app or play it from the recipe page. Enjoy!</h4>
                <div class="d-inline-flex flex-xl-row justify-content-center pb-5">
                  <a href="step-3.html" type="submit" id="spotifyButton" class="btn d-flex justify-content-center align-items-center me-2">OPEN SPOTIFY</a>
                  <a href="step-3.html" type="submit" id="recipeButton" class="btn d-flex justify-content-center align-items-center">RECIPE</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>`;
  }
}

window.onload = yourFunction;
window.onresize = yourFunction;
