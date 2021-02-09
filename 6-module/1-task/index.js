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
		let trs = users.map(function (user) {
			// TODO: переделать Object.values на columns
			// const columns = ['name', 'age', 'salary', 'city'];
			let userFieldValues = Object.values(user);
			let tds = userFieldValues.map(x => `<td>${x}</td>`);
			tds.push('<td><button>X</button></td>');
			let tr = `<tr>${tds.join('')}</tr>`;
			return tr;
		});

		let table = document.createElement('table');
		table.innerHTML = trs.join('');

		this.elem = table;
	}
}
