// Get the menu button and the navigation menu elements
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
// Get the paths inside the svg element
const paths = menuBtn.getElementsByTagName("path");

// Add a click event listener to the menu button
menuBtn.addEventListener("click", toggleNavMenu);

// Initial scroll position
let prevScrollPos = window.scrollY;
window.onscroll = handleScroll;

function toggleNavMenu() {
  // Toggle the hidden class of the navigation menu
  navMenu.classList.toggle("hidden");
  // Loop through the paths and toggle the scale-90 and opacity-0 classes
  for (let path of paths) {
    path.classList.toggle("scale-90");
    path.classList.toggle("opacity-0");
  }
}

function handleScroll() {
  const currentScrollPos = window.scrollY;
  if (!navMenu.classList.contains("hidden")) {
    toggleNavMenu();
  }
  if (prevScrollPos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-5rem";
  }
  
  prevScrollPos = currentScrollPos;
}