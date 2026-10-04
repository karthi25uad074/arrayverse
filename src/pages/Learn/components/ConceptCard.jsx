function ConceptCard({ number, title, description, status, active }) {
  return (
    <article className={`concept-card ${active ? "active" : ""}`}>
      <div className="concept-top">
        <span className="concept-number">{number}</span>

        <span className={`concept-status ${active ? "ready" : ""}`}>
          {active ? "● READY" : "○ LOCKED"}
        </span>
      </div>

      <div className="concept-icon">
        <span></span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="concept-bottom">
        <span>{status}</span>

        <span className="concept-arrow">→</span>
      </div>
    </article>
  );
}

export default ConceptCard;