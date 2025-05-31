"use strict";




// Load GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  if (typeof Swiper !== "undefined") {
    // Hero Swiper
    let heroSwiper = new Swiper(".hero-slider", {
      effect: "fade",
      speed: 500,
      slidesPerView: 1,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-hero-button-next",
        prevEl: ".swiper-hero-button-prev",
      },
      pagination: {
        el: ".swiper-hero-pagination",
        clickable: true,
      },
      keyboard: true,
      on: {
        init: function () {
          // Animate the text of the initial slide
          const activeTextBox = document.querySelector(
            ".swiper-slide-active .hero-text-box"
          );

          if (activeTextBox) {
            gsap.fromTo(
              activeTextBox,
              { autoAlpha: 0, y: 20 }, // Start state
              { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.3 } // End state
            );
          }
        },
        slideChangeTransitionStart: function () {
          // Fade out the text of the current slide
          const activeTextBox = document.querySelector(
            ".swiper-slide-active .hero-text-box"
          );
          const activeBackground = document.querySelector(
            ".swiper-slide-active .hero-slide-bg"
          );

          if (activeTextBox) {
            gsap.to(activeTextBox, {
              autoAlpha: 0,
              duration: 0.25,
            });
          }
          if (activeBackground) {
            gsap.fromTo(
              activeBackground,
              {
                x: 0,
              },
              {
                x: -100,
              }
            );
          }
        },
        slideChangeTransitionEnd: function () {
          // Fade in the text of the new active slide
          const activeTextBox = document.querySelector(
            ".swiper-slide-active .hero-text-box"
          );
          if (activeTextBox) {
            gsap.fromTo(
              activeTextBox,
              { autoAlpha: 0, y: 20 }, // Start state
              { autoAlpha: 1, y: 0, duration: 0.5 } // End state
            );
          }
        },
      },
    });

    // Feedback Swiper
    const feedbackSwiper = new Swiper(".feedback-swiper", {
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: 2,
      on: {
        click(event) {
          feedbackSwiper.slideTo(this.clickedIndex);
        },
      },
      pagination: {
        el: ".feedback-pagination",
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });

    // Gallery Swiper for Small Screens
    let imgSwiper = new Swiper(".gallerySwiper", {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".gallery-pagination",
        clickable: true,
      },
    });
  } else {
    console.warn("Swiper library is not available on this page.");
  }
});

// Contact-form-Validation
(function () {
  const formIds = [
    "contactForm",
    "contactForm1",
    "contactForm2",
    "contactForm3",
    "contactForm4",
    "contactForm5",
  ]; // List all form IDs here

  formIds.forEach((formId) => {
    const form = document.getElementById(formId);

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission

        // Clear previous error messages for this form
        clearErrors(form);

        let hasError = false;

        // Extract the form number from the ID (e.g., '1' from 'contactForm1')
        const formNumber = formId.replace("contactForm", "");

        // Get input values using dynamic IDs
        const name = document.getElementById(`name${formNumber}`).value.trim();
        const email = document
          .getElementById(`email${formNumber}`)
          .value.trim();
        const phone = document
          .getElementById(`phone${formNumber}`)
          .value.trim();
        const message = document
          .getElementById(`message${formNumber}`)
          .value.trim();

        // Validate Name
        if (name === "") {
          showError(form, `name${formNumber}`, "Name is required.");
          hasError = true;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        if (email === "") {
          showError(form, `email${formNumber}`, "Email address is required.");
          hasError = true;
        } else if (!emailPattern.test(email)) {
          showError(
            form,
            `email${formNumber}`,
            "Please enter a valid email address."
          );
          hasError = true;
        }

        // Validate Phone
        if (phone === "") {
          showError(form, `phone${formNumber}`, "Phone number is required.");
          hasError = true;
        } else if (!/^\d{10}$/.test(phone)) {
          showError(
            form,
            `phone${formNumber}`,
            "Phone number must be 11 digits."
          );
          hasError = true;
        }

        // Validate Message
        if (message === "") {
          showError(form, `message${formNumber}`, "Message is required.");
          hasError = true;
        }

        // Show success message if no errors
        if (!hasError) {
          const successMessage = document.getElementById(
            `successMessage${formNumber}`
          );
          if (successMessage) {
            successMessage.textContent = "Thank you for contacting us!";
            successMessage.style.color = 'green';
            successMessage.style.fontFamily = 'var(--font-family-spartan)';
            successMessage.style.fontWeight = 'bold';
            successMessage.style.textAlign = 'center';
            successMessage.style.marginTop = '15px';
          }
          form.reset(); // Reset the form
        }
      });

      // Function to display an error message below an input field
      function showError(form, inputId, errorMessage) {
        const inputField = document.getElementById(inputId);
        const errorDiv = document.createElement("div");
        errorDiv.className = "error"; // Add a class for styling
        errorDiv.textContent = errorMessage; // Set the error message text
        inputField.parentElement.appendChild(errorDiv); // Append the error message below the input field
      }

      // Function to clear all previous error messages for this specific form
      function clearErrors(form) {
        const errors = form.querySelectorAll(".error"); // Get all error messages within the form
        errors.forEach(function (error) {
          error.remove(); // Remove each error message
        });
      }
    } else {
      console.warn(`Form with ID "${formId}" not found on the page.`);
    }
  });
})();

