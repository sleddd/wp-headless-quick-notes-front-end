import { gql } from '@apollo/client';

export default gql`query {
  topics {
    nodes {
      customFields {
        journalTopicFieldColor
        journalTopicFieldIcon
      }
      name
      id
      topicId
    }
  }
}`;