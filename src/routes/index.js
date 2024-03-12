import express from 'express'
import studentsRoutes from './students.js'
import mentorsRoutes from './mentors.js'
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Backend of Booking App</h1>`)
})

router.use('/student',studentsRoutes)
router.use('/mentor',mentorsRoutes) 

export default router