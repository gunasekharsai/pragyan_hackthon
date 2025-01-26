import React from 'react'
import Bg from '../assets/bg.png'
import Star from '../assets/star.png'
import Lines from'../assets/lines.png'
import Navbar from '../Components/Navbar'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { GoArrowRight } from "react-icons/go";
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom';

const Home = () => {
const navigate=useNavigate();
  const mapClick=()=>{
    navigate('/map');
  };
  return (
    <motion.div className='bg-[#150c13] flex flex-col  relative overflow-hidden  w-[100vw] h-[100vh] '>
 <div className='relative z-10'><Navbar />
 </div>
    <motion.div className=' w-[100vw] mt-[15vh] flex flex-col justify-center items-center'>
    <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Bg} className='absolute w-[35vw] '/>
      <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} src={Lines} className='absolute w-[105vw] '/>
      <motion.div className='flex flex-col justify-center items-center text-center w-[70vw]'>
        <p className='text-[#ffffffb3] text-sm w-[30%] relative z-10 '>
        Own Land Permanently or Rent with Expiry-Based NFT Tokens,Explore Verified Land Listings
        </p>
        <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}  src={Star} className='absolute top-30 ml-[80vw]'/>
        <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}  src={Star} className='absolute rotate-90 w-[100px] top-50 ml-[-80vw]'/>
        <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}  src={Star} className='absolute top-130 ml-[-60vw]'/>

        <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}  src={Star} className='absolute top-130 z-10 rotate-85 w-[50px] ml-[70vw]'/>
        <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}  src={Bg} className='absolute ml-[85vw] rotate-25 w-[20vw] mt-[90vh]'/>
        <motion.h1  initial={{ x: '-5vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 50 }} className='text-6xl text-[white] relative z-10 mt-[2vh]'>
        Explore a <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}  className='text-[#d40b0b]' >New Era</motion.span> of Land <motion.span className='text-[#d40b0b]'>Transactions</motion.span> – Transparent, <br/><motion.span className='text-[#d40b0b]'>
        <ElectricBoltIcon sx={{ color: '#', fontSize: 90 }} />Fast</motion.span>, and Secure.
        </motion.h1>
      </motion.div>
      <motion.button  
      onClick={mapClick}
      initial={{ x: '-20vw' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 50 }} className='relative text-white  flex rounded-xl mt-[4vh] justify-center items-center gap-[5px] text-4xl z-10 px-[2vw] py-[1.5vh] bg-[#96230c]'  >Go to Maps <GoArrowRight/> </motion.button>
    </motion.div>


    </motion.div>
  )
}

export default Home
