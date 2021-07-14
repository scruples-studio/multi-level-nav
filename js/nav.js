// Add .js class to html tag to confirm JavaScript is enabled
var html = document.documentElement;
html.className += " js";

// Add a one second delay to submenu display for mouse users
const hasSubmenu = document.querySelectorAll(
  "li.main-nav__menu-item--has-submenu"
);
var timerSubmenu;
Array.prototype.forEach.call(hasSubmenu, function (el) {
  el.addEventListener("mouseover", function () {
    document
      .querySelector("li.main-nav__menu-item--has-submenu")
      .classList.add("focus");
    clearTimeout(timerSubmenu);
  });
  el.addEventListener("mouseout", function () {
    timerSubmenu = setTimeout(function () {
      document.querySelector(".focus").classList.remove("focus");
    }, 1000);
  });
});

// Set up the parent link as the submenu toggle
var submenuItems = document.querySelectorAll(
  "li.main-nav__menu-item--has-submenu"
);
Array.prototype.forEach.call(submenuItems, function (el) {
  el.querySelector("a").addEventListener("click", function (event) {
    if (this.parentNode.className == "main-nav__menu-item--has-submenu") {
      this.parentNode.className = "main-nav__menu-item--has-submenu open";
      this.setAttribute("aria-expanded", "true");
    } else {
      this.parentNode.className = "main-nav__menu-item--has-submenu";
      this.setAttribute("aria-expanded", "false");
    }
    event.preventDefault();
    return false;
  });
});

// Operate the nav using focus and blur – i.e. tabbing via keyboard
const submenuLinks = document.querySelectorAll(
  ".main-nav__menu-item-link, .main-nav__submenu-item-link"
);
submenuLinks.forEach((link) => {
  if (link.nextElementSibling) {
    link.addEventListener("focus", function () {
      this.parentElement.classList.add("focus");
      this.setAttribute("aria-expanded", "true");
    });
    const subMenu = link.nextElementSibling;
    const subMenuLinks = subMenu.querySelectorAll("a");
    const lastLinkIndex = subMenuLinks.length - 1;
    const lastLink = subMenuLinks[lastLinkIndex];
    lastLink.addEventListener("blur", function () {
      // Blur event
      link.parentElement.classList.remove("focus");
      link.setAttribute("aria-expanded", "false");
    });
  }
});

// Toggle button functionality
var toggle = document.querySelector("#nav-toggle");
var menu = document.querySelector("#menu");
toggle.addEventListener("click", function () {
  if (menu.classList.contains("js-is-active")) {
    menu.classList.remove("js-is-active");
    toggle.classList.remove("js-is-active");
  } else {
    menu.classList.add("js-is-active");
    toggle.classList.add("js-is-active");
  }
});