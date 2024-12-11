"use client";
import RadioButtonGroup from "@/app/components/RadioButtonGroup";
import styles from "./ApiSelector.module.css";

export default function ApiSelector({ api, changeApiRequestMap }) {
  return (
    <div className={styles.api}>
      <div className={styles.titleContainer}>
        <h2 className={styles.apiTitle}>{api.display_name}</h2>
        <div className={styles.apiPath}>{api.path}</div>
      </div>
      <RadioButtonGroup
        object={api.responses}
        name={api.name}
        changeApiRequestMap={changeApiRequestMap}
      />
    </div>
  );
}
