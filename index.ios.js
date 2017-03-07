/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Login from './Login';
import AppContainer from './AppContainer';

export default class GithubBrowser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <AppContainer/>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Login onLogin={this.onLogin}/>
                </View>
            );
        }

    }

    onLogin() {
        this.setState({ isLoggedIn: true })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        color: 'black',
        fontSize: 28,
    }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
