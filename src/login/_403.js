import { Button, Result } from 'antd'
import React from 'react';
import { useHistory } from 'react-router-dom';

function _403() {
  const history = useHistory();
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => history.push('')}>Back Login</Button>}
      />
    </div>
  )
}

export default _403
