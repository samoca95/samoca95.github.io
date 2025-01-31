document.addEventListener("DOMContentLoaded", function() {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headers.forEach(header => {
        // Add a span for the arrow inside the header
        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = '⯆'; // Default arrow (pointing down)
        header.prepend(arrow);

        header.addEventListener('click', function() {
            let content = this.nextElementSibling;
            while (content && content.tagName !== 'H1' && content.tagName !== 'H2' && content.tagName !== 'H3' && content.tagName !== 'H4' && content.tagName !== 'H5' && content.tagName !== 'H6') {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    this.classList.remove('collapsed'); // Remove collapsed class
                    arrow.innerHTML = '⯆'; // Arrow points down when unfolded
                } else {
                    content.style.display = 'none';
                    this.classList.add('collapsed'); // Add collapsed class
                    arrow.innerHTML = '⯈'; // Arrow points right when folded
                }
                content = content.nextElementSibling;
            }
        });
    });
});
