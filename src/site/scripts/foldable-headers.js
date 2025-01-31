// src/site/scripts/foldable-headers.js
document.addEventListener("DOMContentLoaded", function() {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headers.forEach(header => {
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.innerHTML = '⯆';
    header.prepend(arrow);

    header.addEventListener('click', function() {
      let content = this.nextElementSibling;
      let isCollapsed = this.classList.contains('collapsed');

      // Toggle content
      while (content && !content.matches('h1, h2, h3, h4, h5, h6')) {
        content.style.display = isCollapsed ? 'block' : 'none';
        content = content.nextElementSibling;
      }

      // Toggle arrow state
      this.classList.toggle('collapsed');
      arrow.innerHTML = isCollapsed ? '⯆' : '⯈';
    });
  });
});
