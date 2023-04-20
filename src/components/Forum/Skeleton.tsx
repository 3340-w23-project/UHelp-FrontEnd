import React from "react";
import styles from "@/styles/Forum.module.scss";

type Props = {
  width?: string;
  height?: string;
};

function Skeleton({ width, height }: Props) {
  return (
    <div className={styles.skeleton} style={{ width: width, height: height }} />
  );
}

export default Skeleton;
