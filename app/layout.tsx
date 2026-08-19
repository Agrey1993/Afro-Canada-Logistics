import "./globals.css";

export const metadata = {
  title: "Afro-Canada Logistics | Canada ↔ Tanzania",
  description: "Reliable shipment coordination between Canada and Tanzania.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
