module.exports = (str, ...args) => String.prototype.matchAll.call(str, ...args);
