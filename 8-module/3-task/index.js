export default class Cart {
	cartItems = []; // [{product: {...}, count: N}, {...}]

	constructor(cartIcon) {
		this.cartIcon = cartIcon;
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
		if(cartItemIndex === -1) {
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
		return this.cartItems.reduce((totalSum, cartItem) =>  totalSum + cartItem.count * cartItem.product.price, 0);
	}

	onProductUpdate(cartItem) {
		// реализуем в следующей задаче
		this.cartIcon.update(this);
	}
}

