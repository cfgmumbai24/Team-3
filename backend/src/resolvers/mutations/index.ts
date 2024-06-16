import UserService, { CreateUserPayload } from '../../services/User';
import { prismaClient } from '../../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { InventoryService } from '../../services/inventory';

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
        const UID = generateUID();
        const SKU_COLOR = payload.color.slice(0, 2).toUpperCase();
        const SKU_CATEGORY = payload.category.slice(0, 2).toUpperCase();
        const SKU_ID = `${SKU_CATEGORY}_${SKU_COLOR}_${UID}`;
        const product = await prismaClient.product.create({
            data: {
                name: payload.name,
                height: payload.height,
                weight: payload.weight,
                imageURL: payload.imageURL,
                description: payload.description,
                userId: payload.userId,
                color: payload.color,
                category: payload.category
                    ? payload.category
                    : ProductCategory.Other,
                approvedBySubAdmin: false,
                approvedByMasterAdmin: false,
                SKU_ID,
            },
        });
        InventoryService.createInventory({
            SKU_ID,
            quantity: payload.quantity ? payload.quantity : 0,
            category: payload.category,
        });
        return product;
    },
    updateProduct: async (
        _: any,
        payload: {
            productId: string;
            name?: string;
            height?: number;
            weight?: number;
            imageURL?: string;
            description?: string;
        },
    ) => {
        const product = await prismaClient.product.update({
            where: {
                id: payload.productId,
            },
            data: {
                name: payload.name,
                height: payload.height,
                weight: payload.weight,
                imageURL: payload.imageURL,
                description: payload.description,
            },
        });
        return product;
    },
    forgotPassword: async (_: any, payload: { email: string }) => {
        const res = await UserService.forgotPassword(payload);
        return res;
    },
    approvedBySubAdmin: async (_: any, payload: { productId: string }) => {
        const product = await prismaClient.product.update({
            where: {
                id: payload.productId,
            },
            data: {
                approvedBySubAdmin: true,
            },
        });
        return product.approvedBySubAdmin;
    },
    approvedByMasterAdmin: async (_: any, payload: { productId: string }) => {
        const product = await prismaClient.product.update({
            where: {
                id: payload.productId,
            },
            data: {
                approvedByMasterAdmin: true,
            },
        });
        return product.approvedByMasterAdmin;
    },
    reduceProductInventory: async (
        _: any,
        payload: { SKU_ID: string; quantity: number },
    ) => {
        const inventory = await InventoryService.updateInventory({
            SKU_ID: payload.SKU_ID,
            quantity: -payload.quantity,
        });
        if (inventory) {
            return true;
        }
        return false;
    },
    addProductInventory: async (
        _: any,
        payload: { SKU_ID: string; quantity: number },
    ) => {
        await InventoryService.updateInventory({
            SKU_ID: payload.SKU_ID,
            quantity: payload.quantity,
        });
        return true;
    },
};

export default mutations;

function generateUID(): string {
    const uuid = uuidv4().replace(/-/g, ''); // Remove hyphens from the UUID
    return uuid.substring(0, 8); // Get the first 8 characters
}
