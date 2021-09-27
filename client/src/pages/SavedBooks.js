// BRING IN REACT AND REACT-BOOTSTRAP MODULES
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

// BRING IN QUERY AND MUTATION MODULES FOR APOLLO CLIENT
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // SET USER DATA TO VARIABLE
  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // GRAB USER TOKEN IF USER LOGGED IN
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // IF USER NOT LOGGED IN, DON'T CONTINUE
    if (!token) {
      return false;
    }

    // USE MUTATION TO REMOVE THE BOOK BY BOOK ID
    try {
      await removeBook({
        variables: { bookId }
      });

      // REMOVE BOOK ID FROM LOCAL STORAGE
      removeBookId( bookId );
    } catch (error) {
      console.error(error);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // MAP USER'S SAVED BOOKS TO SHOW EACH BOOK AS A CARD WITH TITLE, AUTHOR(S), DESCRIPTION, IMAGE AND LINK TO GOOGLE BOOKS SITE AS WELL AS A BUTTON TO DELETE THE BOOK FROM SAVED BOOKS
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks?.map((book) => {
            return (
              <Card key={book?.bookId} border='dark'>
                {book?.image ? <a href={book?.link || "#a"} target="_blank" rel="noopener noreferrer"><Card.Img src={`https:${book?.image}`||'#a'} alt={`The cover for ${book?.title}`} variant='top' /></a> : null}
                <Card.Body>
                  <Card.Title><a href={book?.link || "#a"} target="_blank" rel="noopener noreferrer">{book?.title}</a></Card.Title>
                  <p className='small'>Authors: {book?.authors}</p>
                  <Card.Text>{book?.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book?.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </>
  );
};

export default SavedBooks;
