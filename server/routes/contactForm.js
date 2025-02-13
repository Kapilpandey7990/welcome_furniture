const express = require('express');
const router = express.Router();
const Baburao = require('../models/Contact'); // Import model

router.post('/submit', async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging

        const { Name, ContactNumber, Email, Message } = req.body;

        const newEntry = new Baburao({
            name: Name,
            contactNumber: ContactNumber,
            email: Email,
            message: Message
        });

        await newEntry.save();
        res.status(201).json({ message: "Form submitted successfully!" });

    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ error: "Error saving data" });
    }
});

module.exports = router;
