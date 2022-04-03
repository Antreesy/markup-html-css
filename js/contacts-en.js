function getMap(){
  // map drawing
  var myMap = new ymaps.Map("map", {
    center: [55.760,37.610],
    controls: ["smallMapDefaultSet"],
    zoom: 14,
  });

  ymaps.geocode("Москва, Леонтьевский переулок, дом 5/1").then(function (res) {
    var coord = res.geoObjects.get(0).geometry.getCoordinates();
    let myPlacemark = new ymaps.Placemark([55.75846806898367,37.60108849999989], {}, {
      iconLayout: "default#image",
      iconImageHref: "img/marker.svg",
      iconImageSize: [20, 20],
    });
    myMap.geoObjects.add(myPlacemark); 
    
    myMap.controls.remove("zoomControl");
    myMap.controls.remove("fullscreenControl");
    myMap.controls.remove("typeSelector");
    myMap.controls.remove("searchControl");
    myMap.controls.remove("geolocationControl");
  });
}

window.addEventListener("load", function() {

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
  
  // contacts
  function contactsInit(){

    // phone mask
    const phoneInput = document.querySelector("input[type='tel']");

    const im = new Inputmask("+99(999)-999-9999");
    im.mask(phoneInput);

    // validate and send

    new window.JustValidate ("#contacts__form", {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLength: 30,
          strength: {custom: "^[a-zA-Zа-яА-ЯёЁ]+$"}
        },
        tel: {
          required: true,
          minLength: 16,
        },
      },

      messages: {
        name: {
          required: "Required field",
          minLength: "Enter at least two characters",
          maxLength: "Enter no more than thirty characters",
          strength: "Invalid characters in name",
        },
        tel: "Required field",
      },
        
      submitHandler: function(form) {
        let formData = new FormData(form);
        
        fetch("mail.php", {
          method: "POST",
          body: formData,
        }).then(() => {
          // console.log("Отправлено");
          form.reset();
          // showModal();
          document.querySelector(`[data-validate-field="name"]`).value = "";
          document.querySelector(`[data-validate-field="tel"]`).value = "";
        })
        .catch(() => {
          // console.log("Ошибка");
          // showModal();
        });
      },
  });

function showModal() {
      // init modals
      const modal = document.querySelector(".contacts__modal");
      const modalBtn = document.querySelector(".form__btn-modal");
      const modalWindow = modal.querySelector(".window");
      function closeModal() {
        modal.classList.remove("is-active");
        document.body.style.overflow = "auto";
        modalWindow.classList.remove("is-active");
      }
  
      modalBtn.addEventListener("click", (el) => {
        const path = el.currentTarget.getAttribute("data-set");

          const closer = modalWindow.querySelector(".window__close");

          if (modalWindow.getAttribute("data-target") == path) {modalWindow.classList.add("is-active");}
          else {modalWindow.classList.remove("is-active");}

          closer.addEventListener("click", closeModal);

        modal.classList.add("is-active");
        document.body.style.overflow = "hidden";
      });
  
      modal.addEventListener("click", (el) => {
        if (el.target === modal) closeModal();
      });
}
showModal()

  }
  contactsInit();
});
