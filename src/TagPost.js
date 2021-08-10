import React from 'react'
import { useParams } from 'react-router-dom';
import Feed from './Feed';

function TagPost() {
  const { tag } = useParams();

  return (
    <div className="tag__post">
      <Feed urlToFetch={`${process.env.REACT_APP_API_URL}/p/tag/${tag}`} />
    </div>
  )
}

export default TagPost;
