import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddNewUser } from '../api/firebase';
export default function SignUpPage() {
  const [newid, setnewId] = useState("");
  const [newpw, setnewPw] = useState("");
  const navigator = useNavigate();

  const handlenewIdChange = (e)=>{
    setnewId(e.target.value.trim());
  }

  const handlenewPwChange = (e)=>{
    setnewPw(e.target.value.trim());
  }

  const handleSignUpUser = (e, newid, newpw) =>{
    e.preventDefault();    
    console.log("회원등록 완료");
    setnewId('');
    setnewPw('');
    AddNewUser(newid, newpw, ()=>{
      alert("회원등록을 마쳤습니다. 홈으로 돌아갑니다.")
      navigator('/');
    });

  }



  return (
      <form className="flex flex-col gap-4 items-center border-t pt-2">
        <p>회원 가입</p>
        <input 
          type='email'
          className="border block w-5/12" 
          id="userId" 
          placeholder="email" 
          onChange={e=>handlenewIdChange(e)}
          value={newid}
          required
        />
        <input 
          className="border block w-5/12" 
          id="userPw" 
          placeholder="password" 
          onChange={e=>handlenewPwChange(e)}
          value={newpw}
          required
        />
        <button type="submit"
        onClick={(e,id,pw)=>handleSignUpUser(e,newid,newpw)}>등록</button>

      </form>
    )
}

