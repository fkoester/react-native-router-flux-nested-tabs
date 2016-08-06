import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Launch from './components/Launch';
import Register from './components/Register';
import Login from './components/Login';
import Login2 from './components/Login2';
import Login3 from './components/Login3';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
import Error from './components/Error';
import Home from './components/Home';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import EchoView from './components/EchoView';
import NavigationDrawer from './components/NavigationDrawer';
import Button from 'react-native-button';

const Right = () => (
  <Text
    style={{
      width: 80,
      height: 37,
      position: 'absolute',
      bottom: 4,
      right: 2,
      padding: 8,
    }}
  >Right</Text>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

let currentSwitchPage = 'text1';

const SwitcherPage = (props) => (
  <View>
    <Text style={{ marginTop: 100, textAlign: 'center' }}>current page: {props.text}</Text>
    <Button
      onPress={() => {
        currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
        Actions.refresh({ key: 'switcher' });
      }}
    >
      Switch!
    </Button>
    <Button
      onPress={() => {
        Actions.launch({ type: ActionConst.RESET });
      }}
    >
      Exit
    </Button>
  </View>
);

class Example extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar hideTabBar>
            <Scene key="echo" clone component={EchoView} getTitle={(navState) => navState.key} />
            <Scene
              key="subtabs"
              clone
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            >
              <Scene
                key="subtab1"
                title="Subtab #1"
                icon={TabIcon}
                navigationBarStyle={{ backgroundColor: 'red' }}
                titleStyle={{ color: 'white' }}
              >
                <Scene
                  key="subtab1_1"
                  component={TabView}
                  title="Subtab #1_1"
                  onRight={() => alert('Right button')}
                  rightTitle="Right"
                />
                <Scene
                  key="subtab1_2"
                  component={TabView}
                  title="Tab #1_2"
                  titleStyle={{ color: 'black' }}
                />
              </Scene>
              <Scene key="subtab2" title="Subtab #2" icon={TabIcon}>
                <Scene
                  key="subtab2_1"
                  component={TabView}
                  title="Subtab #2_1"
                  renderRightButton={() => <Right />}
                />
                <Scene
                  key="subtab2_2"
                  component={TabView}
                  title="Subtab #2_2"
                  hideBackImage
                  onBack={() => alert('Left button!')}
                  backTitle="Left"
                  duration={1}
                  panHandlers={null}
                />
              </Scene>
            </Scene>
            <Scene key="launch" component={Launch} title="Launch" initial />
            <Scene key="tabbar" component={NavigationDrawer}>
              <Scene
                key="main"
                tabs
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene
                  key="tab1"
                  title="Tab #1"
                  icon={TabIcon}
                  navigationBarStyle={{ backgroundColor: 'red' }}
                  titleStyle={{ color: 'white' }}
                >
                  <Scene
                    key="tab1_1"
                    component={TabView}
                    title="Tab #1_1"
                    onRight={() => alert('Right button')}
                    rightTitle="Right"
                  />
                  <Scene
                    key="tab1_2"
                    component={TabView}
                    title="Tab #1_2"
                    titleStyle={{ color: 'black' }}
                  />
                </Scene>
                <Scene key="tab2" title="Tab #2" icon={TabIcon}>
                  <Scene
                    key="tab2_1"
                    component={TabView}
                    title="Tab #2_1"
                    renderRightButton={() => <Right />}
                  />
                  <Scene
                    key="tab2_2"
                    component={TabView}
                    title="Tab #2_2"
                    hideBackImage
                    onBack={() => alert('Left button!')}
                    backTitle="Left"
                    duration={1}
                    panHandlers={null}
                  />
                </Scene>
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default Example;
