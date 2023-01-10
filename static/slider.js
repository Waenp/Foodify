// Function that sets localstorage based from the value of a slider, removes old values before it sets it again
$("#tempoSliderLg").on("change", function () {
  let val = $(this).val(); // Sets the value of the slider
  localStorage.removeItem("tempo"); // Removes old values
  localStorage.setItem("tempo", val); // Saves new value to localstorage
});

// Function that sets localstorage based from the value of a slider, removes old values before it sets it again
$("#tempoSliderSm").on("change", function () {
  let val = $(this).val();
  localStorage.removeItem("tempo");
  localStorage.setItem("tempo", val);
});

// Function that sets localstorage based from the value of a slider, removes old values before it sets it again
$("#moodSliderLg").on("change", function () {
  let val = $(this).val();
  localStorage.removeItem("mood");
  localStorage.setItem("mood", val);
});

// Function that sets localstorage based from the value of a slider, removes old values before it sets it again
$("#moodSliderSm").on("change", function () {
  let val = $(this).val();
  localStorage.removeItem("mood");
  localStorage.setItem("mood", val);
});
