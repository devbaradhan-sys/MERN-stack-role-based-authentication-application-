const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const teachersController = require("../controllers/teachersController")
// Protected dashboard
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes
router.get("/students", verifyToken , studentController.liststudents);
router.get("/editstudent/:id", verifyToken , studentController.editstudentform);
router.post("/editstudent", verifyToken , studentController.editstudentdata);
router.delete("/deletestudent/:id", verifyToken, studentController.deletestudentdata);

router.get('/teachers', verifyToken, teachersController.listteachers)
router.get('/editteacher/:id', verifyToken, teachersController.editteacherdata);
router.post('/editteacher', verifyToken, teachersController.editteacherdata);
router.delete('/deleteteacher/:id', verifyToken, teachersController.deleteteacherdata);


module.exports = router;
