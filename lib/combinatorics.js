"use babel";

function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

//combinations without repetition
function combination(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

//combinations with repetition
function combinationR(n, r) {
  return factorial(r + n - 1) / (factorial(r) * factorial(n - 1));
}

//permutations without repetition
function permutation(n, r) {
  return factorial(n) / factorial(n - r);
}

//permutations with repetition
function permutationR(n, r) {
  return Math.pow(n, r)
}

function combinationData(data, r) {
  //
}

export {
  factorial,
  combination,
  combinationR,
  permutation,
  permutationR,
};
