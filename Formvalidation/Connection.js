const Pool  = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: '12345',
    port: 5432,
  })
  
  const createStudent = (req,res)=>{
   const name=req.body.name;
   const gender=req.body.gender;
   const email=req.body.email;
   const phone=req.body.phone;
   const birth=req.body.birth;
   const address=req.body.address;

    pool.query("INSERT INTO Stud (name,gender,email,phone,birth,address) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [name,gender,email,phone,birth,address],(err,result)=>{
        if(err){
            console.log(err);
            throw(err);
        }
        res.status(200).json({
            success:"data is inserted successfully",
            data:result.rows[0],
        });
    }
);
  };

  const getStudent = (req,res)=>{
    pool.query("SELECT * FROM Stud",(err,result)=>{
        if(err){
           
            throw err;
        }
        res.json({
            data:result.rows
        })
    })
  }

  const getStudentById = (req,res)=>{
    let id = parseInt(req.params.id)
    pool.query("SELECT * FROM Stud WHERE id=$1",[id],(err,result)=>{
        if(err){
            throw err;
        }
        res.json({
            data:result.rows
        })
    })
  }

  const updateStudent = (req,res)=>{
    let id = parseInt(req.params.id)
    const{name,gender,email,phone,birth,address}=req.body
    pool.query("UPDATE Stud SET name=$1,gender=$2,email=$3,phone=$4,birth=$5,$address=$6 WHERE id=$7",[name,gender,email,phone,birth,address],(err,result)=>{
        if(err){
            throw err;
        }
        res.status(200).json({
           msg:"record is updated successfully"
        })
    })
  }
  const deleteStudent = (req,res)=>{
    let id = parseInt(req.params.id)
    
    pool.query("DELETE FROM Stud WHERE id=$1",[id],(err,result)=>{
        if(err){
            throw err;
        }
        res.json({
           msg:"record is deleted successfully"
        })
    })
}


  module.exports ={
    createStudent,getStudent,getStudentById,updateStudent,deleteStudent
  }
  