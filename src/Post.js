import React, { useRef } from 'react';
import './Post.scss';
import { Card, Avatar, message, Tag } from 'antd';
import { colors, tagsOptions } from './data';
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { ReactComponent as ClapIcon } from "./icons/clap.svg";
import { ReactComponent as DownloadIcon } from "./icons/download.svg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

function Post({ style }) {
  const { name, code, color, lang, background, description, fullName, tags } = style;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success('copied to clipboard');
  }
  const handleClap = () => {
    console.log('handleClap');
    message.success('awesome 👏');

  }

  return (
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
            <SyntaxHighlighter id="syntaxHighlighterCode" language={lang} style={colors[color]} wrapLines={true} wrapLongLines={true} showLineNumbers={true}>
              {code}
            </SyntaxHighlighter>
          </div>
        </>
      }
      actions={[
        <div onClick={handleClap}><ClapIcon key="clap" style={{ margin: 'auto' }} /></div>,
        <div onClick={handleCopy}><CopyIcon key="copy" style={{ margin: 'auto' }} /></div>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={fullName}
        description={description}
      />
      <div className="tags__container">
        {tags.split(',').map(e => <Tags tag={e} />)}
      </div>

    </Card>
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
