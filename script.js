"use strict";

document.addEventListener("DOMContentLoaded", function () {


    // 1. Hamburger Navigation
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    function closeMenu() {
        if (dropdownMenu && menuButton) {
            dropdownMenu.classList.remove("show");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }

    if (menuButton && dropdownMenu) {
        menuButton.addEventListener("click", function () {
            const isOpen = dropdownMenu.classList.toggle("show");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        dropdownMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".menu-container")) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuButton.focus();
            }
        });
    }

    // 2. Current Year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 3. Contact Form
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (typeof emailjs === "undefined") {
                formStatus.textContent =
                    "Email service is not loaded. Please refresh the page.";
                return;
            }

            formStatus.textContent = "Sending your message...";

            emailjs.sendForm(
                "service_76397oh",
                "template_bmuy19j",
                contactForm,
                {
                    publicKey: "rDdx7gLOc4Nhx-eEW"
                }
            )
                .then(function () {
                    formStatus.textContent =
                        "Message sent successfully! Thank you for contacting me.";

                    contactForm.reset();
                })
                .catch(function (error) {
                    console.error("EmailJS error:", error);

                    formStatus.textContent =
                        "Message could not be sent. Please check your EmailJS settings and try again.";
                });
        });
    }


});
