import React from 'react';
import sanity, { sanitizeImage } from '../../lib/sanityClient.ts';
import { Link } from "@remix-run/react";

export default function Beers() {
    const [data, setData] = React.useState(null);
    const [selectBeer, setSelectBeer] = React.useState('all');

    const handleSelectChange = (event) => {
        setSelectBeer(event.target.value);
    };

    React.useEffect(() => {
        sanity
        .fetch(`*[_type == "home"]{
            beer{
                name,
                description,
                image,
                "beers": beers[] -> {
                    title,
                    slug,
                    description,
                    image
                }
            }
        }[0]`)
        .then((result) => setData(result))
        .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
    }, []);

    if (data) {
        return (
            <section className="beers container mr-auto ml-auto pt-40 pb-20">
                <div className="beers-header flex justify-center items-center">
                    <div className="block-text w-2/6 mb-28">
                        <h2 className="text-7xl font-bold text-yellow-500 mb-2 uppercase">{data.beer.name}</h2>
                        <p className="text-2xl text-black uppercase">{data.beer.description}</p>
                    </div>
    
                    <div className="block-image w-6/12 relative">
                        <img src={sanitizeImage(data.beer.image.asset._ref)} alt="Imagem da cerveja" />
                    </div>
                </div>
    
                {data.beer.beers && (
                    <div className="beers-content">
                        <div className="beers-filter bg-black py-12 px-28">
                            <h3 className="text-2xl mb-7 font-semibold text-yellow-500">CONHEÇA NOSSAS BEBIDAS</h3>
                            <select name="beers" id="beersSelect" value={selectBeer} onChange={handleSelectChange} className="w-6/12 cursor-pointer form-select">
                                <option value="all">Mostrar todas</option>
                                {data.beer.beers.map((i, index) => (
                                    <option key={index} value={i.title}>{i.title}</option>
                                ))}
                            </select>
                        </div>

                        <ul className="beers-items grid grid-cols-3">
                            {data.beer.beers.map((i, index) => (
                                (selectBeer == i.title || selectBeer == 'all') && 
                                <li key={index} className="bg-yellow-500 pt-4 pb-14">
                                    <Link className="flex flex-col justify-center items-center" to={"/cervejas/" + i.slug.current}>
                                        <img src={sanitizeImage(i.image.asset._ref)} alt="Imagem" />
                                        <h4 className="text-2xl font-bold text-white text-center">{i.title}</h4>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        );
    } else {
        return null;
    }
}