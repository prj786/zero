module.exports = {
  root: true,
  extends: ['standard'],
  rules: {
    semi: [2, 'always'],
    'no-new': 0,
    'space-before-function-paren': 'off'
  },
  globals: {
    IS_DEVELOPMENT: 'readonly'
  },
  parserOptions: {
    ecmasVersion: 2020
  }
};
