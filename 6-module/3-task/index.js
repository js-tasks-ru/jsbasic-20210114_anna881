import createElement from '../../assets/lib/create-element.js';
export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    let carousel = document.createElement('div');
    carousel.classList.add('carousel');

    let buttons = getButtonHtml();
    carousel.innerHTML = buttons;
    
    let carouselInner = document.createElement('div');
    carousel.appendChild(carouselInner);
    carouselInner.classList.add('carousel__inner');
    
    let carouseSlides = getSlidesHtml(slides);
    carouselInner.innerHTML = carouseSlides;

    function getSlidesHtml(slides) {
      let htmlStr = '';
      
      slides.forEach(slide => {
        let slideHtml = getSlideHtml(slide);
        htmlStr += slideHtml;
      });
      
      return htmlStr;
    }
    
    function getSlideHtml(slideObj) {
      return `
        <div class="carousel__slide" data-id="${slideObj.id}">
            <img src="/assets/images/carousel/${slideObj.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
                <span class="carousel__price">${getPriceStr(slideObj.price)}</span>
                <div class="carousel__title">${slideObj.name}</div>
                <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
        </div>`
    }
      
    function getPriceStr(price) {
      return '€' + price.toFixed(2);
    }
      
    function getButtonHtml() {
      return `
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>`
    }

    this.elem = carousel;
  }
}
