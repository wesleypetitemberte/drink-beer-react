import {defineField, defineType} from 'sanity'

export const beersType = defineType({
    name: 'beerPage',
    title: 'Cervejas',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string'
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            }
        }),
        defineField({
            name: 'description',
            title: 'Descrição',
            type: 'text'
        }),
        defineField({
            name: 'image',
            title: 'Imagem',
            type: 'image',
            options: {
                hotspot: true,
            }
        })
    ]
})