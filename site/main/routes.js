const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(500).json({ error: "Internal Server Error" });
})

module.exports = router;