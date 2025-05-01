module.exports = {
  apps: [{
    name: "nuxt-app",
    script: "./.output/server/index.mjs",
    instances: 1,
    exec_mode: "fork",
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  }]
}
