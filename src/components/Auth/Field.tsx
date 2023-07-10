"use client";
import React from "react";
import styles from "@/app/styles/Auth.module.scss";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  required?: boolean;
};

function Field({
  label,
  type,
  id,
  placeholder,
  onChange,
  value,
  disabled,
  required,
}: Props) {
  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        autoFocus={id === "username"}
        maxLength={id === "username" ? 20 : undefined}
        disabled={disabled}
        minLength={id === "username" ? 3 : undefined}
        required={required}
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Field;
