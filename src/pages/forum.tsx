import SidebarLayout from "@/layouts/ForumLayout";
import React, { useEffect } from "react";
import styles from "@/styles/Forum.module.scss";
import { lorem } from "@/utils/lorem";
import { Button } from "@/components/Button";

function forum() {
  const posts = [];

  for (let i = 0; i < 7; i++) {
    posts.push(
      <>
        {lorem}
        <br />
        <br />
      </>
    );
  }

  return (
    <SidebarLayout>
      <div className={styles.header}>
        <h2>Thread Name</h2>
        <div className={styles.headerButtons}>
          <Button sm secondary label="New Post" />
        </div>
      </div>
      <div className={styles.contentWrapper}>{posts}</div>
    </SidebarLayout>
  );
}

export default forum;
