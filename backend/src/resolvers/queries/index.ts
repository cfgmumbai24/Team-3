import UserService, { GetUserTokenPayload } from '../../services/User';

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
};

export default queries;
