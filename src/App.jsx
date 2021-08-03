import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { selectUser } from './features/user/userSlice';
import { setProgress, selectLoading, progressFinished } from './features/loading/loadingSlice';
import Login from './login/Login';
import Header from './Header';
import Editor from './Editor';
import Feed from './Feed';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Setting from './Setting';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const progress = useSelector(selectLoading);
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
            <Feed />
            {/* <Setting /> */}
            {/* <Editor /> */}

            {/* <Route path="/" exact>
              <Feed />
            </Route>
            <Route path="/editor" exact>
              <Editor />
            </Route>
            <Route path="/settings" exact>
              <Setting />
            </Route> */}
          </BrowserRouter>
        </div>
      }
    </div>
  );
}



export default App;
