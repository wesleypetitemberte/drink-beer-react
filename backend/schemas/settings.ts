import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'titulo',
            type: 'string',
            title: 'Nome do Site'
        })
    ],
    preview: {
        prepare() {
            return {
                title: 'Settings',
            }
        },
    },
})