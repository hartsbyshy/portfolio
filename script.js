document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body =
    document.body;

  const introScreen =
    document.getElementById("intro-screen");

  const enterBtn =
    document.getElementById("enter-btn");

  const music =
    document.getElementById("background-music");

  const musicToggle =
    document.getElementById("music-toggle");


  /* =======================================================
     INTRO
  ======================================================= */

  function updateMusicButton() {

    if (!music || !musicToggle) {
      return;
    }

    musicToggle.classList.toggle(
      "is-playing",
      !music.paused
    );


    musicToggle.setAttribute(
      "aria-label",
      music.paused
        ? "Play background music"
        : "Pause background music"
    );
  }


  function enterPortfolio() {

    if (!introScreen) {
      return;
    }


    introScreen.classList.add(
      "is-hidden"
    );


    body.classList.remove(
      "intro-open"
    );


    /*
      Goes directly to ABOUT.
      No extra home/hero page.
    */

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });


    if (music) {

      music.volume = 0.3;

      music
        .play()
        .then(updateMusicButton)
        .catch(updateMusicButton);

    }


    setTimeout(() => {

      introScreen.style.display =
        "none";

    }, 750);

  }


  if (enterBtn) {

    enterBtn.addEventListener(
      "click",
      enterPortfolio
    );

  }


  /* =======================================================
     MUSIC
  ======================================================= */

  if (music) {
    music.volume = 0.3;
  }


  if (musicToggle && music) {

    musicToggle.addEventListener(
      "click",
      async () => {

        if (music.paused) {

          try {

            await music.play();

          } catch (error) {

            console.log(
              "Audio requires user interaction."
            );

          }

        } else {

          music.pause();

        }


        updateMusicButton();

      }
    );


    music.addEventListener(
      "play",
      updateMusicButton
    );


    music.addEventListener(
      "pause",
      updateMusicButton
    );

  }


  /* =======================================================
     MOBILE NAV
  ======================================================= */

  const mobileToggle =
    document.getElementById(
      "mobile-menu-toggle"
    );


  const navLinks =
    document.getElementById(
      "nav-links"
    );


  function closeMobileMenu() {

    if (!mobileToggle || !navLinks) {
      return;
    }


    navLinks.classList.remove(
      "is-open"
    );


    mobileToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (mobileToggle && navLinks) {

    mobileToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle(
            "is-open"
          );


        mobileToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );

  }


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute("href");


        if (
          !href ||
          href === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (!target) {
          return;
        }


        event.preventDefault();


        closeMobileMenu();


        const nav =
          document.getElementById(
            "site-nav"
          );


        const navHeight =
          nav
            ? nav.offsetHeight + 28
            : 0;


        const position =
          target
            .getBoundingClientRect()
            .top +
          window.scrollY -
          navHeight;


        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


  /* =======================================================
     ACTIVE NAV
  ======================================================= */

  const navAnchors =
    document.querySelectorAll(
      ".nav-link"
    );


  const sections = [
    "about",
    "agenda",
    "work",
    "contact"
  ]
    .map(id =>
      document.getElementById(id)
    )
    .filter(Boolean);


  function updateActiveNavigation() {

    const position =
      window.scrollY +
      window.innerHeight * 0.35;


    let current =
      sections.length
        ? sections[0].id
        : "";


    sections.forEach(section => {

      if (
        position >=
        section.offsetTop
      ) {

        current =
          section.id;

      }

    });


    navAnchors.forEach(link => {

      const href =
        link.getAttribute("href");


      link.classList.toggle(
        "active",
        href === `#${current}`
      );

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 760
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const lightbox =
    document.getElementById(
      "lightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lightbox-image"
    );


  const lightboxClose =
    document.getElementById(
      "lightbox-close"
    );


  const artworkImages =
    document.querySelectorAll(
      ".art-item img"
    );


  function openLightbox(image) {

    if (
      !lightbox ||
      !lightboxImage
    ) {
      return;
    }


    lightboxImage.src =
      image.currentSrc ||
      image.src;


    lightboxImage.alt =
      image.alt ||
      "Portfolio artwork";


    lightbox.classList.add(
      "is-open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    body.style.overflow =
      "hidden";

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }


    lightbox.classList.remove(
      "is-open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    if (
      !body.classList.contains(
        "intro-open"
      )
    ) {

      body.style.overflow =
        "";

    }


    setTimeout(() => {

      if (lightboxImage) {

        lightboxImage.src =
          "";

      }

    }, 300);

  }


  artworkImages.forEach(image => {

    image.addEventListener(
      "click",
      () => {

        openLightbox(image);

      }
    );


    image.addEventListener(
      "dragstart",
      event => {

        event.preventDefault();

      }
    );

  });


  if (lightboxClose) {

    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeLightbox();

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     VIDEO + MUSIC
  ======================================================= */

  const videos =
    document.querySelectorAll(
      ".video-project video"
    );


  videos.forEach(video => {

    video.addEventListener(
      "play",
      () => {


        /*
          Only one portfolio video
          plays at a time.
        */

        videos.forEach(
          otherVideo => {

            if (
              otherVideo !== video &&
              !otherVideo.paused
            ) {

              otherVideo.pause();

            }

          }
        );


        /*
          Pause background music while
          the video is playing.
        */

        if (
          music &&
          !music.paused
        ) {

          video.dataset.resumeMusic =
            "true";


          music.pause();

        }

      }
    );


    video.addEventListener(
      "ended",
      () => {

        if (
          !music ||
          video.dataset.resumeMusic
            !== "true"
        ) {

          return;

        }


        video.dataset.resumeMusic =
          "false";


        music
          .play()
          .catch(() => {});

      }
    );

  });


  /* =======================================================
     MATCHING GAME
  ======================================================= */

  const memoryBoard =
    document.getElementById(
      "memory-board"
    );


  const movesDisplay =
    document.getElementById(
      "moves"
    );


  const matchedDisplay =
    document.getElementById(
      "matched"
    );


  const restartButton =
    document.getElementById(
      "restart-game"
    );


  const completeMessage =
    document.getElementById(
      "memory-complete"
    );


  /*
    Monochrome symbols only.
    No colorful emoji.
  */

  const symbols = [
    "Aa",
    "✎︎",
    "○︎",
    "01",
    "↗︎",
    "{ }",
    "♡︎",
    "✦︎"
  ];


  let firstCard = null;
  let secondCard = null;

  let locked = false;

  let moves = 0;
  let matches = 0;


  /* =======================================================
     SHUFFLE
  ======================================================= */

  function shuffle(items) {

    const shuffled =
      [...items];


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


  /* =======================================================
     UPDATE GAME STATS
  ======================================================= */

  function updateStats() {

    if (movesDisplay) {

      movesDisplay.textContent =
        moves;

    }


    if (matchedDisplay) {

      matchedDisplay.textContent =
        matches;

    }

  }


  /* =======================================================
     RESET TURN
  ======================================================= */

  function resetTurn() {

    firstCard = null;
    secondCard = null;

    locked = false;

  }


  /* =======================================================
     FLIP CARD
  ======================================================= */

  function flipCard(card) {

    if (
      locked ||
      card === firstCard ||
      card.classList.contains(
        "is-matched"
      )
    ) {

      return;

    }


    card.classList.add(
      "is-flipped"
    );


    if (!firstCard) {

      firstCard =
        card;

      return;

    }


    secondCard =
      card;


    moves++;


    updateStats();


    const firstSymbol =
      firstCard.dataset.symbol;


    const secondSymbol =
      secondCard.dataset.symbol;


    /* MATCH */

    if (
      firstSymbol ===
      secondSymbol
    ) {

      firstCard.classList.add(
        "is-matched"
      );


      secondCard.classList.add(
        "is-matched"
      );


      firstCard.disabled =
        true;


      secondCard.disabled =
        true;


      matches++;


      updateStats();


      resetTurn();


      if (
        matches ===
        symbols.length
      ) {

        if (completeMessage) {

          completeMessage
            .classList.add(
              "show"
            );

        }

      }


      return;

    }


    /* NOT A MATCH */

    locked = true;


    setTimeout(() => {

      firstCard.classList.remove(
        "is-flipped"
      );


      secondCard.classList.remove(
        "is-flipped"
      );


      resetTurn();

    }, 750);

  }


  /* =======================================================
     CREATE CARD
  ======================================================= */

  function createCard(
    symbol,
    index
  ) {

    const card =
      document.createElement(
        "button"
      );


    card.type =
      "button";


    card.className =
      "memory-card";


    card.dataset.symbol =
      symbol;


    card.setAttribute(
      "aria-label",
      `Memory card ${index + 1}`
    );


    /*
      Your Harts by Shy logo
      appears on the CLOSED side.
    */

    card.innerHTML = `

      <span class="memory-card-inner">

        <span
          class="memory-face memory-front"
        >

          <img
            src="logo/logo-1.png"
            alt=""
            class="memory-logo"
          >

        </span>


        <span
          class="memory-face memory-back"
        >

          ${symbol}

        </span>

      </span>

    `;


    card.addEventListener(
      "click",
      () => {

        flipCard(card);

      }
    );


    return card;

  }


  /* =======================================================
     START GAME
  ======================================================= */

  function startGame() {

    if (!memoryBoard) {
      return;
    }


    memoryBoard.innerHTML =
      "";


    firstCard = null;
    secondCard = null;

    locked = false;

    moves = 0;
    matches = 0;


    if (completeMessage) {

      completeMessage
        .classList.remove(
          "show"
        );

    }


    updateStats();


    const deck =
      shuffle([
        ...symbols,
        ...symbols
      ]);


    deck.forEach(
      (symbol, index) => {

        memoryBoard.appendChild(
          createCard(
            symbol,
            index
          )
        );

      }
    );

  }


  if (restartButton) {

    restartButton.addEventListener(
      "click",
      startGame
    );

  }


  startGame();


  /* =======================================================
     SUBTLE SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(`
      .about-image-wrap,
      .agenda-title,
      .agenda-stack,
      .work-statement,
      .portfolio-header,
      .art-item,
      .video-project,
      .play-copy,
      .memory-board,
      .website-note-content,
      .contact-content
    `);


  revealElements.forEach(
    element => {

      element.classList.add(
        "reveal"
      );

    }
  );


  if (
    "IntersectionObserver"
    in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList.add(
                    "is-visible"
                  );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {

          threshold: 0.06,

          rootMargin:
            "0px 0px -35px 0px"

        }
      );


    revealElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  }

});