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
		this.productCardsInner = this.elem.querySelector('.products-grid__inner');

		this.products.forEach(product => {
			let card = new ProductCard(product);
			this.productCardsInner.append(card.elem);
		});

	}

	updateFilter(filters) {	
		this.productCardsInner.innerHTML = '';
		let currentFilteredProducts = this.products.filter(function (product) {
			if (filters.noNuts && filters.noNuts === product.nuts) {
				return false;
			}

			if (filters.vegeterianOnly && filters.vegeterianOnly !== product.vegeterian) {
				return false;
			}

			if (filters.maxSpiciness && filters.maxSpiciness < product.spiciness) {
				return false;
			}

			if (filters.category && filters.category !== product.category) {
				return false;
			}		
			return true;
		});

		this.products = currentFilteredProducts;

		currentFilteredProducts.forEach(product => {
			let card = new ProductCard(product);
			this.productCardsInner.append(card.elem);
		});
	}
}
