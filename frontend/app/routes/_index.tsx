import React from 'react';
import createClient from '../../src/lib/sanityClient';

export default function Index() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    createClient
      .fetch('*[_type == "bier"]{name, description, image}')
      .then((result) => setData(result))
      .catch((error) => console.error('Erro ao buscar dados do Sanity:', error));
  }, []);

  return (
    <div>
      <h1>Meu Projeto RemixJS e SanityJS</h1>

      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}