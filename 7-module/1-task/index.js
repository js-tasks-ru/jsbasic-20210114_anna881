import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
	constructor(categories) {
		this.categories = categories;

		// Корневой элемент DIV
		let ribbon = document.createElement('div');
		ribbon.classList.add('ribbon');
		this.elem = ribbon;

		// Кнопки прокрутки меню
		const leftButtonHtml = `<button class="ribbon__arrow ribbon__arrow_left">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>`
		const rigthButtonHtml = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>`
		ribbon.innerHTML = leftButtonHtml + rigthButtonHtml;

		// Элемент NAV, c категориями меню
		this.ribbonInner = document.createElement('nav');
		this.ribbonInner.innerHTML = this.getRibbonInnerHtml(categories);
		this.ribbonInner.classList.add('ribbon__inner');
		ribbon.appendChild(this.ribbonInner);

		// Обработчики событий на прокрутку меню
		this.rigthButton = ribbon.querySelector('.ribbon__arrow_right');
		this.rigthButton.addEventListener('click', () => this.moveRight());

		this.leftButton = ribbon.querySelector('.ribbon__arrow_left');
		this.leftButton.addEventListener('click', () => this.moveLeft());

		// Обработчики на ribbonInner
		this.ribbonInner.addEventListener('scroll', () => this.checkPocition());
		this.ribbonInner.addEventListener('click', this.selectItem);
		this.ribbonInner.addEventListener('click', (event) => {
			let currentItem = event.target;
			let ribbonSelect = new CustomEvent('ribbon-select', {
				detail: currentItem.dataset.id,
				bubbles: true
			});
			currentItem.dispatchEvent(ribbonSelect);
		});		

		this.moveOffset = 350;
	}

	getRibbonInnerHtml(categories) {
		let htmlStr = '';
		categories.forEach(category => {
			htmlStr += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
		});

		return htmlStr;
	}

	moveRight() {
		this.ribbonInner.scrollBy(this.moveOffset, 0);
	}

	moveLeft() {
		this.ribbonInner.scrollBy(-this.moveOffset, 0);
	}

	checkPocition() {
		let scrollLeft = this.ribbonInner.scrollLeft;
		let scrollWidth = this.ribbonInner.scrollWidth;
		let clientWidth = this.ribbonInner.clientWidth;
		let scrollRight = scrollWidth - scrollLeft - clientWidth;

		function setButtonVisibleByScrollValue(button, scrollValue) {			
			const DELTA = 1.0;
			const VISIBLE_CLASSNAME = 'ribbon__arrow_visible';
			return scrollValue < DELTA 
				? button.classList.remove(VISIBLE_CLASSNAME) 
				: button.classList.add(VISIBLE_CLASSNAME);
		}

		setButtonVisibleByScrollValue(this.leftButton, scrollLeft);
		setButtonVisibleByScrollValue(this.rigthButton, scrollRight);
	}

	selectItem(event) {
		event.preventDefault();

		let target = event.target;	// где был клик
		if (target.className != 'ribbon__item') return; // не на класс тогда не интересует

		// убрать подсветку у эдементов
		let previousHighlightedItem = this.querySelector('.ribbon__item_active');
		if(previousHighlightedItem) {
			previousHighlightedItem.classList.remove('ribbon__item_active');
		}

		target.classList.add('ribbon__item_active'); // подсветить новый item
	}		
}