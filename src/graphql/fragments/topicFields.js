import { gql } from '@apollo/client';

export default gql`fragment topicFields on topics {
  topicId
  name
  customFields {
    journalTopicFieldColor
    journalTopicFieldIcon
  }
}`;