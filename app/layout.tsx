import Header from "./Header";
import Providers from "./Providers";
import "./globals.css";
export const metadata = {
  title: "Meta Messenger",
  description: "Meta Messenger Created By Lahiru Sadaruwan (CodeDevOption)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* @ts-ignore */}
        <Header />
        {children}
      </body>
    </html>
  );
}
