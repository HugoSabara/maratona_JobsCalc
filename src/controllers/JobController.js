const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");
const { Database } = require("sqlite3");

module.exports = {
    create(req, res){
      return res.render("job");
    },
    async save(req, res){

      //const jobs = await Job.get();
      //req.body ->{ name: 'TESTES', 'daily-hours': '1.50', 'total-hours': '2' }
      //const lastId = jobs[jobs.length -1]?.id || 0;
      

      await Job.create({
      //id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at:Date.now() //atribuir uma nova data

    });  
      return res.redirect("/");
    },
    async show(req, res){

      const jobs = await Job.get();  
      const jobId = req.params.id;

      const job = jobs.find(job => Number(job.id) === Number(jobId));
      if (!job){
        return res.send ("Job not found.");
      }

      job.budget = JobUtils.calculateBudget(job, await Profile.get()["value-hour"])

      return res.render("job-edit", { job });
    },
    async update (req, res){
      const jobId = req.params.id;

     // const jobs = await Job.get();

      //const job = jobs.find(job => Number(job.id) === Number(jobId));

      //if (!job){
      //  return res.send ("Job not found.");
     // }

      const updatedJob = {
       // ...job,
        name:req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      //alterar o job
     // const newJobs = jobs.map(job =>{
     //   if (Number(job.id) === Number(jobId)){
     //     job = updatedJob;
     //   }
     //   return job;
     // })

      await Job.update(updatedJob, jobId);

      res.redirect('/job/' + jobId);
    },
    async delete(req, res) {

      const jobId = req.params.id;

      await Job.delete(jobId);

      return res.redirect('/');
    }
  }