export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, phoneNo: String, userRole: String): String
    forgotPassword(email: String!): Boolean
`;
