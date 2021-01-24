const express = require('express');
const router = express.Router(); //to get the router functionality into the routes file

const custom = require('custom-module');

//job Search
//http://api.dataatwork.org/v1/jobs/autocomplete?contains=teacher
router.get('/search', async (req, res) => {
    try {
    const jobList = await custom.searchResults(req.query.keyword);
    res.json(jobList);
    } catch(err) {
        res.json({err});
    }
});

router.post('/fetchId', async(req, res) => {
    try {
        const {id} = req.body;
        console.log(id);
        const jobList = await custom.fetchSearch(id)
        return jobList.body;
    }
    catch(err) {
        res.json({err});
    }
});

//fetch
//http://api.dataatwork.org/v1/jobs/1cc06bc4a1e198c6267c347df4d8c1b5/related_jobs

module.exports = router;