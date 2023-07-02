import "@/app/styles/globals.scss";
import styles from "@/app/styles/Auth.module.scss";
import { AppConfig } from "@/utils/AppConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: {
    template: `${AppConfig.siteName} | %s`,
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    !session && (
      <>
        <Navbar session={null} />
        <div className={styles.wrapper}>{children}</div>
      </>
    )
  );
}
