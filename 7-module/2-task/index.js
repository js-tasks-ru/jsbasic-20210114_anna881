import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	open() {
		const modalWindowHtml = `
			<div class="modal">
				<div class="modal__overlay"></div>
				<div class="modal__inner">
					<div class="modal__header">	
						<button type="button" class="modal__close">
						<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
						</button>

						<h3 class="modal__title">
							${this.title}
						</h3>
					</div>
					<div class="modal__body">
						${this.body.outerHTML}
					</div>
				</div>
			</div>`;
		document.body.innerHTML = modalWindowHtml;
		document.body.classList.add('is-modal-open');

		const closeButton = document.body.querySelector('.modal__close');
		closeButton.addEventListener('click', this.close);

		document.body.addEventListener('keydown', (event) => {
			if (event.code === 'Escape') {
				this.close();
			}
		});
	}

	close() {
		let modal = document.body.querySelector('.modal');
		modal.remove();
		document.body.classList.remove('is-modal-open');
	};

	setTitle(title) {
		this.title = title;
	};

	setBody(modalBody) {
		this.body = modalBody;
	};
}
