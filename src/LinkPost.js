import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { colors } from './data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import "./LinkPost.scss";
import { ReactComponent as ExportIcon } from "./icons/export.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ClapIcon } from "./icons/clap.svg";
import { ReactComponent as CommentIcon } from "./icons/comment.svg";

import moment from 'moment';
import { Popover, message, Comment, Avatar, Card } from 'antd';
import * as htmlToImage from 'html-to-image';
import download from "downloadjs";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';
import Meta from 'antd/lib/card/Meta';
import CommentPost from './components/CommentPost';
import { selectFeed, setCommentVisible, setPage, setPostID } from './features/feed/feedSlice';

function LinkPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const user = useSelector(selectUser);
  const [countClap, setcountClap] = useState(0);
  const [like, setlike] = useState(0)
  const [comment, setcomment] = useState(0)
  const [visible, setvisible] = useState(false);

  const dispatch = useDispatch();
  ;

  useEffect(() => {
    dispatch(setPostID(post?.post_id));
  }, [post])

  useEffect(() => {
    async function _fetch() {
      const url = `${process.env.REACT_APP_API_URL}/p/${id}`;
      const response = await fetch(url);
      const result = await response.json();
      setPost(result);
      setlike(result.likeCount);
      setcomment(result.commentCount)
    }
    _fetch();
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(post.code);
    message.success('copied to clipboard');
  }

  const handleClap = async () => {

    if (+post.uid === user.id) {
      return message.warn('You can not applaud your own publish');
    }

    if (countClap === 3) {
      return message.warn('Woah there. way too spicy ✋');
    } else {
      message.loading({ content: 'Loading...', key: 'updatable' });
      const formdata = new FormData();
      formdata.append("post_id", post.post_id);

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


  return (
    <>
      {post && (
        <div className="link__post__wrapper">
          <div className="link__post__heading">
            <Card style={{ width: 750, marginTop: 16, border: 'none' }}>
              <Meta
                avatar={<Avatar src={''}>{user.fullName[0]}</Avatar>}
                title={
                  <>
                    <span>{post.fullName}</span>
                    <span className="link__post__created_at" >{moment(post.created_at).fromNow()}</span>
                  </>
                }
                description={post.description}
              />
            </Card>
          </div>
          <div className="link__post">
            <div style={{ margin: '24px' }} className="link__post__highlite" style={{ background: post?.background, border: '1px solid #f0f0f0' }}>
              <div className="app-header-frame">
                <div className="frame-controls">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="title">
                  <input disabled value={post?.name} />
                </div>
              </div>
              <SyntaxHighlighter id="syntaxHighlighterCode" language={post?.lang.toLocaleLowerCase()} style={colors[post?.color]} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
                {post?.code}
              </SyntaxHighlighter>
            </div>

          </div>
          <div className="link__post__buttons">
            <Popover content={<SvgOrPng name={post?.name} />}>
              <button className="link__post__export">
                {/* <span>Export</span> */}
                <ExportIcon />
              </button>
            </Popover>

            <button onClick={handleCopy} className="link__post__export">
              {/* <span>Copy</span> */}
              <CopyIcon />
            </button>

            <button onClick={() => dispatch(setCommentVisible(true))} className="link__post__export">
              <span>{comment}</span>
              <CommentIcon />
            </button>
            <button onClick={handleClap} className="link__post__export">
              <span>{like}</span>
              <ClapIcon />
            </button>
          </div>
          <CommentPost />
        </div>
      )
      }
    </>
  )
}


function SvgOrPng({ name }) {

  const handleExportPNG = () => {
    htmlToImage.toPng(document.querySelector('.link__post'))
      .then((dataUrl) => download(dataUrl, name))
      .then(message.success({ content: 'Done 🐱‍🏍!' }));

  }

  const handleExportSVG = () => {
    message.loading({ content: 'Exporting...', key: 'updatable' });

    htmlToImage.toSvg(document.querySelector('.link__post'))
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = name;
        link.href = dataUrl;
        link.click();
      })
      .then(message.success({ content: 'Done 🐱‍🏍!' }));
  }

  return (
    <div>
      <p onClick={handleExportPNG}>Save PNG</p>
      <p onClick={handleExportSVG}>Save SVG</p>
    </div>
  );

};

export default LinkPost;
