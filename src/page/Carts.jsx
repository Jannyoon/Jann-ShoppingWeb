import React from 'react';
import useCart from '../hooks/useCart';
import CartItem from '../component/CartItem';
import calTotal from '../hooks/calTotal';
import Price from '../ui/Price';


export default function Carts() {
  const {getUserProducts} = useCart();
  let result = getUserProducts.data && getUserProducts.data.map(productId => Object.values(productId));
  let forPriceResult = result && result.flat();
  const total = calTotal(forPriceResult);
  //console.log("총액", total);
  
  /*
  {count, id, imageUrl, price, productDetail, productName, selected}
  Cart/userId/상품id/Option에 들어 있는 상품 정보
  {
    "count": 1,
    "id": "18e4d809-7602-4c02-8050-da9314463cee",
    "imageUrl": "http://res.cloudinary.com/doujrgenf/image/upload/v1718779688/saktis191iymsh55yf0s.jpg",
    "price": "88088",
    "productDetail": "브라운",
    "productName": "고양이 4",
    "selected": "l"
  }
  */

  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-semibold text-2xl my-5'>장바구니 목록</h2>
      <div className='w-11/12 md:w-9/12 h-80 md:h-96 flex flex-col overflow-auto'>
        <ul className='w-full flex flex-col items-center'>
        {result && result.map(productID => productID.map((item) => (
          <CartItem id={item.id} item={item}/>
        )))}
        {!result && <h2 className='text-4xl'>로그인 후 이용해주세요!</h2>}
        </ul>      
      </div>
      {result && <Price price={total}/>}

    </div>
  );
}

