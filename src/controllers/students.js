import studentModel from "../models/students.js";
import Auth from "../common/auth.js";
import mentorModel from "../models/mentors.js";

const create = async (req, res) => {
  try {
    const { email, password, name, mobile, gender, mentor } = req.body;

    let student = await studentModel.findOne({ email });

    if (!student) {
      const hashedPassword = await Auth.hashPassword(password);
      await studentModel.create({
        email,
        password: hashedPassword,
        name,
        mobile,
        gender,
        mentor,
      });

      return res.status(201).send({ message: "student created successfully" });
    } else {
      return res
        .status(400)
        .send({ message: `student with email ${email} already exists` });
    }
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find({}, { password: 0, createdAt: 0 });
    return res
      .status(200)
      .send({ message: "Students retrieved successfully", students });
  } catch (error) {
    console.error("Error retrieving customers:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getStudentbyId=async(req,res)=>{
  try {
    const studentId = req.params.id;
    const student = await studentModel.findById(studentId,{password:0})
    if(student){
        return res.status(200).send({message:"student retrived successfully",student})
    }
    else{
        return res.status(404).send({message:"student not found"})
    }
  } catch (error) {
    console.error("Error retrieving student by ID:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

const getStudentsWithoutMentor = async (req, res) => {
  try {
    const studentsWithoutMentor = await studentModel.find(
      { mentor: { $exists: false } },
      { password: 0, createdAt: 0 }
    );
    return res
      .status(200)
      .json({
        message: "Students without a mentor retrieved successfully",
        students: studentsWithoutMentor,
      });
  } catch (error) {
    console.error("Error retrieving students without a mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const reassignMentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { mentor } = req.body;

    let student = await studentModel.findById(studentId);
    if (!student) {
      console.log("Student not found");
      return res.status(400).send({ message: "Student ID not found" });
    }

    const oldMentor = student.mentor[0];

    if (oldMentor) {
      const oldMentorObj = await mentorModel.findById(oldMentor);
      oldMentorObj.students = oldMentorObj.students.filter(
        (id) => id.toString() !== studentId
      );
      await oldMentorObj.save();
    }

    const newMentorObj = await mentorModel.findById(mentor);
    newMentorObj.students.push(studentId);
    await newMentorObj.save();

    student.mentor = [oldMentor, mentor];
    await student.save();

    console.log("Mentor changed successfully");
    return res.status(200).send({ message: "Mentor changed successfully" });
  } catch (error) {
    console.error("Error reassigning mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPreviousmentor = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    const mentors = student.mentor;

    if (mentors.length === 1) {
      return res.status(200).send({ message: "No mentor change has happened" });
    } else if (mentors.length >= 2) {
      const oldMentorId = mentors[0];
      const oldMentor = await mentorModel.findById(oldMentorId,{password:0,students:0,role:0,createdAt:0,_id:0});

      if (oldMentor) {
        return res
          .status(200)
          .send({ message: "Old mentor retrieved successfully", oldMentor });
      }
    }
  } catch (error) {
    console.error("Error retrieving customer by ID:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export default {
  create,
  getAllStudents,
  getStudentsWithoutMentor,
  reassignMentor,
  getPreviousmentor,
  getStudentbyId
};
