import React from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useCart from '../hooks/useCart';

export default function CartItem({item: {count, id, imageUrl, price, productDetail, productName, selected}}) {
  const product = {count, id, imageUrl, price, productDetail, productName, selected};
  const {updateProducts, deleteProducts} = useCart();
  const handlePlus = ()=> updateProducts.mutate({...product, count:product.count+1});
  const handleMinus = ()=>{
    if (count<2) return;
    updateProducts.mutate({...product, count:product.count-1});
  }
  const handleDelete = ()=>deleteProducts.mutate(product);
  
  
  return (
    <li className='w-full border flex justify-between m-1.5 rounded-lg'>
      <div className='flex gap-3 md:basis-7/12 p-2'>
        <img src={imageUrl} className='w-28 h-28 md:w-32 md:h-32 rounded-lg mr-3'/>
        <div className='flex flex-col justify-center border-r my-4 mr-2 basis-5/12'>
          <p className='md:text-xl font-semibold'>{productName}</p>
          <p className='text-xs text-gray-500'>옵션 : {selected}</p>
        </div>
        <div className='flex flex-col justify-center basis-3/12'>
          <p className='font-semibold mb-2'>{count*price}₩</p>
          <p className='text-xs text-brand'>1개 : {price}₩</p>
        </div>
      </div>
      <div className='flex items-center px-2 md:px-6 bg-brand rounded-r-md text-white'>
        <FaCirclePlus className='text-lg hover:scale-110 hover:cursor-pointer hover:text-slate-700'
          onClick={handlePlus}/>
        <p className='mx-1 text-lg'>{count}</p>
        <FaCircleMinus className='text-lg hover:scale-110 hover:cursor-pointer hover:text-slate-700'
          onClick={handleMinus}/>
        <RiDeleteBin6Fill className='text-xl text-slate-700 ml-2 hover:scale-110 hover:cursor-pointer hover:text-white'
          onClick={handleDelete}/>
      </div>
    </li>
  );
}

