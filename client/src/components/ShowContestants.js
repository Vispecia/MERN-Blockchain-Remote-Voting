import React, { useContext, useEffect, useState } from 'react'
import {Radio, RadioGroup, FormControlLabel, Button} from '@material-ui/core'

import ContestContract from '../contracts-api/ContestContract'
import '../css/showContestant.css'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import AddContestant from './AddContestant'
import Popup from 'reactjs-popup'
import { UserContext } from '../App'

function ShowContestants() {

    const [list,setList] = useState([])
    const [vote, setVote] = useState(0);
    const {state,dispatch} = useContext(UserContext)

    // to update vote count at front-end in real-time (needed else we've to refresh the page to get the updated vote count value)
    const [change, setChange] = useState(false);

    const {contest} = useLocation()
    
    useEffect(() => {
        
        if(contest){
            const instance = new ContestContract()
            instance.getAllContestants(contest.detail.stateId,contest.detail.id).then(function(res){
                setList(res)
            })
        }
        

        // instance.getAllStates().then((res)=>{
        //     console.log('states: ',res)

        //     for(var i=0;i<res.length;i++){
        //         instance.getAllContestsInState(Number(res[i].id)).then((res2)=>{
        //             console.log('contests: ',res2)
        //         })
        //     }

        // })
    
      },[list,change])

      const castVote = async ()=>{

        if(vote === 0) {
            alert('Please select a contestant')
            return;
            
        }

        const instance = new ContestContract()
        await instance.castVote(contest.detail.stateId,contest.detail.id,vote,parseInt(state.adhaar))
        setChange(prev=>{
            return !prev
        })
      }


    return state ? (
        <div>
            <div className="showContestant">
                <RadioGroup row name="voting" value={vote} onChange={(e)=>setVote(e.target.value)}>
                {
                    list && list.map(contestant => {
                        return (
                            <FormControlLabel value={`${contestant.id}`} control={<Radio />}
                            label=
                            {
                                <div className="contestant" key={contestant.id}>
                                <div className="contestant__details">
                                    <h1>{contestant.name}</h1>
                                    <h4>This is my moto !loremjsbxasjkxakxbaxbaskjsxbaskjxjkaxvvajhxvahxbajbjaxbjsaxbsajxbsajkxbaskjxbakjxbaxbajxjbabx</h4>
                                    <h1>{`[Visible] Vote Count: ${contestant.voteCount}`}</h1>
                                </div>
                                </div>   
                            }
                            />
                            
                            
                        )
                    })
                }
                </RadioGroup>                
            </div>

            <div className="showContestant__voteButton">
                <Button variant="contained" size="large" color="primary" onClick={()=>castVote()}> Vote </Button>
            </div>

            {
                state && state.userType === "admin" && 
                <div>
                <AddContestant stateId = {contest.detail.stateId} contestId = {contest.detail.id}/>
                </div>
            }

        </div>
    ) :
    <div>
        <h1>You're not logged in.</h1>
        <p>Please <Link to="/signin">click here</Link> to signin/register </p>
    </div>
}

export default ShowContestants
