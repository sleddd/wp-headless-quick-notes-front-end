import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USER, AuthProvider } from "../../hooks/use-auth";

const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: {
      login: $login
      password: $password
    }) {
      status
    }
  }
`;

export default function LogInForm() {
  const [logIn, { data, query, loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [
      { query: GET_USER }
    ],
  });
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData);
    logIn({
      variables: {
        login: email,
        password,
      }
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <AuthProvider>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username:</label>
        <input type="email" name="email" id="email" autoComplete="email"/> 
        <label>Password:</label>
        <input type="password" name="password" id="password" autoComplete="password"/>
        <input type="submit"></input>
    </form>
    </AuthProvider>
  );
}