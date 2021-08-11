import React, { useEffect, useState } from 'react'
import { Button, Drawer, Comment, Input, Avatar, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeed, setCommentVisible } from '../features/feed/feedSlice';
import { selectUser } from '../features/user/userSlice';
import moment from 'moment';
import useLocalStorage from '../hooks/useLocalStorage';
import Isme from './Isme';
const { TextArea } = Input;


function CommentPost() {

  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);
  const user = useSelector(selectUser);
  const [response, setResponse] = useState('');
  const [comments, setcomments] = useState([]);
  const [page, setPage] = useState(1);
  const [isloadMore, setisloadMore] = useState(false);
  const [isthereComment, setIsthereComment] = useState(false);
  const [commentCount, setcommentCount] = useState(0);
  const [__token__] = useLocalStorage('__token__');

  useEffect(() => {
    async function _fetch() {
      if (!feed.postID) return;
      setIsthereComment(false)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/p/${feed.postID}/comment/${page}`)
      const result = await response.json();
      if (result.length === 0) setIsthereComment(true);
      if (result.length < 8) {
        setisloadMore(true);
      } else {
        setisloadMore(false);
      }
      setcomments(result.map(c => +c.id === +user.id ? { ...c, me: true } : c))
      setPage(1);
    }
    _fetch();
  }, [feed.postID]);

  const handleResponsed = async () => {

    if (commentCount === 5) {
      setResponse('');
      return message.warn('Woah there. way too spicy ✋');
    } else {

      if (response.trim() === '' || response.length > 255) {
        return message.error('something went wrong akkwrd !');
      }
      message.loading({ content: 'Loading...', key: 'updatable' });

      const formdata = new FormData();
      formdata.append("post_id", feed.postID);
      formdata.append("body", response.trim());
      formdata.append('Authorization', __token__);

      const config = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const _response = await fetch(`${process.env.REACT_APP_API_URL}/p/comment`, config);
      const result = await _response.json();
      result.fullName = user.fullName;
      result.me = true;
      result.avatar = user.avatar;
      setcomments([result, ...comments]);
      setResponse('');
      message.success({ content: 'Commented 🐱‍👤', key: 'updatable', duration: 2 });
      setcommentCount(c => c + 1);
      setIsthereComment(false);
    }
  }
  const loadMoreComments = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/p/${feed.postID}/comment/${page + 1}`)
    const result = await response.json();
    setPage(c => c + 1);
    if (result.length < 8) {
      setisloadMore(true);
    }
    setcomments(c => [...c, ...result])
  }

  return (
    <>
      <Drawer
        title="Responses"
        placement="right"
        closable={false}
        onClose={() => dispatch(setCommentVisible(false))}
        visible={feed.commentVisible}
        width={600}
      >

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Avatar src={user?.avatar && `http://localhost:8000/resources/avatars/${user.avatar}`}>{user.fullName[0]}</Avatar>
            <span style={{
              color: 'rgb(41 41 41)', fontWeight: 500,
            }}>{user.fullName}</span>
          </div>
          <TextArea value={response} onChange={(e) => setResponse(e.target.value)} placeholder='What are your thoughts?' showCount rows={4} maxLength={100} />
          <Button onClick={handleResponsed} disabled={response.length <= 0} style={{ alignSelf: 'baseline' }} type="primary" loading={false}>
            Respond
          </Button>
        </div>

        {
          comments.map((comment, idx) => (
            <Comment
              key={idx}
              author={<a>{comment?.fullName} {comment?.me && <Isme />}</a>}
              avatar={
                <Avatar src={comment?.avatar && `http://localhost:8000/resources/avatars/${comment.avatar}`}>{comment?.fullName[0]}</Avatar>
              }
              content={comment?.body}
              datetime={moment(comment?.created_at).fromNow()}
            />
          ))
        }

        {!isloadMore && <Button disabled={isloadMore} onClick={loadMoreComments} type="primary">Load more</Button>}
        {isthereComment && <p style={{
          textAlign: 'center',
          fontSize: '16px',
          marginTop: '24px'
        }}>There are currently no responses for this Post. Be the first to respond.</p>}
      </Drawer>
    </>
  )
}

export default CommentPost
