import UserService, { CreateUserPayload } from '../../services/User';

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
    forgotPassword: async (_: any, payload: { email: string }) => {
        const res = await UserService.forgotPassword(payload);
        return res;
    },
};

export default mutations;
