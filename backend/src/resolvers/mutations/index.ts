import UserService, { CreateUserPayload } from '../../services/User';
import { prismaClient } from '../../lib/db';

export enum ProductCategory {
    TerraCotta = 'TerraCotta',
    Macrame = 'Macrame',
    Moonj = 'Moonj',
    BananaFiber = 'BananaFiber',
    JuteBags = 'JuteBags',
    Other = 'Other',
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
    createProduct: async (
        _: any,
        payload: {
            name: string;
            height?: number;
            weight?: number;
            imageURL?: string;
            description?: string;
            color: string;
            userId: string;
            category: ProductCategory;
            quantity?: number;
        },
    ) => {
        const product = await prismaClient.product.create({
            data: {
                name: payload.name,
                height: payload.height,
                weight: payload.weight,
                imageURL: payload.imageURL,
                description: payload.description,
                userId: payload.userId,
                quantity: payload.quantity,
                category: payload.category
                    ? payload.category
                    : ProductCategory.Other,
                SKU_ID: 'TC_RND_001',
            },
        });
        return product;
    },
    forgotPassword: async (_: any, payload: { email: string }) => {
        const res = await UserService.forgotPassword(payload);
        return res;
    },
};

export default mutations;
