import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	constructor() {
	}

	open() {
		const self = this;

		const modalWindowHtml = `
			<div class="modal">
				<div class="modal__overlay"></div>
				<div class="modal__inner">
					<div class="modal__header">	
						<button type="button" class="modal__close">
						<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
						</button>
						<h3 class="modal__title">${self.title}</h3>
					</div>
					<div class="modal__body">${self.body}</div>
				</div>
			</div>`;

		document.body.innerHTML = modalWindowHtml;
		document.body.classList.add('is-modal-open');
		self.modal = document.body.querySelector('.modal');

		const closeButton = document.body.querySelector('.modal__close');
		closeButton.addEventListener('click', () => self.close());

		document.body.addEventListener('keydown', self.closeByEscape);
	}

	closeByEscape = (event) => {
		if (event.code === 'Escape') {
			this.close();
		}
		
		document.body.removeEventListener('keydown', this.closeByEscape);
	}

	close() {
		this.modal.remove();
		document.body.classList.remove('is-modal-open');
	};

	setTitle(title) {
		this.title = title;
		if (this.modal && this.modal.querySelector('.modal__title')) {
			this.modal.querySelector('.modal__title').innerHTML = title;
		}
	};
	
	setBody(modalBody) {
		this.body = modalBody.outerHTML;
		if (this.modal && this.modal.querySelector('.modal__body')) {
			this.modal.querySelector('.modal__body').innerHTML = modalBody.outerHTML;
		}
	};
}
