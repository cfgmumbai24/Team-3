import { prismaClient } from '../lib/db';

export interface CreateProductPayload {
    name: string;
    imageURL?: string;
    description?: string;
    userId: string;
    category: ProductCategory;
}

export enum ProductCategory {
    TerraCotta,
    Macrame,
    Moonj,
    BananaFiber,
    JuteBags,
    Other,
}

class ProductService {
    public static async createProduct(payload: CreateProductPayload) {
        const { name, imageURL, description, userId, category } = payload;
        const res = await prismaClient.product.create({
            data: {
                name,
                imageURL,
                description,
                userId,
                category,
            },
        });

        return res;
    }
}

export default ProductService;
