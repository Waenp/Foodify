// för varje recept som hämtas:
    // recipeId ++ 1


let recipeId = 0
let cardId = ("id" + recipeId)

// för varje recept som hämtas:
    // skapa nytt kort
    // sätt kortets id == cardId

$(document).ready(function(){
    // Här lägger vi rättens namn, det som hämtas från APIt
    $(".card-title").text("ETT RECEPT!");
  });

$(".card").attr("id","cardID")
$(".card-text").text("text")



// En funktion som sätter random bakgrundsfärg på #mainBody var gång sidan laddas.
$(document).ready(function(){
    let colors = [ "rgb(228, 163, 159)", "rgb(188, 217, 233)", "rgb(74, 213, 128)" ];
    let splicedColor = [];
    let randomNumber = Math.floor( Math.random() * colors.length );
    let randomColor = colors[ randomNumber ];

    splicedColor.length ? colors.push( splicedColor[ 0 ] ) : "NOP";
    splicedColor = colors.splice( randomNumber, 1 );

    $("#mainBody").attr('style', "backgound-color: blue !important", backgroundcolor = randomColor);
    $("#mainBody").attr('style', $("#mainBody").attr('style') + '; ' + 'background-color:' + randomColor + ' !important')
});