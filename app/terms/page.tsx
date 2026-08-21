export const metadata = {
  title: "Terms | Afro-Canada Logistics",
  description: "Website and quotation terms for Afro-Canada Logistics.",
};

export default function TermsPage() {
  return (
    <main className="legal-shell">
      <header className="legal-header">
        <a className="brand" href="/"><span className="brand-mark"><b>AC</b><i /></span><span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span></a>
        <a className="legal-back" href="/">← Back to website</a>
      </header>
      <article className="legal-content">
        <span className="kicker">WEBSITE TERMS</span>
        <h1>Clear expectations before cargo moves.</h1>
        <p className="legal-lede">These terms describe the informational nature of this website and the planning estimates shown before a shipment is formally confirmed.</p>

        <section className="legal-section"><h2>Website information</h2><p>Website content is provided for general information and shipment planning. Service availability, carrier options, requirements and timelines may change based on the shipment details and route conditions.</p></section>
        <section className="legal-section"><h2>Illustrative rates</h2><p>Rates and planning ranges shown on the website are not final offers. A final quotation depends on factors such as actual weight and dimensions, cargo type, pickup and destination, duties or taxes, insurance, carrier availability and any special handling requirements.</p></section>
        <section className="legal-section"><h2>Shipment acceptance</h2><p>A quote request does not guarantee shipment acceptance. Cargo may be subject to carrier rules, customs requirements, restricted or prohibited-goods rules and additional documentation requirements.</p></section>
        <section className="legal-section"><h2>Timelines</h2><p>Transit periods shown on the website are indicative. Final timing is confirmed for the specific service and may be affected by carrier schedules, customs processing, weather, operational conditions and other circumstances outside the website&apos;s control.</p></section>
        <section className="legal-section"><h2>Customer information</h2><p>Customers are responsible for providing accurate shipment descriptions, weights, dimensions, addresses and other requested information. Incorrect or incomplete details can change the quotation, timeline or service availability.</p></section>
        <section className="legal-section"><h2>Contact</h2><p>Questions about these website terms can be sent to <a href="mailto:Afrocanadalogistics@gmail.com">Afrocanadalogistics@gmail.com</a>.</p></section>
        <p className="legal-updated">Last updated: August 21, 2026.</p>
      </article>
    </main>
  );
}
