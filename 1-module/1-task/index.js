/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  let factorialNumber = 1;
  for (let i = 2; i <= n; i++) {
    factorialNumber *= i;
  }

  return factorialNumber;
}
