/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
	let sum = 0;
	
	for (let key in salaries) {
		let salaryAmount = salaries[key];
		
		if (validateSalaryAmount(salaryAmount)) {
			sum += salaryAmount;
		}	
	}

	function validateSalaryAmount(salary) {
		return typeof salary === 'number' && isFinite(salary);
	}

	return sum;
}
