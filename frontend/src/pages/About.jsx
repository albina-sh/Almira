import './About.css'

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <p className="about-small-title">
          OUR STORY
        </p>

        <h1>
          About Almira
        </h1>

        <p>
          Where tradition meets elegance.
        </p>
      </section>

      <section className="about-content">

        <div className="about-text">
          <p className="about-label">
            THE ALMIRA COLLECTION
          </p>

          <h2>
            Tradition, thoughtfully reimagined.
          </h2>

          <p>
            Almira is a fashion destination inspired by
            timeless South Asian style and modern elegance.
            We bring together carefully selected pieces
            designed to make every occasion feel special.
          </p>

          <p>
            From graceful kurtis to elegant co-ord sets
            and anarkali styles, our collection celebrates
            tradition while keeping things comfortable,
            contemporary, and effortlessly beautiful.
          </p>

          <p>
            At Almira, we believe that fashion should feel
            personal, confident, and timeless.
          </p>
        </div>

        <div className="about-highlight">
          <div>
            <span>01</span>
            <h3>Timeless Style</h3>
            <p>
              Designs inspired by tradition and made for
              modern wardrobes.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Thoughtful Selection</h3>
            <p>
              Pieces chosen with elegance, comfort, and
              versatility in mind.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Made to Feel Special</h3>
            <p>
              Fashion that helps you feel confident on
              every occasion.
            </p>
          </div>
        </div>

      </section>

    </div>
  )
}

export default About