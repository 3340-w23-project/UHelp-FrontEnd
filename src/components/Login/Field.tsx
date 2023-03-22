import React from "react";
import styles from "@/styles/signin.module.scss";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
};

function Field({ label, type, id, placeholder }: Props) {
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
      />
    </div>
  );
}

export default Field;
