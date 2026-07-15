function Header({ logout }) {
  return (
    <header className="header">
      <h1>QuickLoanAI</h1>
      <p>AI-Powered Loan Approval System</p>

      <nav>
        <a href="/">Home</a>
        <a href="/">Dashboard</a>
        <a href="/">Apply Loan</a>
        <a href="/">History</a>

        <button
          className="nav-logout"
          onClick={logout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;