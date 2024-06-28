import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from "react-icons/fa";
import { HiDocumentAdd } from "react-icons/hi";
import Login from '../component/Login';
import Logout from '../component/Logout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/userContext';
import CartView from '../component/CartView.jsx';


export default function Navbar() {
  const [nowuser, setNowUser] = useState(); //렌더링을 일으키기 위함
  const {user, LogOut} = useAuthContext();


  useEffect((user)=>{
    setNowUser(user);
  }, [])


  return (
    <section className='flex justify-between p-2 border-b'>
      <Link to="/" className='flex items-center text-3xl md:text-4xl text-brand'>
        <FaShoppingBag className='pr-2'/>
        <p>ShoppingWeb</p>
      </Link>
      <div className='flex items-center gap-4 pr-2 text-sm md:text-lg' >
        <Link to="products" className='cursor-pointer hover:text-brand'>Products</Link>
        {user && <Link to="carts" className='cursor-pointer hover:text-brand text-2xl md:text-3xl'><CartView/></Link>}
        {user && user.isAdmin && <Link to="products/new" className='cursor-pointer hover:text-brand text-2xl md:text-3xl'><HiDocumentAdd/></Link>}
        {user && <Logout onClick={LogOut}/>}
        {!user && <Login />}
      </div>
    </section>
  );
}

