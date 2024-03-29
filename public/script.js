// Debug log
document.addEventListener("DOMContentLoaded", function () {
  const contentWindow = document.getElementById("content-window");

  // Handle navigation link clicks
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Get the data-content attribute to determine which page to load
      const pageToLoad = link.getAttribute("data-content");

      // Load the content of the selected page
      fetch(`/${pageToLoad}.html`)
        .then((response) => response.text())
        .then((html) => {
          contentWindow.innerHTML = html;
          const script = document.createElement("script");
          script.src = `/${pageToLoad}.js`;
          document.head.appendChild(script);
        })
        .catch((error) => {
          console.error("Error loading content:", error);
        });
    });
  });
});
