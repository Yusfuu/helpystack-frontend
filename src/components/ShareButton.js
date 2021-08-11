import React from 'react'
import { Dropdown, Menu, message } from 'antd';
import { ReactComponent as ShareIcon } from "../icons/share.svg";
import { ReactComponent as TwitterIcon } from "../icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "../icons/facebook.svg";
import { ReactComponent as LinkIcon } from "../icons/link.svg";
import { ReactComponent as LinkedinIcon } from "../icons/linkedin.svg";
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from "react-share";

const menuItemStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
}

const menuStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

}
function ShareButton({ url = null, description, tags }) {

  const URL = url === null ? window.location.href : `http://localhost:3000/p/${url}`;
  const TAGS = ('helpystack,' + tags).split(',');
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(URL);
    message.success('url copied to clipboard');
  }
  const menu = (
    <Menu style={menuStyle}>
      <Menu.Item key="0">
        <TwitterShareButton title={description} hashtags={TAGS} url={URL} >
          <div style={menuItemStyle}>
            <TwitterIcon />
            <span>Twitter</span>
          </div>
        </TwitterShareButton>
      </Menu.Item>
      <Menu.Item key="1">
        <FacebookShareButton quote={description} hashtags={TAGS} url={URL} >
          <div style={menuItemStyle}>
            <FacebookIcon />
            <span>Facebook</span>
          </div>
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item key="2">
        <LinkedinShareButton source={"helpystack"} title={description} url={URL} >
          <div style={menuItemStyle}>
            <LinkedinIcon />
            <span>Linkedin</span>
          </div>
        </LinkedinShareButton>
      </Menu.Item>
      <Menu.Item key="3" >
        <div onClick={handleCopyUrl} style={menuItemStyle}>
          <LinkIcon />
          <span>Copy link</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topCenter" arrow trigger={['click']}>
      <ShareIcon key="share" style={{ margin: 'auto' }} />
    </Dropdown>
  )
}





export default ShareButton;
