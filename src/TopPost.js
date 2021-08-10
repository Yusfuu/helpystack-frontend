import React from 'react'
import Feed from './Feed'

export default function TopPost() {
  return (

    <div className="top__post">
      <Feed urlToFetch={`${process.env.REACT_APP_API_URL}/p/top`} />
    </div>
  )
}
