import React from 'react';
import './Avatar.css'
import { selectUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';

function Avatar({ setOpen, open }) {
  const user = useSelector(selectUser);

  return (
    <div onClick={open !== undefined ? () => setOpen(!open) : null}>
      {user?.avatar ?
        <img id="profile" className="h-8 w-8 rounded-full" src={user?.avatar} alt="avatar" />
        :
        <div className="avatar-root colorDefault">
          {user?.fullName[0]}
        </div>
      }
    </div>
  )
}

export default Avatar;
