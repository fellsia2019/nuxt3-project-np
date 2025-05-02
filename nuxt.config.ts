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
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
			],
		},
	},

	css: ['~/assets/styles/main.scss'],

	runtimeConfig: {
		public: {
			apiSecure: process.env?.NUXT_PUBLIC_API_SECURE === 'true',
			apiDomain: process.env?.NUXT_PUBLIC_API_DOMAIN || '',
			apiPrefix: process.env?.NUXT_PUBLIC_API_PREFIX || '',
		},
	},

	compatibilityDate: '2025-05-02',

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
