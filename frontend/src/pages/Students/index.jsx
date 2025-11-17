import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import studentsService from "../../services/students";
import { Modal, Button, Form, Toast } from "react-bootstrap";

export default function Students() {
  const { user } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch students
  const fetchStudents = async () => {
    try {
      const res = await studentsService.getAll();
      console.log('res?.data-->',res?.data);
      setStudents(res?.data?.data?.students || []);
    } catch (err) {
      console.error("Error loading students:", err);
      setToast({
        show: true,
        message: "Failed to load students ❌",
        bg: "danger",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Handle edit open
  const handleEdit = (student) => {
    setSelectedStudent({
      id: student._id,
      name: student.name,
      maths: student.subjects?.maths || 0,
      science: student.subjects?.science || 0,
      social: student.subjects?.social || 0,
    });
    setShowModal(true);
  };

  // ✅ Handle form submit
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await studentsService.update(selectedStudent);
      setShowModal(false);
      setToast({ show: true, message: "Student updated ✅", bg: "success" });
      fetchStudents();
    } catch (err) {
      console.error("Update failed:", err);
      setToast({
        show: true,
        message: "Failed to update student ❌",
        bg: "danger",
      });
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await studentsService.delete(id);
      setToast({ show: true, message: "Student deleted 🗑️", bg: "warning" });
      fetchStudents();
    } catch (err) {
      console.error("Delete failed:", err);
      setToast({
        show: true,
        message: "Failed to delete student ❌",
        bg: "danger",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Students List</h3>

      <div className="card shadow-sm p-3">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social</th>
              <th>Total</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.name}</td>
                  <td>{s.subjects?.maths ?? "-"}</td>
                  <td>{s.subjects?.science ?? "-"}</td>
                  <td>{s.subjects?.social ?? "-"}</td>
                  <td>{s.subjects?.total ?? "-"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    {user?.userType === "ADMIN" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    

      {/* ✅ Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedStudent?.name || ""}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Maths</Form.Label>
              <Form.Control
                type="number"
                value={selectedStudent?.maths || ""}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    maths: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Science</Form.Label>
              <Form.Control
                type="number"
                value={selectedStudent?.science || ""}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    science: e.target.value,
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Social</Form.Label>
              <Form.Control
                type="number"
                value={selectedStudent?.social || ""}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    social: e.target.value,
                  })
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

      {/* ✅ Toast */}
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
