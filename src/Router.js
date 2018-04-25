import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Login from './components/Login';
import RecommendList from './components/RecommendList';
import VideoViewer from './components/VideoViewer';
import SignUp from './components/SignUp';
import { TabIcon } from './components/common/TabIcon.js';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={Login} initial />
          <Scene key="signUp" component={SignUp} />
        </Scene>
        <Scene key="main" hideNavBar>
          <Scene
            key="tabbar"
            tabs
            lazy
            tabBarStyle={styles.navBar}
            tabBarPosition="bottom"
            showLabel={false}
            inactiveBackgroundColor={'lightgray'}
            activeBackgroundColor={'#25abf9'}
          >
            <Scene key="Knapsack" title="Knapsack" icon={TabIcon}>
              <Scene
                key="Knapsack"
                title="Knapsack"
                component={RecommendList}
                initial
              />
              {/* TODO: Create Knapsack component and replace above */}
            </Scene>
            <Scene key="Recommended" title="Recommended List" icon={TabIcon}>
              <Scene
                key="RecommendList"
                title="Recommended List"
                component={RecommendList}
                initial
              />
              { /* TODO: Scene for video player content goes here */ }
              <Scene key="VideoViewer" title="Video Player" component={VideoViewer} />
            </Scene>
            <Scene key="Profile" title="Profile" icon={TabIcon}>
              <Scene
                key="Profile"
                title="Profile"
                component={RecommendList}
                initial
              />
            {/* TODO: Create Profile component and replace above */}
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  navBar: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    opacity: 1
    },
  }
);

export default RouterComponent;
