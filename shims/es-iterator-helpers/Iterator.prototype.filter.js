module.exports = function* filter(iterator, predicate) {
  let index = 0;
  for (const element of iterator) {
    if (predicate(element, index++)) {
      yield element;
    }
  }
};
