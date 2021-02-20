import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
	constructor(products) {
		this.products = products;
		this.filters = {};

		let productsGrid = document.createElement('div');
		this.elem = productsGrid;
		productsGrid.classList.add('products-grid');
		productsGrid.innerHTML = `<div class="products-grid__inner"></div>`;

		products.forEach(product => {
			let card = new ProductCard(product);
			this.elem.querySelector('.products-grid__inner')
				.append(card.elem);
		});



	}
}
