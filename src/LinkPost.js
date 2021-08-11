import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { colors } from './data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import "./LinkPost.scss";
import { ReactComponent as ExportIcon } from "./icons/export.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ClapIcon } from "./icons/clap.svg";
import { ReactComponent as CommentIcon } from "./icons/comment.svg";
import { ReactComponent as ThreeIcon } from "./icons/_3dots.svg";
import moment from 'moment';
import { Popover, message, Avatar, Card, Dropdown, Menu, Popconfirm, Skeleton } from 'antd';
import * as htmlToImage from 'html-to-image';
import download from "downloadjs";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';
import Meta from 'antd/lib/card/Meta';
import CommentPost from './components/CommentPost';
import { setCommentVisible, setPostID } from './features/feed/feedSlice';
import ShareButton from './components/ShareButton';
import NotFound from './NotFound';
import Isme from './components/Isme';
import useLocalStorage from './hooks/useLocalStorage';

function LinkPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const user = useSelector(selectUser);
  const [countClap, setcountClap] = useState(0);
  const [like, setlike] = useState(0)
  const [comment, setcomment] = useState(0)
  const [loading, setloading] = useState(true)
  const history = useHistory();
  const dispatch = useDispatch();
  const [__token__] = useLocalStorage('__token__');


  useEffect(() => {
    dispatch(setPostID(post?.post_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  useEffect(() => {
    setloading(true);
    async function _fetch() {
      const url = `${process.env.REACT_APP_API_URL}/p/${id}`;
      const response = await fetch(url);
      const result = await response.json();
      setPost(result);
      setlike(result.likeCount);
      setcomment(result.commentCount)
      setloading(false);
    }
    _fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(post.code);
    message.success('copied to clipboard');
  }

  const handleClap = async () => {

    if (+post.uid === +user.id) {
      return message.warn('You can not applaud your own publish');
    }

    if (countClap === 3) {
      return message.warn('Woah there. way too spicy ✋');
    } else {
      message.loading({ content: 'Loading...', key: 'updatable' });
      const formdata = new FormData();
      formdata.append("post_id", post.post_id);
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

  const handleDeletePublish = async () => {
    const formdata = new FormData();
    formdata.append("post_id", post?.post_id);
    const requestOptions = {
      method: 'POST',
      body: formdata,
    };
    const response = await fetch("http://localhost:8000/api/p/delete", requestOptions)
    const result = await response.json();
    if (result !== null) {
      message.success('Your Tip has been deleted');
      history.push('/');
    } else {
      message.error('something went wrong akkwrd !');
    }
  }
  const menu = (
    <Menu>
      <Menu.Item key='1'>
        Report this story
      </Menu.Item>

      {+post?.uid === +user?.id && <Menu.Item key='2' danger>
        <Popconfirm
          title="Are you sure to delete this Tip?"
          onConfirm={handleDeletePublish}
          okText="Yes"
          cancelText="No"
        >
          Delete Story
        </Popconfirm>
      </Menu.Item>}
    </Menu>
  );

  return (
    <>
      {loading &&
        <Card style={{ width: 700, margin: '60px auto 0 auto' }}>
          <Skeleton loading={true} avatar active />
        </Card>
      }
      {post === false && <NotFound />}

      {post && (
        <div className="link__post__wrapper">
          <div className="link__post__heading">
            <Card style={{ width: 750, marginTop: 16, border: 'none' }}>
              <Meta
                avatar={<Avatar src={user?.avatar && `http://localhost:8000/resources/avatars/${user.avatar}`}>{user.fullName[0]}</Avatar>}
                title={
                  <>
                    <span>{post.fullName} {+user.id === +post.uid && <Isme />}</span>
                    <span className="link__post__created_at" >{moment(post.created_at).fromNow()}</span>
                  </>
                }
                description={post.description}
              />
            </Card>
            <Dropdown overlay={menu} trigger={['click']}>
              <ThreeIcon />
            </Dropdown>
          </div>
          <div className="link__post">
            <div className="link__post__highlite" style={{ background: post?.background, border: post?.background === '#fff' && '1px solid #f0f0f0', margin: '24px' }}>
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
                <ExportIcon />
              </button>
            </Popover>

            <button onClick={handleCopy} className="link__post__export">
              <CopyIcon />
            </button>
            <button className="link__post__export">
              <ShareButton url={null} description={post.description} tags={post.tags} />
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
