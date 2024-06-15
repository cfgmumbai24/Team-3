import UserService, { CreateUserPayload } from '../../services/User';
import ProductService from "../../services/product";

export enum ProductCategory {
    TerraCotta,
    Macrame,
    Moonj,
    BananaFiber,
    JuteBags,
    Other
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
    createProduct: async (_: any, payload: { name: string, height?: string, weight?: string, imageURL: String, description: String, userId: string, category: ProductCategory}) => {
        const res = await ProductService.createProduct(payload);
        return res;
    },
    forgotPassword: async (_: any, payload: { email: string }) => {
        const res = await UserService.forgotPassword(payload);
        return res;
    },
};

export default mutations;
