import React, { useEffect, useState } from 'react'
import './Feed.scss';
import Post from './Post';
import { Card, Skeleton } from 'antd';
import useFetch from './hooks/useFetch';


function Feed() {
  const [posts, setPosts] = useState([]);
  const { response, error, loading } = useFetch('http://localhost:8000/api/p/all');

  console.log((response));

  return (
    <div className="feed__app">
      <div className="feed__sidebar">

      </div>
      <div className="feed__main">
        {response.map((e, idx) => <Post key={idx} style={e} />)}
        <Card style={{ width: 700, marginTop: 16, marginBottom: 16 }}>
          <Skeleton loading={true} avatar active />
        </Card>

      </div>

      <div className="feed__news">

      </div>
    </div>
  )
}

export default Feed;


