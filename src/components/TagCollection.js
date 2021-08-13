import React from 'react';
import { Link } from 'react-router-dom';
import "./TagCollection.scss";


export default function TagCollection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Recommended topics</h2>
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
    </div >
  )

}
