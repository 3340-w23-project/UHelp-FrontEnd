import Sidebar from "@/components/Forum/Sidebar/Sidebar";
import styles from "@/styles/Forum.module.scss";
import Head from "next/head";
import Button from "@/components/Button";
import Account from "@/components/Navbar/Account";
import Skeleton from "@/components/Forum/Skeleton";
import { AppConfig } from "@/utils/AppConfig";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setIsPostModalOpen } from "@/redux/slices/forumSlice";
import { zeroRightClassName } from "react-remove-scroll-bar";
import { MdPostAdd } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const channelName = useAppSelector((state) => state.channel.channelName);
  const isMobile = useAppSelector((state) => state.app.isMobile);
  return (
    <>
      <Head>
        <title>{`${AppConfig.siteName} - ${
          channelName ? channelName : "Forum"
        }`}</title>
      </Head>
      <div className={styles.wrapper}>
        {isMobile ? null : <Sidebar />}
        <div
          style={{
            width: isMobile ? "100%" : "calc(100% - 300px)",
            marginLeft: isMobile ? "0" : "300px",
          }}>
          <div
            className={`${styles.header} ${zeroRightClassName}`}
            style={{ width: isMobile ? "100%" : "calc(100% - 300px)" }}>
            {channelName ? (
              <h2>{channelName}</h2>
            ) : (
              <Skeleton width={"8rem"} height={"1.5rem"} />
            )}
            <div className={styles.headerButtons}>
              <Button
                sm
                tertiary
                icon={MdPostAdd}
                label="New Post"
                onClick={() => dispatch(setIsPostModalOpen(true))}
              />
              <Account />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
