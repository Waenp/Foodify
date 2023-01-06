// En funktion som sätter random bakgrundsfärg på #mainBody var gång sidan laddas.
$(document).ready(function(){
    let colors = [ "rgb(228, 163, 159)", "rgb(188, 217, 233)", "rgb(25, 230, 140)" ];
    let splicedColor = [];
    let randomNumber = Math.floor( Math.random() * colors.length );
    let randomColor = colors[ randomNumber ];

    splicedColor.length ? colors.push( splicedColor[ 0 ] ) : "NOP";
    splicedColor = colors.splice( randomNumber, 1 );

    $("#mainBody").attr('style', "backgound-color: blue !important", backgroundcolor = randomColor);
    $("#mainBody").attr('style', $("#mainBody").attr('style') + '; ' + 'background-color:' + randomColor + ' !important')
});


document.getElementById("myButton").onclick = function () {
    app.get('/login', function(req, res) {

        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
        })};
