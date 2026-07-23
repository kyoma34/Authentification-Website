const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const dotenv =  require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(User => res.status(201).json(User))
    .catch(error => res.status(400).json({ error: error.message }));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Here you would typically compare the password with the hashed one
        res.status(200).json({ message: "Login successful", user });
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})