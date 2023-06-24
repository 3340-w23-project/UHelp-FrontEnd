import ForumHeader from "@/app/components/Forum/Header/Header";
import Sidebar from "@/app/components/Forum/Sidebar/Sidebar";
import { AppConfig } from "@/utils/AppConfig";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}

export const metadata = {
  title: `${AppConfig.siteName} | Forum`,
};
