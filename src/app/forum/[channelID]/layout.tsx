"use client";
import Sidebar from "@/app/components/Forum/Sidebar/Sidebar";
import styles from "@/app/styles/Forum.module.scss";
import Button from "@/app/components/Button";
import Account from "@/app/components/Navbar/Account";
import Skeleton from "@/app/components/Forum/Skeleton";
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
  const channelDescription = useAppSelector(
    (state) => state.channel.channelDescription
  );
  const isMobile = useAppSelector((state) => state.app.isMobile);
  return (
    <>
      <head>
        <title>{`${
          AppConfig.siteName && channelName
            ? AppConfig.siteName + " - " + channelName
            : "Forum"
        }`}</title>
      </head>
      <body>
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
              <div className={styles.channelInfo}>
                {channelName ? (
                  <h2>{channelName}</h2>
                ) : (
                  <Skeleton width={"8rem"} height={"1.5rem"} />
                )}
                {!channelDescription && !channelName && (
                  <div style={{ height: "0.5rem" }} />
                )}
                {channelDescription ? (
                  <span className={styles.channelDescription}>
                    {channelDescription}
                  </span>
                ) : (
                  <>
                    <Skeleton width={"16rem"} height={"1.3rem"} />
                  </>
                )}
              </div>
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
      </body>
    </>
  );
};

export default SidebarLayout;
