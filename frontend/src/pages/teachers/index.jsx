
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import teachersService from "../../services/teachers";
import { Modal, Button, Form, Toast } from "react-bootstrap";

export default function Teachers() {
  const { user } = useSelector((state) => state.auth);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });
  const [showModal, setShowModal] = useState(false);

  // Fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await teachersService.getAll();
      setTeachers(res?.data?.data?.teachers || []);
    } catch (err) {
      console.error("Error loading teachers:", err);
      setToast({
        show: true,
        message: "Failed to load teachers ❌",
        bg: "danger",
      });
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Open edit modal
  const handleEdit = (teacher) => {
    setSelectedTeacher({
      id: teacher._id,
      name: teacher.name,
    });
    setShowModal(true);
  };

const handleSave = async (e) => {
  e.preventDefault();
  try {
    await teachersService.edit(selectedTeacher);  
    setShowModal(false);
    setToast({ show: true, message: "Teacher updated ✅", bg: "success" });
    fetchTeachers();
  } catch (err) {
    console.error("Update failed:", err);
    setToast({
      show: true,
      message: "Failed to update teacher ❌",
      bg: "danger",
    });
  }
};

  // Delete teacher
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await teachersService.delete(id);
      setToast({ show: true, message: "Teacher deleted 🗑️", bg: "warning" });
      fetchTeachers();
    } catch (err) {
      console.error("Delete failed:", err);
      setToast({
        show: true,
        message: "Failed to delete teacher ❌",
        bg: "danger",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Teachers List</h3>

      <div className="card shadow-sm p-3">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((t, idx) => (
                <tr key={idx}>
                  <td>{t.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </button>
                    {user?.userType === "ADMIN" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(t._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedTeacher?.name || ""}
                onChange={(e) =>
                  setSelectedTeacher({ ...selectedTeacher, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Toast */}
      <Toast
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
}
