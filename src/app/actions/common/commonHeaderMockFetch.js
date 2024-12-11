import {
  commonApiMockFetchByUniqueIdentifier,
} from "@/app/actions/common/commonApiMockFetch";
import {NextResponse} from "next/server";
import {proxy} from "@/app/actions/common/proxyHandler";

export async function commonHeaderMockFetch({ request, payload, apiName,serviceBaseUrl }) {
  const headers = request.headers;
  console.log("Request", request);
  const uniqueIdentifier = headers.get("unique-identifier");
  if (uniqueIdentifier) {
    return await commonApiMockFetchByUniqueIdentifier({
      uniqueIdentifier: uniqueIdentifier,
      apiName: apiName,
      payload: payload,
      request: request,
      serviceBaseUrl:serviceBaseUrl
    });
  }
  else {
    if(process.env.ENV !== "mock-only-env") {
      return await proxy({
        req: request,
        baseUrl: serviceBaseUrl
      })
    }
    return NextResponse.json(
        {
          status: "failed",
          message: "Unique identifier not found in headers!",
        },
        {status: 401}
    );
  }
}
