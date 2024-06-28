import React from 'react';
import Button from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/login");
  }
  
  return (
      <Button onClick={handleClick} text={"Log In"}/>
  );
}

