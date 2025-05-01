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

	runtimeConfig: {
		public: {
			apiSecure: process.env.API_SECURE === 'true',
			apiDomain: process.env.API_DOMAIN,
			apiPrefix: process.env.API_PREFIX,
			apiPort: process.env.API_PORT,
		},
	},

	compatibilityDate: '2024-11-01',

	nitro: {
		serveStatic: true,
	},

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
