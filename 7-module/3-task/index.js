export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this.steps = steps;
		this.value = value;

		//Корневой элемент
		let slider = document.createElement('div');
		slider.classList.add('slider');
		this.elem = slider;

		let sliderThumbHTML = `
			<!--Ползунок слайдера с активным значением-->
			<div class="slider__thumb">
				<span class="slider__value">0</span>
			</div>
			
			<!--Полоска слайдера-->
			<div class="slider__progress"></div>
			
			<!-- Шаги слайдера (вертикальные чёрточки) -->
			<div class="slider__steps">
				<!-- текущий выбранный шаг выделен этим классом -->
				<span class="slider__step-active"></span>
				${this.getStepSpansStr()}
			</div>`;

		slider.innerHTML = sliderThumbHTML;

		this.elem.addEventListener('click', this.changeSliderValue);
		this.elem.addEventListener('click', this.customEvent);
	}

	getStepSpansStr() {
		return '<span></span>'.repeat(this.steps - 1);
	}

	changeSliderValue = (event) => {
		// Определение сегмента в %
		let offsetLeft = this.elem.offsetLeft;
		let sliderWidthPx = this.elem.clientWidth;
		let clickCoordsXPercent = ((event.clientX - offsetLeft) * 100) / sliderWidthPx;
		let clickRoundedCoordsXPercent = Math.round(clickCoordsXPercent);
		let stepSizePercent = 100 / (this.steps - 1);

		//Изменение значения сладера
		let sliderValueElement = this.elem.querySelector('.slider__value');
		this.value = Math.round(clickRoundedCoordsXPercent / stepSizePercent);
		sliderValueElement.innerHTML = this.value;

		//Добавление класса на выбранный элемент
		const activeStepElement = this.elem.querySelector('.slider__step-active');
		if (activeStepElement) {
			activeStepElement.classList.remove('slider__step-active');
		}

		let spanElements = this.elem.querySelectorAll('span');
		let spanIndex = this.value + 1;
		spanElements[spanIndex].classList.add('slider__step-active');

		//Смещение ползунка
		let leftPercents = stepSizePercent * this.value;
		let thumbElement = this.elem.querySelector('.slider__thumb');
		thumbElement.style.left = `${leftPercents}%`;
		let progressElement = this.elem.querySelector('.slider__progress');
		progressElement.style.width = `${leftPercents}%`;
	}

	customEvent = () => {
		let slideChange = new CustomEvent('slider-change', {
			detail: this.value,
			bubbles: true
		})

		this.elem.dispatchEvent(slideChange);
	}
}
