function ArrayCore() {
  const elements = [
    { index: 0, value: 42, address: "0x100" },
    { index: 1, value: 18, address: "0x104" },
    { index: 2, value: 73, address: "0x108" },
    { index: 3, value: 29, address: "0x10C" },
    { index: 4, value: 61, address: "0x110" },
  ];

  return (
    <section className="array-core-section">
      <div className="section-heading">
        <span>01 / CORE SYSTEM</span>

        <h2>
          UNDERSTAND THE
          <strong> ARRAY</strong>
        </h2>

        <p>
          Every element has a position, a value and a place in memory.
          Explore how an array really works.
        </p>
      </div>

      <div className="array-core-panel">

        <div className="core-topbar">
          <div>
            <span className="core-dot"></span>
            MEMORY VISUALIZER
          </div>

          <span>5 ELEMENTS / ACTIVE</span>
        </div>

        <div className="core-array">
          {elements.map((element) => (
            <div className="core-element" key={element.index}>
              <div className="core-index">
                INDEX {element.index}
              </div>

              <div className="core-value">
                {element.value}
              </div>

              <div className="core-address">
                {element.address}
              </div>
            </div>
          ))}
        </div>

        <div className="core-info">

          <div className="info-block">
            <span>INDEX</span>
            <strong>POSITION</strong>
            <p>
              Each element is identified by its index.
            </p>
          </div>

          <div className="info-block">
            <span>VALUE</span>
            <strong>DATA</strong>
            <p>
              The actual information stored inside the array.
            </p>
          </div>

          <div className="info-block">
            <span>ADDRESS</span>
            <strong>MEMORY</strong>
            <p>
              Each element occupies a location in memory.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ArrayCore;