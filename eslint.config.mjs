// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).overrideRules({
  'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
  'vue/no-v-html': 'off',
  'vue/html-closing-bracket-newline': 'off',
})
