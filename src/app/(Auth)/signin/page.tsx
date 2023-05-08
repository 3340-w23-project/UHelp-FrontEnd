import React from "react";
import styles from "@/app/styles/Auth.module.scss";
import Navbar from "@/app/components/Navbar/Navbar";
import Form from "../form";

export const metadata = {
  title: "Sign In",
};

function SignIn() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <Form signInMode />
      </div>
    </>
  );
}

export default SignIn;
