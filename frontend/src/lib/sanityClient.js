import createClient from '@sanity/client';

export default createClient({
    projectId: 'h0cg7oh0',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true,
});