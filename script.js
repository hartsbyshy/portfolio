// =========================
// HARTS BY SHY
// FINAL SCRIPT.JS
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTS
  // =========================

  const introScreen = document.getElementById("intro-screen");
  const enterButton = document.getElementById("enter-btn");

  const backgroundMusic = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");

  const portfolioSections = document.querySelectorAll(".portfolio-section");

  const categoryOpenButtons =
    document.querySelectorAll(".category-open");

  const categoryNavButtons =
    document.querySelectorAll(".category-nav");

  const logoHome =
    document.getElementById("logo-home");

  const aboutNav =
    document.getElementById("about-nav");

  const exploreWorkBtn =
    document.getElementById("explore-work-btn");

  const backButtons =
    document.querySelectorAll(".back-button");

  const coverBackButtons =
    document.querySelectorAll(".back-home");

  const hiddenHearts =
    document.querySelectorAll(".hidden-heart");

  const heartCounter =
    document.getElementById("heart-counter");

  const heartSurprise =
    document.getElementById("heart-surprise");


  let heartsFound = 0;


  // =========================
  // INTRO
  // =========================

  if (enterButton && introScreen) {

    enterButton.addEventListener("click", async () => {

      introScreen.classList.add("hide");

      if (backgroundMusic) {

        try {

          backgroundMusic.volume = 0.25;

          await backgroundMusic.play();

          if (musicToggle) {
            musicToggle.classList.add("playing");
            musicToggle.textContent = "Ⅱ";
          }

        } catch (error) {

          console.log(
            "Music autoplay was blocked by the browser."
          );

        }

      }

      setTimeout(() => {
        introScreen.style.display = "none";
      }, 900);

    });

  }


  // =========================
  // MUSIC
  // =========================

  if (backgroundMusic) {
    backgroundMusic.volume = 0.25;
  }


  if (musicToggle && backgroundMusic) {

    musicToggle.addEventListener("click", async () => {

      if (backgroundMusic.paused) {

        try {

          await backgroundMusic.play();

          musicToggle.classList.add("playing");

          musicToggle.textContent = "Ⅱ";

        } catch (error) {

          console.log(
            "Unable to play music."
          );

        }

      } else {

        backgroundMusic.pause();

        musicToggle.classList.remove("playing");

        musicToggle.textContent = "♫";

      }

    });

  }


  // =========================
  // PAUSE VIDEOS
  // =========================

  function pauseAllVideos() {

    document
      .querySelectorAll("video")
      .forEach((video) => {

        video.pause();

      });

  }


  // =========================
  // CLOSE MOBILE NAV
  // =========================

  function closeMobileNavbar() {

    const navbarCollapse =
      document.getElementById("portfolioNavbar");

    if (!navbarCollapse) return;


    if (
      typeof bootstrap !== "undefined" &&
      navbarCollapse.classList.contains("show")
    ) {

      const collapseInstance =
        bootstrap.Collapse.getOrCreateInstance(
          navbarCollapse
        );

      collapseInstance.hide();

    }

  }


  // =========================
  // SHOW SECTION
  // =========================

  function showSection(category) {

    pauseAllVideos();


    portfolioSections.forEach((section) => {

      section.classList.remove(
        "active-section"
      );

    });


    let targetSection = null;


    if (category === "home") {

      targetSection =
        document.getElementById(
          "home-section"
        );

    }


    if (category === "illustration") {

      targetSection =
        document.getElementById(
          "illustration-section"
        );

    }


    if (category === "poster") {

      targetSection =
        document.getElementById(
          "poster-section"
        );

    }


    if (category === "video") {

      targetSection =
        document.getElementById(
          "video-section"
        );

    }


    if (targetSection) {

      targetSection.classList.add(
        "active-section"
      );

    }


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    closeMobileNavbar();

    setTimeout(() => {
      refreshRevealElements();
    }, 100);

  }


  // =========================
  // CATEGORY CARDS
  // =========================

  categoryOpenButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const category =
            button.dataset.category;

          showSection(category);

        }
      );

    }
  );


  // =========================
  // NAVIGATION
  // =========================

  categoryNavButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const category =
            button.dataset.category;

          showSection(category);

        }
      );

    }
  );


  // =========================
  // LOGO HOME
  // =========================

  if (logoHome) {

    logoHome.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        showSection("home");

      }
    );

  }


  // =========================
  // ABOUT NAV
  // =========================

  if (aboutNav) {

    aboutNav.addEventListener(
      "click",
      () => {

        showSection("home");

        setTimeout(() => {

          const aboutSection =
            document.getElementById(
              "about"
            );

          if (aboutSection) {

            aboutSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }, 150);

      }
    );

  }


  // =========================
  // EXPLORE WORK
  // =========================

  if (exploreWorkBtn) {

    exploreWorkBtn.addEventListener(
      "click",
      () => {

        const selectedWork =
          document.querySelector(
            ".selected-work"
          );

        if (selectedWork) {

          selectedWork.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  }


  // =========================
  // BACK BUTTONS
  // =========================

  backButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showSection("home");

          setTimeout(() => {

            const selectedWork =
              document.querySelector(
                ".selected-work"
              );

            if (selectedWork) {

              selectedWork.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }, 150);

        }
      );

    }
  );


  // =========================
  // COVER BACK BUTTONS
  // =========================

  coverBackButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showSection("home");

        }
      );

    }
  );


  // =========================
  // NAVBAR LINK AUTO CLOSE
  // =========================

  document
    .querySelectorAll(
      "#portfolioNavbar button"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        closeMobileNavbar
      );

    });


  // =========================
  // HEART GAME
  // =========================

  function updateHeartCounter() {

    if (!heartCounter) return;

    heartCounter.textContent =
      `♡ ${heartsFound}/4`;

    heartCounter.classList.add(
      "counter-pop"
    );

    setTimeout(() => {

      heartCounter.classList.remove(
        "counter-pop"
      );

    }, 350);

  }


  hiddenHearts.forEach(
    (heart) => {

      heart.addEventListener(
        "click",
        () => {

          if (
            heart.classList.contains(
              "found"
            )
          ) {
            return;
          }


          heart.classList.add(
            "found"
          );

          heartsFound++;

          updateHeartCounter();


          if (
            heartsFound ===
            hiddenHearts.length
          ) {

            setTimeout(() => {

              if (heartSurprise) {

                heartSurprise.classList.add(
                  "revealed"
                );

                heartSurprise.scrollIntoView({
                  behavior: "smooth",
                  block: "center"
                });

              }

            }, 700);

          }

        }
      );

    }
  );


  // =========================
  // VIDEO PREVIEW
  // =========================

  const videoPreview =
    document.querySelector(
      ".video-preview video"
    );


  const videoPreviewCard =
    document.querySelector(
      ".video-preview"
    );


  if (
    videoPreview &&
    videoPreviewCard
  ) {

    videoPreviewCard.addEventListener(
      "mouseenter",
      () => {

        videoPreview.play().catch(() => {});

      }
    );


    videoPreviewCard.addEventListener(
      "mouseleave",
      () => {

        videoPreview.pause();

        videoPreview.currentTime = 0;

      }
    );

  }


  // =========================
  // CARD TILT EFFECT
  // =========================

  const categoryCards =
    document.querySelectorAll(
      ".category-card"
    );


  categoryCards.forEach(
    (card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          if (
            window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches
          ) {
            return;
          }


          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const centerX =
            rect.width / 2;


          const centerY =
            rect.height / 2;


          const rotateX =
            ((y - centerY) /
              centerY) *
            -1.5;


          const rotateY =
            ((x - centerX) /
              centerX) *
            1.5;


          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }
      );

    }
  );


  // =========================
  // CLICK RIPPLE
  // =========================

  document.addEventListener(
    "click",
    (event) => {

      const interactive =
        event.target.closest(
          "button, a"
        );


      if (!interactive) return;


      const ripple =
        document.createElement(
          "span"
        );


      ripple.className =
        "click-ripple";


      ripple.style.left =
        `${event.clientX}px`;


      ripple.style.top =
        `${event.clientY}px`;


      document.body.appendChild(
        ripple
      );


      setTimeout(() => {

        ripple.remove();

      }, 700);

    }
  );


  // =========================
  // SCROLL REVEAL
  // =========================

  let revealObserver = null;


  function setupRevealObserver() {

    if (revealObserver) {

      revealObserver.disconnect();

    }


    const revealElements =
      document.querySelectorAll(
        [
          ".section-heading",
          ".category-card",
          ".gallery-intro",
          ".art-item",
          ".video-project",
          ".cta-content",
          ".memory-heading",
          ".memory-grid"
        ].join(",")
      );


    revealElements.forEach(
      (element) => {

        element.classList.add(
          "reveal-on-scroll"
        );

      }
    );


    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      revealElements.forEach(
        (element) => {

          element.classList.add(
            "is-visible"
          );

        }
      );

      return;

    }


    revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  function refreshRevealElements() {

    setupRevealObserver();

  }


  setupRevealObserver();


  // =========================
  // CREATIVE MEMORY GAME
  // 16 TILES / 8 PAIRS
  // =========================

  const memoryGrid =
    document.getElementById(
      "memory-grid"
    );

  const memoryMoves =
    document.getElementById(
      "memory-moves"
    );

  const memoryMatched =
    document.getElementById(
      "memory-matched"
    );

  const memoryReset =
    document.getElementById(
      "memory-reset"
    );

  const memoryComplete =
    document.getElementById(
      "memory-complete"
    );


  const memorySymbols = [

    "Aa",
    "✎",
    "◯",
    "01",
    "↗",
    "{ }",
    "♡",
    "✦"

  ];


  let firstCard = null;
  let secondCard = null;

  let lockBoard = false;

  let moves = 0;
  let matchedPairs = 0;


  // =========================
  // SHUFFLE
  // =========================

  function shuffleArray(array) {

    const shuffled =
      [...array];


    for (
      let i =
        shuffled.length - 1;

      i > 0;

      i--
    ) {

      const j =
        Math.floor(
          Math.random() *
          (i + 1)
        );


      [
        shuffled[i],
        shuffled[j]
      ] = [
        shuffled[j],
        shuffled[i]
      ];

    }


    return shuffled;

  }


  // =========================
  // RESET TURN
  // =========================

  function resetMemoryTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

  }


  // =========================
  // UPDATE MEMORY STATS
  // =========================

  function updateMemoryStats() {

    if (memoryMoves) {

      memoryMoves.textContent =
        moves;

    }


    if (memoryMatched) {

      memoryMatched.textContent =
        `${matchedPairs} / 8`;

    }

  }


  // =========================
  // HANDLE MEMORY CARD
  // =========================

  function handleMemoryCard(card) {

    if (lockBoard) return;


    if (
      card === firstCard
    ) {
      return;
    }


    if (
      card.classList.contains(
        "matched"
      )
    ) {
      return;
    }


    card.classList.add(
      "flipped"
    );


    if (!firstCard) {

      firstCard = card;

      return;

    }


    secondCard = card;

    lockBoard = true;

    moves++;

    updateMemoryStats();


    const firstValue =
      firstCard.dataset.memoryValue;


    const secondValue =
      secondCard.dataset.memoryValue;


    if (
      firstValue ===
      secondValue
    ) {

      firstCard.classList.add(
        "matched"
      );

      secondCard.classList.add(
        "matched"
      );


      matchedPairs++;

      updateMemoryStats();


      resetMemoryTurn();


      if (
        matchedPairs ===
        memorySymbols.length
      ) {

        setTimeout(() => {

          if (memoryComplete) {

            memoryComplete.classList.add(
              "show"
            );

            memoryComplete.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });

          }

        }, 500);

      }

    } else {

      setTimeout(() => {

        firstCard.classList.remove(
          "flipped"
        );

        secondCard.classList.remove(
          "flipped"
        );


        resetMemoryTurn();

      }, 850);

    }

  }


  // =========================
  // BUILD MEMORY GAME
  // =========================

  function buildMemoryGame() {

    if (!memoryGrid) return;


    memoryGrid.innerHTML = "";


    moves = 0;
    matchedPairs = 0;

    firstCard = null;
    secondCard = null;

    lockBoard = false;


    if (memoryComplete) {

      memoryComplete.classList.remove(
        "show"
      );

    }


    const memoryDeck =
      shuffleArray([
        ...memorySymbols,
        ...memorySymbols
      ]);


    memoryDeck.forEach(
      (symbol, index) => {

        const card =
          document.createElement(
            "button"
          );


        card.type =
          "button";


        card.className =
          "memory-card";


        card.dataset.memoryValue =
          symbol;


        card.setAttribute(
          "aria-label",
          `Memory card ${index + 1}`
        );


        const cardInner =
          document.createElement(
            "span"
          );


        cardInner.className =
          "memory-card-inner";


        const cardFront =
          document.createElement(
            "span"
          );


        cardFront.className =
          "memory-card-front";


        const cardBack =
          document.createElement(
            "span"
          );


        cardBack.className =
          "memory-card-back";


        cardBack.textContent =
          symbol;


        cardInner.appendChild(
          cardFront
        );


        cardInner.appendChild(
          cardBack
        );


        card.appendChild(
          cardInner
        );


        card.addEventListener(
          "click",
          () => {

            handleMemoryCard(
              card
            );

          }
        );


        memoryGrid.appendChild(
          card
        );

      }
    );


    updateMemoryStats();

  }


  // =========================
  // MEMORY RESET
  // =========================

  if (memoryReset) {

    memoryReset.addEventListener(
      "click",
      () => {

        buildMemoryGame();

      }
    );

  }


  // =========================
  // INITIALIZE MEMORY GAME
  // =========================

  buildMemoryGame();


  // =========================
  // ESCAPE KEY → HOME
  // =========================

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        showSection("home");

      }

    }
  );


  // =========================
  // INITIAL PAGE STATE
  // =========================

  updateHeartCounter();

});