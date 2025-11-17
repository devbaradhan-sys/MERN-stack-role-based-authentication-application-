import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dashboardService from "../../services/dashboard";

export default function Dashboard() {
    const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ students: 0, teachers: 0 });
  const [students, setStudents] = useState([]);

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dashboardService.getdashboarddata(); 
        console.log('res.data-->',res.data);// your backend API
        setStats(res?.data?.data?.stats || {});
        setStudents(res?.data?.data?.students || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <p className="text-muted">
        {user?.userType === "ADMIN"
          ? "Manage users and data efficiently."
          : user?.userType === "TEACHER"
          ? "View and manage your students’ data."
          : "Check your performance and subject details."}
      </p>

      <div className="row mt-4">
        {/* For Admin & Teacher */}
        {(user?.userType === "ADMIN" || user?.userType === "TEACHER") && (
          <div className="col-md-4">
            <div className="card text-bg-primary mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Students</h5>
                <p className="card-text display-6">{stats.students || 0}</p>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => navigate('/students')}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* For Admin only */}
        {user?.userType === "ADMIN" && (
          <div className="col-md-4">
            <div className="card text-bg-success mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Teachers</h5>
                <p className="card-text display-6">{stats.teachers || 0}</p>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => navigate("/teachers")}
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* For Student only */}
        {user?.userType === "STUDENT" && (
          <div className="mt-4">
            <h3 className="fw-bold">My Subjects</h3>
            <div className="row">
              {students.map((student, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{student.name}</h5>
                      <p>Email: {student.email}</p>
                      <ul className="list-unstyled">
                        <li>Maths: {student.subjects?.maths}</li>
                        <li>Science: {student.subjects?.science}</li>
                        <li>Social: {student.subjects?.social}</li>
                        <li>Total: {student.subjects?.total}</li>
                      </ul>

                      {student.subjects?.total >= 150 ? (
                        <span className="badge bg-success">PASS ✅</span>
                      ) : (
                        <span className="badge bg-danger">FAIL ❌</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
