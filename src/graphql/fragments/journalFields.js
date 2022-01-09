import { gql } from '@apollo/client';

export default gql`
fragment journalFields on journals {
  journalId
  title
  customFields {
    journalEntryFieldTitle
    journalEntryFieldImage {
      mediaItemUrl
    }
  }
}`;