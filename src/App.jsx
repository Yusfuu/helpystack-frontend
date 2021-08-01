import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { selectUser } from './features/user/userSlice';
import { setProgress, selectLoading, progressFinished } from './features/loading/loadingSlice';
import Login from './login/Login';
import Feed from './Feed';
import Header from './Header';
import Editor from './Editor';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const progress = useSelector(selectLoading);
  // useEffect(() => {
  //   dispatch(setProgress(1000));
  // }, [])

  return (
    <div className="App">
      <LoadingBar color='#84cc16' height={2.8} progress={progress} onLoaderFinished={() => dispatch(progressFinished)} />
      {!user ? <Login /> :
        <div className="app__body">
          <Header />
          {/* <Feed /> */}
          <Editor />
        </div>
      }
    </div>
  );
}



export default App;
