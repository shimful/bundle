const { buildShimfulPackage } = require("../../index.js");

buildShimfulPackage("eslint-plugin-react", "@shimful/eslint-plugin-react", {
  require: require,
  inlinePackages: ["jsx-ast-utils"],
});
