"use server";
import {connectToDatabase} from "../../../../lib/dbConnection";
import {getInitialMappings,} from "@/app/actions/third-party-api/actions";

/**
 * This function is used to get user id counter
 * @param db
 * @returns {Promise<number|number|*>}
 */
async function counter(db) {
    const counters = db.collection("counters");
    const counter = await counters.findOneAndUpdate(
        {_id: "userId"},
        {$inc: {seq: 1}},
        {returnDocument: "after", upsert: true}
    );
    return counter.seq;
}

export async function createUser({apiMappings = null}) {
    const {db} = await connectToDatabase();
    const userApiRequestArray = await getInitialMappings();
    if (apiMappings !== null) {
        if (apiMappings.length !== 0) {
            for (let i = 0; i < userApiRequestArray.length; i++) {
                const api = userApiRequestArray[i];
                const header = apiMappings[api.name];
                if (header) {
                    api.header = header;
                }
            }
        }
    }
    const users = db.collection("users");
    const userId = await counter(db);
    const {uniqueIdentifier,email, firstName, lastName} = await getRandomKeyUserDetails(userId);
    const mobileNumber = (971500000000 + userId).toString();


    const user = {
        uniqueIdentifier,
        userId,
        mobile: mobileNumber,
        email,
        firstName,
        lastName,
        apiMappings: userApiRequestArray,
        createdAt: new Date(),
        modifiedAt: new Date(),
    };

    await users.insertOne(user);
    return JSON.parse(JSON.stringify(user));
}

function getRandomKeyUserDetails(userId) {
    return {
        uniqueIdentifier:
            "uniqueIdentifier" + userId,
        firstName:
            "UserFirstName" + userId,
        lastName:
            "UserLastName" + userId,
        email:
            "useremail" + userId + "@gmail.com",
    }
}
