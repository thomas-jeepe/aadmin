module.exports = function () {

  return {
    files: ['src/**/*.ts', '!__tests__/**/*.ts', { pattern: 'node_modules/@newtack/snell/src/*.ts', instrument: false, load: false, ignore: false }],

    tests: ['__tests__/**/*.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};