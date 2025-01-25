import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate=useNavigate();
  const govClick=()=>{
    navigate('/gov');
  };
  return (
    <div className='relative  flex flex-row justify-between items-center pt-[4vh] px-[4vw] text-white w-[100vw]'>
        
      <div><span className=''><CgProfile className='text-4xl text-[#bebaba]'/></span> </div>
      <div className='flex flex-row ml-[9vw]'><ul className='flex flex-row gap-[2vw] px-[2vw] border-1 border-[#ffffff33] text-[#ffffffad] rounded-2xl py-[10px] bg-[#ffffff16]'>
        <li>Home</li>
        <li onClick={govClick} >Upload Doc</li>
        <li>Map</li>
        <li>Contact</li>
      </ul></div>

      <div className='px-[2vw] border-1 border-[#ffffff33] text-[#ffffffad] rounded-2xl py-[10px] bg-[#6e1b0a]'>Connect to Wallet</div>
    </div>
  )
}

export default Navbar
