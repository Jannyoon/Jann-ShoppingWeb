import React from 'react';
import { FaPlus} from "react-icons/fa";
import { FaEquals } from "react-icons/fa";

export default function Price({price=0}) {
  const SHIPMENT = 3000;

  
  return (
    <div className='flex m-10 items-center'>
      <div className='w-28 border-none rounded-lg text-center bg-brand text-white p-4'>
        <p className='text-sm'>전체</p>
        <p className='font-semibold'>{price} ₩</p>
      </div>
      <FaPlus className='text-3xl mx-6'/>
      <div className='w-28 border-none rounded-lg text-center bg-brand text-white p-4'>
        <p className='text-sm '>배송비</p>
        <p className='font-semibold'>{SHIPMENT} ₩</p>
      </div>
      <FaEquals className='text-3xl mx-6'/>
      <div className='w-28 border-none rounded-lg text-center bg-brand text-white p-4'>
        <p className='text-sm '>총액</p>
        <p className='font-semibold'>{price+3000} ₩</p>
        </div>
    </div>
  );
}

