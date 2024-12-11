"use server";
import {MongoClient} from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
    const MONGODB_DB = process.env.MONGODB_DB || "mountebankDB";

    if (!MONGODB_CONNECTION_STRING) {
        throw new Error("MONGODB_CONNECTION_STRING environment variable is not defined");
    }

    if (!MONGODB_DB) {
        throw new Error("MONGODB_DB environment variable is not defined");
    }
    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb};
    }

    const client = await MongoClient.connect(MONGODB_CONNECTION_STRING, {});
    const db = client.db(MONGODB_DB);

    /*create indexes first time*/
    const users = db.collection("users");
    await users.createIndex({uniqueIdentifier: 1,  mobile: 1}, {unique: true});
    await users.createIndex({modifiedAt: 1}, {expireAfterSeconds: 259200});


    cachedClient = client;
    cachedDb = db;

    return {client, db};
}
