//Components
import Beers from "../../src/components/Beers/Beers";
import Experience from "../../src/components/Experience/Experience";

export default function Index() {
  return (
    <main className="home-page">
      <section className="bg-black">
        <h1 className="text-8xl font-bold text-white text-center py-10">DRINK BEER</h1>
      </section>

      <Beers/>
      <Experience/>
    </main>
  );
}