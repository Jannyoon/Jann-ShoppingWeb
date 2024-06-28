import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuthContext } from '../context/userContext';
import { AddProductToCart, getCartProducts } from '../api/firebase';
import useCart from '../hooks/useCart';
import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';

export default function ProductDetail() {
  const {user} = useAuthContext(); 

  //console.log("user", user);
  const location = useLocation();
  const  {product:{id, imageUrl, price, productDetail, productName, sizeOrColor}} = location.state;
  const list = sizeOrColor ? sizeOrColor.split(",") : [];
  const [selected, setSelected] = useState(list[0]);
  const [isPending, setIsPending] = useState(false);
  const {getCartItem} = useCart({id, imageUrl, price, productDetail, productName, sizeOrColor}, user&&user.uid);
  const queryClient = useQueryClient();
  //console.log("product 정보", id, imageUrl, price, productName, selected);
 
  const handleChange = (e)=>{
    e.preventDefault();
    setSelected(e.target.value);
  }

  const handleClick = ()=>{
    const product = {id, imageUrl, price, productDetail, productName, selected, count:1}
    const uid = user.uid;
    setIsPending(true);
    getCartItem.mutate(product, {
      onSuccess : (result)=>{
        console.log("읽어들인 정보", result); 
        //console.log(result[`${selected}`]);
        if (result && result[`${selected}`]){ //옵션도 동일하면... 개수를 추가
          console.log("이미 존재하는 아이템입니다");
          AddProductToCart(user.uid, {...product, count:result[`${selected}`].count+1});
        }
        else{
          if (selected==='.'){
            if (result && result['점']) AddProductToCart(user.uid, {...product, selected:'점', count:result['점'].count+1})
            else AddProductToCart(user.uid, {...product, selected:'점'})
          }
          else AddProductToCart(user.uid, product);
        }
        alert("장바구니에 추가되었습니다.");
        queryClient.invalidateQueries(['carts', uid, product.selected]);
      },
      onSettled : ()=> setIsPending(false)
    }
  ) 
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-center mt-6'>
      <img src={imageUrl} className='w-96 h-96 mx-4'/>
      <div className='border w-96 h-96 flex flex-col justify-between'>
        <div className='p-3'>
          <h1 className='text-2xl mb-3 border-b border-brand p-4'>{price}₩</h1>
          <h2 className='text-2xl font-bold'>{productName}</h2>
          <p>{productDetail}</p>          
          <div className='flex mt-6'>
            <label htmlFor='select'className='mr-2'>색상 또는 사이즈</label>
            <select onChange={handleChange}>
              {list.map((option, idx)=>(
                <option value={option} key={idx}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <Button 
          text={user ? (isPending ? "처리 중..." : "장바구니에 추가") : "로그인 후 이용해주세요"} 
          disabled={isPending || !user}
          onClick={handleClick}
          />
      </div>        

    </div>
  );
}

