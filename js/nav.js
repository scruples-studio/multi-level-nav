// Add .js class to html tag to confirm JavaScript is enabled
var html = document.documentElement;
html.className += ' js';

// Add a one second delay to submenu display for mouse users.
const hasSubmenu = document.querySelectorAll(
  "li.mainNav-menuItem--hasSubmenu"
);
var timerSubmenu;
Array.prototype.forEach.call(hasSubmenu, function (el, i) {
  // Add .focus class on mouseover
  el.addEventListener("mouseover", function (event) {
    document
      .querySelector("li.mainNav-menuItem--hasSubmenu")
      .classList.add("focus");
    clearTimeout(timerSubmenu);
  });
  // Set the delay on mouseout and remove the .focus class
  el.addEventListener("mouseout", function (event) {
    timerSubmenu = setTimeout(function (event) {
      document.querySelector(".focus").classList.remove("focus");
    }, 1000);
  });
});

// Set up the parent link as the submenu toggle
var submenuItems = document.querySelectorAll(
  "li.mainNav-menuItem--hasSubmenu"
);
Array.prototype.forEach.call(submenuItems, function (el, i) {
  el.querySelector("a").addEventListener("click", function (event) {
    if (this.parentNode.className == "mainNav-menuItem--hasSubmenu") {
      this.parentNode.className = "mainNav-menuItem--hasSubmenu open";
      this.setAttribute("aria-expanded", "true");
    } else {
      this.parentNode.className = "mainNav-menuItem--hasSubmenu";
      this.setAttribute("aria-expanded", "false");
    }
    event.preventDefault();
    return false;
  });
});

// Operate the nav using focus and blur – i.e. tabbing via keyboard
// Get links with the submenu and sub-submenu classes
const submenuLinks = document.querySelectorAll(
  ".mainNav-menuItemLink, .mainNav-submenuItemLink"
);
submenuLinks.forEach((link) => {
  if (link.nextElementSibling) {
    link.addEventListener("focus", function () {
      // Add a focus event listener to the link
      this.parentElement.classList.add("focus"); // Add the .focus class to the parent li
      this.setAttribute("aria-expanded", "true"); // Set aria-expanded to true on the child link
    });
    const subMenu = link.nextElementSibling; // Check for a sibling item
    const subMenuLinks = subMenu.querySelectorAll("a"); // Get the link(s)
    const lastLinkIndex = subMenuLinks.length - 1;
    const lastLink = subMenuLinks[lastLinkIndex];
    lastLink.addEventListener("blur", function () {
      // Blur event
      link.parentElement.classList.remove("focus"); // Remove the .focus class
      link.setAttribute("aria-expanded", "false"); // Set aria-expanded to false
    });
  }
});

// Toggle button functionality
var toggle = document.querySelector("#navToggle");
var menu = document.querySelector("#menu");
toggle.addEventListener("click", function () {
  if (menu.classList.contains("isActive")) {
    menu.classList.remove("isActive");
    toggle.classList.remove("isActive");
  } else {
    menu.classList.add("isActive");
    toggle.classList.add("isActive");
  }
});
