module.exports = function* from(object) {
  for (const item of object) {
    yield item;
  }
};
