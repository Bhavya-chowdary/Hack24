import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}