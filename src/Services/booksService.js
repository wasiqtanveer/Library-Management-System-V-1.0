const STORAGE_KEY = "books";

const initialBooks = [
  {
    id: "b1",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    category: "Self-help",
    copies: 3,
    availableCopies: 3
  },
  {
    id: "b2",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    year: 2016,
    category: "Self-help",
    copies: 2,
    availableCopies: 2
  },
  {
    id: "b3",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    category: "Fiction",
    copies: 4,
    availableCopies: 4
  },
  {
    id: "b4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    category: "Fiction",
    copies: 5,
    availableCopies: 5
  },
  {
    id: "b5",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    year: 2011,
    category: "History",
    copies: 3,
    availableCopies: 3
  },
  {
    id: "b6",
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    category: "Memoir",
    copies: 2,
    availableCopies: 2
  },
  {
    id: "b7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    category: "Fiction",
    copies: 4,
    availableCopies: 4
  },
  {
    id: "b8",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    category: "Psychology",
    copies: 3,
    availableCopies: 3
  },
  {
    id: "b9",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    year: 2012,
    category: "Self-help",
    copies: 3,
    availableCopies: 3
  },
  {
    id: "b10",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    category: "Fiction",
    copies: 2,
    availableCopies: 2
  }
];



// Initialize books in localStorage if not present
function initBooks() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBooks));
  }
}


// Get all books
function getAllBooks() {
  initBooks();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}


// Add a new book
function addBook(book) {
  const books = getAllBooks();
  books.push(book);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}


//delete book

function deleteBook(bookId)
{
    const books = getAllBooks();
    const updatedBooks = books.filter((book) => book.id !== bookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
}

//update book

function UpdateBook(updatedBook)
{
    const books = getAllBooks();

    const updatedBooks = books.map((book) =>
    {
        return book.id === updatedBook.id ? updatedBook : book;
    })

    localStorage.setItem(STORAGE_KEY,JSON.stringify(updatedBooks));
}


//borrow book function
function borrowBook(bookId, username) {
  const books = getAllBooks();
  const borrowedKey = "borrowedBooks";
  const borrowedData = JSON.parse(localStorage.getItem(borrowedKey)) || {};
  const userBorrowed = borrowedData[username] || [];

  // FIX: Check if user already has this specific book
  const alreadyBorrowed = userBorrowed.find(b => b.id === bookId);
  if (alreadyBorrowed) {
    alert("You have already borrowed a copy of this book.");
    return; // Exit the function early
  }

  // Update Library Inventory
  const updatedBooks = books.map(book => {
    if (book.id === bookId && book.availableCopies > 0) {
      return { ...book, availableCopies: book.availableCopies - 1 };
    }
    return book;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

  // Update User List
  const bookToBorrow = books.find(book => book.id === bookId);
  borrowedData[username] = [
    ...userBorrowed,
    { id: bookToBorrow.id, title: bookToBorrow.title, author: bookToBorrow.author }
  ];
  localStorage.setItem(borrowedKey, JSON.stringify(borrowedData));
}

//returnbook function

function returnBook(bookId, username) {
  const borrowedData = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
  if (!borrowedData[username]) return;

  const userList = borrowedData[username];
  
  // FIX: Find the index of ONLY ONE instance of this book
  const index = userList.findIndex(book => book.id === bookId);

  if (index !== -1) {
    // Remove only that one specific item
    userList.splice(index, 1);
    borrowedData[username] = userList;
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedData));

    // Update the library inventory (Add 1 back)
    const books = getAllBooks();
    const updatedBooks = books.map(book =>
      book.id === bookId
        ? { ...book, availableCopies: book.availableCopies + 1 }
        : book
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
  }
}

// Locate 'function returnAllBooks(username)' and replace it with this:
function returnAllBooks(username) {
  const borrowedData = JSON.parse(localStorage.getItem("borrowedBooks")) || {};
  const userBorrowedList = borrowedData[username] || [];

  if (userBorrowedList.length === 0) return;

  // STEP 1: Get current library inventory
  const books = getAllBooks();

  // STEP 2: Update inventory (add +1 back for every book being returned)
  const updatedBooks = books.map(book => {
    // Check if this book ID is in the user's return list
    const countToReturn = userBorrowedList.filter(b => b.id === book.id).length;
    return {
      ...book,
      availableCopies: book.availableCopies + countToReturn
    };
  });

  // STEP 3: Save the restored inventory back to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

  // STEP 4: Clear the user's borrowed list
  borrowedData[username] = [];
  localStorage.setItem("borrowedBooks", JSON.stringify(borrowedData));
}



export { getAllBooks, addBook , deleteBook, UpdateBook , borrowBook , returnBook, returnAllBooks };