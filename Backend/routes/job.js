const express = require ('express');
const router = express.Router();
const Job = require('../models/job');

// Job posting by the employer
router.post('/jobpost',(req,res)=>{
    
    const job = new Job({
      jobid: req.body.Job.jobid,
      position: req.body.Job.position,
      emp_ref: req.body.Job.emp_ref,
      company: req.body.Job.company,
      jd_text: req.body.Job.jd_text,
      number: req.body.Job.number,
      salary: req.body.Job.salary,
      skills: req.body.Job.skills,
      location: req.body.Job.location,
      start_date: req.body.Job.start_date,
      end_date: req.body.Job.end_date
    })
    job.save()
    .then(data => {
        res.json({"message":"Successfully registered", "status":"success"});
        console.log("success")
    })
    .catch(err => {
        res.json({"message":err,"status":"error"});
        console.log("error",err)
    })   
  });

  module.exports = router;