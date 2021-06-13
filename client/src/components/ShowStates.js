import React, { useState, useEffect, useContext } from 'react'
import {Grid, FormControl, Select, InputLabel, Button} from '@material-ui/core'
import '../css/showState.css'
import { useHistory } from 'react-router'
import {Link} from 'react-router-dom'
import ContestContract from '../contracts-api/ContestContract'
import { UserContext } from '../App'

function ShowStates() {

    const statesList = [
        {
            id:1,
            name:'Andhra Pradesh',
            image: require('../images/andhra.png')
        },
        {
            id:2,
        name:'Andaman and Nicobar',
        image: require('../images/andaman.png')
        },
        {
            id:3,
            name:'Arunanchal Pradesh',
            image: require('../images/arunanchal.png')
        },
        {
            id:4,
            name:'Assam',
            image: require('../images/assam.png')
        },
        {
            id:5,
            name:'Bihar',
            image: require('../images/bihar.png')
        },
        {
            id:6,
            name:'Chandigarh',
            image: require('../images/chandigarh.png')
        },
        {
            id:7,
            name:'Dadra and Nagar Haveli and Daman and Diu',
            image: require('../images/Dadra.png')
        },
        {
            id:8,
            name:'Delhi',
            image: require('../images/delhi.png')
        },
        {
            id:9,
            name:'Goa',
            image: require('../images/goa.png')
        },
        {
            id:10,
            name:'Gujarat',
            image: require('../images/gujarat.png')
        },
        {
            id:11,
            name:'Haryana',
            image: require('../images/haryana.png')
        },
        {
            id:12,
            name:'Himachal',
            image: require('../images/himachal.png')
        },
        {
            id:13,
            name:'Jammu and Kashmir',
            image: require('../images/jammu.png')
        },
        {
            id:14,
            name:'Jharkhand',
            image: require('../images/jharkhand.jpg')
        },
        {
            id:15,
            name:'Karnataka',
            image: require('../images/karnataka.png')
        },
        {
            id:16,
            name:'Kerela',
            image: require('../images/kerela.png')
        },
        {
            id:17,
            name:'Ladhakh',
            image: require('../images/ladhakh.png')
        },
        {
            id:18,
            name:'Lakshadweep',
            image: require('../images/lakshadweep.png')
        },
        {
            id:19,
            name:'Madhya Pradesh',
            image: require('../images/madhya.png')
        },
        {
            id:20,
            name:'Maharashtra',
            image: require('../images/maharashtra.png')
        },
        {
            id:21,
            name:'Manipur',
            image: require('../images/manipur.png')
        },
        {
            id:22,
            name:'Meghalaya',
            image: require('../images/meghalaya.png')
        },
        {
            id:23,
            name:'Mizoram',
            image: require('../images/mizoram.png')
        },
        {
            id:24,
            name:'Nagaland',
            image: require('../images/nagaland.png')
        },
        {
            id:25,
            name:'Odhisha',
            image: require('../images/odhisha.png')
        },
        {
            id:26,
            name:'Puducherry',
            image: require('../images/puducherry.png')
        },
        {
            id:27,
            name:'Punjab',
            image: require('../images/punjab.png')
        },
        {
            id:28,
            name:'Rajasthan',
            image: require('../images/rajasthan.png')
        },
        {
            id:29,
            name:'Sikkim',
            image: require('../images/sikkim.png')
        },
        {
            id:30,
            name:'Tamil Nadu',
            image: require('../images/tamil.png')
        },
        {
            id:31,
            name:'Telangana',
            image: require('../images/telangana.png')
        },
        {
            id:32,
            name:'Tripura',
            image: require('../images/tripura.png')
        },
        {
            id:33,
            name:'Uttar Pradesh',
            image: require('../images/up.png')
        },
        {
            id:34,
            name:'Uttarakhand',
            image: require('../images/uttarakhand.png')
        },
        {
            id:35,
            name:'West Bengal',
            image: require('../images/westbengal.png')
        }
    ]

    const history = useHistory()

    const [addState,setAddState] = useState()
    const [states,setStates] = useState([])

    const {state,dispatch} = useContext(UserContext)

    const handleState = (id,name)=>{

        history.push({
            pathname: '/state',
            state: { detail: {id,name} }
        })
    }

    const handleAddState = ()=>{
        const instance = new ContestContract()
        console.log(addState)
        instance.addState(addState)
    }

    useEffect(() => {

        const instance = new ContestContract()
        //   instance.getAllContestants().then(function(res){
        //       console.log(res)
        //   setList(res)
        // })

        instance.getAllStates().then((res)=>{
            setStates(res)
        })
    
      },[states])

    return state ? (
        <div style={{margin:'20px'}}>
            
                <Grid item xs={12}>
                <Grid container justify="space-evenly" spacing='6'>
                  {
                   states && states.map((ele) => (
                    <Grid key={ele.id} item>
                        <div className="state" onClick={()=>handleState(ele.id,ele.name)}>
                            <div className="state__image">
                                <img src={ele.image}/>                          
                            </div>
                            <p className="state__name">{ele.name}</p>
                        </div>
                      
                    </Grid>
                    ))
                  }
                </Grid>
              </Grid>

              {/*ADD NEW STATE*/}

              {
                  state && state.userType === "admin" &&
                  <div className="state__add">
                   <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple">Select State</InputLabel>
                        <Select
                        native
                        value={addState}
                        onChange={(e)=>setAddState(e.target.value)}
                        label="Select State"
                        >
                            <option value="" disabled> Select from available states </option>
                        {
                               statesList.map(st=>{
                                return (
                                    states && states.find(ele => ele.name === st.name) ? null  : <option value={st.name}>{st.name}</option>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                    <Button onClick={()=>handleAddState()}
                     style={{marginLeft:'10px',marginTop:'5px'}} variant="contained" color="primary" size="large">Add State</Button>
              </div>
              }
            
             
            
        </div>
    ) :
    <div>
        <h1>You're not logged in.</h1>
        <p>Please <Link to="/signin">click here</Link> to signin/register </p>
    </div>
}

export default ShowStates
