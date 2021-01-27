/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
    let usersNameArray = [];
    for (let key of users) {
      usersNameArray.push(key.name);
    }
  return usersNameArray;
}
