const Sequelize = require('sequelize');
const dayjs = require('dayjs')

var sqlite3 = require('sqlite3')
var db = new sqlite3.Database("mydb.db")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mydb.db'
  });
class User extends Sequelize.Model {}
class Times extends Sequelize.Model {}

User.init({
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey:true}, //autoIncrement:true
    fullName:{type:Sequelize.STRING},
    email: {type:Sequelize.STRING},
    password: {type:Sequelize.STRING}
}, { sequelize, modelName: 'user' });
Times.init({
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey:true, autoIncrement:true}, //autoIncrement:true
    userId: {type: Sequelize.INTEGER, foreignKey:true},
    startTime: {type: Sequelize.DATE},
    endTime: {type:Sequelize.DATE}
}, { sequelize, modelName: 'times' })

User.sync().then(()=>{
    User.create({id:1,fullName:"Igor Savic", email: 'mejl@example', password:'hehehe' })
})
Times.sync().then(()=>{
    Times.create({userId:1, startTime: dayjs().subtract(3, "day"), endTime:dayjs().subtract(3, 'day').add(1, 'hour').add(5, 'minute')})
    Times.create({userId:1, startTime: dayjs().subtract(2, "day"), endTime:dayjs().subtract(2, 'day').add(2, 'hour').add(11, 'minute')})
    Times.create({userId:1, startTime: dayjs().subtract(2, "day"), endTime:dayjs().subtract(2, 'day').add(3, 'hour').add(33, 'minute')})
    Times.create({userId:1, startTime: dayjs().subtract(1, "day"), endTime:dayjs().subtract(1, 'day').add(3, 'hour').add(55, 'minute')})
    Times.create({userId:1, startTime: dayjs(), endTime:dayjs().add(47, 'minute')})
    Times.create({userId:1, startTime: dayjs(), endTime:dayjs().add(4, 'hour').add(12, 'minute')})
})
