import { Card, Drawer, message, Rate, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileUser, setVisible } from '../features/user/profileSlice';
import { selectUser } from '../features/user/userSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";
import { ReactComponent as StarIcon } from "../icons/star.svg";

function UserProfile() {

  const profileUser = useSelector(selectProfileUser);
  const dispatch = useDispatch();
  const [__token__] = useLocalStorage('__token__');
  const [user, setuser] = useState(null);
  const [follow, setFollow] = useState(null);
  const userCurrent = useSelector(selectUser);


  useEffect(() => {
    setuser(null)
    async function _fetch() {
      if (profileUser.user_id === null) return;
      const formdata = new FormData();
      formdata.append('Authorization', __token__);

      const requestOptions = {
        method: 'POST',
        body: formdata
      };

      const response = await fetch("http://localhost:8000/api/u/profile/" + profileUser.user_id, requestOptions);
      const result = await response.json();

      const fd = new FormData();
      fd.append("sender", userCurrent.id);
      fd.append("receiver", profileUser.user_id);

      fetch("http://localhost:8000/api/follow/show", {
        method: 'POST',
        body: fd,
      })
        .then(response => response.json())
        .then(({ isFollow }) => setFollow(isFollow))
        .catch(error => console.log('error', error));
      setuser(result);
    }
    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser.user_id]);

  const handleFollow = async () => {
    var formdata = new FormData();
    formdata.append("sender", userCurrent.id);
    formdata.append("receiver", profileUser.user_id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const response = await fetch("http://localhost:8000/api/follow", requestOptions)
    const result = await response.json();
    message.success(result);
    setFollow(1);
  }

  const handleUnfollow = async () => {
    var formdata = new FormData();
    formdata.append("sender", userCurrent.id);
    formdata.append("receiver", profileUser.user_id);
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const response = await fetch("http://localhost:8000/api/unfollow", requestOptions)
    const result = await response.json();
    message.success(result);
    setFollow(0);
  }

  return (
    <>
      <Drawer
        title={<h1>{user?.fullName}</h1>}
        placement={'left'}
        closable={false}
        onClose={() => dispatch(setVisible(false))}
        visible={profileUser.isOpen}
        width={600}
      >
        <Card
          style={{ width: 500, marginTop: 16 }}
          actions={[
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <>{user?.twitter && (<a style={{ width: '10%' }} href={user?.twitter} target="_blank" rel="noreferrer"><TwitterIcon key="twitter" /></a>)}</>
              <div onClick={+follow === 0 ? handleFollow : handleUnfollow} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StarIcon style={{ fill: +follow === 1 && '#fadb14' }} />
                <span>{+follow === 0 ? 'Star' : 'Unstar'}</span>
              </div>
            </div>
          ]}
        >
          <Skeleton loading={user === null ? true : false} avatar active>
            <Meta
              avatar={
                <Avatar src={user?.avatar && `http://localhost:8000/resources/avatars/${user?.avatar}`}>{user && user?.fullName[0]}</Avatar>
              }
              title={<>
                <span>{user?.fullName}</span>
                <span style={{
                  color: '#ccc',
                  paddingLeft: '8px',
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontWeight: '400',
                }}>Since {moment(user?.created_at).fromNow()}</span>
              </>}
              description={user?.bio}
            />
          </Skeleton>
        </Card>
      </Drawer>
    </>
  )
}

export default UserProfile;
