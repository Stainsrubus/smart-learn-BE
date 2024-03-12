import mentorModel from "../models/mentors.js";
import studentModel from "../models/students.js";

import Auth from "../common/auth.js";
const create = async (req, res) => {
  try {
    const { email, password, name, mobile, gender, students } = req.body;

    let mentor = await mentorModel.findOne({ email });

    if (!mentor) {
      const hashedPassword = await Auth.hashPassword(password);
      await mentorModel.create({
        email,
        password: hashedPassword,
        name,
        mobile,
        gender,
        students,
      });

      return res.status(201).send({ message: "mentor created successfully" });
    } else {
      return res
        .status(400)
        .send({ message: `mentor with email ${email} already exists` });
    }
  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorModel.find(
      {},
      { password: 0, status: 0, createdAt: 0 }
    );
    return res
      .status(200)
      .send({ message: "Mentors retrieved successfully", mentors });
  } catch (error) {
    console.error("Error retrieving mentors:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const getStudentsForMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const studentsForMentor = await studentModel.find({ mentor: mentorId });
    return res
      .status(200)
      .json({
        message: "Students for the mentor retrieved successfully",
        students: studentsForMentor,
      });
  } catch (error) {
    console.error("Error retrieving students for the mentor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default { create, getAllMentors, getStudentsForMentor };
