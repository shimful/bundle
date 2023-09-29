module.exports = function some(iterator, callbackFn) {
  let index = 0;
  for (const element of iterator) {
    if (callbackFn(element, index++)) {
      return true;
    }
  }
  return false;
};
