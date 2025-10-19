export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/icon'],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            title: 'Synch | Finanças',
            htmlAttrs: {
                lang: 'pt-BR',
            }
        },
    },
})