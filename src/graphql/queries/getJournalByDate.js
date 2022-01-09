import JOURNAL_FIELDS from "../fragments/journalFields";
import TOPIC_FIELDS from "../fragments/topicFields";
import { gql } from '@apollo/client';

export default gql`
  query Journal($month: Int!, $day: Int!, $year: Int! ){
    journals(where: {dateQuery: {month: $month, day: $day, year: $year}}) {
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