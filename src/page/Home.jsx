import React from 'react';
import Banner from '../ui/Banner';
import AllProducts from './AllProducts';

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <Banner/>
      <AllProducts/>
    </div>
  );
}

