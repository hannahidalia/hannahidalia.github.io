document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scroll to sections
    const navLinks = document.querySelectorAll('nav ul li a, .cta-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = e.currentTarget.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});
