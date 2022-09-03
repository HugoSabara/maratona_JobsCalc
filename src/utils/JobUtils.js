module.exports = {
    remainingDays (job){
      //ajustes no jobs
      //calculo de tempo restante
    
      const remainingDays  = (job["total-hours"] / job["daily-hours"]).toFixed();
        //console.log(remainingDays);  
    
        const createdDate = new Date(job.created_at);
        const dueDay =  createdDate.getDate() + Number(remainingDays);
        //data futura de vencimento
        const dueDateInMs = createdDate.setDate(dueDay);
    
        const timeDiffInMs = dueDateInMs - Date.now();
        
        //transformar Milli em dias
        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = Math.floor(timeDiffInMs / dayInMs);
    
        //restam x dias.
        return dayDiff;
    },
    calculateBudget: ( job, valueHours) => valueHours * job["total-hours"]

}
