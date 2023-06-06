import React from "react";
import styles from "@/app/styles/Forum.module.scss";

function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <span className={styles.tooltip}>
      {children}
      <span className={styles.tooltipText}>{content}</span>
    </span>
  );
}

export default Tooltip;
