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

		// Определение сегмента в %
		let offsetLeft = this.elem.offsetLeft;
		let sliderWidth = this.elem.clientWidth; // px
		let clickCoordsX = ((event.clientX-offsetLeft)*100)/sliderWidth;//%
		let clickCoordsXRound = Math.round(clickCoordsX);
		let stepSize = 100/(this.steps - 1);//%

		//Изменение значения сладера
		this.sliderValue = this.elem.querySelector('.slider__value');
		let currentSliderValue = Math.round(clickCoordsXRound/stepSize);
		this.sliderValue.innerHTML = currentSliderValue;

		//Добавление класса на выбранный элемент
		if (this.elem.querySelector('.slider__step-active')) {
			this.elem.querySelector('.slider__step-active').
				classList.remove('slider__step-active');
		}

		let spanCollection = this.elem.querySelectorAll('span');
		let spanIndex = currentSliderValue+1;
		spanCollection[spanIndex].classList.add('slider__step-active');

		//Смещение ползунка (пока по клику мыши)	
		let leftPercents = stepSize*currentSliderValue; // Заглушка. Значение в процентах от 0 до 100
		console.log(leftPercents);
		
		let thumb = this.elem.querySelector('.slider__thumb');
		let progress = this.elem.querySelector('.slider__progress');

		thumb.style.left = `${leftPercents}%`;
		progress.style.width = `${leftPercents}%`;
	}
}
