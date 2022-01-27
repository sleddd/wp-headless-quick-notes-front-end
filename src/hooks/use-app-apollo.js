/*
* External dependencies
*/
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client"

import { BatchHttpLink } from '@apollo/client/link/batch-http';

export const cache = new InMemoryCache({});

const httpLink = new BatchHttpLink({
    uri: process.env.REACT_APP_GRAPHQL,
    credentials: 'include'
});

export const useApolloClient = () => {
    return new ApolloClient({
        link: httpLink,
        cache
    });
}