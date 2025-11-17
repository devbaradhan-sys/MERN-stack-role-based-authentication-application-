import React, { useState } from "react";
import authService from "../../services/login"; // ✅ import your API service
import { Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom"; 
import { ACTION_TYPES } from "../../constants";

export default function Login() {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();  
  // ✅ State to store email/password
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // ✅ Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: ""  // success or danger
  });

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await authService.loggedin(formData);
      console.log('response-->',res);

// ✅ Extract user & token safely
      const token = res?.data?.response?.token;
      const userdetails = res?.data?.response?.userdetails;

      // ✅ Dispatch to Redux
      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: { token, userdetails },
      });

         
    setToast({
        show: true,
        message: res?.data?.message || "Login Successful ✅",
        bg: "success"
      });
   
    setTimeout(() => navigate("/dashboard"), 1000);
       
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message:
          error?.response?.data?.message || "Login Failed ❌ Please try again.",
        bg: "danger"
      });

    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"           // ✅ important to match formData keys
              className="form-control"
              value={formData.email}
              onChange={handleChange} // ✅ update state
              required
            />
          </div>

<div className="mb-3 position-relative">
  <label>Password</label>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    className="form-control"
    value={formData.password}
    onChange={handleChange}
    required
  />

  {/* Bootstrap Eye Icon */}
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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
          {/* ✅ Register Button */}
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate("/userregister")}
            >
              New User? Register
            </button>
                      </div>
      </div>
    </div>
      {/* ✅ Bootstrap Toast */}
      <Toast
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
      </>
  );
}
