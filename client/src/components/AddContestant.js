import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import ContestContract from '../contracts-api/ContestContract'
import '../css/addContestant.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
 

function AddContestant({stateId,contestId}) {

    const [name,setName] = useState()
    
    const {state,dispatch} = useContext(UserContext)

    const add = ()=>{
        const instance = new ContestContract()
        instance.addContestant(stateId,contestId,name) 
        setName('') 
      }

    return state ? (

        <Popup modal trigger={<Button variant="outlined" color="primary" style={{marginLeft:'43vw',marginTop:'20px'}}> Add New Contestant</Button>} position="right center">
            <div className="addContestant">
                <div>
                    <h1>Add Contestant</h1>
                </div>

                <div className="addContestant__form">
                    <TextField value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                    <Button variant="contained" color="primary" onClick={()=>add()}> Add </Button>
                </div>

            </div>
        </Popup>
        
    ) : 
    
    <div>
        <h1>You're not logged in.</h1>
        <p>Please <Link to="/signin">click here</Link> to signin/register </p>
    </div>
    
    
}

export default AddContestant
