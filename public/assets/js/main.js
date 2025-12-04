// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function() {

    // --- Testimonial Slider Script ---
    // Check if jQuery and Owl Carousel are loaded
    if (typeof $!== 'undefined' && $.fn.owlCarousel) {
        $(".testimonial-slider").owlCarousel({
            items: 2, // Show 2 items on desktop
            itemsDesktop: 2, // 2 items from 1199px up
            itemsDesktopSmall: 1, // 1 item from 979px down to 768px
            itemsTablet: 1, // 1 item on tablets
            itemsMobile: 1, // 1 item on mobile
            pagination: true, // Show dots
            navigation: false, // Hide next/prev arrows
            autoPlay: true, // Automatically slide
            slideSpeed: 1000
        });
    } else {
        console.error("jQuery or Owl Carousel is not loaded.");
    }

    // --- Navigation Toggle Script ---
    const navToggle = document.getElementById("navToggle");
    const navOverlay = document.getElementById("navOverlay");

    if (navToggle && navOverlay) {
        // Toggle menu on hamburger click
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("nav-toggle--active");
            navOverlay.classList.toggle("nav-overlay--active");
            
            // Prevent body scrolling when overlay is active
            if (navOverlay.classList.contains("nav-overlay--active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });

        // Close menu when clicking on the overlay itself (not the links)
        navOverlay.addEventListener("click", (e) => {
            if (e.target === navOverlay) {
                navToggle.classList.remove("nav-toggle--active");
                navOverlay.classList.remove("nav-overlay--active");
                document.body.style.overflow = "auto";
            }
        });
    }

    // --- Other JavaScript (like Testimonial Slider) will be added below ---
});