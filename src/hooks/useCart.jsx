import React from 'react';
import {  
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AddProductToCart, getCartProducts, getProductsOfUser, deleteProduct } from '../api/firebase';
import { useAuthContext } from '../context/userContext';

export default function useCart(product='') {
  const {user} = useAuthContext();
  const userId = user && user.uid;
  const queryClient = useQueryClient();

  //user가 해당 아이템을 이미 갖고 있는지 확인하는 용도이다
  const getCartItem = useMutation(
    {
      mutationFn : ()=>getCartProducts(userId, product),
      onSuccess: ()=>{
        queryClient.invalidateQueries([`carts`, userId, product.id, product.selected]);
      }
    }
  )

  //해당 유저가 현재 장바구니에 몇 개의 아이템을 갖고 있는지 나타낸다.
  const getUserProducts = useQuery({ queryKey : ['carts', userId||''],
    queryFn : ()=>{return getProductsOfUser(userId)},
    enabled : !!userId
  })

  const updateProducts = useMutation(
    {
      mutationFn : (product)=>AddProductToCart(userId, product),
      onSuccess : ()=>{
        queryClient.invalidateQueries(['carts', userId, product.id, product.selected])
      }
    }
  )

  const deleteProducts = useMutation(
    {
      mutationFn : (product)=>deleteProduct(userId, product),
      onSuccess : ()=>{
        queryClient.invalidateQueries(['carts', userId, product.id])
      }
    }
  )

  return {getCartItem, getUserProducts, updateProducts, deleteProducts};
}

