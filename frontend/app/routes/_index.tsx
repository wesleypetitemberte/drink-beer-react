import {useState, useEffect} from "react"
import { client } from "../../src/lib/sanityClient"

//Components
import Beers from "../../src/components/Beers/Beers"
import Experience from "../../src/components/Experience/Experience"

interface IData {
  titulo:string
}

export default function Index() {
  const [data, setData] = useState<IData>()

  useEffect(() => {
    client
    .fetch(`*[_type == "settings"][0]{titulo}`)
    .then((result) => setData(result))
    .catch((error) => console.error('Erro ao buscar dados do Sanity:', error))
  }, [])

  if (data) {
    return (
      <main className="home-page">
        <section className="bg-black">
          <h1 className="text-8xl font-bold text-white text-center py-10">{data.titulo}</h1>
        </section>
  
        <Beers/>
        <Experience/>
      </main>
    )
  } else {
    return null
  }
}