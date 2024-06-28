import React from 'react';

export default function Button({onClick, text, disabled}) {
  if (disabled){
    return (
      <button className='px-3 py-2 rounded-md outline-none bg-gray-700 text-white'
      onClick={onClick}
      disabled={disabled}>{text}</button>
    );
  }
  return (
    <button className='px-3 py-2 rounded-md outline-none bg-brand text-white'
    onClick={onClick}
    disabled={disabled}>{text}</button>
  );
}

