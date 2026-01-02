📚 Library Management System

A Library Management System built using React as the final project of my internship.
The application supports role-based access for Admins and Members and handles complete book borrowing and returning workflows using local storage for data persistence.


---

🚀 Project Overview

This project simulates how a real-world library system works.
Admins manage the library inventory, while members can browse, borrow, and return books.

The focus was on:

Clean application flow

Proper separation of concerns

Practical CRUD operations

Understanding real-world logic rather than just UI



---

👥 User Roles

🔑 Admin

Login with admin role

Add new books

Edit existing books

Delete books

View available and borrowed copies

Manage library inventory through a dashboard


📖 Member

Login with member role

View available books

Borrow books (only if copies are available)

View borrowed books

Return individual books

Return all borrowed books at once



---

⚙️ Core Features

Role-based authentication

Protected routes using React Router

Sidebar-based dashboard layout

CRUD operations for books

Borrow and return logic with copy tracking

Persistent data using localStorage

Clean separation between UI and services



---

🛠️ Tech Stack

React

React Router DOM

JavaScript (ES6+)

CSS

LocalStorage (for data persistence)

---

🔐 Authentication Logic

User data is stored in localStorage

Each user has a role (admin or member)

Routes are protected using a ProtectedRoute component

Unauthorized access is automatically redirected



---

📦 Book Management Logic

Each book has:

Total copies

Available copies


Borrowing a book:

Decreases available copies

Adds the book to the user’s borrowed list


Returning a book:

Restores the available copy count

Removes the book from the user’s borrowed list


Returning all books:

Restores all borrowed copies at once




---

🧪 Learning Outcome

This project helped me:

Understand real CRUD workflows

Handle state and persistence properly

Design role-based dashboards

Write cleaner service-based logic

Avoid common beginner mistakes in React apps


The internship also included monthly mini-projects, which helped maintain consistency and prevented skill stagnation throughout the learning process.


---

🌐 Live Project / Website

https://wasiqtanveer.github.io/Library-Management-System-V-1.0


---

🙏 Acknowledgements

Software House: Brandora

Instructor: Hammad Baseer


Special thanks for the structured mentorship, continuous feedback, and practical learning environment.


---

📌 Future Improvements

Backend integration (Node.js / Express)

Database support (MongoDB / PostgreSQL)

Better authentication with JWT

Search and filtering

UI/UX enhancements

Analytics for admin dashboard

