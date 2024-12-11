"use client";
import styles from "./Server.module.css";
import ApiSelector from "@/app/components/ApiSelector";

export default function Server({ server, changeApiRequestMap }) {
  return (
    <div className={styles.container} key={server.name}>
      <h1 className={styles.title}>{server.name}</h1>
      {server.apis.map((api) => {
        return (
          <ApiSelector
            key={`${server.name}-${api.name}`}
            api={api}
            changeApiRequestMap={changeApiRequestMap}
          />
        );
      })}
    </div>
  );
}
