import React, { useState } from 'react';
import './Header.css';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { ReactComponent as Notification } from './icons/notify.svg'

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden burger">
            <button type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu" aria-expanded="false">
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start banner-header">
            <div className="flex-shrink-0 flex items-center">
              <div className="logo">
                <Link to="/">HelpyStack</Link>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/editor">Editor</Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <Notification />
            </button>

            <div className="ml-3 relative">
              <div>
                <button type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button" >
                  <Avatar setOpen={setOpen} open={open} />
                </button>
              </div>

              {open && (<div id="menu" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <span className="block px-4 py-2 text-sm text-gray-700" id="user-menu-item">Settings</span>
                <span className="block px-4 py-2 text-sm text-gray-700" id="user-menu-item">Profile</span>
                <span className="block px-4 py-2 text-sm text-gray-700" id="user-menu-item">Editor</span>
                <span className="block px-4 py-2 text-sm text-gray-700" id="user-menu-item">Sign out</span>
              </div>)}

            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header;
