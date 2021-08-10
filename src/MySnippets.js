import React, { useEffect, useState } from 'react'
import { Table, Tag, Space } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';

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


const deleteButton = {
  padding: '3px 10px',
  borderRadius: '50px',
  fontWeight: '600',
  backgroundColor: 'rgb(254,226,226)',
  color: 'rgb(153,27,27)'
}

const columns = [

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`/p/${record.url}`}>{text}</Link>,
  },
  {
    title: 'likes',
    dataIndex: 'likeCount',
    key: 'likes',
  },
  {
    title: 'comments',
    dataIndex: 'commentCount',
    key: 'comments',
  },
  {
    title: 'created at',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>

        {tags.map(tag => {
          return (
            <Tag color={randomeColrs[~~(Math.random() * randomeColrs.length)]} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'url',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a style={deleteButton} onClick={() => handleDelete(record.post_id)}>Delete</a>
      </Space>
    ),
  },
];

const handleDelete = async (post_id) => {
  const formdata = new FormData();
  formdata.append("post_id", post_id);

  const requestOptions = {
    method: 'POST',
    body: formdata,
  };

  const response = await fetch("http://localhost:8000/api/p/delete", requestOptions);
  const result = await response.json();
  window.location.reload();
}



function MySnippets() {

  const [posts, setPosts] = useState(null);
  const [__token__] = useLocalStorage('__token__');

  useEffect(() => {
    async function _fetch() {
      const url = `${process.env.REACT_APP_API_URL}/me/all/p`;
      const formdata = new FormData();
      formdata.append('Authorization', __token__);
      const config = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch(url, config);
      const result = await response.json();
      setPosts(result.map((e, key) => ({ ...e, key, tags: e.tags.split(','), created_at: moment(e.created_at).fromNow() })));
    }
    _fetch();
  }, []);

  return (

    <div style={{ padding: '16px' }}>
      <h1 style={{ color: 'rgb(41 41 41)', fontSize: '45px' }}>Your stories</h1>
      {posts && <Table columns={columns} dataSource={posts} expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
        rowExpandable: record => record.name !== 'Not Expandable',
      }} />}
    </div>
  )
}

export default MySnippets;
