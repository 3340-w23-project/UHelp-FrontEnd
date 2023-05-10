import React from "react";
import styles from "@/app/styles/Forum.module.scss";

function loadingIndicator() {
  return (
    <div className={styles.noPosts}>
      <div className={styles.loadingIndicator}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export default loadingIndicator;
