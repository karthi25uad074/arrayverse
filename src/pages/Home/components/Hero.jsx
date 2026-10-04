function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-tag">
          <span></span>
          ARRAY SYSTEM ONLINE
        </div>

        <h1>
          MASTER THE
          <br />
          <strong>ARRAY.</strong>
        </h1>

        <p>
          Explore memory. Execute operations. Solve missions.
          <br />
          Learn array implementation through an interactive universe.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">ENTER ARRAYVERSE</button>
          <button className="secondary-btn">EXPLORE LEARNING</button>
        </div>
      </div>

      <div className="hero-array">
        <div className="array-label">LIVE ARRAY CORE</div>

        <div className="array-cells">
          <div className="array-cell active">
            <span>0</span>
            <strong>12</strong>
          </div>

          <div className="array-cell">
            <span>1</span>
            <strong>27</strong>
          </div>

          <div className="array-cell">
            <span>2</span>
            <strong>08</strong>
          </div>

          <div className="array-cell">
            <span>3</span>
            <strong>41</strong>
          </div>

          <div className="array-cell">
            <span>4</span>
            <strong>19</strong>
          </div>
        </div>

        <div className="array-memory">
          <span>INDEX</span>
          <span>VALUE</span>
          <span>MEMORY BLOCK</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;