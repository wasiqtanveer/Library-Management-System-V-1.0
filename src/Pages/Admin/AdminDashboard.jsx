import { getAllBooks } from "../../Services/booksService";

const AdminDashboard = () => {
  const admin = JSON.parse(localStorage.getItem("user"));
  const books = getAllBooks();
  const borrowedData = JSON.parse(localStorage.getItem("borrowedBooks")) || {};

  // 1. Total Physical Copies (Sum of all 'copies' property)
  const totalPhysicalCopies = books.reduce((acc, book) => acc + (book.copies || 0), 0);

  // 2. Total Borrowed Copies (Calculated from your borrowedData)
  const allBorrowedItems = Object.values(borrowedData).flat();
  const totalBorrowedCount = allBorrowedItems.length;

  // 3. Unique Titles Borrowed (Removing duplicates from the borrowed list)
  const uniqueBorrowedTitles = [...new Set(allBorrowedItems.map(item => item.id || item.title))].length;

  // 4. Active Members
  const activeMembersCount = Object.keys(borrowedData).filter(
    (username) => borrowedData[username].length > 0
  ).length;

  return (
    <div className="dash-wrapper"> {/* Changed from dashboard-container */}
      <header className="dash-header"> {/* Changed from dashboard-header */}
        <h2>Admin Dashboard</h2>
        <p>System Administrator: <strong>{admin?.username}</strong></p>
      </header>

      <div className="dash-stats-grid"> {/* Changed from dashboard-cards */}
        <div className="stat-card"> {/* Changed from card */}
          <h4>Total Inventory</h4>
          <p>{totalPhysicalCopies}</p>
        </div>

        <div className="stat-card">
          <h4>Borrowed Copies</h4>
          <p>{totalBorrowedCount}</p> 
        </div>

        <div className="stat-card">
          <h4>Unique Titles out</h4>
          <p>{uniqueBorrowedTitles}</p>
        </div>

        <div className="stat-card">
          <h4>Active Members</h4>
          <p>{activeMembersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;