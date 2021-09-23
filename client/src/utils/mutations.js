// * `mutations.js`:

// 	* `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.

// 	* `ADD_USER` will execute the `addUser` mutation.

// 	* `SAVE_BOOK` will execute the `saveBook` mutation.

// 	* `REMOVE_BOOK` will execute the `removeBook` mutation.
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: [String], $description: String, $image: String, $link: String, $title: String!) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, image: $image, link: $link, title: $title) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
