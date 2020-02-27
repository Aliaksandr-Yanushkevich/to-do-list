module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "max-len": ["error", { "code": 120 }],
    "no-param-reassign": 0
  }
};
