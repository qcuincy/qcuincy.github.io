var imageButton = document.getElementById('imageButton');
var videoButton = document.getElementById('videoButton');

var imageHolder = document.getElementById('imageHolder');
var videoHolder = document.getElementById('videoHolder');

imageButton.addEventListener('click', function () {
        toggleActive(imageButton, videoButton);
        videoHolder.classList.add('hidden');
        imageHolder.classList.remove('hidden');
        
});

videoButton.addEventListener('click', function () {
        toggleActive(videoButton, imageButton);
        imageHolder.classList.add('hidden');
        videoHolder.classList.remove('hidden');
});


function toggleActive(activeButton, inactiveButton) {
        console.log(inactiveButton.classList)
        if (activeButton.classList.contains('holder__active')) {
                return;
        }
        activeButton.classList.add('holder__active');
        if (inactiveButton.classList.contains('holder__active')) {
                inactiveButton.classList.remove('holder__active');
        }
        
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop:true,
  navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
  },
  pagination: {
          el: ".swiper-pagination",
          clickable: true,
  },
});




}
            
