import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    ssr: false,
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
