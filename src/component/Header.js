import React, { useContext,useState,useEffect } from 'react';
import logo from '../icons/beckn-logo.svg';
import { Context } from '../Store';
import Logout from './Logout';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';



export default function Header() {
    const [state, setstate] = useContext(Context);
    const { accessToken } = useAuth();

  const [isLoggedIn,setIsLoggedIn]=useState();

  useEffect(() => {
      if(!accessToken){
          setIsLoggedIn(false);
      }else{
          setIsLoggedIn(true)
      }
  }, [accessToken]);


    return (
        <div className="header">
             <img className="b-logo" src={logo} alt="Bekn Logo" />
             {isLoggedIn&& <Logout />}
             <div className='user-details'>
                 {state.userInfo.user?<div className="b-padding">Name: <b>{state.userInfo.user}</b></div>:''}
                 {state.userInfo.name_org?<div className="b-padding">Organisation Name: <b>{state.userInfo.name_org}</b></div>:''}
                 {state.userInfo.name_role_timestamp?<div>Role in the network: <b>{state.userInfo.name_role_timestamp}</b></div>:''}
             </div>
        </div>
    )
}
