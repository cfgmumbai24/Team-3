import { prismaClient } from '../../lib/db';
import UserService, { GetUserTokenPayload } from '../../services/User';
import { ProductCategory } from '../mutations';

const queries = {
    getUserToken: async (_: any, payload: GetUserTokenPayload) => {
        const res = await UserService.getUserToken(payload);
        return res;
    },
    getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        throw new Error('User not found');
    },
    getProductById: async (_: any, parameters: { productId: string }) => {
        const product = await prismaClient.product.findUnique({
            where: {
                id: parameters.productId,
            },
        });
        return product;
    },
    getProductsByCategory: async (
        _: any,
        parameters: { category: ProductCategory },
    ) => {
        const products = await prismaClient.product.findMany({
            where: {
                category: parameters.category,
            },
        });
        return products;
    },
};

export default queries;
