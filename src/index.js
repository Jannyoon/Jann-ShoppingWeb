import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './page/Home';
import AllProducts from './page/AllProducts';
import ProductDetail from './page/ProductDetail';
import Carts from './page/Carts';
import Notfound from './page/Notfound';
import NewProducts from './page/NewProducts';
import LoginPage from './page/LoginPage';
import AuthContextProvider from './context/userContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


const router = createBrowserRouter([
  {
    path: "/",
    errorElement : <Notfound/>,
    element: <App/>,
    children : [  
      {index: true, element: <Home/>}, //Home엔 banner와 AllProducts가 함께 있음
      {
        path:"products",
        element: <AllProducts/>
      },
      {
        path:"products/:id",
        element : <ProductDetail/>
      },
      {
        path : "carts",
        element : <Carts/> //수정 예정.
      },
      {
        path : "products/new",
        element : <NewProducts/> //수정 예정
      },
      {
        path : "login",
        element : <LoginPage/>
      }
    ]
  },

]);
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router}/>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
