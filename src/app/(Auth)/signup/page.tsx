import React from "react";
import styles from "@/app/styles/Auth.module.scss";
import Navbar from "@/app/components/Navbar/Navbar";
import Form from "../form";

export const metadata = {
  title: "Sign Up",
};

function SignUp() {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <Form signInMode={false} />
      </div>
    </>
  );
}

export default SignUp;
