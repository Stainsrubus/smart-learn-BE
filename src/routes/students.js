import express from 'express'
import StudentController from '../controllers/students.js'

const router = express.Router()

router.post('/create',StudentController.create)
router.get('/getallstudents',StudentController.getAllStudents)
router.get('/getstudentswithoutmentor',StudentController.getStudentsWithoutMentor)
router.put('/reassignmentor/:studentId',StudentController.reassignMentor)
router.get('/getpreviousmentor/:studentId',StudentController.getPreviousmentor)
router.get('/getstudentbyid/:id',StudentController.getStudentbyId)
export default router