/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let lowerCaseStr = str.toLowerCase();
  let lowerCaseWord1 = '1xBet'.toLowerCase();
  let lowerCaseWord2 = 'XXX'.toLowerCase();

  return lowerCaseStr.includes(lowerCaseWord1) || lowerCaseStr.includes(lowerCaseWord2);
}