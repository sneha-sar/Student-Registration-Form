
const express = require('express')
const app = express()
const cors=require('cors')
const bodyParser = require('body-parser')
const dbStud = require('./Connection')

app.use(cors());
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())

const PORT = process.env.PORT||5000;

app.get('/',(req,res)=>{
    res.send("express is running")
});
 app.post('/stud/add',dbStud.createStudent)
 app.get('/stud/all',dbStud.getStudent)
 app.get('/stud/:id',dbStud.getStudentById) 
 app.put('/stud/:id',dbStud.updateStudent)
 app.delete('/stud/:id',dbStud.deleteStudent)  
  
app.listen(PORT, () =>{
  console.log(`Server is running at ${PORT}`);
});


