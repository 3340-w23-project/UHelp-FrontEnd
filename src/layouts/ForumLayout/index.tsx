import Sidebar from "@/components/Forum/Sidebar";
import styles from "@/styles/Forum.module.scss";

type Props = {
  children: React.ReactNode;
  isMobile: boolean;
};

const SidebarLayout = ({ children, isMobile }: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        {isMobile ? null : <Sidebar />}
        {children}
      </div>
    </>
  );
};

export default SidebarLayout;
