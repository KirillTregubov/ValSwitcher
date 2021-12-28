export default {
  target: 'static',
  components: true,
  head: {
    htmlAttrs: { lang: 'en' },
    title: 'ValSwitcher',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Switch your valorant accounts with ease.' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    ]
  },
  modules: ["@nuxtjs/svg"],
  buildModules: ['@nuxtjs/tailwindcss'],
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
  }
}