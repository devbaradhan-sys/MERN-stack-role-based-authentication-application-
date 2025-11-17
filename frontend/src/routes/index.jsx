import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Students from "../pages/Students";
import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";
import Teachers from "../pages/teachers";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated || false);
  return isAuthenticated ? (
    <MainLayout layoutvar={children} />
  ) : (
    <Navigate to="/" replace />
  );
}

function AppRoutes() {
  const state = useSelector((state) => state);
  console.log("Redux State =>", state);

  return (
    <Router>
      <Routes>

        {/*public routes*/}

        <Route path="/" element={<Login />} />
        <Route path="/userregister" element={<Register />} />

        {/*protected routes*/}

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}/>
        <Route path="/students" element={ <ProtectedRoute> <Students /> </ProtectedRoute>}/> 
        <Route path="/teachers" element={ <ProtectedRoute> <Teachers /> </ProtectedRoute>}/>        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
