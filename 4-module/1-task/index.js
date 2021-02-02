/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */

function makeFriendsList(friends) {
	let fullNames = friends.map(friend => `${friend.firstName} ${friend.lastName}`);
	let ul = document.createElement('ul');

	for (let i = 0; i < fullNames.length; i++) {
		let li = document.createElement('li');
		let friendName = fullNames[i]
		li.innerHTML = friendName;
		ul.append(li);
	}
	return ul;
}
