var countdownInterval; // Declare this variable globally to manage it inside different functions

function checkToggleStatusAndUpdateUI() {
  var toggleCheckbox = document.querySelector(".toggle-checkbox");
  var animationGif = document.getElementById("animationGif");
  var animationStatic = document.getElementById("animationStatic");
  var textDisplay = document.getElementById("textid"); // Text display element

  if (toggleCheckbox && toggleCheckbox.checked) {
    animationGif.style.display = "block"; // Show the GIF animation
    animationStatic.style.display = "none"; // Hide the static image
    if (countdownInterval === undefined) {
      // Start the countdown only if it's not already running
      textDisplay.textContent = "Break ends in 00:05"; // Initial countdown text
      startCountdown();
    }
  } else {
    animationGif.style.display = "none"; // Hide the GIF animation
    animationStatic.style.display = "block"; // Show the static image
    textDisplay.textContent = "Take a break"; // Display break message
    stopCountdown(); // Stop the countdown and clear the interval
  }
}

function startCountdown() {
  var countdown = 5; // 5 seconds countdown
  countdownInterval = setInterval(function () {
    countdown -= 1;
    document.getElementById("textid").textContent =
      "Break ends in 00:0" + countdown;
    if (countdown <= 0) {
      document.getElementById("textid").textContent = "Take a break"; // Update text before toggling off
      document.querySelector(".toggle-checkbox").checked = false; // Automatically toggle off
      checkToggleStatusAndUpdateUI(); // Update UI to reflect changes
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval); // Clear the countdown interval
  countdownInterval = undefined; // Reset the interval variable
}

function waitForElement(selector, callback) {
  var intervalId = setInterval(function () {
    var element = document.querySelector(selector);
    if (element) {
      clearInterval(intervalId);
      callback();
    }
  }, 100); // Check every 100 milliseconds
}

waitForElement(".toggle-checkbox", function () {
  document
    .querySelector(".toggle-checkbox")
    .addEventListener("change", checkToggleStatusAndUpdateUI);
  checkToggleStatusAndUpdateUI(); // Ensures the UI is correct on initial load
});
