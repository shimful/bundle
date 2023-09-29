module.exports = function (arr, ...args) {
  return Array.prototype.flat.call(arr, ...args);
};
