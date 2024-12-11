import {
    getApiMappingAndUserFromUserDBCollectionByUniqueIdentifier,
} from "@/app/actions/common/getApiMappingFromUserDBCollection";
import {fetchMockResponse} from "@/app/actions/common/fetchMockResponse";
import {NextResponse} from "next/server";
import {proxy} from "@/app/actions/common/proxyHandler";


async function commonMappingResponse(apiMapping, user, request, serviceBaseUrl, payload) {
    if (!apiMapping || !user) {
        if (process.env.ENV !== "mock-only-env") {
            return await proxy({
                req: request,
                baseUrl: serviceBaseUrl
            })
        }
        return NextResponse.json(
            {
                status: "failed",
                message: "No API Mapping or User Found!",
            },
            {status: 401}
        );
    }
    if (apiMapping.header === "real") {
        return await proxy({
            req: request,
            baseUrl: serviceBaseUrl
        })
    }
    let requestBody;
    if (payload) {
        requestBody = payload({user, header: apiMapping.header, customBody: apiMapping.customBody});
    }
    return await fetchMockResponse({
        header: apiMapping.header,
        port: apiMapping.port,
        path: apiMapping.path,
        payload: requestBody,
    });
}

export async function commonApiMockFetchByUniqueIdentifier({uniqueIdentifier: uniqueIdentifier, apiName, payload, request, serviceBaseUrl,}) {
    const {apiMapping, user} =
        await getApiMappingAndUserFromUserDBCollectionByUniqueIdentifier({
            uniqueIdentifier: uniqueIdentifier,
            apiName: apiName,
        });
    return await commonMappingResponse(apiMapping, user, request, serviceBaseUrl, payload);
}
