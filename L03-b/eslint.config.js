import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'curly': ['error', 'multi-line'],
    'brace-style': 'off',
    'antfu/if-newline': 'off',
    'style/max-statements-per-line': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
  },
})
