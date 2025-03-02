// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({

	modules: ['@pinia/nuxt', '@nuxt/eslint'],

	components: [
		{
			path: '~/components',
			global: true,
			pathPrefix: false,
		},
	],
	devtools: { enabled: false },

	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
			],
		},
	},

	css: ['~/assets/styles/main.scss'],
	compatibilityDate: '2024-11-01',

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/global/variables.scss" as *; @use "~/assets/styles/global/mixins.scss" as *;',
				},
			},
		},

		plugins: [
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
				symbolId: 'icon-[dir]-[name]',
			}),
		],
	},

	eslint: {
		checker: true,
		config: {
			stylistic: {
				indent: 'tab',
				quotes: 'single',
			},
		},
	},
})
