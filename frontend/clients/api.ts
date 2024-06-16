import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

export const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_API_URL as string,
    {
        headers: () => ({
            Authorization: isClient
                ? `${window.localStorage.getItem('token')}`
                : '',
        }),
    },
);
