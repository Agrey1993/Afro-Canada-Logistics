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

const COMPANY_EMAIL = "Afrocanadalogistics@gmail.com";
const CEO_WHATSAPP = "14372601378";
const MARKETING_WHATSAPP = "14378703561";

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
    copy: "Fast coordination for boxes, documents and time-sensitive cargo between Canada and Tanzania.",
    price: "From CA$9.50/kg*",
    timeline: "Indicative: 5–10 business days",
    className: "air",
  },
  {
    number: "02",
    title: "Ocean cargo",
    copy: "A practical choice for household goods, larger personal effects and commercial loads.",
    price: "From CA$4.25/kg*",
    timeline: "Indicative: 6–10 weeks",
    className: "ocean",
  },
  {
    number: "03",
    title: "Door coordination",
    copy: "Pickup and delivery planning with one clear point of contact across both countries.",
    price: "Custom quote",
    timeline: "Based on pickup and destination",
    className: "door",
  },
];

const processSteps = [
  ["01", "Tell us about the shipment", "Share the route, cargo type, approximate weight, cities and preferred timing."],
  ["02", "We review the details", "We confirm the suitable service, clarify requirements and identify information still needed."],
  ["03", "Confirm price and plan", "You receive the confirmed quote, expected timing and next steps before cargo moves."],
  ["04", "Coordinate the journey", "Pickup, carrier coordination and destination planning are handled with a clear point of contact."],
];

const assurances = [
  ["Canada ↔ Tanzania focus", "A clear corridor focus makes the customer journey easier to understand."],
  ["Direct human support", "Customers can reach the team directly by WhatsApp or email."],
  ["Transparent planning", "Illustrative rates are separated from the final confirmed quote."],
  ["Shipment-first guidance", "We review cargo details before confirming timing, pricing and requirements."],
];

const faqs = [
  ["What can I ship?", "We coordinate common personal effects, documents, household goods and commercial cargo. Some goods are restricted or prohibited, so the final acceptance depends on the cargo details and applicable carrier/customs rules."],
  ["Are the prices shown on the website final?", "No. Website rates are planning estimates only. Final pricing depends on weight, dimensions, cargo type, exact pickup and destination, duties or taxes, insurance and carrier availability."],
  ["Do you handle customs duties and taxes?", "Duties, taxes and customs requirements vary by shipment and destination. We clarify what information is needed, but government charges and customs decisions are separate from the transport estimate."],
  ["Can you arrange pickup and delivery?", "Door coordination can be included depending on the pickup city, destination and shipment type. Request a quote with both cities so the team can confirm availability."],
  ["How long does shipping take?", "Air freight is generally faster, while ocean cargo is better suited to larger or less time-sensitive shipments. Timelines shown on the site are indicative and are confirmed for each shipment."],
  ["How do I start?", "Complete the quote form or contact the team on WhatsApp. Include the cargo type, estimated weight, origin, destination and preferred ready date."],
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function PlaneIcon() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M6 35l22-5 13-20 6 2-7 20 15 7-2 5-17-3-8 14-5-2 4-14-15 3z" /></svg>;
}

function ShipIcon() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 30h38l-5 15c-4 5-9 8-15 8s-12-3-16-8zM23 30V14h18v16M16 46c5 4 10 5 15 5s11-2 16-6M19 20h26" /></svg>;
}

