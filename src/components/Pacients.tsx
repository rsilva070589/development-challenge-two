import React, { useState, useEffect, Fragment } from 'react'
import AddUserForm from  './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import Icon from '@mui/material/Icon';
import axios from 'axios' 
import './index.css'


interface IUsers {
	email: string,
	name: string,
	birth_date: Date,
	address: string
}
 
const Usuarios = () => { 
	const initialFormState = { email: '', name: '', birth_date: '01/01/2000',address: '' }

	const [ users, setUsers ] = useState<[IUsers]>();
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const [ newUser, setNewUser ] = useState(false)

	const AddnewUser = () => {
		if (newUser) {
			setNewUser(false)
		}else{
			setNewUser(true) 
		} 
	} 

	useEffect( ()=>  {
        axios.get (`https://pap3ln1bx4.execute-api.us-east-1.amazonaws.com/patients/posts`)   
            .then(res=>{
                const dadosusuario=res.data.data
				setUsers(dadosusuario.map(user => ( 
					{id: user.email,email: user.email, name: user.name, birth_date: user.birth_date, address: user.address}
				)))
            })          
    },[])	
	  
	// CRUD operations
	const addUser = (user:IUsers) => {
	//	user.email = user.email
	     setNewUser(false)
		setUsers([ ...users, user ])
	}

	const deleteUser = (email: string) => {
		setEditing(false)
		setUsers(users?.filter(user =>  user.email !== email))

		var config = {
			method: 'delete',
			url: `https://pap3ln1bx4.execute-api.us-east-1.amazonaws.com/patients/post/${email}`,
			headers: { }		
		  };
		  
		  axios(config)
		  .then(function (response) {
			console.log(JSON.stringify(response.data));
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}

	const updateUser = (email: string, updatedUser) => {
		setEditing(false)
		setUsers(users?.map(user => (user.email === email ? updatedUser : user)))
	}

	const editRow = (user:IUsers) => {
		setEditing(true)
		setNewUser(false)
		setCurrentUser({ email: user.email, name: user.name, address: user.address, birth_date: user.birth_date })
	}

	return (
		<React.Fragment>  
		 <Icon  
		 sx={{ fontSize: 30 }}  		 
		 onClick={AddnewUser}
		>add_circle</Icon>
			{ 
			<div className="container"> 
			<div className="flex-row">
				<div className="flex-large">
					{editing && (
						<Fragment>
							<h2>Editar Paciente</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
								
							/>
						</Fragment>
					)  }
					{newUser &&
						( <Fragment>													
							<AddUserForm addUser={addUser} />
						</Fragment> )
					}
					
				</div>
				<div className="flex-large">				
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
		}
		
		</React.Fragment>
	)
}

export default Usuarios