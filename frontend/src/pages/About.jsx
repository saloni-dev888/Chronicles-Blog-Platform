export default function About() {
  return (
    <div className="container page about-page">
      <h1>About Chronicle</h1>
      <p className="page__subtitle">
        Chronicle is a personal blog built to share honest reflections and practical
        insight on technology, travel, business and the trends shaping everyday life.
      </p>

      <div className="about-page__grid">
        <div>
          <h3>What we write about</h3>
          <p>
            Every post starts with a real question — how a new technology changes the
            way we work, what makes a trip worth taking, or how a small business finds
            its footing. We keep things grounded and skip the hype.
          </p>
        </div>
        <div>
          <h3>Why it exists</h3>
          <p>
            This project began as a way to combine long-form writing with a clean,
            fast reading experience — and, on the technical side, as a full MERN stack
            build: React on the front end, Express and MongoDB powering the API.
          </p>
        </div>
      </div>

      <section className="work-experience">
        <h3>Work Experience</h3>
        <ul>
          <li>
            <strong>Editor &amp; Writer</strong> — Chronicle · 2022 — Now
          </li>
          <li>
            <strong>Content Strategist</strong> — Digital Studio · 2020 — 2022
          </li>
          <li>
            <strong>Junior Writer</strong> — Digital Studio · 2018 — 2020
          </li>
        </ul>
      </section>
    </div>
  );
}
