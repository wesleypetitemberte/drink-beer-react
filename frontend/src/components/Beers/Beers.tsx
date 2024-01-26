import React from 'react';
import createClient from '../../lib/sanityClient.js';

export default function Beers() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        createClient
        .fetch(`*[_type == "home"]{titulo, beer, experience}`)
        .then((result) => setData(result))
        .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
    }, []);

    const sanitizeImage = (url) => {
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1];
        const filenameParts = filename.split('-');
        const extension = filenameParts[filenameParts.length - 1];
    
        const processedUrl = url.replace('image-', '').replace(`-${extension}`, `.${extension}`);
    
        return 'https://cdn.sanity.io/images/h0cg7oh0/production/' + processedUrl;
    };

    if (data) {
        return (
            <>
                {data.map((item, index) => (                    
                    <section key={index} className="beers container mr-auto ml-auto pt-10 pb-20">
                        <div className="beers-header flex justify-center items-center">
                            <div className="block-text w-6/12">
                                <h2 className="text-7xl font-bold text-yellow-500 mb-2">{item.beer.name}</h2>
                                <p className="text-2xl text-black">{item.beer.description}</p>
                            </div>
            
                            <div className="block-image">
                                <img src={sanitizeImage(item.beer.image.asset._ref)} alt="Imagem da cerveja" />
                            </div>
                        </div>
            
                        {item.beer.beers && (
                            <div className="beers-content">
                                <div className="beers-filter bg-black py-12 px-28">
                                    <h3 className="text-2xl mb-7 font-semibold text-yellow-500">CONHEÇA NOSSAS BEBIDAS</h3>
                                    <select name="beers" id="beersSelect" className="w-6/12 py-4 px-7 cursor-pointer">
                                        <option value="all">Mostrar todas</option>
                                        {item.beer.beers.map((i, index) => (
                                            <option key={index} value={i.title}>{i.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <ul className="beers-items grid grid-cols-3">
                                    {item.beer.beers.map((i, index) => (
                                        <li key={index} className="bg-yellow-500">
                                            <a href="0" className="flex flex-col justify-center items-center">
                                                <img src={sanitizeImage(i.image.asset._ref)} alt="Imagem" />
                                                <h4 className="text-2xl font-bold text-white text-center">{i.title}</h4>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ))}
            </>
        );
    } else {
        return null;
    }
}