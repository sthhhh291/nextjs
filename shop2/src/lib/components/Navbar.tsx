import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className='w-full bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <span className='text-xl font-bold text-gray-800'>
              Chuck&apos;s Car Care
            </span>
          </div>
          {/* Navigation Links */}
          <div className='hidden md:flex space-x-8'>
            <Link
              href='/'
              className='text-gray-700 hover:text-blue-600 font-medium'>
              Home
            </Link>
            <Link
              href='/customers'
              className='text-gray-700 hover:text-blue-600 font-medium'>
              Customers
            </Link>
            <Link
              href='#'
              className='text-gray-700 hover:text-blue-600 font-medium'>
              About
            </Link>
            <Link
              href='#'
              className='text-gray-700 hover:text-blue-600 font-medium'>
              Contact
            </Link>
          </div>
          {/* Right Side (e.g., Cart, Profile) */}
          <div className='flex items-center space-x-4'>
            <button className='text-gray-700 hover:text-blue-600' title='Cart'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.8a1 1 0 00.95-.7L21 13M7 13V6a1 1 0 011-1h3m4 0h2a1 1 0 011 1v7'></path>
              </svg>
            </button>
            <button
              className='text-gray-700 hover:text-blue-600'
              title='Profile'
              aria-label='Profile'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
