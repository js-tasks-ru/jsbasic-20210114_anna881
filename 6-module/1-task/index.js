/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
	 *          name: 'Ilia',
	 *          age: 25,
	 *          salary: '1000',
	 *          city: 'Petrozavodsk'
	 *   },
 *
 * @constructor
 */
export default class UserTable {
	constructor(users) {
		let table = document.createElement('table');

		// хидер таблицы
		let thead = document.createElement('thead');
		let headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
		let headerTr = '<tr>' + headers.map(item => `<th>${item}</th>`).join('') + '</tr>';
		thead.innerHTML = headerTr;
		table.appendChild(thead);		
		
		// тело таблицы
		let tbody = document.createElement('tbody');
		let trs = users.map(function (user) {
			let userFieldValues = Object.values(user);
			let tds = userFieldValues.map(x => `<td>${x}</td>`);
			tds.push('<td><button>X</button></td>');
			let tr = `<tr>${tds.join('')}</tr>`;
			return tr;
		});
		
		tbody.innerHTML = trs.join('');
		table.appendChild(tbody);
		
		// вешаем хендлеры на кнопки "удалить"
		function deleteRowHandler(event) {
			let trToDelete = event.target.closest('tr');
			trToDelete.remove();
		};

		let buttons = table.querySelectorAll('button');
		for (let button of buttons) {
			button.addEventListener('click', deleteRowHandler);
		}

		this.elem = table;
	}
}
