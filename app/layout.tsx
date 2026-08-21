import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://afrocanadalogistics.ca"),
  title: "Afro-Canada Logistics | Canada ↔ Tanzania Shipping",
  description: "Canada–Tanzania shipping coordination for air freight, ocean cargo, personal effects and door-to-door planning.",
  applicationName: "Afro-Canada Logistics",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Afro-Canada Logistics",
    description: "Moving cargo. Connecting homes between Canada and Tanzania.",
    url: "https://afrocanadalogistics.ca",
    siteName: "Afro-Canada Logistics",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
