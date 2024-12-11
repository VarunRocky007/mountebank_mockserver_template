"use server";

export async function getApiMapping({ users, apiName }) {
  let apiMappingForUser = {};
  users.apiMappings.forEach((apiMapping) => {
    if (apiMapping.name === apiName) {
      apiMappingForUser = apiMapping;
    }
  });
  return apiMappingForUser;
}
