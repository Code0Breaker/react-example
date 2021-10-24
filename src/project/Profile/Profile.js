import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, setUser } from "../../redux/actions/auth.action";
import { AppBar } from "./Header";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";

export default function MyContacts() {
  const history = useHistory()
  const {currentUser} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getAuth(localStorage.token, history))
  },[])

  const logout = () =>{
    history.push('/')
    localStorage.removeItem('token')
  }
  return (
    <AppBar position="fixed">
       <Toolbar className='header_info'>
         <Typography variant="h6" noWrap component="div">
           {currentUser?.login}
         </Typography>
         <Button color={'error'} variant={'contained'} onClick={logout}>Logout</Button>
       </Toolbar>
     </AppBar> 
  );
}
