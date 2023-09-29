module.exports = function (str, ...args) {
  return String.prototype.matchAll.call(str, ...args);
};
