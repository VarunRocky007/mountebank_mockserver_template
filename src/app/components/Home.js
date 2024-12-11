"use client";
import { useState } from "react";
import Server from "@/app/components/Server";
import UsersSection from "@/app/components/UsersSection";
import { createUser } from "@/app/actions/users/createUser";
import styles from "./Home.module.css";

export default function Home({ initialListOfHeaders, data }) {
  const [userApiRequestMap, setUserApiRequestMap] = useState({});

  async function changeApiRequestMap(apiName, header) {
    const previousUserApiRequestMap = userApiRequestMap;
    const isDefaultHeader = initialListOfHeaders[apiName] === header;
    if (isDefaultHeader) {
      delete previousUserApiRequestMap[apiName];
    } else {
      previousUserApiRequestMap[apiName] = header;
    }
    setUserApiRequestMap(previousUserApiRequestMap);
  }

  async function createUserWithAPIMap() {
    const user = await createUser({
      apiMappings: userApiRequestMap,
    });
    return user;
  }

  async function showSelectedMappings() {
    return JSON.stringify({
      apiMappings: userApiRequestMap,
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.apis}>
        {data.servers.map((server) => {
          return (
            <Server
              key={server.name}
              server={server}
              changeApiRequestMap={changeApiRequestMap}
            />
          );
        })}
      </div>
      <UsersSection
        showSelectedMappings={showSelectedMappings}
        createUserWithAPIMap={createUserWithAPIMap}
      />
    </div>
  );
}
