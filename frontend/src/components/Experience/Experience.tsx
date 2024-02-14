import React from 'react';
import sanity, { sanitizeImage } from '../../lib/sanityClient.ts';

export default function Beers() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        sanity
        .fetch(`*[_type == "home"][0]{experience}`)
        .then((result) => setData(result))
        .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
    }, []);

    if (data) {
        return (
            <section className="experience pt-10 pb-24">
                <div className="container mr-auto ml-auto">
                    <div className="w-3/6 mb-14">
                        <h2 className="text-7xl font-bold text-white mb-4 uppercase">{data.experience.title}</h2>
                        <p className="text-2xl text-white uppercase">{data.experience.description}</p>
                    </div>

                    {data.experience.blocks && (
                        <div className="blocks flex">
                            {data.experience.blocks.map((i, index) => (
                                <div key={index} className="block relative">
                                    <img className="object-cover" src={sanitizeImage(i.image.asset._ref)} alt="Imagem" />
                                    <h4 className="text-7xl w-2/3 font-bold text-white z-10 absolute bottom-16 left-10">{i.title}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    } else {
        return null;
    }
}