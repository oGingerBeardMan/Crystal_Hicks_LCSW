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
        if (!header) return;
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
     
             // Ignore blank hashes, modal links, or trigger elements
             if (
                 targetID === "#" ||
                 targetID === "#gfe-modal" ||
                 this.classList.contains("gfe-trigger")
             ) {
                 return;
             }
     
             const target = document.querySelector(targetID);
             if (!target || target.classList.contains("modal")) return;
     
             e.preventDefault();
     
             // 1. Get header height
             const headerHeight = header ? header.offsetHeight : 0;
     
             // 2. Read CSS scroll-margin-top (if defined)
             const style = window.getComputedStyle(target);
             const scrollMargin = parseInt(style.scrollMarginTop, 10) || 0;
     
             // 3. Extra breathing room under the header (in pixels)
             const extraBuffer = 0; 
     
             const targetPosition =
                 target.getBoundingClientRect().top +
                 window.pageYOffset -
                 headerHeight -
                 scrollMargin -
                 extraBuffer;
     
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
        if (!question) return;

        question.addEventListener("click", () => {
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove("active");
                    const otherQuestion = other.querySelector(".faq-question");
                    if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
                }
            });
            item.classList.toggle("active");
            question.setAttribute("aria-expanded", item.classList.contains("active") ? "true" : "false");
        });
    });


    /*=========================================
      Scroll Reveal Animation
    =========================================*/
    const animatedElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        animatedElements.forEach(element => observer.observe(element));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(element => element.classList.add("visible"));
    }


    /*=========================================
      Hover Effects
    =========================================*/
    const addHoverEffect = (selector, offsetY) => {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = `translateY(${offsetY}px)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    };

    addHoverEffect(".service-card", -12);
    addHoverEffect(".focus-card", -10);


    /*=========================================
      Contact Form AJAX Handling
    =========================================*/
    const form = document.getElementById("contactForm") || document.querySelector("form[action*='formsubmit']");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector("button[type='submit']");
            const originalBtnText = submitBtn ? submitBtn.innerText : "Send Inquiry";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "Sending...";
            }

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you for your message. I typically respond within 3 business days. If you're experiencing a crisis or need immediate support, please call or text 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room.");
                    form.reset();
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            })
            .catch(() => {
                alert("Oops! There was a network problem submitting your form. Please try again.");
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            });
        });
    }


    /*=========================================
      Mobile Navigation Toggle
    =========================================*/
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /*=========================================
      Service Detail Accordions / Sub-Pages
    =========================================*/
    function scrollToCard(cardElement) {
        const headerOffset = 100;
        const elementPosition = cardElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    const serviceToggles = document.querySelectorAll(".service-toggle");
    serviceToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const currentCard = toggle.closest(".service-detail-card");
            if (!currentCard) return;

            const isOpen = currentCard.classList.contains("open");

            document.querySelectorAll(".service-detail-card.open").forEach(card => {
                if (card !== currentCard) card.classList.remove("open");
            });

            currentCard.classList.toggle("open");

            if (!isOpen) {
                setTimeout(() => scrollToCard(currentCard), 100);
            }
        });
    });


    /*=========================================
      Hash Navigation Handling
    =========================================*/
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash && hash !== "#gfe-modal") {
            const targetCard = document.querySelector(hash);
            if (targetCard && targetCard.classList.contains("service-detail-card")) {
                targetCard.classList.add("open");
                setTimeout(() => scrollToCard(targetCard), 200);
            }
        }
    }

    handleInitialHash();
    window.addEventListener("hashchange", handleInitialHash);


/*=========================================
      Modal Controller (GFE & Privacy Policy)
    =========================================*/
    document.addEventListener("click", e => {
        // 1. Open GFE Modal
        const gfeTrigger = e.target.closest(".gfe-trigger, a[href='#gfe-modal']");
        if (gfeTrigger) {
            e.preventDefault();
            const modal = document.getElementById("gfe-modal");
            if (modal) {
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            }
        }

        // 2. Open Privacy Policy Modal
        const privacyTrigger = e.target.closest(".privacy-trigger, a[href='#privacy-modal']");
        if (privacyTrigger) {
            e.preventDefault();
            const modal = document.getElementById("privacy-modal");
            if (modal) {
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
            }
        }

        // 3. Close Any Active Modal (Overlay click or Close button)
        if (e.target.closest("[data-close-modal]")) {
            const activeModals = document.querySelectorAll(".modal.active");
            activeModals.forEach(modal => {
                modal.classList.remove("active");
                modal.setAttribute("aria-hidden", "true");
            });
            document.body.style.overflow = "";
        }
    });

    // 4. Close Active Modal on Escape Key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            const activeModals = document.querySelectorAll(".modal.active");
            if (activeModals.length > 0) {
                activeModals.forEach(modal => {
                    modal.classList.remove("active");
                    modal.setAttribute("aria-hidden", "true");
                });
                document.body.style.overflow = "";
            }
        }
    });

});
