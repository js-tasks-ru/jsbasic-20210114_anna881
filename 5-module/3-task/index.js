export default function initCarousel() {
	let carousel = document.querySelector('.carousel');

	let slidesContainer = carousel.querySelector('.carousel__inner');
	let slides = slidesContainer.querySelectorAll('.carousel__slide');
	let slideWidth = slides[0].offsetWidth;
	let currentSlidePosition = 0;

	let leftButton = carousel.querySelector('.carousel__arrow_left');
	leftButton.style.display = 'none';
	let rightButton = carousel.querySelector('.carousel__arrow_right');
	rightButton.style.display = '';


	leftButton.addEventListener('click', moveLeft);
	rightButton.addEventListener('click', moveRight);

	function moveLeft() {
		transform(true);
		checkPosition();
	};

	function moveRight() {
		transform(false);
		checkPosition();
	};

	function transform(isToLeft) {
		const positionOffset = isToLeft ? slideWidth : -slideWidth;
		currentSlidePosition += positionOffset;
		slidesContainer.style.transform = 'translateX(' + currentSlidePosition + 'px)';
	}

	function checkPosition() {
		leftButton.style.display = currentSlidePosition >= 0 ? 'none' : '';
		rightButton.style.display = currentSlidePosition == -slideWidth * (slides.length - 1)
			? 'none' : '';
	}
}
