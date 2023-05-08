import "@/app/styles/globals.scss";
import { AppConfig } from "@/utils/AppConfig";

export const metadata = {
  title: {
    template: `${AppConfig.siteName} | %s`,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
