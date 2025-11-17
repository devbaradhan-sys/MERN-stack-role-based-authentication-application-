import React, { useState } from "react";
import authService from "../../services/login"; // You can later move register API here
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "STUDENT"
  });

const [showPassword, setShowPassword] = useState(false);

  // ✅ Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: ""
  });

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.register(formData);  // call register API
      setToast({ show: true, message: res?.data?.message || "Registered Successfully ✅", bg: "success" });
      setTimeout(() => navigate("/"), 1500); // Redirect to login
    } catch (error) {
      setToast({
        show: true,
        message: error?.response?.data?.message || "Registration Failed ❌",
        bg: "danger"
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" className="form-control" required
                value={formData.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" required
                value={formData.email} onChange={handleChange} />
            </div>

<div className="mb-3 position-relative">
  <label>Password</label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    className="form-control"
    required
    value={formData.password}
    onChange={handleChange}
  />
  <i
    className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "30px",
      cursor: "pointer",
      fontSize: "1.2rem"
    }}
  ></i>
</div>

            <div className="mb-3">
              <label>Role</label>
              <select name="userType" className="form-select" value={formData.userType} onChange={handleChange}>
                <option value="TEACHER">Teacher</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            <button className="btn btn-success w-100" type="submit">Register</button>
          </form>

          <div className="text-center mt-3">
            <small>
              Already have an account?
              <button className="btn btn-link p-0" onClick={() => navigate("/")}>Login</button>
            </small>
          </div>
        </div>
      </div>

      {/* ✅ Toast */}
      <Toast
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000} autohide
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </>
  );
}
