import React, { useEffect, useState } from 'react'
import { Button, Drawer, Comment, Input, Avatar, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeed, setCommentVisible } from '../features/feed/feedSlice';
const { TextArea } = Input;


function CommentPost() {

  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);
  const [response, setResponse] = useState('');
  const [comments, setcomments] = useState([]);
  const [page, setPage] = useState(1);
  const [isloadMore, setisloadMore] = useState(false);


  useEffect(() => {
    async function _fetch() {
      if (!feed.postID) return;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/p/${feed.postID}/comment/${page}`)
      const result = await response.json();
      if (result.length < 8) {
        setisloadMore(true);
      } else {
        setisloadMore(false);
      }
      setcomments(result)
      setPage(1);
    }
    _fetch();
  }, [feed.postID]);

  const handleResponsed = async () => {

    if (response.trim() === '' || response.length > 255) {
      return message.error('something went wrong akkwrd !');
    }
    message.loading({ content: 'Loading...', key: 'updatable' });

    const formdata = new FormData();
    formdata.append("post_id", feed.postID);
    formdata.append("body", response.trim());

    const config = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const _response = await fetch(`${process.env.REACT_APP_API_URL}/p/comment`, config);
    const result = await _response.json();
    const created_at = (new Date()).toJSON().slice(0, -5).replace('T', ' ');
    result.created_at = created_at;
    setcomments([result, ...comments]);
    setResponse('');
    message.success({ content: 'Commented 🐱‍👤', key: 'updatable', duration: 2 });

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
        }}>
          <TextArea value={response} onChange={(e) => setResponse(e.target.value)} placeholder='What are your thoughts?' showCount rows={4} maxLength={100} />
          <Button onClick={handleResponsed} disabled={response.length <= 0} style={{ alignSelf: 'baseline' }} type="primary" loading={false}>
            Respond
          </Button>
        </div>

        {
          comments.map((comment, idx) => (
            <Comment
              key={idx}
              author={<a>{comment?.fullName}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={comment?.body}
              datetime={comment?.created_at}
            />
          ))
        }

        {!isloadMore && <Button disabled={isloadMore} onClick={loadMoreComments} type="primary">Load more</Button>}

      </Drawer>
    </>
  )
}

export default CommentPost
