import "@/app/styles/globals.scss";
import { Providers } from "@/redux/Providers";
import Startup from "./components/Startup";
import { AppConfig } from "@/utils/AppConfig";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <Startup />
        {children}
      </Providers>
    </html>
);
}

export async function generateMetadata() {
  return {
    title: `${AppConfig.siteName} - ${AppConfig.siteDescription}`,
    description: AppConfig.siteDescription,
    icons: {
      icon: {
        url: "/favicon.ico",
      },
      shortcut: [
        {
          url: "/favicon.ico",
          name: "UHelp",
          description: AppConfig.siteDescription,
        },
      ],
    },
    siteName: AppConfig.siteName,
    type: "website",
    openGraph: {
      title: `${AppConfig.siteName} - ${AppConfig.siteDescription}`,
      description: AppConfig.siteDescription,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: AppConfig.siteLogo,
          width: 512,
          height: 512,
          alt: AppConfig.siteName,
        },
      ],
    },
    twitter: {
      title: `${AppConfig.siteName} - ${AppConfig.siteDescription}`,
      description: AppConfig.siteDescription,
      cardType: "app",
      app: {
        name: AppConfig.siteName,
        id: {
          iphone: "twitter_app://iphone",
          ipad: "twitter_app://ipad",
          googleplay: "twitter_app://googleplay",
        },
        url: {
          iphone: "twitter_app://iphone",
          ipad: "twitter_app://ipad",
        },
      },
      images: {
        url: AppConfig.siteLogo,
        alt: AppConfig.siteName,
      },
    },
  };
}
