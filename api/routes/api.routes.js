const express = require('express');
const store = require('../utils/store')

const router = express.Router();

router.get('/search/:term', async (req, res) => {
    const results = store.search(req.params.term);

    if (!results) {
        return res.status(404).end();
    }

    return res.status(200).send(results);
});

module.exports = router;