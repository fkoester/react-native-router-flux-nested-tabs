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
import GroupList from './components/GroupList';
import GroupMemberList from './components/GroupMemberList';
import GroupMemberDetail from './components/GroupMemberDetail';
import GroupMap from './components/GroupMap';
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

const logNode = function(node, level = 0) {
  if(!node) {
    return;
  }

  console.log(" ".repeat(level) + `${node.name} ${node.key} ${node.index}`);
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => logNode(child, level + 2));
  }
}

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    /*console.log('============================================================================================');
    console.log('state before', state ? state : 'no state');*/
    console.log('============================================================================================');
    if(action.type === ActionConst.PUSH) {
      console.log(`==> PUSH ${action.key}`);
    } else if(action.type === ActionConst.FOCUS) {
      console.log(`==> FOCUS ${action.scene.name}`);
    } else {
      console.log(`==> ACTION ${action.type}`);
    }
    //console.log('============================================================================================');
    const newState = defaultReducer(state, action);
    logNode(newState);
    console.log('============================================================================================');

    return newState;
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
            <Scene key="launch" component={Launch} title="Launch" initial />
            <Scene key="tabbar" component={NavigationDrawer}>
              <Scene
                key="main"
                tabs
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene
                  key="groupsTab"
                  title="Groups"
                  icon={TabIcon}
                >
                  <Scene
                    key="groupList"
                    component={GroupList}
                    title="Groups"
                  />
                  <Scene
                    key="groupDetail"
                    tabs
                    tabBarStyle={styles.tabBarStyle}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                  >
                    <Scene
                      key="groupMembersTab"
                      title="Group Members"
                      icon={TabIcon}
                    >
                      <Scene
                        key="groupMemberList"
                        component={GroupMemberList}
                        title="Group Members"
                      />
                      <Scene
                        key="groupMemberDetail"
                        title="Group Member"
                        component={GroupMemberDetail}
                      />
                    </Scene>
                    <Scene
                      key="groupMapTab"
                      title="Group Map"
                      icon={TabIcon}
                    >
                      <Scene
                        key="groupMap"
                        title="Group Map"
                        component={GroupMap}
                      />
                    </Scene>
                  </Scene>
                </Scene>
                <Scene key="contactsTab" title="Contacts" icon={TabIcon}>
                  <Scene
                    key="contactsList"
                    component={TabView}
                    title="Contacts"
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
