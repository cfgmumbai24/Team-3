export const queries = `#graphql
    getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
    getProducts: [Product]
    getProductById(productId: String!): Product
`;