function DoorIcon() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 42h16l5 10h20M9 42l7-18h24l6 18M23 24V13h19v11M19 46h2M43 46h2" /><circle cx="20" cy="49" r="5" /><circle cx="45" cy="49" r="5" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState<Quote>(emptyQuote);
  const [submittedRef, setSubmittedRef] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");

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

  const update = (field: keyof Quote, value: string) => setQuote((current) => ({ ...current, [field]: value }));

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reference = `ACL-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const message = [
      "Hello Afro-Canada Logistics, I would like a shipping quote.",
      "",
      `Reference: ${reference}`,
      `Name: ${quote.name}`,
      `Phone: ${quote.phone}`,
      `Email: ${quote.email}`,
      `Route: ${quote.route}`,
      `Service: ${quote.service}`,
      `Shipment: ${quote.shipment}`,
      `Weight: ${quote.weight} kg`,
      `Origin: ${quote.originCity}`,
      `Destination: ${quote.destinationCity}`,
      `Ready date: ${quote.readyDate}`,
      `Planning range: CA$${estimate}`,
      quote.notes ? `Notes: ${quote.notes}` : "",
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.localStorage.setItem("afro-canada-latest-quote", JSON.stringify({ ...quote, estimate, reference }));
    setSubmittedRef(reference);
    setSubmittedUrl(whatsappUrl);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Afro-Canada Logistics home">
          <span className="brand-mark"><b>AC</b><i /></span>
          <span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span>
        </a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="main-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <button className="nav-cta" type="button" onClick={scrollToQuote}>Request a quote <ArrowIcon /></button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> CANADA <b>↔</b> TANZANIA</div>
          <h1>Moving cargo.<br /><em>Connecting homes.</em></h1>
          <p className="hero-lede">Practical Canada–Tanzania shipping coordination for families, individuals and growing businesses—with clear options, direct support and a straightforward quote process.</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToQuote}>Start a shipment <ArrowIcon /></button>
            <a href={`https://wa.me/${CEO_WHATSAPP}`} target="_blank" rel="noreferrer" className="whatsapp-link">WhatsApp us</a>
          </div>
          <div className="trust-row"><span><b>01</b> Clear planning</span><span><b>02</b> Canada ↔ Tanzania focus</span><span><b>03</b> Direct support</span></div>
        </div>

        <aside className="route-card" aria-label="Featured Canada to Tanzania route">
          <div className="route-card-top"><span className="live-dot">ROUTE OPEN</span><span>YYZ → DAR</span></div>
          <div className="route-visual">
            <div className="country country-canada"><span>🇨🇦</span><strong>Canada</strong><small>Toronto • GTA</small></div>
            <div className="flight-path"><i /><b>✈</b><i /></div>
            <div className="country country-tanzania"><span>🇹🇿</span><strong>Tanzania</strong><small>Dar es Salaam • Nationwide</small></div>
          </div>
          <div className="route-stats"><div><small>POPULAR</small><strong>Air freight</strong></div><div><small>SUPPORT</small><strong>WhatsApp direct</strong></div></div>
        </aside>
      </section>

      <section className="about-section" id="about">
        <div className="about-panel">
          <div><span className="kicker light">ABOUT AFRO-CANADA</span><h2>One corridor.<br />Two countries.<br /><em>One clear plan.</em></h2></div>
          <div className="about-copy">
            <p>Afro-Canada Logistics is a Canada-based shipment coordination company focused on the Canada–Tanzania corridor. We help customers understand service options, organize pickup and delivery planning, and prepare the information needed for a smoother shipment.</p>
            <p>We coordinate personal effects, documents, household goods and commercial cargo through carrier services. Final pricing, timelines and shipment requirements are confirmed before cargo moves.</p>
            <div className="audience-row"><span>Individuals</span><span>Families</span><span>Small businesses</span><span>Commercial cargo</span></div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-intro"><div><span className="kicker">OUR SERVICES</span><h2>Choose the route<br />that fits your cargo.</h2></div><p>Flexible options for different shipment sizes, budgets and timelines. We confirm the final requirements before anything moves.</p></div>
        <div className="services-grid">
          {services.map((service) => (
            <article className={`service-card ${service.className}`} key={service.title}>
              <div className="service-top"><span className="service-number">{service.number}</span><span className="service-badge">CAN ↔ TZ</span></div>
              <div className="service-art">{service.number === "01" ? <PlaneIcon /> : service.number === "02" ? <ShipIcon /> : <DoorIcon />}</div>
              <h3>{service.title}</h3><p>{service.copy}</p>
              <div className="price-row"><strong>{service.price}</strong><span>{service.timeline}</span></div>
              <button type="button" onClick={() => { update("service", service.title); scrollToQuote(); }}>Choose this service <ArrowIcon /></button>
            </article>
          ))}
        </div>
        <p className="pricing-note">*Planning rates are illustrative only. Final rates depend on dimensions, exact locations, duties/taxes, insurance, cargo type and carrier availability.</p>
      </section>

      <section className="assurance-section" aria-labelledby="assurance-title">
        <div className="assurance-heading"><span className="kicker">WHY CUSTOMERS CHOOSE A CLEAR ROUTE</span><h2 id="assurance-title">Built around useful communication.</h2></div>
        <div className="assurance-grid">
          {assurances.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-intro"><span className="kicker light">HOW IT WORKS</span><h2>From first message<br />to shipment plan.</h2><p>A simple four-step process keeps expectations clear before the shipment begins.</p></div>
        <div className="process-list">
          {processSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-heading"><span className="kicker light">CONTACT OUR TEAM</span><h2>Talk to a real person.</h2><p>Tap a number to open WhatsApp, or tap the email address to start an email.</p></div>
        <div className="contact-grid">
          <a aria-label="WhatsApp Agrey Chenga" className="contact-card whatsapp-card" href={`https://wa.me/${CEO_WHATSAPP}`} target="_blank" rel="noreferrer">
            <span className="contact-icon">WA</span><small>CEO • WHATSAPP</small><strong>AGREY CHENGA</strong><b>+1 437-260-1378</b><em>Open WhatsApp →</em>
          </a>
          <a aria-label="WhatsApp Hazel Ally" className="contact-card whatsapp-card alt" href={`https://wa.me/${MARKETING_WHATSAPP}`} target="_blank" rel="noreferrer">
            <span className="contact-icon">WA</span><small>DIRECTOR OF MARKETING • WHATSAPP</small><strong>Hazel Ally</strong><b>+1 437-870-3561</b><em>Open WhatsApp →</em>
          </a>
          <a aria-label="Email Afro-Canada Logistics" className="contact-card email-card" href={`mailto:${COMPANY_EMAIL}?subject=Afro-Canada Logistics Inquiry`}>
            <span className="contact-icon">@</span><small>COMPANY EMAIL</small><strong>Afro-Canada Logistics</strong><b>{COMPANY_EMAIL}</b><em>Write an email →</em>
          </a>
        </div>
        <div className="address-strip"><span>CANADA OFFICE</span><strong>601 Dundas Street East, Whitby, Ontario, Canada</strong></div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro"><span className="kicker light">START YOUR ROUTE</span><h2>Tell us what<br />you’re moving.</h2><p>Complete the form and we’ll prepare a WhatsApp message containing your shipment details, planning estimate and reference number.</p><div className="quote-help"><span>Need help first?</span><a href={`https://wa.me/${CEO_WHATSAPP}`} target="_blank" rel="noreferrer">Chat on WhatsApp →</a></div></div>
        <div className="form-shell">
          {submittedRef ? (
            <div className="success-card" role="status"><span className="success-icon">✓</span><p className="kicker">REQUEST PREPARED</p><h3>Your reference is {submittedRef}.</h3><p>Your WhatsApp message is ready. If WhatsApp did not open automatically, use the button below to open the same prepared request.</p><a className="primary-button" href={submittedUrl || `https://wa.me/${CEO_WHATSAPP}`} target="_blank" rel="noreferrer">Open prepared WhatsApp <ArrowIcon /></a><button className="reset-button" type="button" onClick={() => { setQuote(emptyQuote); setSubmittedRef(""); setSubmittedUrl(""); }}>Create another request</button></div>
          ) : (
            <form onSubmit={submitQuote}>
              <div className="form-heading"><div><span>QUOTE REQUEST</span><strong>WHATSAPP REQUEST</strong></div><div className="form-progress"><i /></div></div>
              <div className="field-grid">
                <label>Route<select value={quote.route} onChange={(e) => update("route", e.target.value)}><option>Canada to Tanzania</option><option>Tanzania to Canada</option></select></label>
                <label>Service<select value={quote.service} onChange={(e) => update("service", e.target.value)}><option>Air freight</option><option>Ocean cargo</option><option>Express documents</option><option>Door coordination</option></select></label>
                <label>Origin city<input required autoComplete="address-level2" value={quote.originCity} onChange={(e) => update("originCity", e.target.value)} placeholder="e.g. Toronto" /></label>
                <label>Destination city<input required value={quote.destinationCity} onChange={(e) => update("destinationCity", e.target.value)} placeholder="e.g. Dar es Salaam" /></label>
                <label>Shipment type<select value={quote.shipment} onChange={(e) => update("shipment", e.target.value)}><option>Boxes & personal effects</option><option>Documents</option><option>Household goods</option><option>Commercial cargo</option><option>Vehicle parts</option></select></label>
                <label>Estimated weight (kg)<input required min="1" inputMode="decimal" type="number" value={quote.weight} onChange={(e) => update("weight", e.target.value)} /></label>
                <label>Ready date<input required type="date" value={quote.readyDate} onChange={(e) => update("readyDate", e.target.value)} /></label>
                <label>Your name<input required autoComplete="name" value={quote.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" /></label>
                <label>Email<input required autoComplete="email" type="email" value={quote.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></label>
                <label>Phone / WhatsApp<input required autoComplete="tel" inputMode="tel" type="tel" value={quote.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 or +255" /></label>
                <label className="full-field">Anything else we should know?<textarea maxLength={1200} value={quote.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Number of boxes, dimensions, pickup needs or special handling..." rows={3} /></label>
              </div>
              <div className="form-consent">By continuing, you choose to send these details to Afro-Canada Logistics through WhatsApp. See our <a href="/privacy">Privacy Notice</a>.</div>
              <div className="estimate-bar"><div><span>ILLUSTRATIVE RANGE</span><strong>CA${estimate}</strong><small>Final quote confirmed after review</small></div><button className="submit-button" type="submit">Prepare WhatsApp request <ArrowIcon /></button></div>
            </form>
          )}
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-heading"><span className="kicker">FREQUENTLY ASKED QUESTIONS</span><h2>Useful answers before you ship.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="final-cta">
        <div><span className="kicker light">READY WHEN YOU ARE</span><h2>Start with the shipment details.</h2><p>Tell us the route, cargo type and approximate weight. We’ll help you identify the next step.</p></div>
        <button className="primary-button" type="button" onClick={scrollToQuote}>Request a quote <ArrowIcon /></button>
      </section>

      <a className="floating-whatsapp" href={`https://wa.me/${CEO_WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="Chat with Afro-Canada Logistics on WhatsApp">WA</a>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><b>AC</b><i /></span><span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span></a>
        <div className="footer-contact"><p>601 Dundas Street East, Whitby, Ontario</p><a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a></div>
        <div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#faq">FAQ</a></div>
        <span>© {new Date().getFullYear()} Afro-Canada Logistics</span>
      </footer>
    </main>
  );
}
