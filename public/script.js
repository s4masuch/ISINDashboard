// JavaScript for handling content display
document.addEventListener('DOMContentLoaded', function () {
  const contentWindow = document.getElementById('content-window');
  const content = document.getElementById('content');
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      content.textContent = link.getAttribute('data-content');
    });
  });
});
