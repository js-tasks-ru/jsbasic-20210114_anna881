/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let strToArr = str.split('-');
  let camelizedArr = []

  strToArr.forEach((value, index) => {
    if (value == '') {
      return;
    } 
    
    let camelizedValue = index == 0 ? value : value[0].toUpperCase() + value.slice(1);
    camelizedArr.push(camelizedValue);
  });
  
  let camelizedStr = camelizedArr.join('');
  return camelizedStr;
}
