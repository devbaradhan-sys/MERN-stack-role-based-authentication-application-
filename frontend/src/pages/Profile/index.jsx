import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import profileService from "../../services/profile";
import { Toast } from "react-bootstrap";
import { CUSTOM_CONSTANTS } from "../../constants";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: "",
  });
  const [preview, setPreview] = useState(null);
  const [profimg, setProfimg] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });

  // ✅ Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await profileService.getUserDetails();
        const data = res?.data?.data?.user;
        setFormData({
          name: data?.name || "",
          email: data?.email || "",
          profilePic: data?.image || "",
        });
        setProfimg(data?.image);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setToast({ show: true, message: "Failed to load profile ❌", bg: "danger" });
      }
    };
    fetchUser();
  }, []);

  // ✅ Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Dropzone upload
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ✅ Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);

      if (formData.profilePic instanceof File) {
        payload.append("profilePic", formData.profilePic);
      }

      const res = await profileService.updateProfile(payload);
      setToast({
        show: true,
        message: res?.data?.message || "Profile Updated ✅",
        bg: "success",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setToast({
        show: true,
        message: error?.response?.data?.message || "Update Failed ❌",
        bg: "danger",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Profile</h3>

      <div className="card shadow-sm p-4" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          {/* Profile Image & Dropzone */}
          <div className="text-center mb-4">
            <img
              src={
                preview
                  ? preview
                  : profimg
                  ? CUSTOM_CONSTANTS.API_BASE_URL + profimg
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-circle border mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />

            {/* Dropzone area */}
            <div
              {...getRootProps()}
              className={`border rounded p-3 text-center ${
                isDragActive ? "bg-light border-primary" : "border-secondary"
              }`}
              style={{ cursor: "pointer" }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-primary fw-semibold mb-0">
                  Drop your image here...
                </p>
              ) : (
                <p className="mb-0">
                  Drag & drop a new profile image, or click to select one
                </p>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Update Profile
          </button>
        </form>
      </div>

      {/* Toast */}
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
    </div>
  );
}
