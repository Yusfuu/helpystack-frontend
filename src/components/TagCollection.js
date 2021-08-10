import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./TagCollection.scss";
import { Tag } from 'antd';
import { tagsOptions } from "../data";


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
export default function TagCollection() {
  const history = useHistory();
  return (
    <div>
      <h1>Featured Collections</h1>
      <ul className="tags">
        <Link to='/p/tag/javascript' className="tag">
          <div></div>
          <span>JavaScript</span>
        </Link>


        <Link to='/p/tag/vue' className="tag">
          <div></div>
          <span>Vue</span>
        </Link>

        <Link to='/p/tag/react' className="tag">
          <div></div>
          <span>React</span>
        </Link>

        <Link to='/p/tag/css' className="tag">
          <div></div>
          <span>CSS</span>
        </Link>
      </ul>
      <div className="tag__collection__others">
        <h2>RECOMMENDED TOPICS</h2>
        {tagsOptions.map((e, idx) => (
          <Link key={idx} to={'/p/tag/' + e.toLocaleLowerCase()}><Tag style={{ margin: '5px' }} color={randomeColrs[~~(Math.random() * randomeColrs.length)]}>{e}</Tag></Link>
        ))}
      </div>
    </div >
  )

}
