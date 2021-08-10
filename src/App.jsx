import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { login, logout, selectUser } from './features/user/userSlice';
import { setProgress, selectLoading, progressFinished } from './features/loading/loadingSlice';
import Login from './login/Login';
import Header from './Header';
import Editor from './Editor';
import Feed from './Feed';
import Setting from './Setting';
import { LoadingOutlined } from "@ant-design/icons";

import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import useLocalStorage from './hooks/useLocalStorage';
import useFetch from './hooks/useFetch';
import LinkPost from './LinkPost';
import TagPost from './TagPost';
import TopPost from './TopPost';
import _404 from './_404';
import MySnippets from './MySnippets';
import { Spin } from 'antd';
import _500 from './_500';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const progress = useSelector(selectLoading);
  const [token, setLocalStorage] = useLocalStorage('__token__');
  const [loading, setloading] = useState(true);
  const [someError, setsomeError] = useState(false);

  useEffect(() => {
    if (!token) dispatch(logout());
    async function _fetch() {
      try {
        const formdata = new FormData();
        formdata.append("Authorization", `Bearer ${token}`);
        const response = await fetch("http://localhost:8000/api/u/auth", { method: 'POST', body: formdata });
        const result = await response.json();
        if (result === null) {
          dispatch(logout());
        } else {
          dispatch(login({ ...result, __token__: token }));
        }
        setloading(false);
      } catch (error) {
        setsomeError(true);
      }
    }
    _fetch();
  }, [])

  return (
    <div className="App">
      <LoadingBar color='#84cc16' height={2.8} progress={progress} onLoaderFinished={() => dispatch(progressFinished)} />
      {loading && <Spin style={{ height: '100vh', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center' }} tip="Loading... 🐱‍🏍" indicator={<LoadingOutlined style={{ fontSize: 46 }} spin />} />}
      {someError && <_500 />}
      {!loading && <BrowserRouter>
        {!user ? (<Login />) :
          (<div className="app__body">
            <Header />
            <Switch>
              <Route path="/" exact>
                <Feed urlToFetch={null} />
              </Route>
              <Route path="/editor" exact component={Editor} />
              <Route path="/settings" exact component={Setting} />
              <Route path="/p/:id" exact component={LinkPost} />
              <Route path="/p/tag/:tag" exact component={TagPost} />
              <Route path="/p/top/snippets" exact component={TopPost} />
              <Route path="/me/snippets" exact component={MySnippets} />
              <Route path='*' exact={true} component={_404} />
            </Switch>
          </div>
          )}
      </BrowserRouter>}
    </div>
  );
}



export default App;
