import React, { useState } from 'react';
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose, MdDarkMode, MdLightMode  } from "react-icons/md";
import { GiChessKing } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div>
      <nav className='fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-[10px] w-full h-16 bg-slate-950 text-white'>
        <div className='flex gap-3 items-center text-[16px] md:text-2xl font-medium text-center cursor-pointer'>
          <button onClick={handleToggle} className='lg:hidden text-2xl cursor-pointer text-green-300 border-[2px] border-slate-500 rounded-md p-1'>
            <RiMenu3Line />
           </button>
          <Link to={'/'}><div className='flex items-center justify-center'>
            <GiChessKing className='text-[28px] text-green-300' />
            <p className='text-2xl font-semibold'>Chess</p>
          </div>
          </Link>
        </div>
        {isMenuOpen && <Link to={'/login'}><li className='bg-green-400 list-none text-lg hover:bg-green-500 px-[14px] py-[5px] rounded-md font-semibold text-black cursor-pointer' onClick={() => setIsMenuOpen(false)}>Log in</li></Link>}
        <ul className={`fixed z-10 md:relative top-0 left-0 md:top-0  bg-slate-950 md:w-auto w-3/5 h-full md:h-auto flex flex-col md:flex-row items-center pt-8 md:pt-0 space-y-8 md:space-y-0 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:justify-end md:gap-9`}>
          <div className='md:hidden absolute top-4 right-4'>
            <button onClick={handleToggle} className='text-3xl cursor-pointer text-green-300'>
              <MdOutlineClose />
            </button>
          </div>
          {isMenuOpen && <p className='text-3xl font-semibold'>ChessMaster</p>}
          <Link to={'/'}><li className='cursor-pointer' onClick={() => setIsMenuOpen(false)}>Home</li></Link>
          <Link to={'/about'}><li className='cursor-pointer' onClick={() => setIsMenuOpen(false)}>About</li></Link>
          {isMenuOpen &&<li className='cursor-pointer flex gap-5 justify-center items-center' onClick={toggleDarkMode}>{isDarkMode ? 'Dark UI' : 'Light UI'}{isDarkMode ?  <MdDarkMode /> : <MdLightMode />}</li>}
          <Link to={'/signup'}><li className='px-2 py-[4px] rounded-md font-normal border-[1.8px] cursor-pointer hover:bg-slate-800' onClick={() => setIsMenuOpen(false)}>Sign Up</li></Link>
          <Link to={'/login'}><li className='bg-green-400 hover:bg-green-500 px-[14px] py-[5px] rounded-md font-semibold text-black cursor-pointer' onClick={() => setIsMenuOpen(false)}>Log in</li></Link>
          {!isMenuOpen && <li className='cursor-pointer ' onClick={toggleDarkMode}>{isDarkMode ? <MdLightMode /> : <MdDarkMode />}</li>}
        </ul>
      </nav>
      {/* Background overlay when menu is open */}
      {isMenuOpen && (
        <div id="outside" className="fixed inset-0 z-5 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default Header;
