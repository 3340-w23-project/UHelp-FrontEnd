import React from "react";
import styles from "@/app/styles/Forum.module.scss";

type Props = {
  width?: string;
  height?: string;
  margin?: string;
};

function Skeleton({ width, height, margin }: Props) {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width, height: height, marginBottom: margin }}
    />
  );
}

export default Skeleton;
