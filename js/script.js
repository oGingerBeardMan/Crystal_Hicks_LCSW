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
});

