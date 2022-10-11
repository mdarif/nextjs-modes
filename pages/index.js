import Head from 'next/head';
import Link from 'next/link';
// import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

/**
 * getServerSideProps
 *
 * If you export a function called getServerSideProps (Server-Side Rendering)
 * from a page, Next.js will pre-render this page on each request using the
 * data returned by getServerSideProps.
 *
 * 'getServerSideProps' only runs on server-side and never runs on the browser.
 *
 * getServerSideProps returns JSON which will be used to render the page.
 */

export async function getServerSideProps() {
  const response = await fetch(
    'https://almarfa.in/pokemon/pokemon-main/index.json'
  );

  return {
    props: {
      pokemon: await response.json(),
    },
  };
}

export default function Home({ pokemon }) {
  /*   const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(
        'https://almarfa.in/pokemon/pokemon-main/index.json'
      );
      setPokemon(await response.json());
    }
    getPokemon();
  }, []);
 */
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://almarfa.in/pokemon/pokemon-main/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
