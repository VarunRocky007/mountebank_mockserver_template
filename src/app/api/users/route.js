import {connectToDatabase} from "../../../../lib/dbConnection";
import {NextResponse} from "next/server";

export async function DELETE(request) {
    const {_, db} = await connectToDatabase();
    //delete all records
    const users = db.collection("users");
    await users.deleteMany({});
    return NextResponse.json({status: "success", message: "All records deleted successfully!"});
}