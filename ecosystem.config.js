module.exports = {
  apps: [
    {
      name: 'nuxt-prod',
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NITRO_PORT: 3000,
        NODE_ENV: 'production',
      },
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/nuxt-error.log',
      out_file: '/var/log/nuxt-out.log',
    },
  ],
};
