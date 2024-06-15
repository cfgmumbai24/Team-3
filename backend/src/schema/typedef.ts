export const typeDefs = `#graphql

    enum ProductCategory {
        TerraCotta
        Macrame
        Moonj
        BananaFiber
        JuteBags
        Other
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String
        phoneNo: String
        userRole: String
    }

    type Product {
        id: ID!
        name: String!
        SKU_ID: String!
        height: Float
        weight: Float
        imageURL: String
        description: String
        userId: String!
        user: User!
        category: ProductCategory!
        color: String
    }
`;
