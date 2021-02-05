/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */

function makeFriendsList(friends) {
	let fullNames = friends.map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`);
	let fullNamesStr = fullNames.join('');

	let ul = document.createElement('ul');
	ul.innerHTML = fullNamesStr;

	/*for (let i = 0; i < fullNames.length; i++) {
		let li = document.createElement('li');
		let friendName = fullNames[i];
		li.innerHTML = friendName;
		ul.append(li);
	}*/
	return ul;
}
