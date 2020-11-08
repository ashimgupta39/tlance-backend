const {db, sequelize} = require('./connections')
const {Teacher, University, Country, State, gender, Skill, Course} = require('./newmodels')

gender.bulkCreate([
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Others'}
],{
    ignoreDuplicates: false
}).then(()=> console.log("genders added successfully"))
  .catch((e)=>console.log(e))

Skill.bulkCreate([
    {name: 'Engineering'},
    {name: 'Medical'},
    {name: 'Business & Management'},
    {name: 'Humanities'}, 
    {name: 'Law'}, 
    {name: 'MBA'} 
],{
    ignoreDuplicates: false
}).then(()=> console.log("Skills added successfully"))
  .catch((e)=>console.log(e))

Course.bulkCreate([
    {name: 'Engineering'},
    {name: 'Medical'},
    {name: 'Business & Management'},
    {name: 'Humanities'}, 
    {name: 'Law'}, 
    {name: 'MBA'} 
],{
    ignoreDuplicates: false
}).then(()=> console.log("Courses added successfully"))
  .catch((e)=>console.log(e))

Country.bulkCreate([
    {name: 'Argentina'},
    {name: 'Austria'},
    {name:'Belgium'},
    {name:'Brazil'},
    {name:'Bulgaria'},
    {name:'Canada'},
    {name:'Chile'},
    {name:'Croatia'},
    {name:'CzechRepublic'},
    {name:'Denmark'},
    {name:'Egypt'},
    {name:'Finland'},
    {name:'France'},
    {name:'Germany'},
    {name:'Greece'},
    {name:'HongKong'},
    {name:'Hungary'},
    {name:'India'},
    {name:'Indonesia'},
    {name: 'Iraq'},
    {name: 'Ireland'},
    {name: 'Israel'},  
    {name: 'Italy'},
    {name: 'Japan'},
    {name: 'Kuwait'},
    {name: 'Malaysia'},
    {name: 'Mexico'},
    {name: 'Morocco'},
    {name: 'Australia'},
    {name: 'Netherlands'},
    {name: 'NewZealand'},
    {name: 'Norway'},
    {name: 'Pakistan'},
    {name: 'Peru'},
    {name: 'Philippines'},
    {name: 'Poland'},
    {name: 'Portugal'},
    {name: 'Qatar'},
    {name: 'Romania'},
    {name: 'Russia'},
    {name: 'SaudiArabia'},
    {name: 'Serbia'},
    {name: 'Singapore'},
    {name: 'Slovakia'},
    {name: 'SouthAfrica'},
    {name: 'Spain'},
    {name: 'Sweden'},
    {name: 'Switzerland'},
    {name: 'Taiwan'},
    {name: 'Thailand'},
    {name: 'Turkey'},
    {name: 'Ukraine'},
    {name: 'UnitedArabEmirates'},
    {name: 'UnitedKingdom'},
    {name: 'UnitedStates'},
    {name: 'Venezuela'},
    {name: 'Vietnam'},
    {name: 'Colombia'}
],{
    ignoreDuplicates: false
}).then(()=> console.log("countries added successfully"))
  .catch((e)=>console.log(e))

  db.sync({ alter: true })
  .then (() => console.log("database seeded"))
  .catch( (err) => console.log(err))
