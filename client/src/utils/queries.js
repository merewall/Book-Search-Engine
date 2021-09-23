// * `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.
import { gql } from '@apollo/client';

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