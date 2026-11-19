import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    tel:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        enum: ['employee', 'manager', 'admin'],
        default: 'employee'
    }
});

const Employee = mongoose.model('employee', EmployeeSchema);

export default Employee;