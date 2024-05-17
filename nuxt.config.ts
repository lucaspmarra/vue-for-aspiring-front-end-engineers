// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/scss/main.scss'],
    devtools: {enabled: true},
    ui:{
        icons:['simple-icons', 'mdi', 'heroicons']
    },
    modules: ['@nuxt/ui', "nuxt-graphql-request"],
    build: {
        transpile: ['nuxt-graphql-request'],
    },
    graphql: {
        clients: {
            default: {
                endpoint: 'https://api.github.com/graphql',
                options: {
                    headers: {
                        Authorization: `Bearer ${process.env.NUXT_SECRET_API_GRAPH_TOKEN}` // Token enviado para autenticação
                    }
                },
            },
        },
        options: {
            method: 'get', // Default to `POST`
        },
        includeNodeModules: true,
    },
})
