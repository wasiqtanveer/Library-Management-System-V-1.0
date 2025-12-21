import React, { useEffect, useState } from 'react';
import { getAllBooks, addBook, deleteBook, UpdateBook } from '../../Services/booksService';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [copies, setCopies] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => { loadBooks(); }, []);

  const loadBooks = () => { setBooks(getAllBooks()); };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!title || !author || !year || !copies) {
      alert("Please fill all required fields");
      return;
    }

    const bookData = {
      id: editingBookId || Date.now().toString(),
      title, author,
      year: Number(year),
      category,
      copies: Number(copies),
      availableCopies: Number(copies)
    };

    editingBookId ? UpdateBook(bookData) : addBook(bookData);
    loadBooks();
    resetForm();
  };

  const resetForm = () => {
    setTitle(""); setAuthor(""); setYear(""); setCategory(""); setCopies("");
    setEditingBookId(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to remove this book?")) {
      deleteBook(id);
      loadBooks();
    }
  };

  const handleEditClick = (book) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setCategory(book.category);
    setCopies(book.copies);
  };

  return (
    <div className='dash-wrapper'>
      <header className="dash-header">
        <h2>Manage Inventory</h2>
        <p>{editingBookId ? "Currently Editing Registry" : "Add or Update Library Books"}</p>
      </header>

      {/* Book Form Card */}
      <section className="manage-books-form">
        <form onSubmit={handleAddBook}>
          <div className="book-form-grid">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className='library-input' placeholder='e.g. The Great Gatsby' value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" className='library-input' placeholder='e.g. F. Scott Fitzgerald' value={author} onChange={(e)=>setAuthor(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" className='library-input' value={year} onChange={(e)=>setYear(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" className='library-input' placeholder='Fiction' value={category} onChange={(e)=>setCategory(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Copies</label>
              <input type="number" className='library-input' value={copies} onChange={(e)=>setCopies(e.target.value)} />
            </div>
          </div>

          <div className="form-actions">
            {editingBookId && (
              <button type="button" className="library-btn" style={{backgroundColor: '#606c38'}} onClick={resetForm}>Cancel</button>
            )}
            <button className='library-btn' type="submit">
              {editingBookId ? "Update Book Entry" : "Register New Book"}
            </button>
          </div>
        </form>
      </section>

      {/* Books Table Container */}
      <div className="table-container">
        {books.length === 0 ? (
          <div className="no-records"><p>No books in the archive.</p></div>
        ) : (
          <table className="library-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td data-label="Title"><strong>{book.title}</strong></td>
                  <td data-label="Author">{book.author}</td>
                  <td data-label="Category"><span className="badge">{book.category}</span></td>
                  <td data-label="Stock">{book.availableCopies} / {book.copies}</td>
                  <td>
                    <button className='btn-edit' onClick={() => handleEditClick(book)}>Edit</button>
                    <button className='btn-delete' onClick={()=>handleDeleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageBooks;