/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
	let strParts = str.replaceAll(',', ' ').split(' ');
	let nums = strParts.map(element => element = parseFloat(element));
	let filteredNums = nums.filter(element => isFinite(element));

	const max = filteredNums.reduce(function (previousValue, item) {
		return previousValue > item ? previousValue : item;
	}, -Infinity);

	const min = filteredNums.reduce(function (previousValue, item) {
		return previousValue < item ? previousValue : item;
	}, +Infinity);

	return { min, max };
}


