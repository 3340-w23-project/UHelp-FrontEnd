import React from "react";
import styles from "@/app/styles/Forum.module.scss";

function loadingIndicator() {
  return (
    <div className="centerRow">
      <div className={styles.loadingSpinner}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export default loadingIndicator;
