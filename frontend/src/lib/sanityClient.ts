import Client from '@sanity/client';

export default Client({
    projectId: 'h0cg7oh0',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true,
});

export const sanitizeImage = (url) => {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const filenameParts = filename.split('-');
    const extension = filenameParts[filenameParts.length - 1];

    const processedUrl = url.replace('image-', '').replace(`-${extension}`, `.${extension}`);

    return 'https://cdn.sanity.io/images/h0cg7oh0/production/' + processedUrl;
};