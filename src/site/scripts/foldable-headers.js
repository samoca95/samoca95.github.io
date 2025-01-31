// src/site/scripts/foldable-headers.js
document.addEventListener("DOMContentLoaded", function() {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headers.forEach(header => {
    // Skip the page title (assumed to be the first h1)
    if (header.tagName === 'H1' && !header.previousElementSibling) {
      return;
    }

    // Check if the header has content below it
    let content = header.nextElementSibling;
    let hasContent = false;

    while (content && !content.matches('h1, h2, h3, h4, h5, h6')) {
      if (content.textContent.trim() !== '') {
        hasContent = true;
        break;
      }
      content = content.nextElementSibling;
    }

    // Add arrow only if the header has content
    if (hasContent) {
      const arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.innerHTML = '⊛'; // Arrow points right when collapsed
      header.appendChild(arrow); // Add arrow after the header text

      header.addEventListener('click', function() {
        let content = this.nextElementSibling;
        let isCollapsed = this.classList.contains('collapsed');

        // Toggle content
        while (content && !content.matches('h1, h2, h3, h4, h5, h6')) {
          if (content.textContent.trim() !== '') {
            content.style.display = isCollapsed ? 'block' : 'none';
          }
          content = content.nextElementSibling;
        }

        // Toggle arrow state
        this.classList.toggle('collapsed');
        arrow.innerHTML = isCollapsed ? '⊛' : ''; // Hide arrow when expanded
      });
    }
  });
});
