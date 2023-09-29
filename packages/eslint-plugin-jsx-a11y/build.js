const { buildShimfulPackage } = require("../../index.js");

buildShimfulPackage(
  "eslint-plugin-jsx-a11y",
  "@shimful/eslint-plugin-jsx-a11y",
  {
    require: require,
    inlinePackages: ["jsx-ast-utils"],
  },
);
