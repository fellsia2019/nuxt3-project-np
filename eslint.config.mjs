// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	// Your custom configs here
	{
		rules: {
			'vue/no-v-html': 'off',
			'vue/new-line-between-multi-line-property': [
				'error',
				{ minLineOfMultilineProperty: 2 },
			],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{ registeredComponentsOnly: false },
			],
		},
	},
)
