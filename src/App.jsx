import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { login, selectUser } from './features/user/userSlice';
import { setProgress, selectLoading, progressFinished } from './features/loading/loadingSlice';
import Login from './login/Login';
import Header from './Header';
import Editor from './Editor';
import Feed from './Feed';
import Setting from './Setting';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import useLocalStorage from './hooks/useLocalStorage';
import useFetch from './hooks/useFetch';
import LinkPost from './LinkPost';

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const progress = useSelector(selectLoading);
  const user = {
    fullName: 'Youssef Hajjari',
  };
  // useEffect(() => {
  //   dispatch(setProgress(1000));
  // })

  return (
    <div className="App">
      <LoadingBar color='#84cc16' height={2.8} progress={progress} onLoaderFinished={() => dispatch(progressFinished)} />
      {!user ? <Login /> :
        <div className="app__body">
          <BrowserRouter>
            <Header />
            {/* <Feed /> */}
            {/* <Setting /> */}
            {/* <Editor /> */}

            <Route path="/" exact>
              <Feed />
            </Route>
            <Route path="/editor" exact>
              <Editor />
            </Route>
            <Route path="/settings" exact>
              <Setting />
            </Route>
            <Route path="/p/:id" component={LinkPost} />
          </BrowserRouter>
        </div>
      }
    </div>
  );
}



export default App;
