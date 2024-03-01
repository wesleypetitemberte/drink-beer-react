import {useState, useEffect} from "react"
import { client, sanitizeImage } from "../../lib/sanityClient"

interface IData {
    experience:any
}

export default function Beers() {
    const [data, setData] = useState<IData>()

    useEffect(() => {
        client
        .fetch(`*[_type == "home"][0]{experience}`)
        .then((result) => setData(result))
        .catch((error) => console.error('Erro ao buscar dados do Sanity:', error))
    }, [])

    if (data) {
        return (
            <section className="experience pt-10 pb-24">
                <div className="container mr-auto ml-auto">
                    <div className="w-3/6 mb-14">
                        <h2 className="text-7xl font-bold text-white mb-4 uppercase">{data.experience.title}</h2>
                        <p className="text-2xl text-white uppercase">{data.experience.description}</p>
                    </div>

                    {data.experience.blocks && (
                        <div className="blocks flex justify-between lg:flex-row flex-col">
                            {data.experience.blocks.map((i:any, index:number) => (
                                <div key={index} className="block relative">
                                    <img className="object-cover" src={sanitizeImage(i.image.asset._ref)} alt="Imagem" />
                                    <h4 className="text-6xl w-2/3 font-bold text-white z-10 absolute bottom-32 left-10">{i.title}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        )
    } else {
        return null
    }
}