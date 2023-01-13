import Head from "next/head";
import Blocks from "../components/Blocks";

function Home() {
  return (
    <>
      <Head>
        <title>Восход</title>
        <meta name="description" content="Восход - websocket" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Blocks />
      </main>
    </>
  );
}

export default Home;
