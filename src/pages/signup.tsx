import React from "react";
import styles from "@/styles/signin.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
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
        <form className={styles.container}>
          <h1 className={styles.header}>Sign Up</h1>
          <Field
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
          />
          <Field
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
          />
          <div className={styles.submit}>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-sm btn-secondary"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default signUp;
