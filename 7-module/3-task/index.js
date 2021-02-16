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
				${this.addSpan()}
			</div>`;

		slider.innerHTML = sliderThumbHTML;
		this.sliderValue = this.elem.querySelector('.slider__value');
		
		this.elem.addEventListener('click', this.changeSliderValue);
	}

	addSpan() {
		let spanStr = '';
		for (let i = 0; i < this.steps - 1; i++) {
			spanStr += '<span></span>';
		}
		return spanStr;
	}

	changeSliderValue = (event) => {
		/*this.sliderValueMin = 0;
		this.sliderValueMax = this.steps-1;
		this.sliderSegmentCount = this.steps-1;*/

		let currentSliderValue = 2;//заглушка
		this.sliderValue.innerHTML = currentSliderValue;

		if (this.elem.querySelector('.slider__step-active')) {
			this.elem.querySelector('.slider__step-active').
				classList.remove('slider__step-active');}

		let currentSlideStep = event.target;
		currentSlideStep.classList.add('slider__step-active');

		
	

	}
}
