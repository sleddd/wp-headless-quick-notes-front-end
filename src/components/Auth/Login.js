import React from "react";
import { gql, useMutation } from "@apollo/client";

import useAuth, { GET_USER, AuthProvider } from "../../hooks/use-auth";
import { Logout } from "../../components/Auth/Logout";

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: {login: $login, password: $password }) {
      clientMutationId
      status
    }
  }
`;


export default function LogInForm() {
  const { loggedIn } = useAuth();
  const [logIn, { data, query, loading, error }] = useMutation( LOG_IN, {
    refetchQueries: [
      { query: GET_USER }
    ],
  });

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData            = new FormData(event.currentTarget);
    const { username, password } = Object.fromEntries(formData);
    logIn({
      variables: {
        login: username,
        password,
      }
    }).catch(error => {
      console.error(error);
    });
  }
 
 
  return (
    <AuthProvider>
      { ! loggedIn ?
      <form id="loginForm" method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username:</label>
        <input type="text" name="username" id="username" autoComplete="username" />
        <label>Password:</label>
        <input type="password" name="password" id="password" autoComplete="password" />
        <input type="submit"></input>
      </form> : <Logout/> }
    </AuthProvider>
  );
}