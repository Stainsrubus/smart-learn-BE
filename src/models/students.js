import mongoose from "./index.js";

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
};

const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
};

const studentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], validate: { validator: validateEmail, message: "Invalid email format" } },
    password: { type: String, required: [true, "Password is required"] },
    mobile: { type: String, required: [true, "Mobile Number is required"], validate: { validator: validateMobile, message: "Invalid mobile number" } },
    gender: { type: String, required: [true, "Gender is required"] }, 
    mentor: { type: Array},
    role:{type:String,default:'student'},
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'students',
    versionKey: false
});

const studentModel = mongoose.model('students', studentSchema);
export default studentModel;