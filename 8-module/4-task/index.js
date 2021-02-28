import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
	cartItems = []; // [product: {...}, count: N]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;

		this.addEventListeners();
	}

	addProduct(product) {
		let cartItem = this.cartItems.find(item => item.product.id == product.id)
		if (cartItem) {
			cartItem.count += 1;
		} else {
			cartItem = { product, count: 1 }
			this.cartItems.push(cartItem);
		}

		this.onProductUpdate(cartItem);
	}

	updateProductCount(productId, amount) {
		const cartItemIndex = this.cartItems.findIndex(item => item.product.id == productId);
		if (cartItemIndex === -1) {
			return;
		}

		const cartItem = this.cartItems[cartItemIndex];
		cartItem.count += amount;
		if (cartItem.count === 0) {
			this.cartItems.splice(cartItemIndex, 1);
		}

		this.onProductUpdate(cartItem);
	}

	isEmpty() {
		return this.cartItems.length == 0;
	}

	getTotalCount() {
		return this.cartItems.reduce((totalCount, cartItem) => totalCount + cartItem.count, 0);
	}

	getTotalPrice() {
		return this.cartItems.reduce((totalSum, cartItem) => totalSum + cartItem.count * cartItem.product.price, 0);
	}

	renderProduct(product, count) {
		return createElement(`
    <div class="cart-product" data-product-id="${product.id
			}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
	}

	renderOrderForm() {
		return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
			2
		)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
	}

	renderModal() {
		let basketModal = new Modal();

		//Формирование модального окна
		let divInModal = document.createElement('div');
		this.elem = divInModal;
		addProductFieldToDiv(this.cartItems, this.renderProduct);
		divInModal.appendChild(this.renderOrderForm());

		basketModal.setTitle('Your order');
		basketModal.setBody(divInModal);
		basketModal.open();

		function addProductFieldToDiv(cartItems, renderProductFunction) {
			cartItems.forEach(cartItem => divInModal.appendChild(renderProductFunction(cartItem.product, cartItem.count)));
		}

		//Обработчики на -/+
		let buttons = document.body.querySelectorAll('.cart-counter__button');
		buttons.forEach(button => {
			button.addEventListener('click', (event) => {
				// TODO: работа кнопки не должна звисеть от контента (в данном случае от атрибута alt картинки)
				// можно добавить атрибут increseOn со значениями '-1' и '1' на кнопки
				let amount = (event.target.alt == 'plus') ? 1 : -1;
				let productId = event.target.closest('.cart-product').getAttribute('data-product-id');

				this.updateProductCount(productId, amount);
			})
		})

		//Обработчик на форму отправки заказа
		let orderForm = document.body.querySelector('.cart-form');
		orderForm.addEventListener('submit', (event) => { this.onSubmit(event); });
	}

	onProductUpdate(cartItem) {
		this.cartIcon.update(this);

		if (!document.body.classList.contains('is-modal-open')) { return; }

		if (this.getTotalCount() > 0) {
			this.renderModal();
		} else {
			let modal = document.querySelector('.modal');
			modal.remove();
			document.body.classList.remove('is-modal-open');
		}
	}

	async onSubmit(event) {
		event.preventDefault();

		let submitButton = document.querySelector('[type="submit"]');
		let orderForm = document.body.querySelector('.cart-form');
		submitButton.classList.add('is-loading');

		let response = await fetch('https://httpbin.org/post', {
			method: 'POST',
			body: new FormData(orderForm)
		});

		if (response.ok) {
			let modalTitle = document.querySelector('.modal__title');
			let modalBody = document.querySelector('.modal__body');

			modalTitle.innerHTML = 'Success!';
			modalBody.innerHTML = `<div class="modal__body-inner">
									<p>
										Order successful! Your order is being cooked :) <br>
										We’ll notify you about delivery time shortly.<br>
										<img src="/assets/images/delivery.gif">
									</p>
								</div>`;

			this.cartItems.splice(0, this.cartItems.length);
		} else {
			alert("Ошибка HTTP: " + response.status);
		}
	};

	addEventListeners() {
		this.cartIcon.elem.onclick = () => this.renderModal();
	}
}

