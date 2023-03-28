import Sidebar from "@/components/Forum/Sidebar";
import styles from "@/styles/Forum.module.scss";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default SidebarLayout;
