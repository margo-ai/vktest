import React, { ChangeEvent } from "react";

import styles from "./select.module.scss";

type Props = {
  label: string;
  value: string | boolean;
  options: { label: string; value: string | boolean }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = ({ label, value, options, onChange }: Props) => {
  return (
    <div>
      <label className={styles.label} htmlFor="select">
        {label}
      </label>
      <select id="select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
