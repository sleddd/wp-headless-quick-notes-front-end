import { gql } from '@apollo/client';

export default gql`
mutation MyMutation($id: ID!, $journal_entry_field_title: String!, $topicId: ID!) {
  updateJournal(
    input: {id: $id, journal_entry_field_title: $journal_entry_field_title, topics: {append: false, nodes: {id: $topicId}}}
  ) {
    journal {
      journalId
    }
  }
}`;

