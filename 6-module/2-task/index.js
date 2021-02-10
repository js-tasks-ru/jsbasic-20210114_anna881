import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
	constructor(product) {
		let div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
			<div class="card__top">
				<img src="/assets/images/products/${product.image}" class="card__image" alt="product">
				<span class="card__price">${getPriceStr(product.price)}</span>
			</div>
			<div class="card__body">
				<div class="card__title">${product.name}</div>
				<button type="button" class="card__button">
					<img src="/assets/images/icons/plus-icon.svg" alt="icon">
				</button>
			</div>`;

		function getPriceStr(price) {
			return '€' + price.toFixed(2);
		}

		this.elem = div;
	}
}
