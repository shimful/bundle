const hasOwn = Object.prototype.hasOwnProperty;

module.exports = function (obj, key) {
  return hasOwn.call(obj, key);
};
