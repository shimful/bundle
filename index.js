const { sep, join } = require("node:path");
const { readdir, readFile, writeFile } = require("node:fs/promises");
const esbuild = require("esbuild");
const has = require("./shims/has");

async function getShims() {
  const shimDir = join(__dirname, "shims");
  const shims = await readdir(shimDir);
  return Object.fromEntries(
    shims.map((shim) => {
      return [shim, join(shimDir, shim)];
    }),
  );
}

async function buildShimfulPackage(
  input,
  output,
  {
    require = require,
    outdir = "./dist",
    shimPackageName = undefined,
    inlinePackages = [],
  } = {},
) {
  const outPkg = require("./package.json");
  const shims = await getShims({ shimPackageName });

  const plugin = {
    name: "resolve",
    setup(build) {
      build.onResolve({ filter: /./ }, (args) => {
        for (const inlined of inlinePackages) {
          if (args.path === inlined || args.path.startsWith(inlined + "/")) {
            return {
              path: require.resolve(args.path, { paths: [args.resolveDir] }),
              external: false,
            };
          }
          return {};
        }
      });
    },
  };

  await esbuild.build({
    entryPoints: [require.resolve(input)],
    bundle: true,
    platform: "node",
    target: ["node16"],
    outdir: outdir,
    packages: "external",
    alias: shims,
    plugins: [plugin],
  });

  const readme = await readFile(require.resolve("./README.md"));
  await writeFile(join(outdir + sep, "README.md"), readme);

  const inPkg = require(`${input}/package.json`);
  await writeFile(
    join(outdir + sep, "package.json"),
    JSON.stringify(
      {
        name: output,
        version: outPkg.version,
        main: "./index.js",
        license: "MIT",
        dependencies: Object.fromEntries(
          Object.entries(inPkg.dependencies ?? {}).filter(([dep]) => {
            return !has(shims, dep) && !inlinePackages.includes(dep);
          }),
        ),
      },
      null,
      2,
    ),
  );
}

module.exports = {
  buildShimfulPackage,
};
