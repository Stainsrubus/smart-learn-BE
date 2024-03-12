import express from 'express'
import MentorController from '../controllers/mentors.js'
import AssignmentController from '../controllers/assignment.js';


const router = express.Router()

router.post('/create',MentorController.create)
router.get('/getallmentors',MentorController.getAllMentors)
router.post('/assign/:mentorId', AssignmentController.assignStudents);

export default router