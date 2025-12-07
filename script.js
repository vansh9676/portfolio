// Toggle Resume Display
function toggleResume() {
    const resumeContent = document.getElementById('resumeContent');
    if (resumeContent.style.display === 'none') {
        resumeContent.style.display = 'block';
    } else {
        resumeContent.style.display = 'none';
    }
}

// Download Resume as Text File
// Download Resume as PDF file
function downloadResume() {
    const link = document.createElement('a');
    
    // If you keep the current file name:
    // link.href = 'Resume - Vansh.pdf';

    // 👇 Better: rename your file in GitHub to "Vansh_Resume.pdf"
    // and then use:
    link.href = 'Vansh_Resume.pdf';

    link.download = 'Vansh_Resume.pdf'; // name user will see
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Smooth Scroll for Navigation Links
// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // If it's an in-page anchor (like #about), do smooth scroll
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        // else: normal links like "payment.html" are NOT prevented,
        // browser will open the page normally
    });
});