// // Email-Validation
(function () {
  const submitBtn = document.getElementById("submit-btn");

    // Check if the submit button exists on the page
    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            const emailInput = document.getElementById('emailInput');
            const emailValue = emailInput.value;
            const errorMessage = document.getElementById('error-message');

      // Simple email validation regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(emailValue)) {
        errorMessage.style.visibility = "hidden";
        alert("Thank you for subscribing!");
        // Additional actions like sending data to the server can be added here
      } else {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.visibility = "visible";
      }
    });
  } else {
    console.warn("Submit button not available on this page.");
  }
})();

// // Video-iframe-js
(function () {
  const videoTrigger = document.getElementById("videoTrigger");
  const closeButton = document.querySelector(".close-btn");
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoIframe");

  // Check if videoTrigger exists and add click event listener
  if (videoTrigger) {
    videoTrigger.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Set the YouTube video link
      if (iframe) {
        iframe.src =
          "https://www.youtube.com/embed/vaf-D_ui4eA?si=TGmiBHvS3kqy4bNr";
      }

      // Display the modal
      if (modal) {
        modal.style.display = "block";
      }
    });
  } else {
    console.warn("Video trigger element not found on this page.");
  }

  // Check if closeButton exists and add click event listener
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      if (modal) {
        modal.style.display = "none";
      }

      // Stop the video by clearing the iframe src
      if (iframe) {
        iframe.src = "";
      }
    });
  } else {
    console.warn("Close button not found on this page.");
  }

  // Check if modal exists and add event listener to close it when clicking outside
  if (modal) {
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        if (iframe) {
          iframe.src = "";
        }
      }
    });
  } else {
    console.warn("Modal not found on this page.");
  }
})();

// // // Accordian-js
(function () {
  let acc = document.getElementsByClassName("accordion");

  // Check if there are any accordion elements on the page
  if (acc.length > 0) {
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        // Collapse all panels except the one that was clicked
        for (let j = 0; j < acc.length; j++) {
          if (acc[j] !== this) {
            acc[j].classList.remove("active");

            // Hide plus and show minus for all except the clicked one
            let plusIcon = acc[j].querySelector(".accordian-plus-icon");
            let minusIcon = acc[j].querySelector(".accordian-minus-icon");

            if (plusIcon && minusIcon) {
              plusIcon.style.display = "inline"; // Show plus icon
              minusIcon.style.display = "none"; // Hide minus icon
            }

            // Collapse the panel of all except the clicked one
            let panel = acc[j].nextElementSibling;
            if (panel.classList.contains("open")) {
              panel.classList.remove("open");
              panel.style.maxHeight = null; // Reset the max-height
            }
          }
        }

        // Toggle the clicked accordion
        this.classList.toggle("active");

        // Get the plus and minus icons of the clicked accordion
        let plusIcon = this.querySelector(".accordian-plus-icon");
        let minusIcon = this.querySelector(".accordian-minus-icon");

        // Toggle the plus and minus icons
        if (plusIcon && minusIcon) {
          if (plusIcon.style.display === "none") {
            plusIcon.style.display = "inline"; // Show plus icon
            minusIcon.style.display = "none"; // Hide minus icon
          } else {
            plusIcon.style.display = "none"; // Hide plus icon
            minusIcon.style.display = "inline"; // Show minus icon
          }
        }

        // Toggle the panel for the clicked accordion
        let panel = this.nextElementSibling;
        if (panel.classList.contains("open")) {
          panel.classList.remove("open");
          panel.style.maxHeight = null; // Reset the max-height
        } else {
          panel.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px"; // Smooth height expansion
        }
      });
    }
  } else {
    console.warn("No accordion elements found on this page.");
  }
})();

