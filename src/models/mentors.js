import mongoose from "./index.js";

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
};

const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
};

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], validate: { validator: validateEmail, message: "Invalid email format" } },
    password: { type: String, required: [true, "Password is required"] },
    mobile: { type: String, required: [true, "Mobile Number is required"], validate: { validator: validateMobile, message: "Invalid mobile number" } },
    gender: { type: String, required: [true, "Gender is required"] }, 
    students:[],
    role:{type:String,default:'mentor'},
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'mentors',
    versionKey: false
});

const mentorModel = mongoose.model('mentors', mentorSchema);
export default mentorModel;