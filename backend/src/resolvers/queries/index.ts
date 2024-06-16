import { GraphqlContext } from '../../interfaces';
import { prismaClient } from '../../lib/db';
import UserService, { GetUserTokenPayload } from '../../services/User';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { InventoryService } from '../../services/inventory';
import { ProductCategory } from '../mutations';

const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const queries = {
    getProducts: async (_: any) => {
        const products = await prismaClient.product.findMany();
        return products;
    },
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
    getPresignedUrl: async (
        parent: any,
        { imageType, imageName }: { imageType: string; imageName: string },
        ctx: GraphqlContext,
    ) => {
        if (!ctx.user || !ctx.user.id) {
            throw new Error('Not Authenticated');
        }

        const allowedImageTypes = ['jpeg', 'jpg', 'png', 'webp'];
        if (!allowedImageTypes.includes(imageType)) {
            throw new Error('Invalid image type');
        }

        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: `uploads/${
                ctx.user.id
            }/products/${imageName}-${Date.now()}.${imageType}`,
        });

        const signedUrl = await getSignedUrl(s3Client, putObjectCommand);
        return signedUrl;
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
    getInventoryBySKU: async (_: any, parameters: { SKU_ID: string }) => {
        const inventory = await InventoryService.getInventoryBySKU(
            parameters.SKU_ID,
        );
        return inventory?.quantity || -1;
    },
};

export default queries;
