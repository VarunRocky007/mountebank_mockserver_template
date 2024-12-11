"use server";
import { NextResponse } from "next/server";

export async function fetchMockResponse({ header, path, port, payload }) {
  let requestBody = JSON.stringify({});
  if (payload) {
    requestBody = JSON.stringify(payload);
  }
  const MOCKSERVER_HOST =
    process.env.MOCKSERVER_HOST || "localhost";// Mountebank stubs host
  const response = await fetch(`http://${MOCKSERVER_HOST}:${port}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-responsetype": header,
    },
    body: requestBody,
  });
  const responseStatusCode = response.status;
  if (responseStatusCode === 204) {
    return new Response(null, { status: 204 });
  }
  const responseBody = await response.json();
  console.log(responseBody);
  return NextResponse.json(responseBody, { status: responseStatusCode });
}
