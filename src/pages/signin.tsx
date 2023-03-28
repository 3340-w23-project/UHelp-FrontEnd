import React from "react";
import styles from "@/styles/signin.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Field from "@/components/Login/Field";
import Cookies from "universal-cookie";
import { useState, useEffect, FormEvent } from "react";
import jwt from "jwt-decode";
import { useRouter } from "next/router";

type Props = {
  isScrolled: boolean;
  isMobile: boolean;
};

function SignIn({ isScrolled, isMobile }: Props) {
  const cookies = new Cookies();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (cookies.get("access_token")) {
      router.push("/");
    }
  }, [router, cookies]);

  const validate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "") {
      setError("Username cannot be empty");
    } else if (password === "") {
      setError("Password cannot be empty");
    } else {
      login();
    }
  };

  const login = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
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
          window.location.href = "/";
        }
      });
  };

  return (
    <>
      <Navbar isScrolled={isScrolled} isMobile={isMobile} />
      <div className={styles.wrapper}>
        <form className={styles.container} onSubmit={validate}>
          <h1 className={styles.header}>Sign In</h1>
          <Field
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Field
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  );
}

export default SignIn;
