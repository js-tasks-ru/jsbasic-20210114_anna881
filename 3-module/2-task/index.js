/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let filteredArray = [];

  for (let value of arr) {
    if (value >= a && value <= b) {
      filteredArray.push(value);
    }
  }
  
  //filteredArray = arr.filter(value => value >= a && value <= b); 

  return filteredArray;
}
