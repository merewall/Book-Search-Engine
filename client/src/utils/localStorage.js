// FUNCTION FOR GRABBING THE BOOK IDS OF BOOKS SAVED TO LOCAL STORAGE
export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};
// FUNCTION FOR SAVING BOOK IDS TO LOCAL STORAGE
export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};
// FUNCTION FOR REMOVING A SAVED BOOK FROM LOCAL STORAGE
export const removeBookId = (bookId) => {
  // GET ALL SAVED BOOKS IN LOCAL STORAGE
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;
  // RETURN IF NO SAVED BOOKS IN LOCAL STORAGE
  if (!savedBookIds) {
    return false;
  }
  // FILTER OUT DELETED BOOK FROM ARRAY OF SAVED BOOKS IN LOCAL STORAGE
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
