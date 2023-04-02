import React from "react";
import styles from "@/styles/signin.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Field from "@/components/Login/Field";
import Cookies from "universal-cookie";
import { useState, useEffect, FormEvent } from "react";
import jwt from "jwt-decode";
import { useRouter } from "next/router";
import Head from "next/head";
import { AppConfig } from "@/utils/AppConfig";

type Props = {
  isScrolled: boolean;
  isMobile: boolean;
  isSignedIn: boolean;
  username: string;
};

function SignIn({ isScrolled, isMobile, isSignedIn, username }: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSignedIn) {
      router.push("/forum");
    }
  }, [router, isSignedIn]);

  const validate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput === "") {
      setError("Username cannot be empty");
    } else if (passwordInput === "") {
      setError("Password cannot be empty");
    } else {
      signIn();
    }
  };

  const signIn = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          setError("Incorrect username or password");
        } else {
          setError("Something went wrong");
        }
      })
      .then((data) => {
        if (data) {
          const decoded: any = jwt(data.access_token);
          cookies.set("access_token", data.access_token, {
            expires: new Date(decoded.exp * 1000),
          });
          router.push("/forum");
        }
      });
  };

  return (
    !isSignedIn && (
      <>
        <Head>
        <title>{`${AppConfig.siteName} - Sign In`}</title>
        </Head>
        <Navbar
          isScrolled={isScrolled}
          isMobile={isMobile}
          isSignedIn={isSignedIn}
          username={username}
        />
        <div className={styles.wrapper}>
          <form className={styles.container} onSubmit={validate}>
            <h1 className={styles.header}>Sign In</h1>
            <Field
              label="Username"
              type="text"
              id="username"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <Field
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <div className={styles.error}>{error}</div>
            <div className={styles.submit}>
              <input
                type="submit"
                value="Sign In"
                className="btn btn-sm btn-secondary"
              />
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default SignIn;
