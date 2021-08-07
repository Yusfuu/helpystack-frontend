import React, { useState } from 'react';
import './Post.scss';
import { Card, Avatar, message } from 'antd';
import { colors } from './data';
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ClapIcon } from "./icons/clap.svg";
import { ReactComponent as CommentIcon } from "./icons/comment.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useDispatch } from 'react-redux';
import { setCommentVisible, setPostID } from './features/feed/feedSlice';
const { Meta } = Card;


function Post({ style }) {
  const dispatch = useDispatch();
  const { post_id, name, code, color, lang, background, description, fullName, tags, likeCount } = style;
  const [like, setlike] = useState(likeCount)


  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success('copied to clipboard');
  }

  const handleClap = async (post_id) => {
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
            <div className="highlite" style={{ background }}>
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
              <SyntaxHighlighter id="syntaxHighlighterCode" language={lang.toLocaleLowerCase()} style={colors[color]} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
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
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={fullName}
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
