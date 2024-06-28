import logo from './logo.svg';
import './App.css';
import Navbar from './ui/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default App;
