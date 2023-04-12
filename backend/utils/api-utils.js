import Employee from "../models/employeeModel";
import connectMongo from "./connectMongo";

export async function getEmployees() {
    await connectMongo();
    const employees = await Employee.find({});
    return JSON.parse(JSON.stringify(employees));
}