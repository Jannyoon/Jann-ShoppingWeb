import React from 'react';
import Button from '../ui/Button';
export default function Logout({onClick}) {
  return (
    <Button text={"Log Out"} onClick={onClick}/>
  );
}

