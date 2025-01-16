export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.tailwindcss.com',
          defer: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js',
          defer: true
        }
      ]
    }
  },
  css: [
    'assets/tailwind.css', // Corrected path
  ]
})
