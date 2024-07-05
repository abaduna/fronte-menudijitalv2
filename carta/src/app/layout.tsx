import "bootstrap/dist/css/bootstrap.css"
import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import BootstrapClient from "@/componets/BootstrapCliente";
import Navbar from "@/componets/navbar";
config.autoAddCss = false;
export const metadata: Metadata = {
  title: "Carta san margin",
  description: "la mejor comida de la zona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      
      <body >
        <Navbar/>
        {children}
        <BootstrapClient/>
        </body>
    </html>
  );
}
