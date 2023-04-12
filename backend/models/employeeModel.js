import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    photo: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
});

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default Employee;
