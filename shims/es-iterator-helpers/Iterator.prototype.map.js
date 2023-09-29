module.exports = function* map(iterator, callbackFn) {
  let index = 0;
  for (const element of iterator) {
    yield callbackFn(element, index++);
  }
};
