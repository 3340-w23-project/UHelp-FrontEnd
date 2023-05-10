import React from "react";
import styles from "@/app/styles/Auth.module.scss";
import Navbar from "@/app/components/Navbar/Navbar";
import Form from "../form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up",
};

async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return session ? null : (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <Form signInMode={false} />
      </div>
    </>
  );
}

export default SignUp;
