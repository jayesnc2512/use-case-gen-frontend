import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../Store'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import InfoBox from '../component/InfoBox';
import Checkbox from '@material-ui/core/Checkbox';
import { GoogleLogin } from 'react-google-login';
import {gapi}from 'gapi-script';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';




const clientId='158508907241-rrlqls037sceuteutesvuuckpjaouup7.apps.googleusercontent.com'; 

export default function Oauth(props) {
    let history = useHistory();
    const [state, setstate] = useContext(Context);
    const [error, seterror] = useState(false)
    const [errorMsg, seterrorMsg] = useState('');
    const {authCheck}=props;
    const [profile,setProfile]=useState({});
    const { setAccessToken } = useAuth();

    
    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId:clientId,
                scope:""
            })
        }
        gapi.load('client:auth2',start);
    }, []);
    



    const handleChange = (event) => {
        console.log(event.target.name);
        setstate({ ...state, userInfo: { ...state.userInfo, [event.target.name]: event.target.value } });
    };




  

    const onSuccess=async(res)=>{
        console.log("login successful",res.profileObj);
        var accessToken=await gapi.auth.getToken().access_token;
        setProfile(res.profileObj);
        await Cookies.set('profileObj', res.tokenObj); // Expires in 1 hour
        authCheck(res.profileObj);
        setAccessToken(res.tokenObj.access_token);
    }

    const onFailure=async(res)=>{
        console.log("error",res);   
    }

    const checkboxClick = (e) => {
        setstate({...state,userInfo:{...state.userInfo,agree:e.target.checked}})
    }

    return (
        <>
                <h2 className='card-head'>Please Login</h2>
                <div className='googleSignIn'>
                <GoogleLogin
                clientId={clientId}
                ButtonText="Continue With Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                />
                </div>
                {/* <Button className="home-btn" variant="outlined" onClick={onButtonClick} >
                    proceed
                </Button> */}
                {error ? <div className="error-text">{errorMsg}</div> : ''}
        </>
    )
}






