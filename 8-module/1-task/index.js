import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
	constructor() {
		this.render();

		this.addEventListeners();
	}

	render() {
		this.elem = createElement('<div class="cart-icon"></div>');
	}

	update(cart) {
		if (!cart.isEmpty()) {
			this.elem.classList.add('cart-icon_visible');

			this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

			this.updatePosition();

			this.elem.classList.add('shake');
			this.elem.addEventListener('transitionend', () => {
				this.elem.classList.remove('shake');
			}, { once: true });

		} else {
			this.elem.classList.remove('cart-icon_visible');
		}
	}

	addEventListeners() {
		document.addEventListener('scroll', () => this.updatePosition());
		window.addEventListener('resize', () => this.updatePosition());
	}

	updatePosition() {

		if (this.elem.offsetHeight == 0 && this.elem.offsetWidth == 0) {
			return;
		}

		if (window.pageYOffset > 0 && document.documentElement.clientWidth >= 767) {
			let container = document.querySelector('.container');
			let containerCoordinates = container.getBoundingClientRect();

			const basketoffsetTop = 50;
			const maxContaineroffset = 20;
			const minWindowoffset = 10;

			const basketOffet20 = (containerCoordinates.right + maxContaineroffset);
			const basketOffset10 = (document.documentElement.clientWidth - this.elem.offsetWidth - minWindowoffset);

			let basketLeftOffsetPosition = Math.min(basketOffet20, basketOffset10);

			this.elem.style.cssText = 'position:fixed';
			this.elem.style.zIndex = 1000;
			this.elem.style.top = basketoffsetTop + 'px';
			this.elem.style.left = basketLeftOffsetPosition + 'px';

		} else {
			this.elem.style.cssText = 'absolute';
		}
	}
}
