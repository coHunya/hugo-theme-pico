window.addEventListener("DOMContentLoaded", () => {
  // Get the menu button and the navigation menu elements
  let menuBtn = document.getElementById("menuBtn");
  let navMenu = document.getElementById("navMenu");
  // Get the paths inside the svg element
  let paths = menuBtn.getElementsByTagName("path");

  // Add a click event listener to the menu button
  menuBtn.addEventListener("click", () => {
    // Toggle the hidden class of the navigation menu
    navMenu.classList.toggle("hidden");
    // Loop through the paths and toggle the scale-90 and opacity-0 classes
    for (let path of paths) {
      path.classList.toggle("scale-90");
      path.classList.toggle("opacity-0");
    }
  });
});