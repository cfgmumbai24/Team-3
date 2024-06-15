import { prismaClient } from '../lib/db';
import { ProductCategory } from '../resolvers/mutations';

interface CreateInventoryPayload {
    SKU_ID: string;
    quantity: number;
    category: ProductCategory;
}

interface UpdateInventoryPayload {
    SKU_ID: string;
    quantity: number;
}

export class InventoryService {
    public static async createInventory(payload: CreateInventoryPayload) {
        const { SKU_ID, quantity, category } = payload;
        return prismaClient.inventory.create({
            data: {
                SKU_ID,
                quantity,
                category,
            },
        });
    }

    public static async getInventoryBySKU(SKU_ID: string) {
        return prismaClient.inventory.findUnique({
            where: {
                SKU_ID,
            },
        });
    }

    public static async updateInventory(payload: UpdateInventoryPayload) {
        const { SKU_ID, quantity } = payload;
        const inventory = await this.getInventoryBySKU(SKU_ID);
        if (inventory) {
            if (inventory.quantity + quantity < 0) {
                return null;
            }
            return prismaClient.inventory.update({
                where: {
                    SKU_ID,
                },
                data: {
                    quantity: inventory.quantity + quantity,
                },
            });
        } else {
            return null;
        }
    }
}
