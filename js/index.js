window.addEventListener('DOMContentLoaded', function() {

  // get open/close function to dropdown and search
  document.onclick = function(event) {
    if (event.target.classList[1] === 'dropdown__caption') {
      if (event.target.classList[2] !== 'is-active') {
        document.querySelectorAll('.dropdown__caption').forEach(function(del) {
          del.classList.remove('is-active')
          });
          event.target.classList.add('is-active');
      }
      else event.target.classList.remove('is-active');
    } else {
      document.querySelectorAll('.dropdown__caption').forEach(function(del) {
        del.classList.remove('is-active')
        })
    };
    if (event.target.classList[0] === 'header__search-clicker') {
      if (event.target.classList[1] !== 'is-active') {
          event.target.classList.add('is-active');
      }
      // else event.target.classList.remove('is-active');
    } else if (event.target.classList[1] !== 'header__search'){
      document.querySelector('.header__search-clicker').classList.remove('is-active')
    };
  }


  // get open/close function to burger
  document.querySelector('.burger').onclick = function() {
    document.querySelector('.burger').classList.add('is-active')
  }
  document.querySelector('.burger__closer').onclick = function() {
    document.querySelector('.burger').classList.remove('is-active')
  }


  // Set BG to dropdown items
  document.querySelectorAll('.dropdown__link').forEach(function(thumb) {
    thumb.parentElement.style.backgroundImage=`url('./img/dropdown/${thumb.innerHTML}.jpg')`
  })
})
