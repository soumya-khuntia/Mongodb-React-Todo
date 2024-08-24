import React, { useState } from 'react'

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-violet-300 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-bold text-gray-100 text-xl">Stask</span>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <a href="#" onClick={onSignupClick} className="py-2 px-4 font-medium text-white rounded shadow-lg hover:bg-gray-100 hover:text-gray-900 transition duration-300">Sign Up</a>
              <a href="#" onClick={onLoginClick} className="py-2 px-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Login</a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                <svg className="w-6 h-6 text-gray-500 hover:text-gray-900"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="bg-violet-300">
              <li><a href="#" onClick={onSignupClick} className="block text-sm px-2 py-4 text-white hover:bg-gray-100 hover:text-gray-900 transition duration-300">Sign Up</a></li>
              <li><a href="#" onClick={onLoginClick} className="block text-sm px-2 py-4 text-white rounded bg-blue-400 hover:bg-gray-100 hover:text-gray-900 transition duration-300">Login</a></li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
