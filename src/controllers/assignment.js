import mentorModel from '../models/mentors.js';
import studentModel from '../models/students.js';

const assignStudents = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentIds } = req.body;
        const mentor = await mentorModel.findById(mentorId,{ password: 0, createdAt: 0 });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        
        await studentModel.updateMany({ _id: { $in: studentIds } }, { mentor: mentorId });

        mentor.students = studentIds;
        await mentor.save();

        return res.status(200).json({ message: 'Students assigned to mentor successfully', mentor });
    } catch (error) {
        console.error('Error assigning students to mentor:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default { assignStudents };
