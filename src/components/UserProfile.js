import { Card, Drawer, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileUser, setVisible } from '../features/user/profileSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";

function UserProfile() {

  const profileUser = useSelector(selectProfileUser);
  const dispatch = useDispatch();
  const [__token__] = useLocalStorage('__token__');
  const [user, setuser] = useState(null);

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
      console.log(result);
      setuser(result);
    }
    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUser.user_id]);

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
            <>
              {user?.twitter && <a href={user?.twitter} target="_blank" rel="noreferrer">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <TwitterIcon key="twitter" />
                </div>
              </a>}
            </>
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
