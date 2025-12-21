import { useEffect, useState } from "react";
import { returnBook, returnAllBooks } from "../../Services/booksService";

const BorrowedBooks = () => {
  const [books, setBooks] = useState([]);

  const handleReturn = (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    returnBook(bookId, user.username);
    loadBorrowedBooks();
  };

  const handleReturnAll = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    if (window.confirm("Are you sure you want to return all books?")) {
      returnAllBooks(user.username);
      loadBorrowedBooks();
    }
  };

  const loadBorrowedBooks = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const borrowedData = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
    const userBooks = borrowedData[user.username] || [];
    setBooks(userBooks);
  };

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  return (
    <div className="dash-wrapper">
      <header className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>My Borrowed Books</h2>
          <p>Review and return your current active loans.</p>
        </div>
        {books.length > 0 && (
          <button className="library-btn" onClick={handleReturnAll} style={{ backgroundColor: '#bc6c25' }}>
            Return All Books
          </button>
        )}
      </header>

      <div className="table-container">
        {books.length === 0 ? (
          <div className="no-records">
            <p>You currently have no borrowed books.</p>
          </div>
        ) : (
          <table className="library-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn-edit"
                      onClick={() => handleReturn(book.id)}
                    >
                      Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;