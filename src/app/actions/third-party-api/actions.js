"use server";
import { promises as fs } from "fs";

export async function readFile() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/third_party_api.json",
    "utf8"
  );
  const data = JSON.parse(file);
  if(process.env.ENV === "mock-only-env") {
    data.servers.forEach((server) => {
      server.apis.forEach((api) => {
        delete api.responses["real"];
      });
    });
  }
  return data;
}

export async function getInitialMappings() {
  const data = await readFile();
  const userApiRequestMap = {};
  data.servers.forEach((server) => {
    server.apis.forEach((api) => {
      if (!userApiRequestMap[api.name]) {
        userApiRequestMap[api.name] = [];
      }
      const responses = new Map(Object.entries(api.responses));
      const responsesIterator = responses.keys();
      const header = responsesIterator.next().value;
      userApiRequestMap[api.name] = {
        name: api.name,
        header: header,
        path: api.path,
        port: server.port,
      };
    });
  });
  const userApiRequestArray = Array.from(
    new Map(Object.entries(userApiRequestMap)).values()
  );
  return userApiRequestArray;
}

export async function getInitialListOfHeaders() {
  const data = await readFile();
  const headers = {};
  data.servers.forEach((server) => {
    server.apis.forEach((api) => {
      const responses = new Map(Object.entries(api.responses));
      const responsesIterator = responses.keys();
      const header = responsesIterator.next().value;
      headers[api.name] = header;
    });
  });
  return headers;
}
