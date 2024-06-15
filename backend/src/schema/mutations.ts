export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, phoneNo: String, userRole: String): String
    createProduct(name: String!, height: Float, weight: Float, imageURL: String, description: String, userId: String!, category: ProductCategory!): Product
    forgotPassword(email: String!): Boolean
`;
