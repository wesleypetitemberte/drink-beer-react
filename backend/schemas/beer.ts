export default {
    name: 'bier',
    type: 'document',
    title: 'Cervejas',
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
        }
    ]
}