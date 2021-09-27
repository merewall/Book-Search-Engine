// BRING IN GRAPHQL FOR APOLLO CLIENT
import { gql } from '@apollo/client';

// QUERY TO RETURN LOGGED IN USER'S INFO FROM DATABASE
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;