export const queries = `#graphql
    getUserToken(email: String!, password: String!): String
    getCurrentLoggedInUser: User
    getProducts: [Product]
    getProductById(productId: String!): Product
    getPresignedUrl( imageName: String!, imageType: String!): String
    getProductsByCategory(category: ProductCategory!): [Product]
    getInventoryBySKU(SKU_ID: String!): Int
`;
