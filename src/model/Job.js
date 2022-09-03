const Database = require("../db/config");

module.exports = {

    async get(){
       //abrir conexão 
      const db = await Database();

      const jobs = await db.all(`SELECT * FROM JOBS`)

      //fechar conexão        
      await db.close();

      return jobs.map( job => ({
          id: job.id,
          name: job.name,
          "daily-hours": job.daily_hours,
          "total-hours": job.total_hours,
          created_at: job.created_at
       }))
    },
    async update (updatedJob, jobId){
      const db = await Database();

      await db.run(`UPDATE JOBS SET
      name = "${updatedJob.name}",
      daily_hours = ${updatedJob["daily-hours"]},
      total_hours = ${updatedJob["total-hours"]}
      WHERE id = ${jobId}`)

      await  db.close();

    },
    async delete(id){
      //filter utilizado para filtrar  
      //data = data.filter(job => Number(job.id) !== Number(Id));

      const db = await Database();

      await db.run(`DELETE FROM JOBS WHERE id = ${id}`);

      await db.close();

    },
    async create(newJob){

      const db = await Database();

      await db.run(`INSERT INTO JOBS (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "${newJob.name}",
         ${newJob["daily-hours"]},
         ${newJob["total-hours"]},
         ${newJob.created_at}
      )`);

      await db.close();

    }
}