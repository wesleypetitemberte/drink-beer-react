import {defineField, defineType} from 'sanity'

export const homeType = defineType({
    name: 'home',
    title: 'Home',
    type: 'document',
    fields: [
        defineField({
            name: 'titulo',
            type: 'string',
            title: 'Título da Página'
        }),
        defineField({
            name: 'beer',
            type: 'object',
            title: 'Módulo de Cervejas',
            fields: [
                {
                    name: 'name',
                    type: 'string',
                    title: 'Nome'
                },
                {
                    name: 'description',
                    type: 'text',
                    title: 'Descrição'
                },
                {
                    name: 'image',
                    type: 'image',
                    title: 'Imagem',
                    options: {
                        hotspot: true
                    }
                },
                {
                    name: 'beers',
                    type: 'array',
                    title: 'Cervejas',
                    of: [
                        {
                            type: 'reference',
                            to: [{ type: 'beerPage' }],
                        },
                    ],
                }
            ]
        }),
        defineField({
            name: 'experience',
            type: 'object',
            title: 'Módulo de Experience',
            fields: [
                {
                    name: 'title',
                    type: 'string',
                    title: 'Título'
                },
                {
                    name: 'description',
                    type: 'text',
                    title: 'Descrição'
                },
                {
                    name: 'blocks',
                    type: 'array',
                    title: 'Blocos',
                    of: [
                        { 
                            type: 'object',
                            name: 'titleBlock',
                            title: 'Bloco com Título',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'string',
                                    title: 'Título'
                                },
                                {
                                    name: 'image',
                                    type: 'image',
                                    title: 'Imagem'
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    ]
})