const settings = {
  env: {
    browser: false,
    node: true,
  },
  extends: 'standard',
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
  },
}

module.exports = settings
