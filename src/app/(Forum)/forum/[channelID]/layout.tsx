import styles from "@/app/styles/Forum.module.scss";
import { AppConfig } from "@/utils/AppConfig";

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.wrapper}>{children}</div>;
}

export const metadata = {
  title: `${AppConfig.siteName} | Forum`,
};
