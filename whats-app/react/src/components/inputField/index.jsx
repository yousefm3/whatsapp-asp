import React, { useState } from "react";
import styles from "./.module.css";

export default function InputField({
  id,
  label,
  type,
  required,
  placeholder,
  name,
  minLength,
  accept,
  term,
  onChange,
}) {
  const [value, setValue] = useState("");
  return (
    <div className="my-3">
      <div className={styles.form_input_field}>
        <label
          className={`${styles.input_label} ${
            type === "file" && styles.file_input
          }`}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          minLength={minLength}
          value={id === "contact_username" ? term : value}
          onChange={(e) => {
            id === "contact_username"
              ? onChange(e.target.value)
              : setValue(e.target.value);
          }}
          name={name}
          placeholder={placeholder}
          className={`${styles.input_style} ${type === "file" && "d-none"}`}
          required={required}
          type={type}
          id={id}
          accept={accept}
          maxLength={20}
        />
      </div>
    </div>
  );
}
