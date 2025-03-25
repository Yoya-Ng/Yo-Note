// document.querySelector('.hamburger').addEventListener('click', () => {
//   document.querySelector('.nav-links').classList.toggle('expanded');
// });

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("user-menu-button");
  button.addEventListener("click", function () {
    toggleDropdown();
  });
});

function toggleDropdown() {
  const menu = document.getElementById("dropdown-menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
      menu.classList.remove("opacity-0", "scale-95");
      menu.classList.add("opacity-100", "scale-100");
    }, 10);
  } else {
    menu.classList.remove("opacity-100", "scale-100");
    menu.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
      menu.classList.add("hidden");
    }, 75);
  }
}

document.addEventListener("click", function (event) {
  const menu = document.getElementById("dropdown-menu");
  const button = document.getElementById("user-menu-button");
  if (!button.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("loading");
  document.getElementById("loading-screen").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("loading-screen").remove();
  }, 500); // 0.5 秒後移除 DOM
});