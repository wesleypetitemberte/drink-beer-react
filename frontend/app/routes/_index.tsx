import React from 'react';
import sanity from '../../src/lib/sanityClient.ts';

//Components
import Beers from "../../src/components/Beers/Beers";
import Experience from "../../src/components/Experience/Experience";

export default function Index() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    sanity
    .fetch(`*[_type == "settings"][0]`)
    .then((result) => setData(result))
    .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
  }, []);

  if (data) {
    return (
      <main className="home-page">
        <section className="bg-black">
          <h1 className="text-8xl font-bold text-white text-center py-10">{data.titulo}</h1>
        </section>
  
        <Beers/>
        <Experience/>
      </main>
    );
  } else {
    return null;
  }
}