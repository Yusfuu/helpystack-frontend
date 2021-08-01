import React from 'react';
import './Avatar.css'
import { selectUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';


function Avatar() {
  const user = useSelector(selectUser);

  return (
    <div>
      {user?.avatar ?
        <img id="profile" className="h-8 w-8 rounded-full" src={user?.avatar} />
        :
        <div className="avatar-root colorDefault">
          {user?.fullName[0]}
        </div>
      }

    </div>
  )
}

export default Avatar;
