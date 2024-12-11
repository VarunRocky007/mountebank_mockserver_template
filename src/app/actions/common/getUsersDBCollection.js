"use server";

import { connectToDatabase } from "../../../../lib/dbConnection";

export async function getUsersDBCollection() {
  const { _, db } = await connectToDatabase();
  const users = db.collection("users");
  return users;
}
