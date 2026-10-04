function WorldPreview() {
  const worlds = [
    {
      number: "01",
      title: "ARRAY ROOKIE",
      description: "Discover the basics of arrays, elements and indexes.",
      status: "START HERE",
    },
    {
      number: "02",
      title: "INDEX EXPLORER",
      description: "Master positions, traversal and direct access.",
      status: "LOCKED",
    },
    {
      number: "03",
      title: "MEMORY HUNTER",
      description: "Understand how arrays live inside computer memory.",
      status: "LOCKED",
    },
    {
      number: "04",
      title: "ALGORITHM RUNNER",
      description: "Execute searching, sorting and array operations.",
      status: "LOCKED",
    },
    {
      number: "05",
      title: "ARRAY MASTER",
      description: "Complete the final challenges and prove your skills.",
      status: "LOCKED",
    },
  ];

  return (
    <section className="world-section">
      <div className="section-heading">
        <span>02 / ARRAYVERSE MAP</span>

        <h2>
          CHOOSE YOUR
          <strong> PATH</strong>
        </h2>

        <p>
          Learn step by step. Complete missions. Unlock the next level.
        </p>
      </div>

      <div className="world-grid">
        {worlds.map((world, index) => (
          <div
            className={`world-card ${index === 0 ? "unlocked" : ""}`}
            key={world.number}
          >
            <div className="world-number">{world.number}</div>

            <div className="world-status">
              {index === 0 ? "● ONLINE" : "● LOCKED"}
            </div>

            <h3>{world.title}</h3>

            <p>{world.description}</p>

            <div className="world-bottom">
              <span>{world.status}</span>

              <span className="world-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorldPreview;