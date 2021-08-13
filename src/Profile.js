import React from 'react'
import { useSelector } from 'react-redux';
import './Profile.scss';
import { selectUser } from './features/user/userSlice';
import { ReactComponent as TwitterIcon } from "./icons/twitter.svg";
import { Link } from 'react-router-dom';
import Avatar from 'antd/lib/avatar/avatar';

function Profile() {

  const user = useSelector(selectUser);
  return (
    <>
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className="p-10 bg-surface-secondary">
        <div className="mb-8 text-center">
          <h3 className="mb-2">{user.bio}</h3>
          {user.bio && <h3 className="mb-2">{user.bio}</h3>}
          {!user.bio && <Link to="/settings"><h3 className="mb-2">Add Bio</h3></Link>}

          {user.twitter &&
            <a href={user?.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon style={{ margin: 'auto' }} />
            </a>
          }
          {!user.twitter && <Link to='/settings'>Add Twitter</Link>}
        </div>
        <div className="row" style={{ display: 'contents' }}>
          <div className="col-lg-4 mx-auto">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <span className="avatar avatar-xl rounded-circle">
                    {user.avatar && <img style={{ width: '100%', height: '100%', objectFit: 'cover', }} alt="..." src={`http://localhost:8000/resources/avatars/${user?.avatar}`} />}
                    {!user.avatar && <Avatar style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '30px',
                    }}>{user?.fullName[0]}</Avatar>}
                  </span>
                </div>
                <div className="text-center my-6">
                  <span className="d-block h5 mb-0">{user.fullName}</span>
                  <span className="d-block text-sm text-muted">{user.email}</span>
                </div>
                <div className="d-flex">
                  <div className="col-4 text-center">
                    <span className="h4 font-bolder mb-0">25</span>
                    <span className="d-block text-sm">Posts</span>
                  </div>
                  <div className="col-4 text-center">
                    <span className="h4 font-bolder mb-0">350</span>
                    <span className="d-block text-sm">Following</span>
                  </div>
                  <div className="col-4 text-center">
                    <span className="h4 font-bolder mb-0">1.5K</span>
                    <span className="d-block text-sm">Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
