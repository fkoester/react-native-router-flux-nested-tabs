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

const GroupMemberDetail = (props, context) => {

  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Text>Group member detail view</Text>
    </View>
  );
};

GroupMemberDetail.contextTypes = contextTypes;
GroupMemberDetail.propTypes = propTypes;

export default GroupMemberDetail;
