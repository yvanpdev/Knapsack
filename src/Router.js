import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Login from './components/Login';
import RecommendList from './components/RecommendList';
import VideoViewer from './components/VideoViewer';
import SignUp from './components/SignUp';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={Login} initial />
          <Scene key="signUp" component={SignUp} />
        </Scene>
        <Scene key="main">
          <Scene key="recommendList" title="Recommended List" component={RecommendList} />
          <Scene key="videoViewer" title="Video Player" component={VideoViewer} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
