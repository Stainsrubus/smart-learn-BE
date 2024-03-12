import mongoose from "mongoose";

const assigningSchema =  mongoose.Schema(
  {
    mentorId: {type:String,required:true},
    studentsId:{type:Array,required:true},
},
  {
    timestamps: true
  }
);

const assigningModel = mongoose.model("assignings", assigningSchema);
export default assigningModel;
