import {createUser} from "@/app/actions/users/createUser";
import {NextResponse} from "next/server";

export async function POST(request) {
    const requestData = await request.json();
    const {apiMappings} = requestData;
    const user = await createUser({apiMappings});
    return NextResponse.json(user);
}


