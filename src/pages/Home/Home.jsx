import "./Home.css";

import Navbar from "../../shared/Navbar/Navbar";
import "../../shared/Navbar/Navbar.css";
import ArrayCore from "./components/ArrayCore";
import Hero from "./components/Hero";
import WorldPreview from "./components/WorldPreview";
import Footer from "../../shared/Footer/Footer";
function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <ArrayCore />
      <WorldPreview />
      <section className="home-cta">
  <div className="cta-content">
    <span>ARRAYVERSE // READY</span>

    <h2>
      YOUR ARRAY
      <strong> JOURNEY STARTS HERE.</strong>
    </h2>

    <p>
      Learn. Practice. Experiment. Master.
      <br />
      No login. No limits. Completely free.
    </p>

    <button className="cta-button">
      START LEARNING →
    </button>
  </div>
</section>
<Footer />
    </div>
  );
}

export default Home;