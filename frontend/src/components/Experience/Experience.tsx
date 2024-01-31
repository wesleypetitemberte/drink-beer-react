import React from 'react';
import sanity, { sanitizeImage } from '../../lib/sanityClient.ts';

export default function Beers() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        sanity
        .fetch(`*[_type == "home"]{experience}`)
        .then((result) => setData(result))
        .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
    }, []);

    if (data) {
        return (
            <>
                {data.map((item, index) => (                    
                    <section key={index} className="experience pt-10 pb-24">
                        <div className="container mr-auto ml-auto">
                            <div className="w-3/6 mb-14">
                                <h2 className="text-7xl font-bold text-white mb-4 uppercase">{item.experience.title}</h2>
                                <p className="text-2xl text-white uppercase">{item.experience.description}</p>
                            </div>

                            {item.experience.blocks && (
                                <div className="blocks flex">
                                    {item.experience.blocks.map((i, index) => (
                                        <div key={index} className="block relative">
                                            <img className="object-cover" src={sanitizeImage(i.image.asset._ref)} alt="Imagem" />
                                            <h4 className="text-7xl w-2/3 font-bold text-white z-10 absolute bottom-16 left-10">{i.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </>
        );
    } else {
        return null;
    }
}