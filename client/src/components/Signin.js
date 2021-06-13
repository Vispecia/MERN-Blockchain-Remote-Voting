import React, { useContext, useState } from 'react'
import { Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import '../css/signin.css'
import { UserContext } from '../App';

function Signin() {

    const [userType,setUserType] = useState(false)
    const [adhaar,setAdhaar] = useState()
    const [password,setPassword] = useState()
    const [isSignin,setIsSignIn] = useState(true)
    const {state,dispatch} = useContext(UserContext)
    
    const history = useHistory()
    
    const handleSignup = ()=>{

        const type = userType ? "admin" : "general"

        fetch('/signup',{
            method:'post',
            body:JSON.stringify({
                userType:type,
                adhaar,
                password
            }),
            headers:{
                'Content-Type':'application/json',
            }

        }).then(res=>res.json())
        .then(res2=>{
            console.log(res2)
            if(!res2.error){
                alert('User saved')
            }
            setUserType(0)
        })
        
    }

    const handleSignin = async ()=>{
        fetch('/signin',{
            method:"post",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              adhaar,password
            })
          })
          .then(res=>res.json())
          .then(res2=>{
            console.log(res2)
            if(!res2.error)
            {
              localStorage.setItem("jwt",res2.token);
              localStorage.setItem("user",JSON.stringify(res2.user));
              console.log("saved successfully");
              dispatch({type:"USER",payload:res2.user})
              history.push('/states');
            }
      
          })
          .catch(err=>{
            console.log(err);
          });
    }


    return (
         <div className="signin">
            <div className="signin__branding">
                <LocalMallIcon style={{fontSize:'150px'}}/>
                <h1>E-voting</h1>
                <p>Cast your vote from anywhere anytime.</p>
            </div>

            {
                isSignin ? 

                <div className="signin__card">
                <TextField 
                style={{margin:'15px auto',width:'70%'}}
                variant="outlined" 
                value={adhaar}
                onChange={(e)=>setAdhaar(e.target.value)} 
                label="Adhaar Number" required/>

                <TextField 
                style={{margin:'15px auto',width:'70%'}} 
                variant="outlined" 
                value={password} 
                type="password"
                onChange={(e)=>setPassword(e.target.value)} 
                label="Password" required/>

                <Button 
                onClick={()=>handleSignin()}
                style={{margin:'15px auto',width:'70%',backgroundColor:'green',color:'white'}} 
                variant="contained">
                    Signin
                </Button>
                <p>Don't have an account? <Link to="/signin" onClick={()=>setIsSignIn(false)}>Signup here.</Link></p>
                </div>

                :

                <div className="signin__card">
                <TextField 
                style={{margin:'15px auto',width:'70%'}}
                variant="outlined" 
                value={adhaar}
                onChange={(e)=>setAdhaar(e.target.value)} 
                label="Adhaar Number" required/>

                <TextField 
                style={{margin:'15px auto',width:'70%'}} 
                variant="outlined" 
                value={password} 
                type="password"
                onChange={(e)=>setPassword(e.target.value)} 
                label="Password" required/>

                <FormControlLabel
                        style={{margin:'15px auto'}}
                        control={
                        <Checkbox
                            checked={userType}
                            onChange={(e)=>setUserType(e.target.checked)}
                            name="admin"
                            color="primary"
                        />
                        }
                        label="Admin"
                    />

                <Button 
                onClick={()=>handleSignup()}
                style={{margin:'15px auto',width:'70%',backgroundColor:'green',color:'white'}} 
                variant="contained">
                    Signup
                </Button>
                <p>Already have an account? <Link to="/signin" onClick={()=>setIsSignIn(true)}>Signin here.</Link></p>
                </div>
            }
        </div>
    )
}

export default Signin
