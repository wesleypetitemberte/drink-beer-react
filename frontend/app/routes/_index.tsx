//Components
import Beers from "../../src/components/Beers/Beers";

export default function Index() {
  return (
    <main>
      <section className="bg-black">
        <h1 className="text-8xl font-bold text-white text-center py-10">DRINK BEER</h1>
      </section>

      <Beers/>
    </main>
  );
}