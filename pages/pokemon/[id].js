import Head from 'next/head';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useState, useEffect } from 'react';
import styles from '../../styles/Details.module.css';

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

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://almarfa.in/pokemon/pokemon-main/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({ pokemon }) {
  /*   const {
    query: { id },
  } = useRouter();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        `https://almarfa.in/pokemon/pokemon-main/pokemon/${id}.json`
      );

      setPokemon(await resp.json());
    }

    if (id) getPokemon();
  }, [id]);

  if (!pokemon) return null; */

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href='/'>
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://almarfa.in/pokemon/pokemon-main/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
