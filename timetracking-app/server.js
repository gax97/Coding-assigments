const SECRET_KEY = require('./credentials')
const jwt=require('jsonwebtoken');
const dayjs = require('dayjs')
const express = require("express")
const app = express()
const Sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate')

app.use(bodyParser.json());
app.use(express.static('public'))

//rute za implementaciju


//get total time for today
app.get('/api/todays-total', authenticate, (req,res)=>{
    
    User.findOne({where:{email:req.userEmail}}).then(result=>{
        if(result){
            id = result.dataValues.id
            
            //sqlite specific query!!!
            sequelize.query("select * from times where date(startTime) = date('now') and userId=" + id).then((results, meta)=>{
                results = results[0]
                
                let finalResult = results.reduce((sum, val)=>{
                    let date1 = dayjs(val.startTime)
                    let date2 = dayjs(val.endTime)
                    
                    let diff = date2.hour()*60 + date2.minute() - date1.hour()*60 - date1.minute()
                    
                    return sum + diff 
                }, 0)
                
                res.json({hours:Math.floor(finalResult/60), minutes:Math.floor(finalResult%60)})
            })
            
        }else res.status(404)
    })
})

app.post('/api/add-activity', authenticate, (req,res)=>{
    
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    
    User.findOne({where:{email:req.userEmail}}).then(result=>{
        if(result){
            id=result.dataValues.id
            Times.create({userId:id, startTime:startTime, endTime:endTime})   
            return res.json({success:true})  
        }else   
            res.status(404)
    })
    
})

app.post('/api/sign-up', (req, res)=>{
   let fullName = req.body.name 
   let email = req.body.email
   let password = req.body.password

   if(!fullName | !email | !password) return res.status(400)
   //check if password is let then 5 characters
   if(password.length < 5) return res.json({success:false, msg:"Password must be at least 5 characters long", type:"PASSWORD"}) 
   
   User.findOne({where: {email:email}}).then(project => {
        if(project) 
            return res.json({success:false, msg:"Seems like you already have an account", type:"EMAIL"})
        
            //hash pw
        User.create({fullName:fullName, email:email, password:password});
        res.json({success:true})
   })
})

app.post('/api/sign-in', (req, res)=>{
    
    let email = req.body.email
    let password = req.body.password
    if(!email | !password) return res.status(400)

    User.findOne({where: {email:email}}).then(result => {
        if(result){
            let user = result.dataValues

            if(user.password !== password)
                return res.json({success:false, msg:"Incorrect password", type:"PASSWORD"})
            
            //create jwt
            let token = jwt.sign({email:email}, SECRET_KEY)
            return res.json({success:true, token:token})
        }    
        return res.json({success:false, msg:"Email you have entered is incorrect. Please try again.", type:"EMAIL"})
    })
})
app.get('/api/reports', authenticate, (req, res)=>{
    
    User.findOne({where:{email:req.userEmail}}).then(userResult=>{
        if(userResult){
            var id = userResult.dataValues.id

            Times.findAll({where:{userId:id}, order:[['startTime', 'DESC']]}).then(result=>{
                
                //filter results
                result = result.map((el)=> {
                    return {
                        startTime:el.startTime,
                        endTime:el.endTime
                    }
                })
                return res.json({success:true, reports:result})
            })
        }
    })
})

app.get('*', (req, res) => res.sendFile(path.join(path.join(__dirname, 'public'), 'index.html')));

app.listen(3000,  () => console.log("Server listening on port 3000!"));

//db setup
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mydb.db'
  });

class User extends Sequelize.Model {}

User.init({
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey:true, autoIncrement:true}, 
    fullName:{type:Sequelize.STRING},
    email: {type:Sequelize.STRING},
    password: {type:Sequelize.STRING}
}, { sequelize, modelName: 'user' });

class Times extends Sequelize.Model {}

Times.init({
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey:true, autoIncrement:true},
    userId: {type: Sequelize.INTEGER, foreignKey:true},
    startTime: {type: Sequelize.DATE},
    endTime: {type:Sequelize.DATE}
}, { sequelize, modelName: 'times' })

