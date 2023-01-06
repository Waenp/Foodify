function postRecipe() {
    return function() {
      
      let input = $('#searchQuery input[name=searchInput]').val();
      console.log(input)
      
      $.ajax({
        method: "POST",
        url: 'http://unicorns.idioti.se',
        data: JSON.stringify(data),
        headers: {"Accept": "application/json"}
      })
      .done(function(result) {
      });
    }
  }

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

    $('#postRecipe').click(postRecipe());
});
