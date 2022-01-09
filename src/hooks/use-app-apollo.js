/*
* External dependencies
*/
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client"

import { BatchHttpLink } from '@apollo/client/link/batch-http';

const cache = new InMemoryCache({});
const httpLink = new BatchHttpLink({
    uri: 'https://admin.journal.local/graphql',
    credentials: 'include'
});


export const useApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache,
    });
}