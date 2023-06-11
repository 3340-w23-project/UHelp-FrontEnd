"use client";
import React, { useEffect, useState } from "react";
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
import MobileMenu from "../../Navbar/MobileMenu";
import clsx from "clsx";
import { motion } from "framer-motion";

function ForumHeader() {
  const dispatch = useDispatch();
  const channelID = useAppSelector((state) => state.channel.channelID);
  const apiURL = `/uhelp-api/channel/${channelID}`;
  const { data } = useSWRImmutable(apiURL, () => channelFetcher(apiURL));
  const isMenuOpen = useAppSelector((state) => state.forum.isMenuOpen);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelDescription = useAppSelector(
    (state) => state.channel.channelDescription
  );
  const isMobile = useAppSelector((state) => state.app.isMobile);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (data.name !== channelName) dispatch(setChannelName(data.name));
      if (data.description !== channelDescription)
        dispatch(setChannelDescription(data.description));
    }
  }, [data]);

  return (
    <motion.div
      layout="position"
      className={clsx(
        styles.header,
        zeroRightClassName,
        !isMenuOpen && styles.expandedHeader
      )}>
      <div className={styles.channelInfo}>
        {channelName ? (
          <h2>{channelName}</h2>
        ) : (
          <Skeleton width={"8rem"} height={"1.8rem"} />
        )}
        {!channelDescription && !isMobile && !channelName && (
          <div style={{ height: "0.05rem" }} />
        )}
        {channelDescription && !isMobile ? (
          <span className={styles.channelDescription}>
            {channelDescription}
          </span>
        ) : (
          !isMobile && <Skeleton width={"16rem"} height={"1.3rem"} />
        )}
      </div>

      {!isMobile ? (
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
          <Account />
        </div>
      ) : (
        <MobileMenu active={active} setActive={setActive} />
      )}
    </motion.div>
  );
}

export default ForumHeader;
