function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">
        <p>MENU</p>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-item active">
          <span className="sidebar-icon">▦</span>
          <span>Dashboard</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">♙</span>
          <span>Patients</span>
        </div>

        <div className="sidebar-item">
          <span className="sidebar-icon">▥</span>
          <span>Analytics</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <p>Healthcare Management</p>
        <small>Patient Care Portal</small>
      </div>
    </aside>
  );
}

export default Sidebar;