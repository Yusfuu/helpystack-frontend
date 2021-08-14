import React, { useState } from 'react';
import './Post.scss';
import { Card, Avatar, message } from 'antd';
import { colors } from './data';
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ClapIcon } from "./icons/clap.svg";
import { ReactComponent as CommentIcon } from "./icons/comment.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useDispatch, useSelector } from 'react-redux';
import { setCommentVisible, setPostID } from './features/feed/feedSlice';
import { selectUser } from './features/user/userSlice';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ShareButton from './components/ShareButton';
import useLocalStorage from './hooks/useLocalStorage';
import Isme from './components/Isme';
import { setUserID, setVisible } from './features/user/profileSlice';

const { Meta } = Card;


function Post({ style }) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { post_id, uid, name, code, color, lang, background, description, fullName, tags, created_at, likeCount, url, commentCount, avatar } = style;
  const [like, setlike] = useState(likeCount)
  const [countClap, setcountClap] = useState(0);
  const user = useSelector(selectUser);
  const [__token__] = useLocalStorage('__token__');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success('copied to clipboard');
  }

  const handleClap = async (post_id) => {

    if (+uid === +user.id) {
      return message.warn('You can not applaud your own publish');
    }

    if (countClap === 3) {
      return message.warn('Woah there. way too spicy ✋');
    } else {
      message.loading({ content: 'Loading...', key: 'updatable' });
      const formdata = new FormData();
      formdata.append("post_id", post_id);
      formdata.append('Authorization', __token__);

      const config = {
        method: 'POST',
        body: formdata,
      };

      const url = `${process.env.REACT_APP_API_URL}/p/like`;
      const resposne = await fetch(url, config);
      const result = await resposne.json();

      if (result !== null) {
        message.success({ content: 'awesome 👏', key: 'updatable', duration: 2 });
        setlike(+(like) + 1);
        setcountClap(countClap + 1)
      } else {
        message.error('something went wrong akkwrd !');
      }

    }
  }

  const handleComment = (post_id) => {
    dispatch(setCommentVisible(true));
    dispatch(setPostID(post_id));
  }

  const showProfileUser = () => {
    if (+user.id !== +uid) {
      dispatch(setVisible(true));
      dispatch(setUserID(uid));
    }
  }

  return (
    <>
      <Card style={{ width: 700 }}
        cover={
          <>
            <div className="highlite" style={{ background, border: '1px solid #f0f0f0' }}>
              <div className="app-header-frame">
                <div className="frame-controls">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="title">
                  <input style={{ width: '60%' }} disabled value={name} />
                </div>
              </div>
              <SyntaxHighlighter onClick={() => history.push('/p/' + url)} customStyle={{ cursor: 'pointer' }} id="syntaxHighlighterCode" language={lang.toLocaleLowerCase()} style={colors[color]} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
                {code}
              </SyntaxHighlighter>
            </div>
          </>
        }
        actions={[
          <div onClick={() => handleClap(post_id)} style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            <ClapIcon key="clap" />
            <span>{like}</span>
          </div>,
          <div onClick={() => handleComment(+post_id)} style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            <CommentIcon key="comment" />
            <span>{commentCount}</span>
          </div>,
          <div onClick={handleCopy}><CopyIcon key="copy" style={{ margin: 'auto' }} /></div>,
          <div><ShareButton url={url} description={description} tags={tags} /></div>,

        ]}
      >
        <Meta
          avatar={<Avatar onClick={showProfileUser} src={avatar && `http://localhost:8000/resources/avatars/${avatar}`} style={{ background: background === '#fff' ? '#ccc' : background, cursor: 'pointer' }}>{fullName[0]}</Avatar>}
          title={
            <>
              <span>{fullName}  {+uid === +user.id && <Isme />}</span>
              <span className="link__post__created_at" >{moment(created_at).fromNow()}</span>
            </>
          }
          description={description}
        />
        <div className="tags__container">
          {tags.split(',').map((e, idx) => <Tags key={idx} tag={e} />)}
        </div>
      </Card>

    </>
  )
}

function Tags({ tag }) {
  return (
    <span className="tags__lang">
      {tag}
    </span>
  );
}



export default Post;
