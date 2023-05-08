import "@/app/styles/globals.scss";
import { Providers } from "@/app/Providers";
import Startup from "./components/Startup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Startup />
          {children}
        </Providers>
      </body>
    </html>
  );
}
