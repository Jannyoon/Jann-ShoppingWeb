import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product:{id, imageUrl, price, productDetail, productName, sizeOrColor}
})
{
  
  const navigator = useNavigate();
  const handleClick = ()=>{
    navigator(`/products/${id}`, {
      state : {
        product : {id, imageUrl, price, productDetail, productName, sizeOrColor}
      }
    })
  }


  return (
    <div className='border rounded-md p-2 w-56 mx-5 my-3 cursor-pointer hover:text-brand hover:scale-105' onClick={handleClick}>
      <img src={imageUrl} className='w-56 h-60 '/>
      <div>
        <p>{productName}</p>
        <p>{productDetail}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

