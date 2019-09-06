module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "no-const-assign": 2,
    "no-else-return": 2,
    "no-undef": 2,
    'no-console': 'off',
    "no-extra-semi": 1,
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ]
  }
};