import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkCred, login } from "../../redux/actions/auth.action";
import "./style.css";
import LoadingButton from '@mui/lab/LoadingButton';
export default function WelcomePage() {
  const history = useHistory();
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const dispatch = useDispatch()
  const {disabled, load} = useSelector(state=>state.auth)
  
  useEffect(()=>{
    dispatch(checkCred(credentials))
  },[credentials.login, credentials.password])

  return (
    <div className="wrapper">
      <form className="login">
        <p className="title">Log in</p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setCredentials({ ...credentials, login: e.target.value })
          }
        />
        <i className="fa fa-user" />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <LoadingButton 
        color={'primary'} 
        size={'large'} 
        loading={load} 
        disabled={disabled}
        onClick={(e) => disabled===false?dispatch(login(e,credentials,history)):null}
        variant={'contained'}>
          Log in
        </LoadingButton>
      </form>
      <p />
    </div>
  );
}
