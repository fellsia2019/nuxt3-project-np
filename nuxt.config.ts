// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          charset: 'utf-8'
        }
      ]
    },
  },

  components: [
    {
      path: '~/components',
      global: true,
      pathPrefix: false
    }
  ],

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/global/variables.scss" as *; @use "~/assets/styles/global/mixins.scss" as *;',
        }
      }
    }
  },

  modules: ['@pinia/nuxt'],
})
