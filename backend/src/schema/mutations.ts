export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!, phoneNo: String, userRole: String): String
    createProduct(name: String!, height: Float, weight: Float, imageURL: String, description: String, userId: String!, category: ProductCategory!, color: String!, quantity: Int): Product
    updateProduct(productId: String!, name: String, height: Float, weight: Float, imageURL: String, description: String): Product
    forgotPassword(email: String!): Boolean
    approvedBySubAdmin(productId: String!): Boolean
    approvedByMasterAdmin(productId: String!): Boolean
    reduceProductInventory(SKU_ID: String!, quantity: Int!): Boolean
    addProductInventory(SKU_ID: String!, quantity: Int!): Boolean
`;
