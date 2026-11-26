
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="health-icon">+</span>
        <div className="brand-text">
          <h2>HealthCare</h2>
          <small>Patient Management System</small>
        </div>
      </div>

      <div className="navbar-profile">
        <div className="profile-avatar">D</div>

        <div className="profile-info">
          <p>Doctor</p>
          <small>Medical Staff</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
