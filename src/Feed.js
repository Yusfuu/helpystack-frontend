import React, { useEffect, useState } from 'react'
import './Feed.scss';
import Post from './Post';
import { BackTop, Card, message, Skeleton } from 'antd';
import CommentPost from './components/CommentPost';
import { ReactComponent as UP } from "./icons/arrowUp.svg";
import useIO from './hooks/useIO';
import { useDispatch } from 'react-redux';
import { setCommentVisible } from './features/feed/feedSlice';
import TagCollection from './components/TagCollection';

function Feed({ urlToFetch }) {
  const [page, setPage] = useState(1);
  const [ref, onScreen] = useIO();
  const [posts, setPosts] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const dispatch = useDispatch();
  dispatch(setCommentVisible(false));
  const URL = urlToFetch === null ? `${process.env.REACT_APP_API_URL}/p/page/${page}` : `${urlToFetch}/${page}`;
  useEffect(() => {
    async function _fetch() {
      if (onScreen) {
        try {
          const response = await fetch(URL);
          const data = await response.json();
          if (data.length === 0) {
            ref(null);
            setSkeleton(true);
          }
          setPosts(c => [...c, ...data]);
          setPage(prev => prev + 1);
        } catch (error) {
          message.error({ content: 'something went wrong akkwrd !', duration: 0 });
        }
      }
    }
    _fetch()
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
          <Card style={{ width: 700, marginTop: 16, marginBottom: 16 }}>
            <Skeleton loading={true} avatar active />
          </Card>
        </div>}
        <CommentPost />
      </div>

      <div className="feed__news" style={{
        marginTop: '40px', display: 'flex',
        justifyContent: 'center'
      }}>
        <TagCollection />
      </div>
      <BackTop>
        <UP />
      </BackTop>
    </div>
  )
}

export default Feed;

