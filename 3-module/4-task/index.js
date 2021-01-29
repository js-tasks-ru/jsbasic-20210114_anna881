/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
	const filteredUsers = users.filter(user => user.age <= age);
	const outputLines = filteredUsers.map(user => `${user.name}, ${user.balance}`);
	const result = outputLines.join('\n');

	return result;
}