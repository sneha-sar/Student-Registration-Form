import React,{useState} from 'react'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import  TextField  from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

function Student(){

  
    
  const[formData,setFormData]=useState({
        name :'',
        gender:'',
        email : '',
        phone : '',
        birth : '',
        address:'',
        
    });
    const[message,setMessage]=useState();
    function handleChange(e){
        const { name, value } = e.target;
        setFormData({...formData,[name]:value});
    }
    
     const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue={name:formData.name,gender:formData.gender,email:formData.email,phone:formData.phone,birth:formData.birth,address:formData.address};
        //console.log(allInputvalue);

        let res = await fetch("http://localhost:5000/stud/add",{
            method :"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(allInputvalue)
        });
        let resjson=await res.json();
        if(res.status===200){
            setMessage(resjson.success);
        }
     }
    return(
    
           <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
      Student Registration Form <hr color='red' />
      </Typography>
            <br></br>
            <p style={{color:'blue'}}>{message}</p>
            <form onSubmit={handleSubmit}>

            <Grid container spacing={2}>
          <Grid item xs={12}>
          
            <TextField
              variant='outlined'
              fullWidth
              label="Enter Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
             
              />
             
            </Grid>

            <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              label="Enter Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
            </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              label="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              type="tel"
              label="Enter PhoneNo"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              label="Enter BirthDate"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              required
            />
           </Grid>

           <Grid item xs={12}>
            <TextField
              variant='outlined'
              fullWidth
              label="Enter Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            </Grid>

           <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              
             >
              Register
            </Button>
            </Grid>
            
          </Grid>
         
         
</form>
    </Container>   
    );
}


export default Student;
