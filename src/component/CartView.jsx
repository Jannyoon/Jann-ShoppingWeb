import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import useCart from '../hooks/useCart';
import countItems from '../hooks/countItems';

export default function CartView() {
  const {getUserProducts} = useCart();
  const result = getUserProducts.data;

  let forCount = result && result.map(v => Object.values(v));
  let total = countItems(forCount); //카트에 들어있는 물품 개수를 센다

  //console.log("현재 카트 물품 갯수", total)
  return (
    <div className='relative'>
      <FaCartShopping />
      {result && (total>0 && <div className='absolute 
      -top-2 
      -left-3 
      text-2xl 
      text-white 
      bg-brand 
      rounded-full 
      w-6 h-6 
      text-center
      flex justify-center items-center'><p>{total}</p></div>)}
    </div>
  );
}

