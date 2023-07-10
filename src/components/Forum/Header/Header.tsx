"use client";
import React, { useEffect } from "react";
import styles from "@/app/styles/Forum.module.scss";
import { zeroRightClassName } from "react-remove-scroll-bar";
import { useDispatch } from "react-redux";
import Skeleton from "@/components/Skeleton";
import Button from "@/components/Button";
import Account from "@/components/Navbar/Account";
import { setIsOpen, setModalType } from "@/redux/slices/forumSlice";
import { MdPostAdd } from "react-icons/md";
import { useAppSelector } from "@/redux/store";
import SidebarButton from "../Sidebar/SidebarButton";
import clsx from "clsx";
import { Session } from "next-auth";
import { Channel } from "@/utils/Types";
import { setChannelName } from "@/redux/slices/channelSlice";

interface ForumHeaderProps {
  session: Session | null;
  channel: Channel;
}

function ForumHeader({ session, channel }: ForumHeaderProps) {
  const dispatch = useDispatch();
  const channelName = useAppSelector((state) => state.channel.channelName);
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const isSidebarOpen = useAppSelector((state) => state.forum.isMenuOpen);

  useEffect(() => {
    dispatch(setChannelName(channel.name));
  }, [channel]);

  return (
    <div
      className={clsx(
        styles.header,
        zeroRightClassName,
        !isSidebarOpen && styles.expandedHeader
      )}>
      {!isSidebarOpen && <SidebarButton />}
      <div className={styles.channelInfo}>
        {channelName ? (
          <h2>{channelName}</h2>
        ) : (
          <Skeleton width={"8rem"} height={"1.8rem"} />
        )}

        {!isMobile && (
          <>
            {!channel.description && !channelName && (
              <div style={{ height: "0.05rem" }} />
            )}

            {channel.description ? (
              <span className={styles.channelDescription}>
                {channel.description}
              </span>
            ) : (
              !isMobile && <Skeleton width={"16rem"} height={"1.3rem"} />
            )}
          </>
        )}
      </div>

      {/* Header Buttons */}
      {!isMobile && (
        <div className={styles.headerButtons}>
          <Button
            className={styles.headerBtn}
            tertiary
            icon={MdPostAdd}
            label="New Post"
            onClick={() => {
              dispatch(setModalType("Post"));
              dispatch(setIsOpen(true));
            }}
          />
          <Account session={session} />
        </div>
      )}
      {isMobile && !isSidebarOpen && (
        <Button
          className={styles.headerBtn}
          tertiary
          icon={MdPostAdd}
          onClick={() => {
            dispatch(setModalType("Post"));
            dispatch(setIsOpen(true));
          }}
        />
      )}
    </div>
  );
}

export default ForumHeader;
