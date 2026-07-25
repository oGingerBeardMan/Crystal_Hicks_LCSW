/*=========================================================
 Crystal Hicks, LCSW
 script.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      Sticky Navigation
    =========================================*/

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);



    /*=========================================
      Smooth Scrolling
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /*=========================================
      FAQ Accordion
    =========================================*/

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });



    /*=========================================
      Scroll Reveal Animation
    =========================================*/

    const animatedElements = document.querySelectorAll(

        ".fade-up, .fade-left, .fade-right"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    animatedElements.forEach(element => {

        observer.observe(element);

    });



    /*=========================================
      Service Card Hover Enhancement
    =========================================*/

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });



    /*=========================================
      Focus Card Hover Enhancement
    =========================================*/

    const focusCards = document.querySelectorAll(".focus-card");

    focusCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });



    /*=========================================
      Contact Form Placeholder


    const form = document.querySelector(".contact-form form");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            alert(
                "Thank you for reaching out! This demo form isn't connected yet. We'll connect it to your website's contact system later."
            );

        });
    
    }
=========================================*/


     /*=========================================
      Contact Form Confirmation
    =========================================*/
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop page redirect

        fetch(form.action, {
            method: "POST",
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            alert("Thank you for your message. I typically respond within 3 business days. If you're experiencing a crisis or need immediate support, please call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.");
            form.reset(); // Clear the form fields
        })
        .catch(error => {
            alert("Oops! There was a problem submitting your form.");
        });
    });
}
 
});

/*=========================================
  Mobile Navbar
=========================================*/

const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileToggle && navLinks) {
    // Toggle menu open/close
    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when any menu link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/*=========================================
  Service Card Expansion
=========================================*/

document.addEventListener('DOMContentLoaded', () => {

    // Helper function to scroll smoothly to a card with fixed-header offset
    function scrollToCard(cardElement) {
        // Adjust headerOffset to match your fixed navbar height + breathing room
        const headerOffset = 100; 
        const elementPosition = cardElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Handle Card Expansion on Click
    const serviceToggles = document.querySelectorAll('.service-toggle');

    serviceToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const currentCard = toggle.closest('.service-detail-card');
            const isOpen = currentCard.classList.contains('open');

            // Optional: Close other open cards (accordion style). 
            // Comment out the next 3 lines if you want multiple cards open at once.
            document.querySelectorAll('.service-detail-card.open').forEach(card => {
                if (card !== currentCard) card.classList.remove('open');
            });

            // Toggle current card
            currentCard.classList.toggle('open');

            // If the card was opened, scroll to the top of it
            if (!isOpen) {
                // Brief delay ensures DOM height re-render before scrolling
                setTimeout(() => {
                    scrollToCard(currentCard);
                }, 100);
            }
        });
    });

    // Handle Direct Links / Hashes (e.g., coming from homepage with #50-minute)
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetCard = document.querySelector(hash);
            if (targetCard && targetCard.classList.contains('service-detail-card')) {
                targetCard.classList.add('open');
                setTimeout(() => {
                    scrollToCard(targetCard);
                }, 200);
            }
        }
    }

    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash);
});

/*=========================================
  Sub-Page Navigate by ID #
=========================================*/

window.addEventListener("load", () => {

    if (!window.location.hash) return;

    const id = window.location.hash.substring(1);

    const card = document.getElementById(id);

    if (!card) return;

    // Open the matching card
    card.classList.add("open");

    // Wait for layout, then scroll smoothly
    setTimeout(() => {

        card.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }, 200);

});

history.replaceState(null, "", "#" + button.dataset.target);
card.classList.toggle("open");
