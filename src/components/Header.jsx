import React, { useState } from 'react';
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux-Store/slices/loggedUserSlice.jsx';
import chesslogo from '../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import dummyProfileImage from "../assets/Images/dummyProfileImage.png"
import ThemeToggleButton from './ThemeToggleButton.jsx';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let { isLoggedIn, profileImage, userName, email } = useSelector((state) => state.loggedUser);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleLogout = async () => {
    // await axios.get("https://chessmaster-online.onrender.com/api/user/logout");
    await axios.get("http://localhost:8001/api/user/logout");
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate('/');
  }

  return (
    <div>
      <nav className='w-full fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-[10px] h-16 bg-slate-950 text-white'>
        <div className={`w-full md:w-auto flex justify-between ${isMenuOpen ? "opacity-95" : ""}`}>
          <div className='flex gap-3 items-center text-[16px] md:text-2xl font-medium text-center cursor-pointer'>
            <button onClick={handleToggle} className='lg:hidden text-xl cursor-pointer text-green-300 border-[2px] border-slate-500 rounded-md p-1'>
              <RiMenu3Line />
            </button>
            <Link to={'/'}>
              <div className='flex items-center justify-center'>
                <img src={chesslogo} alt="logo" className='w-8 h-8 bg-red-500' />
                <p className='text-2xl font-semibold'>ChessMaster</p>
              </div>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="md:hidden flex items-center gap-6">
              <FaRegBell className="text-xl cursor-pointer" />
              <div className="relative">
              {
                  profileImage === null ? (<div className="w-10 h-10 rounded-full bg-sky-800 text-white flex items-center justify-center text-xl font-semibold cursor-pointer" onClick={toggleDropdown}>
                    {userName.charAt(0).toUpperCase()}
                  </div>) : 
                  (<img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                  />)
                }
                {isDropdownOpen && (
                  <div className="absolute -right-2 p-2 mt-2 w-48 bg-slate-950 text-white rounded-md shadow-sm shadow-slate-400">
                    <div className="px-2 pb-2 border-b mb-1">
                      <p className="font-semibold text-lg">{userName}</p>
                      <p className="text-sm ">{email}</p>
                    </div>
                    <Link to="/profile" className="block px-2 py-2 hover:bg-slate-900 rounded-md" onClick={() => setIsDropdownOpen(false)}>Your Profile</Link>
                    <Link to="/dashboard" className="block px-2 py-2 hover:bg-slate-900 rounded-md" onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-2 py-2 bg-red-700 hover:bg-red-600 rounded-md "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (<div><Link to={'/login'}><li className='md:hidden bg-green-400 list-none text-lg hover:bg-green-500 px-[14px] py-[5px] rounded-md font-semibold text-black cursor-pointer' onClick={() => setIsMenuOpen(false)}>Log in</li></Link></div>)}
        </div>

        <ul className={`fixed z-10 md:relative top-0 left-0 md:top-0 bg-slate-950 md:w-auto w-5/6 h-full md:h-auto flex flex-col items-start md:flex-row md:items-center pl-10 text-lg md:text-base pt-4 md:pt-0 space-y-8 md:space-y-0 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:justify-end md:gap-9`}>
          <div className='md:hidden absolute top-4 right-4'>
            <button onClick={handleToggle} className='text-3xl cursor-pointer text-green-300'>
              <MdOutlineClose />
            </button>
          </div>
          <p className='md:hidden text-3xl font-semibold'>ChessMaster</p>
          <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-green-300 ' : ''}><li className='cursor-pointer' onClick={() => setIsMenuOpen(true)}>Home</li></NavLink>
          <NavLink to={'/about'} className={({ isActive }) => isActive ? 'text-green-300 ' : ''} ><li className='cursor-pointer' onClick={() => setIsMenuOpen(true)}>About</li></NavLink>
          <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'text-green-300 md:hidden' : 'md:hidden'}><li className='cursor-pointer'>Dashboard</li></NavLink>
          {/* <li className={`cursor-pointer ${!isMenuOpen ? 'order-last' : ''} flex gap-5 justify-center items-center`} onClick={toggleDarkMode}>{isMenuOpen ? (isDarkMode ? "Dark UI" : "Light UI") : ''}{isDarkMode ? <MdDarkMode /> : <MdLightMode />}</li> */}

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-6">
              <FaRegBell className="text-xl cursor-pointer" />
              <div className="relative">
                {
                  profileImage === null ? (<div className="w-10 h-10 rounded-full bg-sky-800 text-white flex items-center justify-center text-xl font-semibold cursor-pointer" onClick={toggleDropdown}>
                    {userName.charAt(0).toUpperCase()}
                  </div>) : 
                  (<img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                  />)
                }
                {isDropdownOpen && (
                  <div className="absolute -right-2 p-2 mt-2 w-48 bg-slate-950 text-white rounded-md shadow-sm shadow-slate-400">
                    <div className="px-2 pb-2 border-b mb-1">
                      <p className="font-semibold text-lg">{userName}</p>
                      <p className="text-sm ">{email}</p>
                    </div>
                    <Link to="/profile" className="block px-2 py-2 hover:bg-slate-900 rounded-md" onClick={() => setIsDropdownOpen(false)}>Your Profile</Link>
                    <Link to="/dashboard" className="block px-2 py-2 hover:bg-slate-900 rounded-md " onClick={() => setIsDropdownOpen(false)}>Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-2 py-2 bg-red-700 hover:bg-red-600 rounded-md "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to={'/signup'}><li className='px-2 py-[4px] rounded-md font-normal border-[1.8px] cursor-pointer hover:bg-slate-800' onClick={() => setIsMenuOpen(false)}>Sign Up</li></Link>
              <Link to={'/login'}><li className='bg-green-400 hover:bg-green-500 px-[14px] py-[5px] rounded-md font-semibold text-black cursor-pointer' onClick={() => setIsMenuOpen(false)}>Log in</li></Link>
            </>
          )}

          <ThemeToggleButton isMenuOpen={isMenuOpen} />
          
        </ul>

      </nav>

      {/* Background overlay when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-5 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default Header;














