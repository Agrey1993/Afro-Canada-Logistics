import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://afro-canada-logistics-agrey.adeus660.chatgpt.site"),
  title: "Afro-Canada Logistics | Canada ↔ Tanzania",
  description: "Reliable shipment coordination between Canada and Tanzania.",
  openGraph: {
    title: "Afro-Canada Logistics",
    description: "Reliable shipment coordination between Canada and Tanzania.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Afro-Canada Logistics — Canada to Tanzania" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afro-Canada Logistics",
    description: "Reliable shipment coordination between Canada and Tanzania.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
