 
const Profile = require("../model/Profile");

 module.exports = {
      async index(req, res){
        return res.render("profile", {profile: await Profile.get()});
      },
      async update(req, res){
        //req.bofy para pegar os dados
        const data = req.body; 
        //definir quantas semanas tem num ano: 52
        const weeksPerYear = 52;
        //remover as semanas de ferias do ano para pegar quantas semanas tem no mês.
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        //quantas horas por semana estou trabalhando.
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        //total de horas trabalhadas no mês.
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        //qual será o valor da hora;
       const valueHour = data["monthly-budget"] / monthlyTotalHours;
       
       await Profile.update({
        ...await Profile.get(),
         ...req.body,
         "value-hour": valueHour
       })
      
       return res.redirect('/profile');
      }
    }