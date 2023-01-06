var client_id = 'c59f0ec6770b43b0b68255262d239124';
var redirect_uri = 'http://127.0.0.1:5500/views/create-playlist/step-1.html';

var state = generateRandomString(16);

localStorage.setItem(stateKey, state);
var scope = 'user-read-private playlist-modify-public playlist-modify-private';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);