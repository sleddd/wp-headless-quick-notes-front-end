import React from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";

import useAuth, { GET_USER } from "../../hooks/use-auth";

const LOGOUT = gql`
	mutation Logout {
		logout(input: {}) {
			status
		}
	}
`;

export const Logout = (props) => {
    const apolloClient                  = useApolloClient();
    const { user, loggedIn }            = useAuth();
    const [ mutation, mutationResults ] = useMutation( LOGOUT, {
        refetchQueries: [
          { query: GET_USER }
        ],
    } );

    const handleLogout = (e) => {
        e.preventDefault();
        mutation();
        apolloClient.clearStore();
        window.location.reload();
    }
  
    return(
        <div id="logoutForm">
            <h1>{`Hello ${ user ? user.firstName : ''}!`}</h1>
            <button onClick={handleLogout}>LOGOUT</button> 
        </div>
    );
}