// // // Toggle-Card-Js
(function () {
  function toggleCard(cardId, buttonId) {
    // Get the card and button
    const selectedCard = document.getElementById(cardId);
    const selectedButton = document.getElementById(buttonId);

    // Hide all cards
    const cards = document.querySelectorAll(".toggle-card");
    cards.forEach((card) => card.classList.add("hidden"));

    // Remove the 'active-tab' class from all buttons
    const buttons = document.querySelectorAll(".tab-links");
    buttons.forEach((button) => button.classList.remove("active-tab"));

    // Show the selected card and add the active class to the button
    selectedCard.classList.remove("hidden");
    selectedButton.classList.add("active-tab");
  }

  const tabs = ["showCardTab1", "showCardTab2", "showCardTab3"];
  const cards = ["card1", "card2", "card3"];

  let allTabsExist = tabs.every((tab) => document.getElementById(tab) !== null);

  // Check if all tab elements exist on the page
  if (allTabsExist) {
    tabs.forEach((tab, index) => {
      document.getElementById(tab).addEventListener("click", function () {
        toggleCard(cards[index], tab);
      });
    });
  } else {
    console.warn("One or more tab elements are not available on this page.");
  }
})();

// Isotope-Js
(function () {
  // Check if Isotope is available on the page
  if (typeof Isotope !== "undefined") {
    // Initialize Isotope
    let iso = new Isotope(".gallery", {
      itemSelector: ".gallery-item",
      layoutMode: "fitRows",
    });

    const loadMoreButton = document.getElementById("load-more");
    const hiddenItems = document.querySelectorAll(".gallery-item.hidden");

    // On "Load More" button click, show 3 more hidden items
    loadMoreButton.addEventListener("click", () => {
      event.preventDefault(); // Prevents the page from jumping to the top
      let revealedCount = 0;

      hiddenItems.forEach((item) => {
        if (item.classList.contains("hidden") && revealedCount < 3) {
          item.classList.remove("hidden");
          revealedCount++;
        }
      });

      // Refresh Isotope layout with the new visible items
      iso.layout();

      // Hide the "Load More" button if all items are revealed
      const remainingHiddenItems = document.querySelectorAll(
        ".gallery-item.hidden"
      );
      if (remainingHiddenItems.length === 0) {
        loadMoreButton.style.display = "none";
      }
    });

    // Existing filter and button group code
    const filtersElem = document.querySelector(".filters-button-group");
    filtersElem.addEventListener("click", function (event) {
      if (!matchesSelector(event.target, "button")) return;
      const filterValue = event.target.getAttribute("data-filter");
      iso.arrange({ filter: filterValue });
    });

    const buttonGroups = document.querySelectorAll(".button-group");
    buttonGroups.forEach((buttonGroup) => radioButtonGroup(buttonGroup));

    function radioButtonGroup(buttonGroup) {
      buttonGroup.addEventListener("click", function (event) {
        if (!matchesSelector(event.target, "button")) return;
        buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
        event.target.classList.add("is-checked");
      });
    }

    function matchesSelector(element, selector) {
      return (
        element.matches(selector) ||
        element.webkitMatchesSelector(selector) ||
        element.msMatchesSelector(selector)
      );
    }
  }
})();

// Hide/Show Services card
(function () {
  const servicesBtn = document.querySelector(".services-btn");

  // Check if servicesBtn exists before adding event listener
  if (servicesBtn) {
    servicesBtn.addEventListener("click", function (event) {
      event.preventDefault();

      // Select all elements with the .hidden-item class
      const hiddenItems = document.querySelectorAll(".hidden-item");

      if (hiddenItems.length > 0) {
        // Loop through each hidden item and add the .visible class
        hiddenItems.forEach((item) => {
          item.classList.add("visible");
        });

        // Hide the "Load more" button after all items are shown
        this.style.display = "none";
      }
    });
  }
})();

