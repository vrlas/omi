import pluginVue from 'eslint-plugin-vue'
export default [
  ...pluginVue.configs['flat/recommended'],
  { rules: {
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,
    'no-unused-vars': 2
  } }
]