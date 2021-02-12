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

		//Пользовательское событие 
		addUserEvent();
		function addUserEvent() {
			let addButtons = carousel.querySelectorAll('.carousel__button');
			addButtons.forEach(addButton => {
				let slide = addButton.closest('.carousel__slide');
				let id = slide.dataset.id;
				let userEvent = new CustomEvent("product-add", {
					detail: id,
					bubbles: true
				});
				addButton.addEventListener('click', () => { addButton.dispatchEvent(userEvent); })
			});
		}

		//Кнопки прокрутки карусели 
		let currentSlidePosition = 0;
		
		let leftButton = carousel.querySelector('.carousel__arrow_left');
		leftButton.style.display = 'none';
		let rightButton = carousel.querySelector('.carousel__arrow_right');
		rightButton.style.display = '';
		
		
		leftButton.addEventListener('click', () => move(true));
		rightButton.addEventListener('click', () => move(false));

		function getSlideWidth(){
			let slidesArr = carouselInner.querySelectorAll('.carousel__slide');
			let slideWidth = slidesArr[0].offsetWidth;
			return slideWidth;
		}

		function move(isToLeft) {
			let slideWidth = getSlideWidth();
			transform(isToLeft, slideWidth);
			checkPosition(slideWidth);
		}
		
		function transform(isToLeft, slideWidth) {
			const positionOffset = isToLeft ? slideWidth : -slideWidth;
			currentSlidePosition += positionOffset;
			carouselInner.style.transform = `translateX(${currentSlidePosition}px`;
		}

		function checkPosition(slideWidth) {
			leftButton.style.display = currentSlidePosition >= 0 ? 'none' : '';
			rightButton.style.display = currentSlidePosition == -slideWidth * (slides.length - 1)
				? 'none' : '';
		}

		this.elem = carousel;
	}
}
