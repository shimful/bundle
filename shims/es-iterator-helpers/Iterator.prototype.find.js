module.exports = (iterator, callbackFn) => {
  let index = 0;
  for (const element of iterator) {
    if (callbackFn(element, index++)) {
      return element;
    }
  }
  return undefined;
};
