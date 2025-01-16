export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.tailwindcss.com',
          defer: true
        }
      ]
    }
  },
  css: [
    'assets/tailwind.css', // Corrected path
  ],
  plugins: [
    // '~/plugins/config.js' // Register the global state management plugin
  ]
})
