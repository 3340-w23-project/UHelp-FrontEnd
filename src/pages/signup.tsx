import React from "react";
import styles from "@/styles/signin.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import { Button } from "@/components/Button";
import Field from "@/components/Login/Field";

type Props = {
  isScrolled: boolean;
  isMobile: boolean;
};

function signUp({ isScrolled, isMobile }: Props) {
  return (
    <>
      <Navbar isScrolled={isScrolled} isMobile={isMobile} />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.header}>Sign Up</h1>
          <Field
            label="Username"
            type="text"
            id="username"
            placeholder="User"
          />
          <Field label="Email" type="email" id="email" placeholder="Email" />
          <Field
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
          />
          <div className={styles.submit}>
            <Button sm label="Sign Up" />
          </div>
        </div>
      </div>
    </>
  );
}

export default signUp;
