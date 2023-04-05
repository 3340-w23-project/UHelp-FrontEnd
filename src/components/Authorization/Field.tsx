import React from "react";
import styles from "@/styles/Authorization.module.scss";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

function Field({ label, type, id, placeholder, onChange, value }: Props) {
  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
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
