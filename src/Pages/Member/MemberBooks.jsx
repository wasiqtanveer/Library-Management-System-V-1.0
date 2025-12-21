import { useEffect, useState } from "react";
import { getAllBooks, borrowBook } from "../../Services/booksService";


const MemberBooks = () => {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const data = getAllBooks();
    setBooks(data);
  };

  const handleBorrow = (bookId) => {
    if (!username) {
      alert("You must be logged in to borrow books.");
      return;
    }
    borrowBook(bookId, username);
    loadBooks(); // Refresh list to update available counts
  };

  return (
    <div className="dash-wrapper">
      <header className="dash-header">
        <h2>Available Books</h2>
        <p>Logged in as: <strong>{username}</strong></p>
      </header>

      <div className="table-container">
        {books.length === 0 ? (
          <div className="no-records">
            <p>No books are currently in the catalog.</p>
          </div>
        ) : (
          <table className="library-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td data-label="Title"><strong>{book.title}</strong></td>
                  <td data-label="Author">{book.author}</td>
                  <td data-label="Category"><span className="badge">{book.category}</span></td>
                  <td data-label="Available">{book.availableCopies} Copies Left</td>
                  <td style={{ textAlign: 'center' }}>
                    {book.availableCopies > 0 ? (
                      <button
                        className="library-btn"
                        style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                        onClick={() => handleBorrow(book.id)}
                      >
                        Borrow
                      </button>
                    ) : (
                      <span style={{ 
                        color: "#ae2012", 
                        fontWeight: "bold", 
                        fontSize: "0.85rem",
                        textTransform: "uppercase" 
                      }}>
                        Out of Stock
                      </span>
                    )}
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

export default MemberBooks;