import dbConnect from '../../../lib/db'; // Adjust the path if necessary
import Customer from '../../../models/customer'; // Ensure this path points to your Customer model

export default async function handler(req, res) {
    await dbConnect(); // Connect to the database

    // Handle GET requests to retrieve all customers
    if (req.method === 'GET') {
        try {
            const customers = await Customer.find(); // Fetch all customers
            return res.status(200).json(customers); // Return the list of customers
        } catch (error) {
            return res.status(500).json({ message: error.message }); // Handle errors
        }
    }

    // Handle POST requests to create a new customer
    if (req.method === 'POST') {
        try {
            const customerData = req.body; // Get customer data from the request body
            const newCustomer = new Customer(customerData); // Create a new Customer instance
            await newCustomer.save(); // Save the customer to the database
            return res.status(201).json(newCustomer); // Return the created customer
        } catch (error) {
            return res.status(500).json({ message: error.message }); // Handle errors
        }
    }

    // Handle unsupported methods
    return res.status(405).json({ message: 'Method not allowed' });
}
