const express = require('express');
const multer = require('multer');
const Memory = require('../models/memory');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const memories = await Memory.find();
        res.status(200).json(memories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { description } = req.body;
    const image = req.file.buffer.toString('base64');

    const newMemory = new Memory({ image, description });

    try {
        await newMemory.save();
        res.status(201).json(newMemory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;
