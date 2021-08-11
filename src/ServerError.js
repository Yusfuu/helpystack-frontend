import { Button, Result } from 'antd'
import React from 'react';

function ServerError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong. Akwrd"
      extra={<Button type="primary" onClick={() => { window.location.reload() }}>Back Home</Button>}
    />
  )
}

export default ServerError;
