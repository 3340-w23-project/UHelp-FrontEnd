import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import styles from "@/styles/signin.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import Field from "@/components/Login/Field";

type Props = {
  isScrolled: boolean;
  isMobile: boolean;
};

function SignUp({ isScrolled, isMobile }: Props) {
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
    if (username.length < 3 || username.length > 20) {
      setError("Username must be between 3 and 20 characters");
    } else if (password.length < 4) {
      setError("Password must be at least 4 characters");
    } else {
      signup();
    }
  };

  const signup = () => {
    fetch("/api/signup", {
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
        if (res.status === 201) {
          router.push("/signin");
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

  return (
    <>
      <Navbar isScrolled={isScrolled} isMobile={isMobile} />
      <div className={styles.wrapper}>
        <form className={styles.container} onSubmit={validate}>
          <h1 className={styles.header}>Sign Up</h1>
          <Field
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Field
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
