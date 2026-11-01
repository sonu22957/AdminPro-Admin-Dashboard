import { useState } from "react";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function MainLayout({ children, currentPage, onNavigate }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      <div className="main-panel">
        <Navbar
          currentPage={currentPage}
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
