import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const GroupList = (props, context) => {

  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Text>Groups</Text>
      <Button onPress={Actions.groupDetail}>open group</Button>
      <Button onPress={Actions.pop}>Back</Button>
    </View>
  );
};

GroupDetailView.contextTypes = contextTypes;
GroupDetailView.propTypes = propTypes;

export default GroupDetailView;
