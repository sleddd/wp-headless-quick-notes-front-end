import { gql } from '@apollo/client';

export default gql`
mutation MyMutation( $journal_entry_field_title: String!, $topicId: ID!, $title: String!) {
  createJournal(
    input: {journal_entry_field_title: $journal_entry_field_title, topics: {nodes: {id: $topicId }}, title: $title, status: PRIVATE}
  ) {
    journal {
      id
      journalId
      title
      customFields {
        journalEntryFieldTitle
        journalEntryFieldImage {
          mediaItemUrl
        }
      }
      topics {
        nodes {
          id
          topicId
          name
          customFields {
            journalTopicFieldColor
            journalTopicFieldIcon
          }
        }
      }
    }
  }
}`;