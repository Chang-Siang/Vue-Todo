module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
        'currentState',
      ],
    }],
    'max-len': ['off'],
    'linebreak-style': ['off'],
    camelcase: ['warn'],
  },
  overrides: [
    {
      files: [
        '**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
