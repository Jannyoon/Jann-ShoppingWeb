import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/firebase';
import ProductCard from '../component/ProductCard';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useAuthContext } from '../context/userContext';

export default function AllProducts() {
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  const products = data ?? [];

  if (products.length===0) return <div>Nothing</div>
  return (
    <div className='mt-7 flex justify-center'>
      <ul className='grid grid-cols-1 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4'>
        {products.length>0 && products.map((product)=>(
          <li key={product.id}><ProductCard product={product}/></li>
        ))}
      </ul>
    </div>
  );
}

