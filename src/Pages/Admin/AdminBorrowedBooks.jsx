import React from 'react'
import { useEffect, useState } from "react";


const AdminBorrowedBooks = () => {
    const [records, setrecords] = useState([]);
    useEffect(() =>
    {
        const borrowedData = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
        const flattened = [];

        Object.keys(borrowedData).forEach((username) =>
        {
            borrowedData[username].forEach((book) =>
            {
                flattened.push({
                    username,
                    title: book.title,
                    author: book.author,
                })
            })
        })
        setrecords(flattened);
    },[])


  return (
    <div className="dash-wrapper">
      <header className="dash-header">
        <h2>Borrowed Books</h2>
        <p>Current active loans across the library system.</p>
      </header>

      {records.length === 0 ? (
        <div className="no-records">
          <p>No books are currently borrowed.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="library-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Book Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={`${item.username}-${index}`}>
                  <td><strong>{item.username}</strong></td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminBorrowedBooks
