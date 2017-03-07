/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TabBarIOS
} from 'react-native';

class AppContainer extends Component {
    state = {
        selectedTab: 'feed'
    };

    render() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="Feed"
                    icon={require('./img/inbox.png')}
                    selected={this.state.selectedTab=='feed'}
                    onPress={()=>this.setState({selectedTab: 'feed'})}
                >
                    <Text style={styles.welcome}>Tab 1</Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={require('./img/search.png')}
                    selected={this.state.selectedTab=='Search'}
                    onPress={()=>this.setState({selectedTab: 'Search'})}
                >
                    <Text style={styles.welcome}>Tab 2</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        color: 'black',
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50
    }
});

export default AppContainer;