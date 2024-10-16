document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scroll to sections
    const navLinks = document.querySelectorAll('nav ul li a, .cta-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.currentTarget.getAttribute('href');

            // Check if the link starts with '#' to ensure it's an internal anchor link
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent the default anchor link behavior
                const targetID = href.substring(1); // Get the ID without '#'
                const targetSection = document.getElementById(targetID);

                // Scroll to the target section if it exists
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50, // Adjust the offset as needed
                        behavior: 'smooth'
                    });
                }
            }
            // If the link does not start with '#', allow default behavior (external page link)
        });
    });
});
