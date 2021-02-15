import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	constructor() {
		this.modalWindowHtml = `
		<div class="modal">
			<div class="modal__overlay"></div>
			<div class="modal__inner">
				<div class="modal__header">	
					<button type="button" class="modal__close">
					<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
					</button>

					<h3 class="modal__title">
					Вот сюда нужно добавлять заголовок
					</h3>
				</div>
				<div class="modal__body">
					A сюда нужно добавлять содержимое тела модального окна
				</div>
			</div>
		</div>`;
		document.body.innerHTML = this.modalWindowHtml;
		this.modalWindow = document.body.querySelector('.modal');

		this.closeButton = document.body.querySelector('.modal__close');
		this.closeButton.addEventListener('click', this.close);

		document.body.addEventListener('keydown', (event) => {
			if (event.code === 'Escape') {
			  this.close();
			}
		  });
	}

	open() {	
		document.body.classList.add('is-modal-open');
	}
	
	setTitle(title) {
		let modalTitle = this.modalWindow.querySelector('.modal__title');
		modalTitle.innerHTML = title;
		console.log(modalTitle);
	};


	setBody(body) {
		let modalBody = this.modalWindow.querySelector('.modal__body');
		while (modalBody.firstChild) {
			modalBody.removeChild(modalBody.firstChild);
		  }
		modalBody.append(body);
		console.log(modalBody);
	};

	close() {
 		let modal = document.body.querySelector('.modal');
		modal.remove();
		document.body.classList.remove('is-modal-open');
	};
}
