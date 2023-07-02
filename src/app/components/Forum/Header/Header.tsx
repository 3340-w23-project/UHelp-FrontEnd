"use client";
import React, { useEffect } from "react";
import styles from "@/app/styles/Forum.module.scss";
import { zeroRightClassName } from "react-remove-scroll-bar";
import { useDispatch } from "react-redux";
import useSWRImmutable from "swr/immutable";
import Skeleton from "@/app/components/Skeleton";
import Button from "@/app/components/Button";
import Account from "@/app/components/Navbar/Account";
import { setIsOpen, setModalType } from "@/redux/slices/forumSlice";
import { MdPostAdd } from "react-icons/md";
import { useAppSelector } from "@/redux/store";
import {
  setChannelDescription,
  setChannelName,
} from "@/redux/slices/channelSlice";
import { channelFetcher } from "@/app/(Forum)/forum/[channelID]/helper";
import SidebarButton from "../Sidebar/SidebarButton";
import clsx from "clsx";
import { useSession } from "next-auth/react";

function ForumHeader() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const channelID = useAppSelector((state) => state.channel.channelID);
  const apiURL = `/uhelp-api/channel/${channelID}`;
  const { data } = useSWRImmutable(apiURL, () => channelFetcher(apiURL));
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelDescription = useAppSelector(
    (state) => state.channel.channelDescription
  );
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const isSidebarOpen = useAppSelector((state) => state.forum.isMenuOpen);

  useEffect(() => {
    if (data) {
      if (data.name !== channelName) dispatch(setChannelName(data.name));
      if (data.description !== channelDescription)
        dispatch(setChannelDescription(data.description));
    }
  }, [data]);

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
            {!channelDescription && !channelName && (
              <div style={{ height: "0.05rem" }} />
            )}

            {channelDescription ? (
              <span className={styles.channelDescription}>
                {channelDescription}
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
