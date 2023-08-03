// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true,
    ssr: {
      noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue'],
    }
  
  },
  modules: [
    '@pinia/nuxt',
  ],
})
