import React, { useState, useEffect } from 'react';
import Button from '../ui/Button.jsx'
import { AddNewUser, EmailLogin, GoogleLogin, SignInEmail } from '../api/firebase.jsx';
import SignUpPage from './SignUpPage.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [logable, setLogable] = useState(true);
  const navigator = useNavigate();

  const handleIdChange = (e)=>{
    setId(e.target.value);
  }

  const handlePwChange = (e)=>{
    setPw(e.target.value);
  }


  const handleSignIn = (e)=>{
    e.preventDefault();
    console.log("회원등록할 예정");
    setLogable(false);
    setId("");
    setPw("");
  }

  const handleLoginSubmit = (e, email, password)=>{    
    e.preventDefault();
    EmailLogin({email:`${id}`, password:`${pw}`}, ()=>navigator('/', {replace:true}));
    //console.log("로그인 시도했음");
    setId("");
    setPw("");
  }

  const handleGoogleLogin = (e)=>{
    e.preventDefault();
    GoogleLogin(()=>navigator('/', {replace:true}));
  }
 
  return (
    <div className="w-6/12 border-double border-4 rounded-lg p-10 flex flex-col gap-2">
      <form className="flex flex-col gap-4 items-center mb-2">
        <input 
          type='email'
          className="border block w-5/12" 
          id="userId" 
          placeholder="email" 
          onChange={e=>handleIdChange(e)}
          value={id}
          disabled = {!logable}
        />
        <input 
          className="border block w-5/12" 
          id="userPw" 
          placeholder="password" 
          onChange={e=>handlePwChange(e)}
          value={pw}
          disabled = {!logable}
        />
        <div className="w-5/12 flex justify-between">
          <button onClick={(e, id, pw)=>handleLoginSubmit(e, id, pw)} >로그인</button>
          <button onClick={handleSignIn}>회원가입</button>
        </div>      
        <button className="bg-brand" onClick={handleGoogleLogin}>Google로 로그인</button>
      </form>
      {!logable &&<SignUpPage/>}

    </div>
  );
}

