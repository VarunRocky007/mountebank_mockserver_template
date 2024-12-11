import {commonHeaderMockFetch} from "@/app/actions/common/commonHeaderMockFetch";

export async function POST(request) {
    return await commonHeaderMockFetch({
        request: request,
        apiName: "sample_api_unique_name",
        serviceBaseUrl: process.env.SAMPLE_URL,// original service base url
    });
}