import React from 'react';
import sanity, { sanitizeImage } from '../../src/lib/sanityClient.ts';
import { useParams } from 'react-router-dom';

export default function Index() {
    const slug = useParams().beers;
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        if (slug) {
            sanity
            .fetch(`*[_type == "beerPage" && slug.current match $slug][0]`, {slug})
            .then((result) => setData(result))
            .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
        }
    }, []);

    if (data) {
        return (
            <main className="beer-page bg-black">
                <section className="container mr-auto ml-auto flex flex-col items-center py-12">
                    <h1 className="text-8xl font-bold text-white text-center py-10">{data.title}</h1>
                    <p className="text-white">{data.description}</p>
                    <img className="w-3/6 h-auto" src={sanitizeImage(data.image.asset._ref)} alt="Imagem da cerveja" />
                </section>
            </main>
        );
    }
    else {
        return null;
    }
}