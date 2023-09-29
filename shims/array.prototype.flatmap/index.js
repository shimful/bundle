module.exports = function (arr, ...args) {
  return Array.prototype.flatMap.call(arr, ...args);
};
