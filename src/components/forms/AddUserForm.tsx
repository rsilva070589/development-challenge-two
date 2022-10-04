import React, { useState } from 'react'
import axios from 'axios' 
import Button from '@mui/material/Button';   
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import dayjs, { Dayjs } from 'dayjs';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const AddUserForm = props => {

	const initialFormState = { email: '', name: '', birth_date: '',address: '' }
	const [ user, setUser ] = useState(initialFormState)
 
	const [iserror, setIserror] = useState(false)
	const [errorMessages, setErrorMessages] = useState([])

	const [birth_date, setBirth_date] = React.useState<Dayjs | null>(dayjs('01/01/1900'));

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

 
function validateEmail(email:string){ 
	/*eslint-disable */
	const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
	return re.test(String(email).toLowerCase());
	}

function CreateUser() {	   
		var data = JSON.stringify({
			"email": user.email,
			"name": user.name,
			"birth_date": birth_date?.format('DD/MM/YYYY'),
			"address": user.address
		  });
		  
		  var config = {
			method: 'post',
			url: 'https://pap3ln1bx4.execute-api.us-east-1.amazonaws.com/patients/post',
			headers: {
			  'Content-Type': 'application/json'
			},
			data : data
		  };
		  
		  axios(config)
		  .then(function (response) {
			console.log(JSON.stringify(response.data));
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	const Submit = () => {  
	  let errorList = []
	  if(user.name === ''){
		errorList.push("Nome Invalido") 
		setErrorMessages(["Nome invalido"])
	  }
	  if(user.address === ''){
		errorList.push("Endereço Invalido")
		setErrorMessages(["Endereço invalido"])
	  }
	  if(birth_date.format('DD/MM/YYYY') === '01/01/1900'){
		errorList.push("Aniversario Invalido")
		setErrorMessages(["Aniversario invalido"])
	  }
	  if(user.email === '' || validateEmail(user.email) === false){
		errorList.push("Email invalido") 
		setErrorMessages(["Email invalido"])
	  }

	if(errorList.length < 1){
		setIserror(false) 
		CreateUser() 
		props.addUser({ email: user.email, name: user.name, birth_date: (birth_date.format('DD/MM/YYYY')),address: user.address })
		setUser(initialFormState) 
	  }else { 
		setErrorMessages(errorList)
        setIserror(true)  
	  } 
	}

  
	return ( 
		<React.Fragment> 
			<div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
         <Box 	 
      component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off">
          
           <h3>Novo Paciente</h3>
        <TextField
          required
          id="name"
          label="Nome" 
          variant="filled"
		  type="text" name="name" value={user.name} onChange={handleInputChange}
        />

		<TextField
          required
          id="id"
          label="email" 
          variant="filled"
		  type="text" name="email" value={user.id} onChange={handleInputChange}
        /> 

		 <LocalizationProvider dateAdapter={AdapterDayjs}> 
				<DesktopDatePicker 
				label="Aniversario"
				value={birth_date}
				minDate={dayjs('1900-01-01').format('DD/MM/YYYY')}
				onChange={(newValue) => {
					setBirth_date(newValue);
				}}
				renderInput={(params) => <TextField {...params} />}
				/>  
    	</LocalizationProvider>  

		<TextField
          required 
          label="Endereço" 
          variant="filled"
		  type="text" name="address" value={user.address} onChange={handleInputChange}
        />  
      </Box>  
     <Button color="success" onClick={Submit}>Salvar</Button>	

	 {props.setEditing && 
	 <Button onClick={() => props.setEditing(false)} >  Cancelar  </Button>
	 }
     

    </React.Fragment>
	)
}

export default AddUserForm
