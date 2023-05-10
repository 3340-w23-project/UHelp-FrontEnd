"use client";
import React from "react";
import styles from "@/app/styles/Forum.module.scss";
import { zeroRightClassName } from "react-remove-scroll-bar";
import { useDispatch } from "react-redux";
import useSWRImmutable from "swr/immutable";
import Skeleton from "@/app/components/Skeleton";
import Button from "@/app/components/Button";
import Account from "@/app/components/Navbar/Account";
import { setIsPostModalOpen } from "@/redux/slices/forumSlice";
import { MdPostAdd } from "react-icons/md";
import { useAppSelector } from "@/redux/store";
import {
  setChannelDescription,
  setChannelName,
} from "@/redux/slices/channelSlice";
import { channelFetcher } from "@/app/(Forum)/forum/[channelID]/helper";

interface Props {
  session: any;
  channelID: number;
}

function ForumHeader({ channelID }: Props) {
  const dispatch = useDispatch();
  const apiURL = `/uhelp-api/channel/${channelID}`;
  const fetcher = () => channelFetcher(apiURL);
  const { data } = useSWRImmutable(apiURL, fetcher);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelDescription = useAppSelector(
    (state) => state.channel.channelDescription
  );

  React.useEffect(() => {
    if (data) {
      if (data.name !== channelName) dispatch(setChannelName(data.name));
      if (data.description !== channelDescription)
        dispatch(setChannelDescription(data.description));
    }
  }, [data]);

  return (
    <div className={`${styles.header} ${zeroRightClassName}`}>
      <div className={styles.channelInfo}>
        {channelName ? (
          <h2>{channelName}</h2>
        ) : (
          <Skeleton width={"8rem"} height={"1.8rem"} />
        )}
        {!channelDescription && !channelName && (
          <div style={{ height: "0.05rem" }} />
        )}
        {channelDescription ? (
          <span className={styles.channelDescription}>
            {channelDescription}
          </span>
        ) : (
          <Skeleton width={"16rem"} height={"1.3rem"} />
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
  );
}

export default ForumHeader;
