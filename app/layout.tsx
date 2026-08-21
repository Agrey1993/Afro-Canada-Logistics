import "./globals.css";
import "./professional.css";
import "./service-images.css";

export const metadata = {
  metadataBase: new URL("https://afrocanadalogistics.ca"),
  title: "Afro-Canada Logistics | Canada ↔ Tanzania Shipping",
  description: "Canada–Tanzania shipping coordination for air freight, ocean cargo, personal effects and door-to-door planning.",
  applicationName: "Afro-Canada Logistics",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.svg" },
  openGraph: {
    title: "Afro-Canada Logistics | Canada ↔ Tanzania Shipping",
    description: "Moving cargo. Connecting homes between Canada and Tanzania.",
    url: "https://afrocanadalogistics.ca",
    siteName: "Afro-Canada Logistics",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Afro-Canada Logistics",
    description: "Canada–Tanzania shipping coordination for air, ocean and door planning.",
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Afro-Canada Logistics",
  url: "https://afrocanadalogistics.ca",
  email: "Afrocanadalogistics@gmail.com",
  telephone: "+1-437-260-1378",
  address: {
    "@type": "PostalAddress",
    streetAddress: "601 Dundas Street East",
    addressLocality: "Whitby",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  areaServed: ["Canada", "Tanzania"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </body>
    </html>
  );
}
