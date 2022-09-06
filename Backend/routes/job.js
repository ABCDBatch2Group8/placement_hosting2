const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Student = require('../models/student');

getJob = [{
  jobid: '',
  position: '',
  jd_text: '',
  number: '',
  YearOfPassout: ''
}]

// Job posting by the employer
router.post('/jobpost', (req, res) => {

  Job.findOne({ "jobid": req.body.job.jobid }).then(function (getJobid) {
    if (getJobid == null) {
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
          res.json({ "message": "Successfully registered", "status": "success" });
          console.log("success")
        })
        .catch(err => {
          res.json({ "message": err, "status": "error" });
          console.log("error", err)
        })
    }
    else {
      console.log("Job Id exists")
      res.json({ "message": "JobId already exists. Please update the job" })
    }
  })
});

// Get the list of jobs posted in job collection
router.get('/joblist', async (req, res) => {
  console.log("in job route get");

  try {
    getJob = await Job.find({}, { "jobid": 1, "position": 1, "jd_text": 1, "number": 1 })
    res.send(getJob);
    console.log("getJob" + getJob);
  } catch (err) {
    console.log("In error /job get");
    console.log("error is", err)
    res.json({ message: err })
  }
})

router.get('/jobview/:id', async (req, res) => {
  console.log("in book route");
  console.log(req.params);
  try {
    const id = req.params.id;
    const getvJob = await Job.findById({ "_id": id });
    res.json(getvJob);
    console.log("getEmp" + getvJob);
  } catch (err) {
    console.log("In error /profile");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// studDetails1 = [{
//   qualification: '',
//   stream: '',
//   employmentStatus: '',
//   careerBreak: '',
//   YearOfPassout: null
// }]


//If shortlisting is based on year of pass out alone
// Tested query
router.get('/sl/year', async (req, res) => {
  console.log("in shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    // res.json(getJob);
    console.log("getApp" + getApp);
    studDetails = []
    try {
      console.log("student ref", getApp.applicants[0].stud_ref);
      for (let i = 0; i < getApp.applicants.length; i++) {
        // sid = getApp.applicants[i].stud_ref
        console.log("student ref", i, getApp.applicants[i].stud_ref);
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1 })
        console.log("get pasout is ", getStud.YearOfPassout)
        if (getStud.YearOfPassout >= passout) {
          studDetails.push(getStud);
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// studDetails2 = [{
//   qualification: '',
//   stream: '',
//   employmentStatus: '',
//   careerBreak: '',
//   ICTAKscor: null,
//   courseInICTAK: ''
// }]
// If shortlisting is based on skills provided in the job description
// Tested query
router.get('/sl/skill', async (req, res) => {
  console.log("in skill shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {

        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref },
          { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "skills": 1, "courseInICTAK": 1 })
        // var count = 0;
        loop2:
        for (let j = 0; j < getJob.skills.length; j++) {
          loop3:
          for (let k = 0; k < getStud.skills.length; k++) {
            console.log("i=", i)
            console.log("jobskill", j, getJob.skills[j].item_text)
            console.log("studskill", k, getStud.skills[k].item_text)
            if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
              studDetails.push(getStud);
              console.log("matched")
              // If atleast one skill is matched, shortlist that applicant
              break loop2;
            }
          }
        }
      }
      res.json(studDetails)
      console.log("studDetails", studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

// If shortlisting is based on course in ICTAK
// Tested query
router.get('/sl/course', async (req, res) => {
  console.log("in course shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const course = req.query.course;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    console.log("getApp" + getApp);
    studDetails = []
    try {
      for (let i = 0; i < getApp.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref },
          { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        if (getStud.courseInICTAK == course) {
          if (getStud.ICTAKscore >= 40) {
            studDetails.push(getStud);
          }
        }
      }
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});


//If shortlisting is based on year of pass out and course in ICTAK
// Tested query
router.get('/sl/cy', async (req, res) => {
  console.log("in cy shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const course = req.query.course;
    const getApp = await Job.findById({ "_id": id }, { "applicants": 1 });
    console.log("getApp" + getApp);
    studDetails = []
    try {
      console.log("student ref", getApp.applicants[0].stud_ref);
      for (let i = 0; i < getApp.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getApp.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1, "ICTAKscore": 1, "courseInICTAK": 1 })
        if ((getStud.YearOfPassout >= passout) & (getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)) {
          studDetails.push(getStud);
          //   }
          // }
        }
      }

      console.log("studDetails", studDetails)
      res.json(studDetails4)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on year of pass out and matching skills
// Tested query
router.get('/sl/ys', async (req, res) => {
  console.log("in ys shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1, "skills": 1 });
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1,"skills": 1 , "ICTAKscore": 1, "courseInICTAK": 1 })
        loop2:
        if ((getStud.YearOfPassout >= passout)) {
          console.log("hi",getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }

      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on course in ICTAK and matching skills
// Tested query
router.get('/sl/sc', async (req, res) => {
  console.log("in sc shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const skill = req.query.skill;
    const course = req.query.course;
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1 ,"skills":1});
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1,"skills": 1 , "ICTAKscore": 1, "courseInICTAK": 1 })
        loop2:
        if ((getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)){
          console.log("hi",getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

//If shortlisting is based on year of passout, course in ICTAK and matching skills
// Tested query
router.get('/sl/ysc', async (req, res) => {
  console.log("in ysc shortlist");
  console.log(req.query);
  try {
    const id = req.query.jobId;
    const passout = req.query.yop;
    const course = req.query.course;
    console.log("passout,course",passout,course)
    const getJob = await Job.findById({ "_id": id }, { "applicants": 1 ,"skills":1});
    console.log("getJob" + getJob);
    studDetails = []
    try {
      console.log("length", getJob.applicants.length);
      loop1:
      for (let i = 0; i < getJob.applicants.length; i++) {
        const getStud = await Student.findById({ "_id": getJob.applicants[i].stud_ref }, { "qualification": 1, "stream": 1, "employmentStatus": 1, "careerBreak": 1, "YearOfPassout": 1,"skills": 1 , "ICTAKscore": 1, "courseInICTAK": 1 })
        console.log("loop1:")
        loop2:
        console.log("psout",getStud.YearOfPassout)
        console.log("courseICTAK",getStud.courseInICTAK)
        console.log("score",getStud.ICTAKscore)

        if ((getStud.YearOfPassout >= passout) & (getStud.courseInICTAK == course) & (getStud.ICTAKscore >= 40)){
          console.log("hi",getJob.skills.length);
          loop3:
          for (let j = 0; j < getJob.skills.length; j++) {
            loop4:
            for (let k = 0; k < getStud.skills.length; k++) {
              console.log("i=", i)
              console.log("jobskill", j, getJob.skills[j].item_text)
              console.log("studskill", k, getStud.skills[k].item_text)
              if ((getJob.skills[j].item_text.toUpperCase()) === (getStud.skills[k].item_text.toUpperCase())) {
                studDetails.push(getStud);
                console.log("matched")
                // If atleast one skill is matched, shortlist that applicant
                break loop3;
              }
            }
          }
        }
      }
      console.log("studDetails", studDetails)
      res.json(studDetails)
    } catch (err) {
      console.log("In error /shortlist");
      console.log("error is", err)
      res.json({ message: err })
    }
  } catch (err) {
    console.log("In error /shortlist");
    console.log("error is", err)
    res.json({ message: err })
  }
});

module.exports = router;