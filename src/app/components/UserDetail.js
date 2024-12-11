"use client";
import styles from "./UserDetail.module.css";

export default function UserDetail({ label, value }) {
  return (
    <span className={styles.container}>
      <span className={styles.label}>{label}</span>
      {value !== "" && <span className={styles.value}>{value}</span>}
    </span>
  );
}
