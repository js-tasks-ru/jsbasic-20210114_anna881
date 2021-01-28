/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
    let usersNameArray = [];
    for (let user of users) {
      usersNameArray.push(user.name);
    }
    return usersNameArray;
}
