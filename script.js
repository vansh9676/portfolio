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
function downloadResume() {
    const resumeText = `
YOUR NAME
City, Country | (123) 456-7890 | your.email@example.com | linkedin.com/in/yourname

═══════════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
Results-driven professional with X years of experience in [Your Field]. Proven track record of delivering high-quality projects and collaborating with cross-functional teams. Passionate about innovation and continuous learning.

═══════════════════════════════════════════════════════════════

EXPERIENCE

Senior Developer
Company Name | Jan 2022 - Present
• Led development of key projects resulting in 40% performance improvement
• Mentored 5 junior developers and conducted code reviews
• Collaborated with product team to define technical requirements

Developer
Previous Company | Jan 2020 - Dec 2021
• Developed and maintained full-stack web applications
• Implemented responsive design across multiple platforms
• Resolved production issues and optimized database queries

═══════════════════════════════════════════════════════════════

EDUCATION
Bachelor of Science in Computer Science
University Name | Graduated 2020

═══════════════════════════════════════════════════════════════

SKILLS

Technical:
HTML, CSS, JavaScript, React, Node.js, MongoDB, PostgreSQL

Tools:
Git, Docker, Figma, Adobe XD

Languages:
English (Fluent), Spanish (Intermediate)

═══════════════════════════════════════════════════════════════

CERTIFICATIONS
• AWS Certified Cloud Practitioner
• Google UX Design Certificate

═══════════════════════════════════════════════════════════════
    `;

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(resumeText);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume.txt");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const messageText = document.getElementById('messageText').value.trim();
    
    const responseMessage = document.getElementById('responseMessage');
    
    // Validate form
    if (!name || !email || !subject || !messageText) {
        responseMessage.textContent = 'Please fill in all fields.';
        responseMessage.className = 'message error';
        responseMessage.style.display = 'block';
        return;
    }

    // Display success message
    responseMessage.textContent = `Thank you ${name}! Your message has been recorded. I'll get back to you at ${email} soon.`;
    responseMessage.className = 'message success';
    responseMessage.style.display = 'block';
    
    // Reset form
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        responseMessage.style.display = 'none';
    }, 5000);

    // Log the data (for development purposes)
    console.log({
        name: name,
        email: email,
        subject: subject,
        message: messageText
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});