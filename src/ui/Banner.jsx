import React from 'react';

export default function Banner() {
  return (
    <section className=' w-full h-96 bg-yellow-900 relative'>
      <div className='w-full h-full bg-banner bg-cover opacity-80'></div>
      <div className='absolute w-full top-32 text-center mt-3'>
        <h1 className='text-6xl font-bold text-slate-100'>Banner</h1>
        <p className='text-xl mt-3 text-slate-200'>shopping shopping shopping shopping</p>
      </div>
    </section>
  );
}

