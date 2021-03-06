export default class StepSlider {
	constructor({ steps, value = 0 }) {
		this.steps = steps;
		this.value = value;
		this.stepSizePercent = 100 / (this.steps - 1);

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

		this.thumbElement = this.elem.querySelector('.slider__thumb');
		this.thumbElement.ondragstart = () => false;
		this.progressElement = this.elem.querySelector('.slider__progress');

		this.elem.addEventListener('click', this.changeSliderByClick);
		this.elem.addEventListener('pointerdown', this.changeSliderByDrag);
	}

	getStepSpansStr() {
		return '<span></span>'.repeat(this.steps - 1);
	}

	changeSliderByClick = (event) => {
		// Определение сегмента в %
		let clickRoundedCoordsXPercent = this.getCoordsXPercent(event);

		//Изменение значения сладера
		this.changeSliderValue(clickRoundedCoordsXPercent);

		//Добавление класса на выбранный элемент
		this.setActiveStep();

		//Смещение ползунка
		this.displaceThumbElementLeft();

		//Генерация пользовательского события
		this.dispatchSliderChangeEvent();
	}

	changeSliderByDrag = () => {
		this.elem.classList.add('slider_dragging');

		// передвинуть ползунок под координаты курсора
		let moveAt = (coordX) => {

			//Изменение значения сладера
			this.changeSliderValue(coordX);

			//Добавление класса на выбранный элемент
			this.setActiveStep();

			//Передвинуть ползунок
			this.thumbElement.style.left = `${coordX}%`;
			this.progressElement.style.width = `${coordX}%`;
		}

		let onPointerMove = (event) => {
			let coordX = this.getCoordsXPercent(event);
			moveAt(coordX);
		}
		//перемещать ползунок по экрану
		document.addEventListener('pointermove', onPointerMove);

		//отпустить кнопку мыши, удалить ненужные обработчики событий
		document.onpointerup = () => {
			this.dispatchSliderChangeEvent();
			document.removeEventListener('pointermove', onPointerMove);
			this.elem.classList.remove('slider_dragging');
			document.onpointerup = null;
		};
	}

	getCoordsXPercent(event) {
		let left = event.clientX - this.elem.getBoundingClientRect().left;
		let leftRelative = left / this.elem.offsetWidth;

		if (leftRelative < 0) {
			leftRelative = 0;
		}

		if (leftRelative > 1) {
			leftRelative = 1;
		}

		let leftPercents = leftRelative * 100;
		return leftPercents;
	}

	setActiveStep() {
		const activeStepElement = this.elem.querySelector('.slider__step-active');
		if (activeStepElement) {
			activeStepElement.classList.remove('slider__step-active');
		}

		let spanElements = this.elem.querySelectorAll('span');
		let spanIndex = this.value + 1;
		spanElements[spanIndex].classList.add('slider__step-active');
	}

	displaceThumbElementLeft() {
		let leftPercents = this.stepSizePercent * this.value;
		this.thumbElement.style.left = `${leftPercents}%`;
		this.progressElement.style.width = `${leftPercents}%`;
	}

	changeSliderValue(clickRoundedCoordsXPercent) {
		const sliderValueElement = this.elem.querySelector('.slider__value');
		const newValue = Math.round(clickRoundedCoordsXPercent / this.stepSizePercent);
		if(this.value === newValue) return;

		this.value = newValue;
		sliderValueElement.innerHTML = this.value;
	}

	dispatchSliderChangeEvent = () => {
		let slideChange = new CustomEvent('slider-change', {
			detail: this.value,
			bubbles: true
		})

		this.elem.dispatchEvent(slideChange);
	}
}
