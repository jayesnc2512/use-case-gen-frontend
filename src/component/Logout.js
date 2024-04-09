import React from "react";
import { GoogleLogout } from "react-google-login";
import '../App.css';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { useHistory } from "react-router-dom";

    


const clientId='158508907241-rrlqls037sceuteutesvuuckpjaouup7.apps.googleusercontent.com'; 


export default function Logout() {
    let history = useHistory();
    const { setAccessToken } = useAuth();
    // const navigate=useNavigate();



    const onSuccess=async(res)=>{
        console.log("Logged Out",res);
        alert('Logged Out')
        await Cookies.remove('accessToken') // Delete the 'accessToken' cookie
        setAccessToken('')
        history.push("/");
    }

    return(
        <div id='signOutButton'>
        <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
        />
        </div>
    )
}