// Image-popup-JS
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const imgBlocks = document.querySelectorAll(".img-gallery .img-block");
    const imgPopup = document.querySelector(".img-popup");
    const popupImage = document.querySelector(".popup-image");
    const closeBtn = document.querySelector(".close-btn");

    // Check if there are any img-block elements
    if (imgBlocks.length > 0) {
      // Show popup when an image is clicked
      imgBlocks.forEach((block) => {
        block.addEventListener("click", function () {
          const imgSrc = block.querySelector(".dog-img").getAttribute("src");
          popupImage.setAttribute("src", imgSrc);
          imgPopup.classList.add("opened");
        });
      });

      // Close popup when close button or overlay is clicked
      closeBtn.addEventListener("click", function () {
        imgPopup.classList.remove("opened");
        popupImage.setAttribute("src", "");
      });

      imgPopup.addEventListener("click", function (event) {
        if (event.target === imgPopup) {
          imgPopup.classList.remove("opened");
          popupImage.setAttribute("src", "");
        }
      });
    }
  });
})();

// Servic-detail-content
(function () {
  // Select all buttons and content sections
  const buttons = document.querySelectorAll(".service-btn");
  const contents = document.querySelectorAll(".service-content-block");

  // Run the code only if buttons are present on the page
  if (buttons.length > 0 && contents.length > 0) {
    // Function to activate a specific tab by index
    function activateTab(index) {
      // Hide all content sections and reset their styles
      contents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
      });

      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));

      // Show the associated content and add active class for transition
      const targetId = buttons[index].getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        // Ensure the target content exists
        targetContent.style.display = "block"; // Display it first to apply fade-in
        setTimeout(() => targetContent.classList.add("active"), 10); // Small delay to trigger opacity transition
        buttons[index].classList.add("active");
      }
    }

    // Add click event listeners to each button
    buttons.forEach((button, index) => {
      button.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default scrolling behavior
        activateTab(index);
      });
    });

    // Activate the second tab by default (index 1) when the page loads
    if (buttons[1]) {
      activateTab(1);
    }
  }
})();

// Breeds-show-content
(function () {
  // Select all "card" buttons and content sections
  const cards = document.querySelectorAll(".dog-breed-card");
  const cardContents = document.querySelectorAll(".dog-breed-content");

  // Run the code only if cards are present on the page
  if (cards.length > 0 && cardContents.length > 0) {
    // Function to activate a specific card by index
    function activateCard(index) {
      // Hide all content sections and reset their styles
      cardContents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
      });

      // Remove active class from all cards
      cards.forEach((card) => card.classList.remove("active"));

      // Show the associated content and add active class for transition
      const targetId = cards[index].getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        // Ensure the target content exists
        targetContent.style.display = "block"; // Display it first to apply fade-in
        setTimeout(() => targetContent.classList.add("active"), 10); // Small delay to trigger opacity transition
        cards[index].classList.add("active");
      }
    }

    // Add click event listeners to each card
    cards.forEach((card, index) => {
      card.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default scrolling behavior
        activateCard(index);
      });
    });

    // Activate the second card by default (index 1) when the page loads
    if (cards[1]) {
      activateCard(0);
    }
  }
})();

//  SCROLL TO TOP SCRIPT
(function () {
  let scrollToTopBtn = document.querySelector(".scrollToTopBtn");
  let rootElement = document.documentElement;

  function handleScroll() {
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.15) {
      // Show button
      scrollToTopBtn.classList.add("showBtn");
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll);
})();

const searchClickHandler = (e) => {
  const wrapper = e.target.closest(".search");
  wrapper.classList.toggle("active");
};

const searchCancelHandler = (e) => {
  const search = document.querySelector(".search.active");
  if (search == null || e.target.closest(".search")) {
    return;
  }
  search.classList.remove("active");
};

const CLICK_HANDLERS = {
  ".hamburger-icon": hamburger_handler,
  ".hamburger-overlay": hamburger_handler,
  ".hamburger-close": hamburger_handler,
  ".navigation-menu.mobile": (e) => {
    if (e.target.closest(".back-button")) {
      mob_dropdown_handler(e, true);
    }

    if (e.target.parentNode.matches(".menu-item-has-children")) {
      mob_dropdown_handler(e);
    }
  },
  ".search-icon": searchClickHandler,
  body: searchCancelHandler,
};

document.addEventListener("click", (e) => {
  for (const [key, value] of Object.entries(CLICK_HANDLERS)) {
    if (e.target.closest(key)) {
      value(e);
    }
  }
});

// mouseenter event
document.body.addEventListener(
  "mouseenter",
  function (e) {
    e.stopPropagation();

    // navigation
    if (
      e.target.matches(".navigation-menu.desktop > .menu-item-has-children")
    ) {
      nav_handler(e);
    }
  },
  true
);

