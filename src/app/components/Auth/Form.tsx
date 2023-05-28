"use client";
import React from "react";
import styles from "@/app/styles/Auth.module.scss";
import Field from "@/app/components/Auth/Field";
import clsx from "clsx";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

function Form({ signInMode }: { signInMode: boolean }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInValidate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput === "") {
      setError("Username cannot be empty");
    } else if (passwordInput === "") {
      setError("Password cannot be empty");
    } else {
      signInCredentials();
    }
  };

  const signInCredentials = async () => {
    setError("");
    setIsLoading(true);
    await signIn("credentials", {
      username: usernameInput,
      password: passwordInput,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      } else {
        window.location.replace("/forum");
      }
    });
  };

  const signUpValidate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameInput.length < 3 || usernameInput.length > 20) {
      setError("Username must be between 3 and 20 characters");
    } else if (passwordInput.length < 4) {
      setError("Password must be at least 4 characters");
    } else {
      signUp();
    }
  };

  const signUp = async () => {
    setError("");
    setIsLoading(true);
    await fetch("/uhelp-api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    }).then((res: any) => {
      if (res.status === 201) {
        signInCredentials();
      } else if (res.status === 409) {
        setError("Username already exists");
      } else {
        const data = res.json();
        setError(data?.msg);
      }
      setIsLoading(false);
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={signInMode ? signInValidate : signUpValidate}>
      <h1 className={styles.header}>{signInMode ? "Sign In" : "Sign Up"}</h1>
      <Field
        label="Username"
        type="text"
        id="username"
        placeholder="User"
        required
        disabled={isLoading}
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <Field
        label="Password"
        type="password"
        id="password"
        placeholder="Password"
        required
        disabled={isLoading}
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <div className={styles.error}>{error}</div>
      <div className={styles.submit}>
        <input
          type="submit"
          value={isLoading ? "" : signInMode ? "Sign In" : "Sign Up"}
          disabled={isLoading}
          className={clsx([
            "btn",
            "btn-sm",
            "btn-full",
            "btn-secondary",
            isLoading && styles.loading,
          ])}
        />
        {isLoading && <div className={styles.spinner} />}
      </div>
    </form>
  );
}

export default Form;
