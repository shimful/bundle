module.exports = function (arr, ...args) {
  return Array.prototype.includes.call(arr, ...args);
};
