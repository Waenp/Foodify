$(document).ready(function () {
  let hash = window.location.hash;
  $.ajax({
    method: "POST",
    url: "http://localhost:5007/authorize",
    data: hash,
  }).done(function (result) {});
});
