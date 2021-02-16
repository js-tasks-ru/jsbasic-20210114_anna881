import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
	constructor(categories) {
		this.categories = categories;

		// Корневой элемент DIV
		let ribbon = document.createElement('div');
		ribbon.classList.add('ribbon');

		// Кнопки прокрутки меню
		const leftButtonHtml = `<button class="ribbon__arrow ribbon__arrow_left">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>`
		const rigthButtonHtml = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
			<img src="/assets/images/icons/angle-icon.svg" alt="icon">
		</button>`
		ribbon.innerHTML = leftButtonHtml + rigthButtonHtml;

		// Элемент NAV, c категориями меню
		let ribbonInner = document.createElement('nav');
		ribbonInner.innerHTML = this.getRibbonInnerHtml(categories);
		ribbonInner.classList.add('ribbon__inner');
		ribbon.appendChild(ribbonInner);

		// Обработчики событий на прокрутку меню
		let rigthButton = ribbon.querySelector('.ribbon__arrow_right');
		rigthButton.addEventListener('click', moveRight);

		let leftButton = ribbon.querySelector('.ribbon__arrow_left');
		leftButton.addEventListener('click', moveLeft);

		// Обработчики на ribbonInner
		ribbonInner.addEventListener('scroll', checkPocition);
		ribbonInner.addEventListener('click', selectItem);
		ribbonInner.addEventListener('click', function (event) {
			let currentItem = event.target;
			let ribbonSelect = new CustomEvent('ribbon-select', {
				detail: currentItem.dataset.id,
				bubbles: true
			});
			currentItem.dispatchEvent(ribbonSelect);
		});		

		const MOVE_OFFSET = 350;

		// Функции
		function moveRight() {
			ribbonInner.scrollBy(MOVE_OFFSET, 0);
		}

		function moveLeft() {
			ribbonInner.scrollBy(-MOVE_OFFSET, 0);
		}

		function checkPocition() {
			let scrollLeft = ribbonInner.scrollLeft;
			let scrollWidth = ribbonInner.scrollWidth;
			let clientWidth = ribbonInner.clientWidth;
			let scrollRight = scrollWidth - scrollLeft - clientWidth;

			function setButtonVisibleByScrollValue(button, scrollValue) {			
				const DELTA = 1.0;
				const VISIBLE_CLASSNAME = 'ribbon__arrow_visible';
				return scrollValue < DELTA 
					? button.classList.remove(VISIBLE_CLASSNAME) 
					: button.classList.add(VISIBLE_CLASSNAME);
			}

			setButtonVisibleByScrollValue(leftButton, scrollLeft);
			setButtonVisibleByScrollValue(rigthButton, scrollRight);
		}

		function selectItem(event) {
			event.preventDefault();

			let target = event.target;	// где был клик
			if (target.className != 'ribbon__item') return; // не на класс тогда не интересует

			// убрать подсветку у эдементов
			let previousHighlightedItem = ribbonInner.querySelector('.ribbon__item_active');
			if(previousHighlightedItem) {
				previousHighlightedItem.classList.remove('ribbon__item_active');
			}

			target.classList.add('ribbon__item_active'); // подсветить новый item
		}		
		
		this.elem = ribbon;
	}

	getRibbonInnerHtml(categories) {
		let htmlStr = '';
		categories.forEach(category => {
			htmlStr += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
		});

		return htmlStr;
	}
}