export const metadata = {
  title: "Privacy Notice | Afro-Canada Logistics",
  description: "Privacy notice for customers using the Afro-Canada Logistics website and quote request experience.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-shell">
      <header className="legal-header">
        <a className="brand" href="/"><span className="brand-mark"><b>AC</b><i /></span><span className="brand-copy"><strong>Afro-Canada</strong><small>LOGISTICS</small></span></a>
        <a className="legal-back" href="/">← Back to website</a>
      </header>
      <article className="legal-content">
        <span className="kicker">PRIVACY NOTICE</span>
        <h1>How website information is handled.</h1>
        <p className="legal-lede">This notice explains what information may be entered on the Afro-Canada Logistics website and how the current quote-request experience works.</p>

        <section className="legal-section"><h2>Information you may provide</h2><p>When you prepare a quote request, you may enter your name, email address, phone or WhatsApp number, origin and destination cities, shipment type, estimated weight, preferred ready date and additional shipment notes.</p></section>
        <section className="legal-section"><h2>How the quote form works</h2><p>The website prepares a WhatsApp message using the details you enter. You choose whether to continue to WhatsApp and send that message. The website may also save the most recent quote details in your browser&apos;s local storage so the request can be referenced on that device.</p></section>
        <section className="legal-section"><h2>Third-party services</h2><p>If you choose to contact us through WhatsApp or email, your use of those services is also subject to the privacy practices and terms of the relevant service provider.</p></section>
        <section className="legal-section"><h2>Why information is used</h2><p>Information sent to Afro-Canada Logistics is used to respond to inquiries, understand shipment requirements, prepare or confirm quotations, coordinate requested services and communicate about the shipment.</p></section>
        <section className="legal-section"><h2>Do not send unnecessary sensitive information</h2><p>Please do not include passwords, payment-card numbers, government identification numbers or other sensitive information in the website notes field or an initial WhatsApp inquiry unless specifically required later through an appropriate process.</p></section>
        <section className="legal-section"><h2>Questions about your information</h2><p>For privacy questions or requests related to information you have sent to us, contact <a href="mailto:Afrocanadalogistics@gmail.com">Afrocanadalogistics@gmail.com</a>.</p></section>
        <p className="legal-updated">Last updated: August 21, 2026.</p>
      </article>
    </main>
  );
}
