import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/future/image';
// import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

/**
 * getStaticProps
 *
 * If you export a function called getStaticProps (Static Site Generation) from a page,
 * Next.js will pre-render this page at build time using the props returned by
 * getStaticProps.
 *
 * When should I use getStaticProps?
 *
 * The data required to render the page is available at build time ahead of a user’s request
 *
 * The data comes from a 'headless CMS'
 *
 * The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML
 * and JSON files, both of which can be cached by a CDN for performance
 *
 */

export async function getStaticProps() {
  const response = await fetch(
    'https://almarfa.in/pokemon/pokemon-main/index.json'
  );

  return {
    props: {
      pokemon: await response.json(),
    },
  };
}

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

/* export async function getServerSideProps() {
  const response = await fetch(
    'https://almarfa.in/pokemon/pokemon-main/index.json'
  );

  return {
    props: {
      pokemon: await response.json(),
    },
  };
} */

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

  // const myLoader = ({ src, width, quality }) => {
  //   return `https://almarfa.in/pokemon/pokemon-main/${src}?w=${width}&q=${
  //     quality || 75
  //   }`;
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => {
          return (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <a>
                  <Image
                    // loader={myLoader}
                    src={`https://almarfa.in/pokemon/pokemon-main/${pokemon.image}`}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    // priority={true} // When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
                    priority={pokemon.id <= 20}
                  />
                  <h3>{pokemon.name}</h3>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
