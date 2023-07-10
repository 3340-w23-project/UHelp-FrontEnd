import "@/app/styles/globals.scss";
import { Providers } from "@/app/Providers";
import Startup from "../components/Startup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Startup />
          {children}
        </body>
      </html>
    </Providers>
  );
}