// mouseleave event
document.body.addEventListener(
  "mouseleave",
  function (e) {
    e.stopPropagation();

    if (
      e.target.matches(".navigation-menu.desktop > .menu-item-has-children")
    ) {
      nav_handler(e);
    }

    if (e.target.matches(".navigation-menu.desktop .sub-menu .sub-menu")) {
      sm_mouseleave_handler(e);
    }
  },
  true
);

document.body.addEventListener(
  "mouseover",
  (e) => {
    e.stopPropagation();
    if (
      e.target.closest(
        ".navigation-menu.desktop .sub-menu > .menu-item-has-children"
      )
    ) {
      dropdown_switch(e);
    }
  },
  true
);

document.body.addEventListener("mouseout", (e) => {
  if (
    e.target.closest(
      ".navigation-menu.desktop .sub-menu > .menu-item-has-children"
    )
  ) {
    dropdown_leave(e);
  }
});

const ON_SCROLL_SERVICES = [stickyNavigationHandler];

window.addEventListener(
  "scroll",
  () => {
    ON_SCROLL_SERVICES.forEach((service) => service());
  },
  { passive: true }
);

// Rotate each fill element based on its specific rotation angle
const progressAnimations = [
  { selector: ".full-1, .fill-1", rotateTo: 153 }, // First progress bar
  { selector: ".full-2, .fill-2", rotateTo: 90 }, // Second progress bar
  { selector: ".full-3, .fill-3", rotateTo: 135 }, // Third progress bar
  { selector: ".full-4, .fill-4", rotateTo: 65 }, // Fourth progress bar
];

progressAnimations.forEach(({ selector, rotateTo }) => {
  gsap.fromTo(
    selector,
    { rotation: 0 },
    {
      rotation: rotateTo,
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 2,
      ease: "power2.inOut",
    }
  );
});

// Animate the numbers inside the circles
document.querySelectorAll(".inside-circle").forEach((circle, index) => {
  const targetNumber = parseInt(circle.textContent);

  gsap.fromTo(
    circle,
    { innerText: 0 },
    {
      innerText: targetNumber,
      scrollTrigger: {
        trigger: circle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      duration: 2,
      ease: "power2.inOut",
      snap: { innerText: 1 },
      onUpdate: function () {
        circle.textContent = Math.round(this.targets()[0].innerText);
      },
    }
  );
});

// map-logic-starts //

function switchMap(index) {
  const tabs = document.querySelectorAll(".map-tab-grid");
  const maps = document.querySelectorAll(".map-frame");

  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  maps.forEach((map, i) => {
    map.classList.toggle("active", i === index);
  });
}

  let currentIndex = 0;

function slideCarousel(direction) {
  const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".reel-item");
  const gap = 20;
  const visibleCount = window.innerWidth < 768 ? 1 : 4; // 4 reels on desktop
  const itemWidth = items[0].offsetWidth + gap;

  const maxIndex = Math.max(0, items.length - visibleCount);

  currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

window.addEventListener("resize", () => slideCarousel(0));

// Lightbox logic
const reels = document.querySelectorAll(".reel-item");
const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightboxVideo");

reels.forEach(item => {
  item.addEventListener("click", () => {
    const video = item.querySelector("video");
    const src = video.querySelector("source").src;
    lightboxVideo.src = src;
    lightboxVideo.muted = false;
    lightboxVideo.play();
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightboxVideo.pause();
  lightboxVideo.src = "";
  lightbox.style.display = "none";
});

let startX = 0;
let isDragging = false;

const track = document.getElementById("carouselTrack");
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;

  // Optional: if you want slight dragging effect (not required)
  // track.style.transform = `translateX(${deltaX}px)`;
});

track.addEventListener("touchend", (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      slideCarousel(1); // swipe left → go right
    } else {
      slideCarousel(-1); // swipe right → go left
    }
  }
});

// map-logic-end //

// toggle-map-starts //

// toggle-map-ends //



function openLightbox(src, type) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  const video = document.getElementById("lightboxVideo");

  if (type === 'image') {
    img.src = src;
    img.style.display = 'block';
    video.style.display = 'none';
  } else if (type === 'video') {
    video.src = src;
    video.style.display = 'block';
    img.style.display = 'none';
  }

  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.getElementById("lightboxImage").src = "";
  const video = document.getElementById("lightboxVideo");
  video.pause();
  video.currentTime = 0;
  video.src = "";
}

  

