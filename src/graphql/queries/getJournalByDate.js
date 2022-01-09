import { gql } from '@apollo/client';

export default gql`
  query Journal($month: Int!, $day: Int!, $year: Int! ){
    journals(first: 1000, where: {dateQuery: {month: $month, day: $day, year: $year}}) {
      nodes {
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
  }
`;