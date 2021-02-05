function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');
  let slides = carousel.querySelectorAll('.carousel__slide');
  let slideWidth = slides[0].offsetWidth;
  let currentSlidePosition = 0;

  let rightButton = document.querySelector('.carousel__arrow_right');
  let leftButton = document.querySelector('.carousel__arrow_left');

  rightButton.style.display = '';
  leftButton.style.display = 'none';

  rightButton.addEventListener('click', transformRight);
  leftButton.addEventListener('click', transformLeft);
  rightButton.addEventListener('click', checkPosition);
  leftButton.addEventListener('click', checkPosition);

  function transformRight() {
    currentSlidePosition -= slideWidth;
    carousel.style.transform = 'translateX(' + currentSlidePosition + 'px)';
  };

  function transformLeft() {
    currentSlidePosition += slideWidth;
    carousel.style.transform = 'translateX(' + currentSlidePosition + 'px)';
  };

  function checkPosition() {
    if (currentSlidePosition == -slideWidth * (slides.length - 1)) {
      rightButton.style.display = 'none';
    } else {
      rightButton.style.display = '';

    }

    if (currentSlidePosition < 0) {
      leftButton.style.display = '';
    } else {
      leftButton.style.display = 'none';
    }
  }
}
