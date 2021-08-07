import React, { useEffect, useState } from 'react'
import './Feed.scss';
import Post from './Post';
import { Card, Skeleton } from 'antd';
import CommentPost from './components/CommentPost';
import useIO from './hooks/useIO';


function Feed() {
  const [page, setPage] = useState(1);
  const [ref, onScreen] = useIO();
  const [posts, setPosts] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  useEffect(() => {
    async function _fetch() {
      if (onScreen) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/p/page/${page}`);
        const data = await response.json();
        if (data.length === 0) {
          ref(null);
          setSkeleton(true);
        }
        setPosts(c => [...c, ...data]);
        setPage(prev => prev + 1);
      }
    }
    _fetch();
  }, [onScreen]);

  return (
    <div className="feed__app">
      <div className="feed__sidebar">

      </div>
      <div className="feed__main">
        {posts.map((e) => <Post key={e.url} style={e} />)}
        {!skeleton && <div ref={ref} style={{ visibility: onScreen ? 'visible' : 'hidden' }}>
          <Card style={{ width: 700, marginTop: 16, marginBottom: 16 }}>
            <Skeleton loading={true} avatar active />
          </Card>
        </div>}
        <CommentPost />
      </div>

      <div className="feed__news">

      </div>
    </div>
  )
}

export default Feed;


