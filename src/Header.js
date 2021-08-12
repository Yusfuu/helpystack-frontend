import React from 'react';
import './Header.css';
import Avatar from './Avatar';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Notification } from './icons/notify.svg'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/user/userSlice';
import { Dropdown, Menu } from 'antd';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 999 }} className="bg-gray-800">
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
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/">Home</Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/editor">Editor</Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/p/top/snippets">Top Snippets</Link>
                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/me/snippets">Your stories</Link>
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
                </button>
              </div>


              <Dropdown arrow overlay={
                <Menu>
                  <Menu.Item key="99">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Avatar />
                      <span style={{ fontWeight: '500' }}>{user?.fullName}</span>
                    </div>
                  </Menu.Item>
                  <Menu.Divider />

                  <Menu.Item key="0">
                    <Link to="/settings">Settings</Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/editor">Editor</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/me/snippets">Stories</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="4" onClick={handleLogout}>Sign out</Menu.Item>
                </Menu>
              } trigger={['click']}>
                <span style={{ cursor: 'pointer' }} className="ant-dropdown-link">
                  <Avatar />
                </span>
              </Dropdown>

            </div>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Header;
