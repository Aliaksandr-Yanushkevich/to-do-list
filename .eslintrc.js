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
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
      "import/no-named-as-default": 0,
      "class-methods-use-this": 0,
      "no-console": 0,
      "no-continue": 0,
      "max-len": ["error", { "code": 120 }],
      "quote-props": 0
    }
};
