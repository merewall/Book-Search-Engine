// BRING IN REACT, USESTATE, USEEFFECT MODULES
import React, { useState, useEffect } from 'react';
// BOOTSTRAP MODULES
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

// BRING IN USEMUTATION MODULE FOR APOLLO CLIENT & SAVE BOOK MUTATION
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations'

// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

// BRING IN FUNCTIONS FOR HANDLING LOCAL STORAGE
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  // Invoke `useMutation()` hook to return a Promise-based function and data about the SAVE_BOOK mutation
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // USE GOOGLE BOOKS API TO FETCH BOOKS QUERYING WITH SEARCH INPUT
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);

      // ERROR IF API DOESN'T RETURN RESPONSE
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // SAVE RESPONSE AS JSON
      const { items } = await response.json();

      // USE JSON DATA TO CREATE ARRAY OF BOOK DATA WITH SPECIFIED PROPERTIES
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        // REMOVE HTTP FROM IMAGE LINK SO THE LINK CAN BE SET TO A SECURE HTTPS LINK
        image: book.volumeInfo.imageLinks?.thumbnail.split(':')[1] || '',
        link: book.volumeInfo.infoLink || "#a",
      }));

      // SET SEARCHEDBOOKS STATE WITH ALL BOOKDATA
      setSearchedBooks(bookData);
      // RESET SEARCH INPUT TO BLANK FIELD
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token (KEEPS UNLOGGED USER FROM SAVING A BOOK)
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // USE SAVE BOOK MUTATION TO SAVE BOOK TO USER'S SAVED BOOKS
      await saveBook({
        variables: {...bookToSave},
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  // SEARCH BOOKS PAGE
  // INCLUDES FORM FOR SEARCH INPUT AND A CARD FOR UPT TO FIRST 10 BOOKS RETURNED IN SEARCH RESULTS
  // EACH BOOK CARD INCLUDES A TITLE, DESCRIPTION, AUTHOR(S), IMAGE, AND LINK TO GOOGLE BOOKS SITE
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <Card.Img src={`https:${book.image}`} alt={`The cover for ${book.title}`} variant='top' />
                  </a>
                ) : null}
                <Card.Body>
                  <Card.Title><a href={book.link} target="_blank" rel="noopener noreferrer">{book.title}</a></Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
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

export default SearchBooks;
