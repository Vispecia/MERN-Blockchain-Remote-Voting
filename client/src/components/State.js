import {Button, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { UserContext } from '../App'
import ContestContract from '../contracts-api/ContestContract'
import '../css/state.css'

function State() {

    const {state:location}= useLocation()
    const [contests,setContests] = useState([])
    const [newContest,setNewContest] = useState()
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()


    useEffect(()=>{
        
        if(location){
            const instance = new ContestContract()
            instance.getAllContestsInState(location.detail.id).then(res=> setContests(res))
        }
        
        

    },[contests])

    const addContest = ()=>{

        if(!newContest) {
            alert('Contest name cannot be empty')
            return;
        }

        const instance = new ContestContract()
        instance.addContest(location.detail.id,newContest)
        setNewContest('')
    }

    const handleContest = (id,name)=>{
        history.push({
            pathname: '/show',
            contest: { detail: {stateId:location.detail.id,id,name} }
        })
    }

    return state ? (
        <div className="state__home">
            <div className="state__name">
                <h1>{location.detail.name}</h1>
            </div>
            {
                state && state.userType === "admin" &&
                <div className="state_addContest">
                <TextField value={newContest} onChange={(e)=>setNewContest(e.target.value)} label="Contest Name" variant="outlined" required/>
                
                <Button onClick={()=>addContest()} style={{marginTop:'20px'}}
                variant="contained" color="primary">Start New Contest</Button>    
                </div>
            }

            <div className="state__contestList">
                <div>
                    <h1>Contests running</h1>
                </div>
                <div className="state__allContests">

                    {
                        contests && contests.map(ele=>{
                            return (
                                <div onClick={()=>handleContest(ele.id,ele.name)} id={ele.id} style={{margin:'16px' ,height:'150px',width:'150px',backgroundColor:'whitesmoke'}}>{ele.name}</div>
                            )
                        })
                    }
                    {/* <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div> */}
                </div>
            </div>
            <div className="state__contestList">
                <div>
                    <h1>Previous contests</h1>
                </div>
                <div className="state__allContests">
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                    <div style={{height:'150px',width:'150px',backgroundColor:'whitesmoke'}}></div>
                </div>

            </div>
            
        </div>
    ) : 
    <div>
        <h1>You're not logged in.</h1>
        <p>Please <Link to="/signin">click here</Link> to signin/register </p>
    </div>
}

export default State
