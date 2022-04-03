window.addEventListener("DOMContentLoaded", function() {

  const MOBILE_WIDTH = 576;
  const DESKTOP_WIDTH = 769;

  // common functions
  function getWindowWidth() {
    return Math.max(
      // document.body.scrollWidth,
      // document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function scrollToContent (link, isMobile) {
    if (isMobile && getWindowWidth() > DESKTOP_WIDTH) {
      return;
    }

    const href = link.getAttribute("href").substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: "smooth"
    });
  }


  //header
  function headerInit() {
    const dropdownBtns = document.querySelectorAll(".dropdown__btn");
    const burgerOpen = document.querySelector(".burger__opener");
    function hasClass(array, classSearched) {
      for (let i = 0; i < array.length; ++i) {
        if (array[i] === classSearched) return true;
      }
      return false;
    }

    // get open/close function to dropdown and search
    document.addEventListener("click", function(event) {
      const searchOpen = document.querySelector(".header__search-clicker");
      const searchModal = document.querySelector(".header__search");
      const searchInput = document.querySelector(".search__input");
      function searchReset() {
        searchOpen.classList.remove("search-is-active");
        searchOpen.removeAttribute("tabindex");
        searchOpen.style.opacity = "1";
        searchInput.value="";
      }
      function searchActive() {
        searchOpen.classList.add("search-is-active");
        searchOpen.setAttribute("tabindex", "-1");
        searchOpen.style.opacity = "0";
        searchInput.focus();
      }

      searchModal.addEventListener("submit", searchReset);
      if (event.target !== searchModal 
        && event.target !== searchInput 
        && hasClass(searchOpen.classList, "search-is-active")) {
          searchReset();
      } else if (event.target === searchOpen 
        && !hasClass(event.target.classList, "search-is-active")) {
          searchActive();
      }

        // Set BG to dropdown items
      if (hasClass(event.target.classList, "dropdown__btn")) {
        document.querySelectorAll(".dropdown__link").forEach((thumb) => {
          thumb.parentElement.style.backgroundImage=`url("./img/dropdown/${thumb.innerHTML}.jpg")`;
        });

        if (hasClass(event.target.classList, "is-active")) {
          dropdownBtns.forEach((del) => {del.classList.remove("is-active");});
        } else {
          dropdownBtns.forEach((del) => {del.classList.remove("is-active");});
          event.target.classList.add("is-active");
        }
      } else {
        dropdownBtns.forEach((del) => {del.classList.remove("is-active");});
      }
    });

    // get open/close function to burger menu
    burgerOpen.addEventListener("click", () => {
      const burgerCloser = document.querySelector(".burger-closer");
      const menu = document.querySelector(".header__menu");
      const navLink = document.querySelectorAll(".nav__link");
      function burgerClose() {
        menu.classList.remove("is-active");
        document.body.style.overflow = "auto";
      }

      menu.classList.add("is-active");
      document.body.style.overflow = "hidden";
      burgerCloser.addEventListener("click", burgerClose);
      navLink.forEach((link) => {
        link.addEventListener("click", () => {
          burgerClose();
          scrollToContent(link, true);
        });
      });
    });
  }
  headerInit();

  //hero
  const swiperHero = new Swiper(".hero__swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  // gallery
  function galleryInit(){
    // init swiper
    const swiperGallery = new Swiper(".gallery__swiper", {
      slidesPerView: 1,
      // spaceBetween: 0,
      grid: {
        rows: 1,
        fill: "row",
      },
      navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
      },
      pagination: {
        el: ".gallery-pagination",
        type: "fraction",
      },

      breakpoints: {
        441: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
          grid: {
            rows: 2,
          },
        },

        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
          grid: {
            rows: 2,
          },
        }
      },
    });

    // init choices
    const selector = document.querySelector("#gallery__select")
    const choices = new Choices(selector, {
      searchEnabled: false,
      itemSelectText: "",
    });

    const slides1 = [
      '<button class="swiper-slide gallery__slide" data-set="1" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/1.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/1.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/1.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/1.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/1.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/1.jpg"><source srcset="./img/gallery/320/1.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/1.jpg" loading="lazy" alt="Картина 1"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="2" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/2.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/2.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/2.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/2.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/2.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/2.jpg"><source srcset="./img/gallery/320/2.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/2.jpg" loading="lazy" alt="Картина 2"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="3" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/3.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/3.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/3.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/3.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/3.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/3.jpg"><source srcset="./img/gallery/320/3.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/3.jpg" loading="lazy" alt="Картина 3"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="4" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/4.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/4.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/4.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/4.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/4.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/4.jpg"><source srcset="./img/gallery/320/4.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/4.jpg" loading="lazy" alt="Картина 4"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="5" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/5.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/5.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/5.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/5.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/5.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/5.jpg"><source srcset="./img/gallery/320/5.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/5.jpg" loading="lazy" alt="Картина 5"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="6" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/6.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/6.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/6.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/6.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/6.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/6.jpg"><source srcset="./img/gallery/320/6.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/6.jpg" loading="lazy" alt="Картина 6"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="7" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/7.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/7.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/7.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/7.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/7.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/7.jpg"><source srcset="./img/gallery/320/7.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/7.jpg" loading="lazy" alt="Картина 7"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="8" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/8.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/8.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/8.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/8.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/8.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/8.jpg"><source srcset="./img/gallery/320/8.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/8.jpg" loading="lazy" alt="Картина 8"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="9" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/9.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/9.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/9.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/9.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/9.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/9.jpg"><source srcset="./img/gallery/320/9.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/9.jpg" loading="lazy" alt="Картина 9"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="10" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/10.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/10.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/10.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/10.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/10.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/10.jpg"><source srcset="./img/gallery/320/10.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/10.jpg" loading="lazy" alt="Картина 10"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="11" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/11.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/11.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/11.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/11.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/11.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/11.jpg"><source srcset="./img/gallery/320/11.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/11.jpg" loading="lazy" alt="Картина 11"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="12" data-filter="1"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/12.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/12.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/12.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/12.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/12.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/12.jpg"><source srcset="./img/gallery/320/12.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/12.jpg" loading="lazy" alt="Картина 12"></picture></button>',
    ]

    const slides2 = [
      '<button class="swiper-slide gallery__slide" data-set="13" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/13.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/13.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/13.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/13.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/13.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/13.jpg"><source srcset="./img/gallery/320/13.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/13.jpg" loading="lazy" alt="Картина 13"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="14" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/14.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/14.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/14.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/14.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/14.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/14.jpg"><source srcset="./img/gallery/320/14.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/14.jpg" loading="lazy" alt="Картина 14"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="15" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/15.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/15.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/15.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/15.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/15.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/15.jpg"><source srcset="./img/gallery/320/15.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/15.jpg" loading="lazy" alt="Картина 15"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="16" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/16.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/16.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/16.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/16.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/16.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/16.jpg"><source srcset="./img/gallery/320/16.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/16.jpg" loading="lazy" alt="Картина 16"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="17" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/17.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/17.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/17.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/17.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/17.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/17.jpg"><source srcset="./img/gallery/320/17.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/17.jpg" loading="lazy" alt="Картина 17"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="18" data-filter="2"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/18.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/18.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/18.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/18.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/18.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/18.jpg"><source srcset="./img/gallery/320/18.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/18.jpg" loading="lazy" alt="Картина 18"></picture></button>',
    ]

    const slides3 = [
      '<button class="swiper-slide gallery__slide" data-set="19" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/19.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/19.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/19.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/19.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/19.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/19.jpg"><source srcset="./img/gallery/320/19.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/19.jpg" loading="lazy" alt="Картина 19"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="20" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/20.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/20.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/20.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/20.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/20.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/20.jpg"><source srcset="./img/gallery/320/20.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/20.jpg" loading="lazy" alt="Картина 20"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="21" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/21.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/21.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/21.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/21.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/21.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/21.jpg"><source srcset="./img/gallery/320/21.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/21.jpg" loading="lazy" alt="Картина 21"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="22" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/22.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/22.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/22.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/22.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/22.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/22.jpg"><source srcset="./img/gallery/320/22.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/22.jpg" loading="lazy" alt="Картина 22"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="23" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/23.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/23.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/23.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/23.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/23.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/23.jpg"><source srcset="./img/gallery/320/23.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/23.jpg" loading="lazy" alt="Картина 23"></picture></button>',
      '<button class="swiper-slide gallery__slide" data-set="24" data-filter="3"><picture><source media="(min-width: 1025px)" srcset="./img/gallery/1920/24.webp" type="image/webp"><source media="(min-width: 1025px)" srcset="./img/gallery/1920/24.jpg"><source media="(min-width: 769px)" srcset="./img/gallery/1024/24.webp" type="image/webp"><source media="(min-width: 769px)" srcset="./img/gallery/1024/24.jpg"><source media="(min-width: 441px)" srcset="./img/gallery/768/24.webp" type="image/webp"><source media="(min-width: 441px)" srcset="./img/gallery/768/24.jpg"><source srcset="./img/gallery/320/24.webp" type="image/webp"><img class="gallery__image" src="./img/gallery/320/24.jpg" loading="lazy" alt="Картина 24"></picture></button>',
    ]
    

    selector.addEventListener(
      'addItem',
      function(event) {
        if (event.detail.value === "all") {
          swiperGallery.removeAllSlides();
          swiperGallery.appendSlide(slides1);
          swiperGallery.appendSlide(slides2);
          swiperGallery.appendSlide(slides3);
          modalBtns = document.querySelectorAll(".gallery__slide");
          modalBtns.forEach((elem) => {
            elem.addEventListener("click", activateModal);
          });
        }

        if (event.detail.value === "1") {
          swiperGallery.removeAllSlides();
          swiperGallery.appendSlide(slides1);
          modalBtns = document.querySelectorAll(".gallery__slide");
          modalBtns.forEach((elem) => {
            elem.addEventListener("click", activateModal);
          });
        }

        if (event.detail.value === "2") {
          swiperGallery.removeAllSlides();
          swiperGallery.appendSlide(slides2);
          modalBtns = document.querySelectorAll(".gallery__slide");
          modalBtns.forEach((elem) => {
            elem.addEventListener("click", activateModal);
          });
        }

        if (event.detail.value === "3") {
          swiperGallery.removeAllSlides();
          swiperGallery.appendSlide(slides3);
          modalBtns = document.querySelectorAll(".gallery__slide");
          modalBtns.forEach((elem) => {
            elem.addEventListener("click", activateModal);
          });
        }

      },
      false,
    );

    // init modals
    const modal = document.querySelector(".gallery__modal");
    let modalBtns = document.querySelectorAll(".gallery__slide");
    const modalWindows = document.querySelectorAll(".window");
    function closeModal() {
      modal.classList.remove("is-active");
      document.body.style.overflow = "auto";
      modalWindows.forEach((win) => { win.classList.remove("is-active"); });
    }

    function activateModal(el) {
      const path = el.currentTarget.getAttribute("data-set");

      modalWindows.forEach((win) => {
        const closer = win.querySelector(".window__close");

        if (win.getAttribute("data-target") == path) {win.classList.add("is-active");}
        else {win.classList.remove("is-active");}

        closer.addEventListener("click", closeModal);
      });

      modal.classList.add("is-active");
      document.body.style.overflow = "hidden";
    }

    modalBtns.forEach((elem) => {
      elem.addEventListener("click", activateModal);
    });

    modal.addEventListener("click", (el) => {
      if (el.target === modal) closeModal();
    });
  }
  galleryInit();

  // accordion
  function accordionInit() {
    const flags = document.querySelectorAll(".flag");
    const accs =  document.querySelectorAll(".catalogue__tab");
    function changeAcc() {
      const countryFlag = document.querySelector(".flag.is-active").getAttribute("data-set");

      accs.forEach((acc) => {
        if (acc.getAttribute("data-target") === countryFlag) {
          acc.classList.add("is-active");
          acc.classList.remove("complete-hidden");
          acc.style.width = 100 + "%";
        } else {
          acc.classList.remove("is-active");
          acc.classList.add("complete-hidden");
          acc.style.width = null;
        }
      });
    }

    // get tabs change
    changeAcc();
    flags.forEach((flag) => {
      flag.addEventListener("click", (event) => {
        flags.forEach((flag) => {flag.classList.remove("is-active");});
        event.target.classList.add("is-active");
        changeAcc();
      });
    });

    // get open/close function to accordion
    const accTab = document.querySelectorAll(".accordion__wrap");
    accTab.forEach(acc => {
      const panel = acc.querySelector(".accordion__panel");
      function hidePanel() {
        panel.style.maxHeight = null;
        setTimeout(()=>{panel.classList.add("complete-hidden");}, 200);
      }
      function openPanel() {
        panel.classList.remove("complete-hidden");
        panel.style.maxHeight = panel.children[0].scrollHeight + 40 + "px";
      }

      if (acc.classList.contains("is-active")) { openPanel(); }
      else { hidePanel(); }

      const accBtn = acc.querySelector(".accordion__btn");
      accBtn.addEventListener("click", (btn) => {
        const elem = btn.currentTarget.parentNode;
        elem.classList.toggle("is-active");

        if (elem.classList.contains("is-active")) { openPanel(); }
        else { hidePanel(); }
      });

    });


    // function scrollToContent (link, isMobile) {
    //   if (isMobile && getWindowWidth() > DESKTOP_WIDTH) {
    //     return;
    //   }

    //   const href = link.getAttribute("href").substring(1);
    //   const scrollTarget = document.getElementById(href);
    //   const elementPosition = scrollTarget.getBoundingClientRect().top;

    //   window.scrollBy({
    //     top: elementPosition,
    //     behavior: "smooth"
    //   });
    // }

    // get author changing for accordion

    accs.forEach(currentTab => {
      const links = currentTab.querySelectorAll(".panel__link");
      const card = currentTab.querySelector(".tab__card");
      function fillCard(link) {
        if (link.target.textContent === "Доменико Гирландайо") {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-girlandayo.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Доменико Гирландайо");
          currentTab.querySelector(".card__title").textContent = "Доменико Гирландайо";
          currentTab.querySelector(".card__date").innerHTML = "2&nbsp;июня 1448&nbsp;&mdash; 11&nbsp;января 1494.";
          currentTab.querySelector(".card__text").innerHTML = `Один из&nbsp;ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).`;
        } else if (link.target.textContent === "Бартелеми д’Эйк") {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-france.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Бартелеми д’Эйк");
          currentTab.querySelector(".card__title").textContent = "Бартелеми д’Эйк";
          currentTab.querySelector(".card__date").innerHTML = "ок.&nbsp;1420&nbsp;&mdash; после 1470.";
          currentTab.querySelector(".card__text").innerHTML = `Имя Бартелеми д’Эйка давно известно по&nbsp;историческим документам. Он&nbsp;был придворным художником короля Рене Доброго и&nbsp;имел высокую репутацию как выдающийся мастер, о&nbsp;чём свидетельствуют отзывы современников. Исследователи отмечали, что миниатюры, которые приписываются кисти Мастера короля Рене, на&nbsp;удивление однородны по&nbsp;своим высоким качествам, а&nbsp;стиль их&nbsp;сугубо индивидуален.`;
        } else if (link.target.textContent === "Плейденвурф, Ганс") {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-germany.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Плейденвурф, Ганс");
          currentTab.querySelector(".card__title").textContent = "Плейденвурф, Ганс";
          currentTab.querySelector(".card__date").innerHTML = "ок.&nbsp;1420&nbsp;&mdash; 9&nbsp;января 1472.";
          currentTab.querySelector(".card__text").innerHTML = `С&nbsp;1457&nbsp;г. Ганс Плейденвурф обосновался в&nbsp;Нюрнберге и&nbsp;ввёл новый реалистичный стиль в&nbsp;местной живописи, проникнутый влиянием голландской живописи. Предположительно Плейденвурф был учителем Михаэля Вольгемута. Его сын Вильгельм Плейденвурф вместе с&nbsp;Михаэлем Вольгемутом выполнил ксилографии для Хроники Гартмана Шеделя. Другой сын Ганса Плейденвурфа Себальд переехал в&nbsp;Айслебен, о&nbsp;его профессии ничего не&nbsp;известно.`;
        } else if (link.target.textContent === "Андрей Рублёв") {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-russia.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Андрей Рублёв");
          currentTab.querySelector(".card__title").textContent = "Андрей Рублёв";
          currentTab.querySelector(".card__date").innerHTML = "около 1360&nbsp;&mdash; 17&nbsp;октября 1428.";
          currentTab.querySelector(".card__text").innerHTML = `Русский иконописец московской школы иконописи, книжной и&nbsp;монументальной живописи XV&nbsp;века. Канонизирован Русской православной церковью в&nbsp;лике преподобных. Большинство исследователей согласны с&nbsp;тем, что&nbsp;им, скорее всего, написана &laquo;Владимирская Богоматерь&raquo; (около 1409, Успенский собор, Владимир) и&nbsp;часть миниатюр &laquo;Евангелия Хитрово&raquo;.`;
        } else if (link.target.textContent === "Говартс, Абрахам") {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-belgium.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Говартс, Абрахам");
          currentTab.querySelector(".card__title").textContent = "Говартс, Абрахам";
          currentTab.querySelector(".card__date").innerHTML = "30&nbsp;августа 1589&nbsp;&mdash; 9&nbsp;сентября 1626.";
          currentTab.querySelector(".card__text").innerHTML = `Художественное образование получил в&nbsp;мастерских Яна Брейгеля Старшего и&nbsp;Гиллиса ван Конингсло. В&nbsp;1607/1608 годах Абрахам Говартс становится мастером в&nbsp;антверпенской гильдии святого Луки, объединявшей художников этого города. В&nbsp;1622 году он&nbsp;вступает в&nbsp;брак с&nbsp;Изабеллой Гиллис, от&nbsp;которой имел двух дочерей. Обладал известным достатком, владея в&nbsp;Антверпене двумя домами.`;
        } else {
          currentTab.querySelector(".card__pic").setAttribute("src", "./img/catalogue/catalogue-placeholder.jpg");
          currentTab.querySelector(".card__pic").setAttribute("alt", "Неизвестный художник");
          currentTab.querySelector(".card__title").textContent = "Что мы о нём знаем?";
          currentTab.querySelector(".card__date").textContent = "";
          currentTab.querySelector(".card__text").innerHTML = `Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<br><a href="#gallery" class="link-placeholder">В галерею</a>`;
        }
      }

      links.forEach(link => {
        link.addEventListener("click", (el) => {
          function cardFader() {
            card.classList.toggle("hidden");
          }
          el.preventDefault();

          cardFader();
          setTimeout(fillCard(el), 200);
          setTimeout(cardFader, 400);
          scrollToContent(el.target, true);
        });
      });
    });
  }
  accordionInit();

  //events
  function eventsInit() {
    const btn = document.querySelector(".events__btn");

    const sliderMobileParams = {
      paginationClassName: "events__pagination",
      cardsContainerName: "events__wrapper-container",
      cardsWrapName: "events__wrapper",
      card: "events__slide",
      hiddenClass: "is-hidden",
      eventsSlider: false,
    };

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add("events__pagination");
      pagination.classList.add("swiper-pagination");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);
      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.eventsSlider = new Swiper(`.${params.cardsContainerName}`, {
        pagination: {
          el: ".events__pagination",
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
            let pagin = document.querySelectorAll(".events__pagination");
            pagin.forEach((pagin) => {pagin.parentNode.removeChild(pagin);});
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

      if (currentWidth <= MOBILE_WIDTH) {quantity = cards.length;}
      if (currentWidth > MOBILE_WIDTH && currentWidth < DESKTOP_WIDTH) {quantity = 2;}
      if (currentWidth >= DESKTOP_WIDTH) {quantity = 3;}

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

      setHiddenCards(params, currentWidth);

      if (
        currentWidth <= MOBILE_WIDTH &&
        (!params.eventsSlider || params.eventsSlider.destroyed) // check swiper doesn"t exist
      ) {
        activateMobileSlider(params);
        btn.classList.add(params.hiddenClass);
      } else if (currentWidth > MOBILE_WIDTH && params.eventsSlider) { //check swiper exist
        destroyMobileSlider(params);
        btn.classList.remove(params.hiddenClass);
      }
    }

    btn.addEventListener("click", showCards);
    checkWindowWidthMobile(sliderMobileParams); // check at start
    window.addEventListener("resize", () => { checkWindowWidthMobile(sliderMobileParams); }); // check at resize
  }
  eventsInit();

  // books
  function booksInit(){

    // init swiper
    const sliderMobileParams = {
      paginationClassName: "books__pagination",
      cardsContainerName: "books__wrapper-container",
      cardsWrapName: "books__swiper-wrapper",
      card: "books__book",
      hiddenClass: "is-hidden",
      eventsSlider: false,
    };

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add("books__pagination");
      pagination.classList.add("swiper-pagination");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);
      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.eventsSlider = new Swiper(`.${params.cardsContainerName}`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
  
        navigation: {
          nextEl: ".books-button-next",
          prevEl: ".books-button-prev",
        },
        pagination: {
          el: ".books-pagination",
          type: "fraction",
        },
  
        breakpoints: {
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
          },
          1025: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          }
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
            let pagin = document.querySelectorAll(".books__pagination");
            pagin.forEach((pagin) => {pagin.parentNode.removeChild(pagin);});
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
      params.eventsSlider = false;
    }

    function checkWindowWidthMobile(params) {
      const currentWidth = getWindowWidth();
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`); // swiper
      params.cardsWrap = document.querySelector(
        `.${params.cardsWrapName}`); // swiper wrapper

      if (
        currentWidth > MOBILE_WIDTH &&
        (!params.eventsSlider || params.eventsSlider.destroyed) // check swiper doesn"t exist
      ) {
        activateMobileSlider(params);
      } else if (currentWidth <= MOBILE_WIDTH && params.eventsSlider) { //check swiper exist
        destroyMobileSlider(params);
      }
    }

    checkWindowWidthMobile(sliderMobileParams); // check at start
    window.addEventListener("resize", () => { checkWindowWidthMobile(sliderMobileParams); }); // check at resize

    // checkbox dropdown window
    const checkboxOpener = document.querySelector("button.books__checkwrap-text");
    const checkBoxWrap = document.querySelector(".books__dropdown-wrapper");
    const checkBoxDouble = document.querySelector(".books__checkwrap-dropdown");

    checkboxOpener.addEventListener("click", function opener() {
      // checkboxOpener.preventDefault();
      checkBoxDouble.classList.toggle("is-active");
      checkboxOpener.classList.toggle("is-active");
      checkBoxDouble.parentNode.classList.toggle("is-active");
      if (checkBoxDouble.classList.contains("is-active")) {
        checkBoxDouble.classList.remove("complete-hidden");
      } else {
        setTimeout(() => { checkBoxDouble.classList.add("complete-hidden"); }, 200);
      }

    });

    checkBoxWrap.querySelectorAll(".books__checkbox").forEach(elem => {
      elem.addEventListener("change", () => {
        const id = elem.getAttribute("id").split("-").pop();
        const mainId = document.querySelector(`#main-${id}`);
        const doubleId = document.querySelector(`#double-${id}`);
        doubleId.checked = elem.checked;
        mainId.checked = elem.checked;
        mainId.parentNode.parentNode.classList.toggle("visible");
        mainId.parentNode.classList.toggle("is-active");
        doubleId.parentNode.classList.toggle("is-active");
      });
    });
  }
  booksInit();

  // projects
  function projectsInit(){
    // init swiper
    const swiperProjects = new Swiper(".projects__swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      // width: 450,

      navigation: {
        nextEl: ".projects-button-next",
        prevEl: ".projects-button-prev",
      },

      breakpoints: {
        661: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
        },
        769: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50,
        },
        1301: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        }
      },
    });

    tippy("#tip-1", {
      content: "Пример современных тенденций - современная методология разработки",
      trigger: "click",
      hideOnClick: true,
    });
    tippy("#tip-2", {
      content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
      trigger: "click",
      hideOnClick: true,
    });
    tippy("#tip-3", {
      content: "В стремлении повысить качество",
      trigger: "click",
      hideOnClick: true,
    });

  }
  projectsInit();
});
