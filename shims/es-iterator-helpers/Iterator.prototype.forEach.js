module.exports = function forEach(iterator, callbackFn) {
  let index = 0;
  for (const element of iterator) {
    callbackFn(element, index++);
  }
};
