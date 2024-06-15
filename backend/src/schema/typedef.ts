export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
        phoneNo: String
        userRole: String
    }
`;
