// Add .js class to html tag to confirm JavaScript is enabled
var html = document.documentElement;
html.className += " js";

// Add a one second delay to submenu display for mouse users
const hasSubmenu = document.querySelectorAll(
  "li.mainNav-menuItem--hasSubmenu"
);
var timerSubmenu;
Array.prototype.forEach.call(hasSubmenu, function (el) {
  el.addEventListener("mouseover", function () {
    document
      .querySelector("li.mainNav-menuItem--hasSubmenu")
      .classList.add("focus");
    clearTimeout(timerSubmenu);
  });
  el.addEventListener("mouseout", function () {
    timerSubmenu = setTimeout(function () {
      document.querySelector(".focus").classList.remove("focus");
    }, 1000);
  });
});

// Add a one second delay to sub-submenu display for mouse users
const hasSubSubmenu = document.querySelectorAll(
  "li.mainNav-submenuItem--hasSubSubmenu"
);
var timerSubSubmenu;
Array.prototype.forEach.call(hasSubSubmenu, function (el) {
  el.addEventListener("mouseover", function () {
    document
      .querySelector("li.mainNav-submenuItem--hasSubSubmenu")
      .classList.add("focus");
    clearTimeout(timerSubSubmenu);
  });
  el.addEventListener("mouseout", function () {
    timerSubSubmenu = setTimeout(function () {
      document.querySelector(".focus").classList.remove("focus");
    }, 1000);
  });
});

// Set up the parent link as the submenu toggle
var submenuItems = document.querySelectorAll(
  "li.mainNav-menuItem--hasSubmenu"
);
Array.prototype.forEach.call(submenuItems, function (el) {
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
const submenuLinks = document.querySelectorAll(
  ".mainNav-menuItemLink, .mainNav-submenuItemLink"
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
var toggle = document.querySelector("#navToggle");
var menu = document.querySelector("#menu");
toggle.addEventListener("click", function () {
  if (menu.classList.contains("jsIsActive")) {
    menu.classList.remove("jsIsActive");
    toggle.classList.remove("jsIsActive");
  } else {
    menu.classList.add("jsIsActive");
    toggle.classList.add("jsIsActive");
  }
});