import { getUsersDBCollection } from "@/app/actions/common/getUsersDBCollection";
import { getApiMapping } from "@/app/actions/common/getApiMapping";

export async function getApiMappingAndUserFromUserDBCollectionByUniqueIdentifier({
  uniqueIdentifier,
  apiName,
}) {
  const usersCollection = await getUsersDBCollection();
  const user = (await usersCollection.find({ uniqueIdentifier: uniqueIdentifier }).hint({uniqueIdentifier: 1,  mobile: 1}).toArray())[0];
  if (!user) {
    return {
      user: null,
      apiMapping: null,
    };
  }
  const apiMapping = await getApiMapping({
    users: user,
    apiName: apiName,
  });
  return {
    user,
    apiMapping,
  };
}
