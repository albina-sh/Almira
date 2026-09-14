import './Support.css'

function Support() {
  return (
    <div className="support-page">

      <section className="support-hero">
        <p className="support-small-title">
          WE'RE HERE TO HELP
        </p>

        <h1>
          Support
        </h1>

        <p>
          Have a question? We'd love to help.
        </p>
      </section>

      <section className="support-content">

        <div className="support-intro">
          <p className="support-label">
            CUSTOMER CARE
          </p>

          <h2>
            How can we help you?
          </h2>

          <p>
            Whether you have a question about your order,
            sizing, delivery, or our collections, our
            customer care team is here to assist you.
          </p>
        </div>

        <div className="support-options">

          <div className="support-card">
            <span>01</span>

            <h3>
              Order Support
            </h3>

            <p>
              Need help with an order or want to know
              about your order status?
            </p>

            <a href="mailto:albinash334@gmail.com">
              CONTACT US
            </a>
          </div>

          <div className="support-card">
            <span>02</span>

            <h3>
              Size & Fit
            </h3>

            <p>
              Not sure which size to choose? Contact us
              and we'll help you find the right fit.
            </p>

            <a href="mailto:albinash334@gmail.com">
              ASK US
            </a>
          </div>

          <div className="support-card">
            <span>03</span>

            <h3>
              General Questions
            </h3>

            <p>
              Have another question about Almira?
              We're happy to hear from you.
            </p>

            <a href="mailto:albinash334@gmail.com">
              GET IN TOUCH
            </a>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Support