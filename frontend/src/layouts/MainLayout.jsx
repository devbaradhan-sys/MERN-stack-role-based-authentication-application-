import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { persistor } from "../redux/store/index.jsx";
import { ACTION_TYPES } from "../constants";
import { CUSTOM_CONSTANTS } from "../constants";

export default function MainLayout({ layoutvar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    persistor.purge();
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="bg-dark text-white d-flex flex-column p-3 shadow-sm"
        style={{ width: "250px" }}
      >
        <h4 className="text-center mb-4">Navigation</h4>

        <nav className="nav flex-column">
          <button
            className="btn btn-dark text-start nav-link mb-2"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </button>

          {user?.userType === "ADMIN" && (
            <>
              <button
                className="btn btn-dark text-start nav-link mb-2"
                onClick={() => navigate("/students")}
              >
                <i className="bi bi-people me-2"></i>Students
              </button>
              <button
                className="btn btn-dark text-start nav-link mb-2"
                onClick={() => navigate("/teachers")}
              >
                <i className="bi bi-person-badge me-2"></i>Teachers
              </button>
            </>
          )}

          {user?.userType === "TEACHER" && (
            <button
              className="btn btn-dark text-start nav-link mb-2"
              onClick={() => navigate("/students")}
            >
              <i className="bi bi-people me-2"></i>Students
            </button>
          )}

          {user?.userType === "STUDENT" && (
            <button
              className="btn btn-dark text-start nav-link mb-2"
              onClick={() => navigate("/profile")}
            >
              <i className="bi bi-person-circle me-2"></i>My Info
            </button>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Header Navbar */}
        <header
          className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center"
          style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
          <span className="navbar-brand">Admin Panel</span>

          {/* Profile Section */}
          <div className="position-relative">
            <div
              className="d-flex align-items-center text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMenu(!showMenu)}
            >
            <img
              src={
                user?.image
                  ? `${CUSTOM_CONSTANTS.API_BASE_URL}${user.image}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />

              <span className="me-1">{user?.name}</span>
              <i className="bi bi-caret-down-fill small"></i>
            </div>

            {showMenu && (
              <div
                className="position-absolute bg-white shadow-sm rounded py-2"
                style={{
                  top: "110%",
                  right: 0,
                  minWidth: "180px",
                  zIndex: 1000,
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/profile");
                  }}
                >
                  <i className="bi bi-person me-2"></i> Edit Profile
                </button>
                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-grow-1">{layoutvar}</main>
      </div>
    </div>
  );
}
