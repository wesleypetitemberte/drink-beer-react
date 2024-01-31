export default {
    name: 'beerPage',
    title: 'Cerveja',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: 'description',
            title: 'Descrição',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Imagem',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
};
