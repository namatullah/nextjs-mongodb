import Employee from "../../../backend/models/employeeModel";
import connectMongo from "../../../backend/utils/connectMongo";

export default async function handler(req, res) {
    const { method } = req
    await connectMongo().catch(() => res.status(405).json({ error: "Error in the connection" }));
    console.log(req.params)
    console.log(method)
    switch (method) {
        case 'GET':
            const tests = await Employee.find({})
            res.json({ tests });
            break;
        case 'POST':
            console.log('CREATING DOCUMENT')
            const test = await Employee.create(req.body);
            console.log('CREATED DOCUMENT')
            res.json({ test });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} not allowed`);
            break;
    }
}
