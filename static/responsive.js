
function responsiveLg() {
  var $square = $('._square-lg');
  var viewportHeight = $(window).height();
  var squareHeight = $square.height();
  var desiredHeight = Math.round(viewportHeight * 0.6);
  var zoom = (desiredHeight / squareHeight);

  $square.css('zoom', zoom);
  $square.css('-moz-transform', 'scale(' + zoom + ')');
  $square.css(  '-o-transform', 'scale(' + zoom + ')');

};

function responsiveSm() {
  var $square = $('._square-sm');
  var viewportWidth = $(window).width();
  var squareWidth = $square.width();
  var desiredWidth = Math.round(viewportWidth * 0.9);
  var zoom = (desiredWidth / squareWidth);

  $square.css('zoom', zoom);
  $square.css('-moz-transform', 'scale(' + zoom + ')');
  $square.css(  '-o-transform', 'scale(' + zoom + ')');
};

// When the browser is resized
$(window).on('resize', function(){
if (window.innerWidth <= 1200) {
  responsiveSm();
  $("#large").addClass("visually-hidden");
  $("#small").removeClass("visually-hidden");
} else {
  responsiveLg();
  $("#large").removeClass("visually-hidden");
  $("#small").addClass("visually-hidden");
}});

// When the page first loads
$(document).ready(function(){
if (window.innerWidth <= 1200) {
  responsiveSm();
  $("#large").addClass("visually-hidden");
  $("#small").removeClass("visually-hidden");
} else {
  responsiveLg();
  $("#large").removeClass("visually-hidden");
  $("#small").addClass("visually-hidden");
}});

