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

const { Meta } = Card;


function Post({ style }) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { post_id, uid, name, code, color, lang, background, description, fullName, tags, created_at, likeCount, url } = style;
  const [like, setlike] = useState(likeCount)
  const [countClap, setcountClap] = useState(0);
  const user = useSelector(selectUser);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success('copied to clipboard');
  }

  const handleClap = async (post_id) => {

    if (+uid === user.id) {
      return message.warn('You can not applaud your own publish');
    }

    if (countClap === 3) {
      return message.warn('Woah there. way too spicy ✋');
    } else {
      message.loading({ content: 'Loading...', key: 'updatable' });
      const formdata = new FormData();
      formdata.append("post_id", post_id);

      const config = {
        method: 'POST',
        body: formdata,
      };

      const url = `${process.env.REACT_APP_API_URL}/p/like`;
      const resposne = await fetch(url, config);
      const result = await resposne.json();
      message.success({ content: 'awesome 👏', key: 'updatable', duration: 2 });
      setlike(+(like) + 1);
      setcountClap(countClap + 1)
    }
  }

  const handleComment = (post_id) => {
    dispatch(setCommentVisible(true));
    dispatch(setPostID(post_id));
  }

  return (
    <>
      <Card style={{ width: 700, marginTop: 16 }}
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
                  <input disabled value={name} />
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
          <div onClick={() => handleComment(+post_id)}><CommentIcon key="comment" style={{ margin: 'auto' }} /></div>,
          <div onClick={handleCopy}><CopyIcon key="copy" style={{ margin: 'auto' }} /></div>,
        ]}
      >
        <Meta
          avatar={<Avatar src={''} style={{ background: background == '#fff' ? '#ccc' : background }}>{fullName[0]}</Avatar>}
          title={
            <>
              <span>{fullName}</span>
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
