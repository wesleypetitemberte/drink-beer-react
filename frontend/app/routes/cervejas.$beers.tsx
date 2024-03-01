import {useState, useEffect} from "react"
import { client, sanitizeImage } from "../../src/lib/sanityClient"
import { useParams } from "react-router-dom"

interface IData {
    title:string
    description:string
    image:any
}

export default function Index() {
    const slug:string | undefined = useParams().beers
    const [data, setData] = useState<IData>()

    useEffect(() => {
        if (slug) {
            client
            .fetch(`*[_type == "beerPage" && slug.current match $slug][0]`, {slug})
            .then((result) => setData(result))
            .catch((error) => console.error('Erro ao buscar dados do Sanity:', error))
        }
    }, [])

    if (data) {
        return (
            <main className="beer-page bg-black">
                <section className="container mr-auto ml-auto flex flex-col items-center py-12">
                    <h1 className="text-8xl font-bold text-white text-center py-10">{data.title}</h1>
                    <p className="text-white">{data.description}</p>
                    <img className="w-3/6 h-auto" src={sanitizeImage(data.image.asset._ref)} alt="Imagem da cerveja" />
                </section>
            </main>
        )
    }
    else {
        return null
    }
}