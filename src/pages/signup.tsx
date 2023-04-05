import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import styles from "@/styles/Authorization.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Field from "@/components/Authorization/Field";
import jwt from "jwt-decode";
import Head from "next/head";
import { AppConfig } from "@/utils/AppConfig";

type Props = {
  isScrolled: boolean;
  isMobile: boolean;
  isSignedIn: boolean;
  username: string;
  displayName: string;
};

function SignUp({
  isScrolled,
  isMobile,
  isSignedIn,
  username,
  displayName,
}: Props) {
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
    if (usernameInput.length < 3 || usernameInput.length > 20) {
      setError("Username must be between 3 and 20 characters");
    } else if (passwordInput.length < 4) {
      setError("Password must be at least 4 characters");
    } else {
      signUp();
    }
  };

  const signUp = () => {
    fetch("/api/signup", {
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
        if (res.status === 201) {
          signIn();
        } else if (res.status === 409) {
          setError("User already exists");
        } else {
          setError("Something went wrong, please try again later");
        }
      })
      .catch((err) => {
        setError("Something went wrong, please try again later");
      });
  };

  const signIn = () => {
    fetch("/api/signin", {
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
    <>
      <Head>
        <title>{`${AppConfig.siteName} - Sign Up`}</title>
      </Head>
      <Navbar
        isScrolled={isScrolled}
        isMobile={isMobile}
        isSignedIn={isSignedIn}
        username={username}
        displayName={displayName}
      />
      <div className={styles.wrapper}>
        <form className={styles.container} onSubmit={validate}>
          <h1 className={styles.header}>Sign Up</h1>
          <Field
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
          />
          <Field
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
          />
          <div className={styles.error}>{error}</div>
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

export default SignUp;
