import React, { useState } from 'react';
import { MdLightMode } from 'react-icons/md';
import { BsMoonStarsFill } from "react-icons/bs";
import { HiMiniComputerDesktop } from "react-icons/hi2";

const ThemeToggleButton = ({ isMenuOpen }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('system'); // initial theme
  const [isAnimating, setIsAnimating] = useState(false); // State for animation

  const handleThemeChange = (selectedTheme) => {
    setIsAnimating(true); // Start the animation
    setTimeout(() => {
      setTheme(selectedTheme);
      setDropdownOpen(false);
      document.documentElement.className = selectedTheme; // Adjust the className for theme
      setIsAnimating(false); // End animation after theme is set
    }, 200); // Delay to sync with animation duration
  };

  const themeIcons = {
    light: <MdLightMode />,
    dark: <BsMoonStarsFill />,
    system: <HiMiniComputerDesktop />,
  };

  return (
    <div className="relative">
      <div className='flex gap-5 items-center'>
        <span className='md:hidden'>Toggle Theme</span>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className={`flex p-2 rounded-full bg-gray-800 ${isMenuOpen ? 'text-2xl p-3': 'text-xl'} ${theme==='system' && 'text-gray-500'} text-white`}
        >
           <span
            className={`transition-transform duration-300 ease-in-out ${isAnimating ? 'rotate-180' : ''}`}
          >
            {themeIcons[theme]}
          </span>
        </button>
      </div>


      {isDropdownOpen && (
        <div className={`absolute -right-4 ${isMenuOpen && "left-0"} mt-2 w-48 bg-slate-950  rounded-lg shadow-sm shadow-slate-400`}>
          <ul className="p-1">
            {Object.keys(themeIcons).map((key) => (
              <li
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`flex items-center p-2 mb-1 cursor-pointer rounded-md ${theme === key ? 'bg-sky-800 hover:bg-sky-800' : 'hover:bg-slate-800'
                }`}
              >
                {themeIcons[key]}
                <span className="ml-2 capitalize">{key}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeToggleButton;
