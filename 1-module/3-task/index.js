/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if(!str){
    return str;
  }

  let ucFirstStr = str[0].toUpperCase() + str.slice(1);
  return ucFirstStr;
}
