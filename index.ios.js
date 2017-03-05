/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Login from './Login';

export default class GithubBrowser extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Login/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);