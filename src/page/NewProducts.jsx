import React from 'react';
import { useState } from 'react';
import Button from '../ui/Button'
import {CloudinaryUpload} from '../api/cloudinary';
import { AddNewProduct } from '../api/firebase';

export default function NewProducts() {
  const [newProduct, setNewProduct] = useState({});
  const [fileImg, setFileImg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e)=>{
    const target = e.target;
    const {name, value, files} = e.target;

    if (name==='prevImgFile'){
      setFileImg(files && files[0]);    
      console.log("input의 target.value = 경로:", target.value);
      console.log("저장된 파일을 보여줌", target.files); //저장된 파일. 
      console.log("저장된 파일 중 첫번째", target.files[0]);
      return;
    }
    //파일 경로는 저장이 되지 않을 예정
    setNewProduct((newProduct)=>({...newProduct, [name]:value})); //파일 자체 //name값에 해당하는 프로퍼티 키에 value 값을 넣어준다 
  }

  const handleClick = (e)=>{
    e.preventDefault();
    setUploading(true);
    //CloudinaryUpload에서 return하면 imageUrl을 return 한다.
    CloudinaryUpload(fileImg).then((url)=>{
      console.log("업로딩 된 url", url);
      AddNewProduct(newProduct, url).then(()=>{
        setSuccess(true)
        setInterval(()=>{
          setSuccess(null);     
        }, 5000)       
      })
    })
    .finally(()=>setUploading(false)) //성공 여부와 관계 없음 

  }

  console.log("등록 후보:", newProduct);
  return (
    <div className='flex flex-col items-center my-4'>
      {success && <p>✅업로딩 성공</p>}
      {fileImg && (<img className='block w-96' src={URL.createObjectURL(fileImg)}/>)}
      <form className='flex flex-col md:w-9/12 w-7/12 align-items'>
        <input className='border' 
          name='prevImgFile'
          type='file' 
          accept='image/*'
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          className='border'
          name='productName'
          value= {newProduct.productName ?? ''}
          placeholder='상품 이름'
          onChange={handleChange}
          required
        />
         <input 
          type="text"
          className='border'
          name='productDetail'
          value= {newProduct.productDetail ?? ''}
          placeholder='상품 상세 설명'
          onChange={handleChange}
          required
        />
         <input 
          type="text"
          className='border'
          name='sizeOrColor'
          value= {newProduct.sizeOrColor ?? ''}
          placeholder='사이즈 또는 색상 옵션(,로 구분)'
          onChange={handleChange}
          required
        />
        <input 
          type="text"
          className='border'
          name='price'
          value= {newProduct.price ?? ''}
          placeholder='가격(단위 : ₩)'
          onChange={handleChange}
          required
        />   
        <Button onClick = {(e)=>handleClick(e)} text={uploading ? "업로딩 중..." : "등록"}
          disabled={uploading}/>
      </form>
    </div>
  );
}

