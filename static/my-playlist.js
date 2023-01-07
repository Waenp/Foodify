
function responsive() {
  if (window.innerWidth <= 1200) {
    // När skärmen är mindre än X px
    $('#large').addClass( "visually-hidden" );
    $('#small').removeClass( "visually-hidden" );
  } else {
    // När skärmen är större än X px
    $('#large').removeClass( "visually-hidden" );
    $('#small').addClass( "visually-hidden" );
  };

    if (window.innerWidth <= 1200) {
      // När skärmen är mindre än X px
      $('#large').addClass( "visually-hidden" );
      $('#small').removeClass( "visually-hidden" );
    } else {
      // När skärmen är större än X px
      $('#large').removeClass( "visually-hidden" );
      $('#small').addClass( "visually-hidden" );
    };
  };

function zoomSquare() {
  var $square = $('.square');

  var viewportHeight = $(window).height();
  var squareHeight = $square.height();
  var desiredHeight = Math.round(viewportHeight * 0.6);
  var zoom = (desiredHeight / squareHeight);

  $square.css('zoom', zoom);
  $square.css('-moz-transform', 'scale(' + zoom + ')');
  $square.css(  '-o-transform', 'scale(' + zoom + ')');

};

// When the browser is resized
$(window).on('resize', function(){ zoomSquare();responsive() });

// When the page first loads
$(document).ready(function(){
  zoomSquare();responsive();
});

