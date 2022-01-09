import { gql } from '@apollo/client';

export default gql`mutation($id: ID!) {
    deleteJournal(input: {id: $id}) {
        deletedId
      }
}`;
  