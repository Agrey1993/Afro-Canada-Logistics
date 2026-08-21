"use client";

import { FormEvent, useMemo, useState } from "react";

type Quote = {
  route: string;
  service: string;
  shipment: string;
  weight: string;
  name: string;
  email: string;
  phone: string;
  originCity: string;
  destinationCity: string;
  readyDate: string;
  notes: string;
};

const emptyQuote: Quote = {
  route: "Canada to Tanzania",
  service: "Air freight",
  shipment: "Boxes & personal effects",
  weight: "25",
  name: "",
  email: "",
  phone: "",
  originCity: "",
  destinationCity: "",
  readyDate: "",
  notes: "",
};

const services = [
  {
    number: "01",
    title: "Air freight",
    copy: "Fast, coordinated movement for boxes, documents and time-sensitive cargo.",
    price: "From CA$9.50/kg*",
    timeline: "Indicative: 5–10 business days",
  },
  {
    number: "02",
    title: "Ocean cargo",
    copy: "A practical option for larger personal effects, household items and commercial loads.",
    price: "From CA$4.25/kg*",
    timeline: "Indicative: 6–10 weeks",
  },
  {
    number: "03",
    title: "Door coordination",
    copy: "Pickup and delivery planning with one point of contact across both countries.",
    price: "Custom quote",
    timeline: "Based on pickup and destination",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function RouteMark() {
  return (
    <svg viewBox="0 0 88 42" aria-hidden="true">
      <path d="M7 28C27 8 49 10 77 21" />
      <circle cx="8" cy="28" r="4" />
      <circle cx="77" cy="21" r="4" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg className="brand-logo" viewBox="0 0 60 60">
        <path className="logo-a" d="M8.5 38.5 18.7 14l10.2 24.5M12.1 30.2h13.2" />
        <path className="logo-c" d="M50.6 19.2c-2.1-2.8-5.2-4.3-8.7-4.3-7 0-11.7 5.2-11.7 12s4.7 12 11.7 12c3.6 0 6.8-1.5 9-4.5" />
        <path className="logo-route" d="M10.8 46.8c11.4 7.2 28.8 6.5 39.1-2.7" />
        <circle className="logo-origin" cx="10.8" cy="46.8" r="2.4" />
        <path className="logo-arrow" d="m45.8 43.2 4.7.4-.4 4.7" />
      </svg>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState<Quote>(emptyQuote);
  const [submittedRef, setSubmittedRef] = useState("");

  const estimate = useMemo(() => {
    const weight = Math.max(0, Number(quote.weight) || 0);
    const rates: Record<string, { rate: number; minimum: number }> = {
      "Air freight": { rate: 9.5, minimum: 120 },
      "Ocean cargo": { rate: 4.25, minimum: 85 },
      "Express documents": { rate: 14.5, minimum: 165 },
    };
    const selected = rates[quote.service] ?? rates["Air freight"];
    const routeFactor = quote.route === "Tanzania to Canada" ? 1.12 : 1;
    const low = Math.max(selected.minimum, weight * selected.rate * routeFactor);
    const high = low * 1.22;
    return `${Math.round(low).toLocaleString("en-CA")}–${Math.round(high).toLocaleString("en-CA")}`;
  }, [quote.route, quote.service, quote.weight]);

  const update = (field: keyof Quote, value: string) => {
    setQuote((current) => ({ ...current, [field]: value }));
  };

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reference = `ACL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const request = { ...quote, estimate, reference, createdAt: new Date().toISOString() };
    window.localStorage.setItem("afro-canada-latest-quote", JSON.stringify(request));
    setSubmittedRef(reference);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Afro-Canada Logistics home">
          <BrandMark />
          <span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="main-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-cta" type="button" onClick={scrollToQuote}>Request a quote <ArrowIcon /></button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> CANADA <RouteMark /> TANZANIA</div>
          <h1>Your cargo.<br /><em>One clear route.</em></h1>
          <p className="hero-lede">Afro-Canada Logistics helps individuals, families and growing businesses plan shipments between Canada and Tanzania—with clear options, careful coordination and useful updates.</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToQuote}>Start a shipment <ArrowIcon /></button>
            <a href="#services" className="text-link">Explore services <span>↓</span></a>
          </div>
          <div className="trust-row" aria-label="Service highlights">
            <span><b>01</b> Clear quotes</span>
            <span><b>02</b> Human support</span>
            <span><b>03</b> Route updates</span>
          </div>
        </div>

        <aside className="route-card" aria-label="Featured logistics route">
          <div className="route-card-top">
            <span className="live-dot">ROUTE OPEN</span>
            <span>YYZ → DAR</span>
          </div>
          <div className="map-field">
            <span className="map-label canada-label">CANADA</span>
            <span className="map-label tanzania-label">TANZANIA</span>
            <svg className="route-line" viewBox="0 0 440 230" aria-hidden="true">
              <path d="M72 70C151 32 244 209 370 151" />
              <circle cx="72" cy="70" r="9" />
              <circle cx="370" cy="151" r="9" />
            </svg>
            <div className="plane">✦</div>
          </div>
          <div className="route-stats">
            <div><small>POPULAR SERVICE</small><strong>Air freight</strong></div>
            <div><small>QUOTE RESPONSE</small><strong>Within 1 day*</strong></div>
          </div>
        </aside>
      </section>

      <section className="services-section" id="about">
        <div className="about-story">
          <div>
            <span className="kicker">ABOUT AFRO-CANADA</span>
            <h2>Logistics between<br />two homes.</h2>
          </div>
          <div className="about-copy">
            <p>Afro-Canada Logistics is a Canada-based shipment coordination company focused on the Canada–Tanzania corridor. Our goal is to make cross-border shipping easier to understand—from choosing a service and planning pickup to preparing shipment details and following the route.</p>
            <p>We support personal effects, documents, household goods and commercial cargo through trusted carrier coordination. Every shipment begins with a clear review so the customer understands the expected price, timing and next steps before cargo moves.</p>
            <div className="audience-row" aria-label="Customers we serve"><span>Individuals</span><span>Families</span><span>Small businesses</span></div>
          </div>
        </div>

        <div className="section-intro" id="services">
          <div><span className="kicker">WHAT WE MOVE</span><h2>Simple options.<br />Serious care.</h2></div>
          <p>Choose the route that fits your shipment. We’ll confirm the final price, timing and requirements before anything moves.</p>
        </div>
        <div className="services-grid" id="pricing">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon" aria-hidden="true">{service.number === "01" ? "↗" : service.number === "02" ? "≈" : "⌖"}</div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <div className="price-row"><strong>{service.price}</strong><span>{service.timeline}</span></div>
              <button type="button" onClick={() => { update("service", service.title); scrollToQuote(); }}>Choose this service <ArrowIcon /></button>
            </article>
          ))}
        </div>
        <p className="pricing-note">*Illustrative pricing only. Final rates depend on dimensions, exact locations, duties, insurance and carrier availability.</p>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro">
          <span className="kicker light">START YOUR ROUTE</span>
          <h2>Tell us what<br />you’re moving.</h2>
          <p>Complete the essentials and get an immediate planning range. We’ll follow up with a verified quote.</p>
          <div className="contact-note" id="contact">
            <span className="contact-kicker">CONTACT AFRO-CANADA</span>
            <div className="contact-directory">
              <article className="contact-person">
                <div>
                  <strong>Agrey Chenga</strong>
                  <small>Chief Executive Officer</small>
                </div>
                <a
                  className="contact-link whatsapp-link"
                  href="https://wa.me/14372601378"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message Agrey Chenga on WhatsApp"
                >
                  <span className="whatsapp-mark" aria-hidden="true">W</span>
                  +1 437 260 1378
                </a>
              </article>
              <article className="contact-person">
                <div>
                  <strong>Hazel Ally</strong>
                  <small>Director of Marketing</small>
                </div>
                <a
                  className="contact-link whatsapp-link"
                  href="https://wa.me/14378703561"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message Hazel Ally on WhatsApp"
                >
                  <span className="whatsapp-mark" aria-hidden="true">W</span>
                  +1 437 870 3561
                </a>
              </article>
            </div>
            <a className="contact-link email-link" href="mailto:Afrocanadalogistics@gmail.com">
              Afrocanadalogistics@gmail.com
            </a>
            <address>601 Dundas Street East<br />Whitby, Ontario, Canada</address>
          </div>
        </div>

        <div className="form-shell">
          {submittedRef ? (
            <div className="success-card" role="status">
              <span className="success-icon">✓</span>
              <p className="kicker">REQUEST SAVED</p>
              <h3>Your route is ready for review.</h3>
              <p>Your planning reference is <strong>{submittedRef}</strong>. This preview stores the request on this device; connect a business inbox or CRM before launch to receive submissions.</p>
              <button className="primary-button" type="button" onClick={() => { setQuote(emptyQuote); setSubmittedRef(""); }}>Create another request <ArrowIcon /></button>
            </div>
          ) : (
            <form onSubmit={submitQuote}>
              <div className="form-heading"><div><span>QUOTE REQUEST</span><strong>01 / 01</strong></div><div className="form-progress"><i /></div></div>
              <div className="field-grid">
                <label>Route
                  <select value={quote.route} onChange={(e) => update("route", e.target.value)}>
                    <option>Canada to Tanzania</option>
                    <option>Tanzania to Canada</option>
                  </select>
                </label>
                <label>Service
                  <select value={quote.service} onChange={(e) => update("service", e.target.value)}>
                    <option>Air freight</option>
                    <option>Ocean cargo</option>
                    <option>Express documents</option>
                    <option>Door coordination</option>
                  </select>
                </label>
                <label>Origin city
                  <input required value={quote.originCity} onChange={(e) => update("originCity", e.target.value)} placeholder="e.g. Toronto" />
                </label>
                <label>Destination city
                  <input required value={quote.destinationCity} onChange={(e) => update("destinationCity", e.target.value)} placeholder="e.g. Dar es Salaam" />
                </label>
                <label>Shipment type
                  <select value={quote.shipment} onChange={(e) => update("shipment", e.target.value)}>
                    <option>Boxes & personal effects</option>
                    <option>Documents</option>
                    <option>Household goods</option>
                    <option>Commercial cargo</option>
                    <option>Vehicle parts</option>
                  </select>
                </label>
                <label>Estimated weight (kg)
                  <input required min="1" type="number" value={quote.weight} onChange={(e) => update("weight", e.target.value)} />
                </label>
                <label>Ready date
                  <input required type="date" value={quote.readyDate} onChange={(e) => update("readyDate", e.target.value)} />
                </label>
                <label>Your name
                  <input required value={quote.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" />
                </label>
                <label>Email
                  <input required type="email" value={quote.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                </label>
                <label>Phone / WhatsApp
                  <input required type="tel" value={quote.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 or +255" />
                </label>
                <label className="full-field">Anything else we should know?
                  <textarea value={quote.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Number of boxes, dimensions, pickup needs or special handling..." rows={3} />
                </label>
              </div>
              <div className="estimate-bar">
                <div><span>ILLUSTRATIVE RANGE</span><strong>CA${estimate}</strong><small>Final quote confirmed after review</small></div>
                <button className="submit-button" type="submit">Save request <ArrowIcon /></button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Afro-Canada Logistics home"><BrandMark /><span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span></a>
        <p>601 Dundas Street East, Whitby, Ontario</p>
        <span>© {new Date().getFullYear()} Afro-Canada Logistics</span>
      </footer>
    </main>
  );
}
