import React, { useEffect, useState } from 'react'
import './Feed.scss';
import Post from './Post';
import { BackTop, Card, message, Skeleton, Tag } from 'antd';
import CommentPost from './components/CommentPost';
import { ReactComponent as UP } from "./icons/arrowUp.svg";
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { useDispatch } from 'react-redux';
import { setCommentVisible } from './features/feed/feedSlice';
import TagCollection from './components/TagCollection';
import UserProfile from './components/UserProfile';
import { Link } from 'react-router-dom';
import { tagsOptions } from './data';

const randomeColrs = [
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
  "magenta"
]
function Feed({ urlToFetch }) {
  const [page, setPage] = useState(1);
  const [ref, onScreen] = useIntersectionObserver();
  const [posts, setPosts] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const dispatch = useDispatch();
  dispatch(setCommentVisible(false));
  const URL = !urlToFetch ? `${process.env.REACT_APP_API_URL}/p/page/${page}` : `${urlToFetch}/${page}`;
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
          message.error({ content: 'something went wrong akkwrd !', duration: 10, key: 'updatable' });
        }
      }
    }
    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);

  return (
    <div className="feed__app" style={{ marginTop: '26px' }}>
      <div className="feed__sidebar">
        <h2>Snippet Collections</h2>
        <div>
          {tagsOptions.map((e, idx) => (
            <Link key={idx} to={'/p/tag/' + e.toLocaleLowerCase()}><Tag style={{ margin: '5px' }} color={randomeColrs[~~(Math.random() * randomeColrs.length)]}>{e}</Tag></Link>
          ))}
        </div>
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
        <UserProfile />
      </div>

      <div className="feed__news" style={{ display: 'flex', justifyContent: 'center' }}>
        <TagCollection />
      </div>
      <BackTop>
        <UP />
      </BackTop>
    </div>
  )
}

export default Feed;


