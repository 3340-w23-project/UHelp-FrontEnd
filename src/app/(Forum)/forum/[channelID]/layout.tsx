import Sidebar from "@/app/components/Forum/Sidebar/Sidebar";
import styles from "@/app/styles/Forum.module.scss";
import { AppConfig } from "@/utils/AppConfig";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}

export const metadata = {
  title: `${AppConfig.siteName} | Forum`,
};
