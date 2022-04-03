(() => {
  const MOBILE_WIDTH = 576;
  const DESKTOP_WIDTH = 769;
  const btn = document.querySelector(".events__btn");

  const sliderMobileParams = {
    paginationClassName: "events__pagination",
    cardsContainerName: "events__wrapper-container",
    cardsWrapName: "events__wrapper",
    card: "events__slide",
    hiddenClass: "is-hidden", // ??
    eventsSlider: false,
  };

  function getWindowWidth() { // get max width on screen
    return Math.max(
      // document.body.scrollWidth,
      // document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateMobileSlider(params) { // ??
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.eventsSlider = new Swiper(`.${params.cardsContainerName}`, {
      // slidesPerView: 1,
      // spaceBetween: 100,
      pagination: {
        el: `.events__pagination`,
        clickable: true,
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          let pagin = document.querySelectorAll(".swiper-pagination")
          pagin.forEach((pagin) => {pagin.parentNode.removeChild(pagin)})
        }
      }
    });
  }

  function destroyMobileSlider(params) { // ??
    params.eventsSlider.destroy(true, true);
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function setHiddenCards(params, currentWidth) { // ??
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;

    if (currentWidth <= MOBILE_WIDTH) {
      quantity = cards.length;
    }

    if (currentWidth > MOBILE_WIDTH && currentWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }

    if (currentWidth >= DESKTOP_WIDTH) {
      quantity = 3;
    }

    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) { // ??
    const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

    e.target.style = "display: none";

    cards.forEach((card) => {
      card.classList.remove(sliderMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    btn.style = ""; // reset button style ???
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`); // swiper
    params.cardsWrap = document.querySelector(
      `.${params.cardsWrapName}`); // swiper wrapper

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.eventsSlider || params.eventsSlider.destroyed) // check swiper doesn't exist
    ) {
      setHiddenCards(params, currentWidth);
      activateMobileSlider(params);
      btn.classList.add(params.hiddenClass);
    } else if (currentWidth > MOBILE_WIDTH && params.eventsSlider) { //check swiper exist
      setHiddenCards(params, currentWidth);
      destroyMobileSlider(params);
      btn.classList.remove(params.hiddenClass);
    }


  }

  checkWindowWidthMobile(sliderMobileParams); // check at start
  btn.addEventListener("click", showCards);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(sliderMobileParams); // check at resize
    showCards;
  });
})();
