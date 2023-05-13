"use client";
import React from "react";
import styles from "@/app/styles/Auth.module.scss";
import Field from "@/app/components/Auth/Field";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

function Form({ signInMode }: { signInMode: boolean }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

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
    await signIn("credentials", {
      username: usernameInput,
      password: passwordInput,
      redirect: true,
      callbackUrl: "/forum",
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
    const res = await fetch("/uhelp-api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    });
    if (res.status === 201) {
      console.log("message: User created");
      signInCredentials();
    } else if (res.status === 409) {
      setError("Username already exists");
    } else {
      const data = await res.json();
      setError(data.msg);
    }
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
          value={signInMode ? "Sign In" : "Sign Up"}
          className="btn btn-sm btn-secondary"
        />
      </div>
    </form>
  );
}

export default Form;
