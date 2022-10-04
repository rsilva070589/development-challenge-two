import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import dayjs, { Dayjs } from 'dayjs';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
	const [iserror, setIserror] = useState(false)
	const [errorMessages, setErrorMessages] = useState([]) 
  const [birth_date, setBirth_date] = React.useState<Dayjs | null>(dayjs(dayjs('01/01/1900')));
  


  useEffect(
    () => {
      setUser(props.currentUser)
      setBirth_date(props.currentUser.birth_date)
    },
    [ props ]
  )
 

  const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	} 

    function UpdateUser() {
      var data = JSON.stringify({       
        "name": user.name,        
        "birth_date": user.birth_date,
        "address": user.address
        }); 

        var config = {
        method: 'put',
        url: `https://pap3ln1bx4.execute-api.us-east-1.amazonaws.com/patients/post/${user.email}`,
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

      const SubmitUpdate = () => {		         
        let errorList = []
        if(user.name === ''){
        errorList.push("Nome Invalido") 
        setErrorMessages(["Nome invalido"])
        }
        if(user.address === ''){
        errorList.push("Endereço Invalido")
        setErrorMessages(["Endereço invalido"])
        }
        if(user.birth_date === ''){
        errorList.push("Aniversario Invalido")
        setErrorMessages(["Aniversario invalido"])
        } 
      if(errorList.length < 1){
        setIserror(false)  
        UpdateUser()  
        props.updateUser(user.email, user) 
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
          
           
        <TextField
          required
          id="name"
          label="Nome" 
          variant="filled"
		      type="text" name="name" value={user.name} onChange={handleInputChange}
        />
 
       
      <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <DesktopDatePicker 
            label="Aniversario"
            value={birth_date}
            minDate={dayjs('1900-01-01').format('MM/DD/YYYY')}
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
 
      <Button color="success" onClick={SubmitUpdate}>Salvar</Button>	
      <Button color="error" onClick={() => props.setEditing(false)} >  Cancelar  </Button>

    </React.Fragment>
      
  )
}

export default EditUserForm
