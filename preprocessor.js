const tsc = require('typescript');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        {
    "compilerOptions": {
        "target": "ES6",
        "experimentalDecorators": true,
        "module": "commonjs",
        "strictNullChecks": true
    },
    "exclude": [
        "node_modules"
    ]
},
        path,
        []
      );
    }
    return src;
  },
};