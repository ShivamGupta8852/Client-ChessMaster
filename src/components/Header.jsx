import React, { useState } from 'react';
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose, MdDarkMode } from "react-icons/md";
import { GiChessKing } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleOutsideClick(e) {
    if (e.target.id === "outside") {
      setIsMenuOpen(false);
    }
  }

  return (
    <div>
      <nav className='fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-[10px] w-full h-16 bg-slate-950 text-white'>
        <div className='flex gap-1 items-center text-[16px] md:text-2xl font-medium text-center cursor-pointer'>
          <GiChessKing className='text-[28px] text-green-300' />
          <p className='text-2xl font-semibold'>ChessMaster</p>
        </div>
        <ul className={`fixed z-10 md:relative top-0 md:top-0 right-0 bg-slate-950 md:w-auto w-4/5 h-full md:h-auto flex flex-col md:flex-row items-center pt-8 md:pt-0 space-y-8 md:space-y-0 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:justify-end md:gap-9`}>
          <div className='md:hidden absolute top-4 left-4'>
            <button onClick={handleToggle} className='text-3xl cursor-pointer text-green-300'>
              <MdOutlineClose />
            </button>
          </div>
          {isMenuOpen && <p className='text-3xl font-semibold'>ChessMaster</p>}
          <Link to={'/'}><li className='cursor-pointer' onClick={handleToggle}>Home</li></Link>
          <Link to={'/about'}><li className='cursor-pointer' onClick={handleToggle}>About</li></Link>
          {isMenuOpen &&<li className='cursor-pointer flex gap-5 justify-center items-center'>Toggle Theme <MdDarkMode /></li>}
          <div className='flex gap-8'>
            <Link to={'/signup'}><li className='px-2 py-[4px] rounded-md font-normal border-[1.8px] cursor-pointer' onClick={handleToggle}>Sign Up</li></Link>
            <Link to={'/login'}><li className='bg-green-300 px-[14px] py-[5px] rounded-md font-semibold text-black cursor-pointer' onClick={handleToggle}>Log in</li></Link>
          </div>
          {!isMenuOpen && <li className='cursor-pointer'><MdDarkMode /></li>}
        </ul>
        <button onClick={handleToggle} className='lg:hidden text-2xl cursor-pointer text-green-300 border-[2px] border-slate-500 rounded-md p-1'>
          <RiMenu3Line />
        </button>
      </nav>
      {/* Background overlay when menu is open */}
      {isMenuOpen && (
        <div id="outside" className="fixed inset-0 z-5 bg-black bg-opacity-50 md:hidden" onClick={handleOutsideClick}></div>
      )}
    </div>
  );
};

export default Header;
